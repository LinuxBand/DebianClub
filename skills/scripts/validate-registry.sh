#!/usr/bin/env bash
set -u

REGISTRY_PATH="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/registry.json}"
REPO_ROOT="$(cd "$(dirname "$REGISTRY_PATH")/.." && pwd)"

python3 - "$REGISTRY_PATH" "$REPO_ROOT" <<'PY'
import json
import pathlib
import sys

registry_path = pathlib.Path(sys.argv[1])
repo_root = pathlib.Path(sys.argv[2])
errors = []

try:
    data = json.loads(registry_path.read_text(encoding="utf-8"))
except Exception as exc:
    print(f"FAILED: cannot parse {registry_path}: {exc}")
    sys.exit(1)

if not isinstance(data.get("schema_version"), int):
    errors.append("schema_version must be an integer")

skills = data.get("skills")
if not isinstance(skills, list) or not skills:
    errors.append("skills must be a non-empty list")
    skills = []

for index, skill in enumerate(skills, start=1):
    if not isinstance(skill, dict):
        errors.append(f"skills[{index}] must be an object")
        continue

    name = skill.get("name")
    path = skill.get("path")
    entrypoint = skill.get("entrypoint")
    version = skill.get("version")

    for field in ("name", "version", "path", "entrypoint", "display_name", "short_description"):
        if not isinstance(skill.get(field), str) or not skill.get(field).strip():
            errors.append(f"{name or f'skills[{index}]'}: {field} must be a non-empty string")

    if isinstance(version, str) and version.count(".") != 2:
        errors.append(f"{name}: version should use major.minor.patch")

    if isinstance(path, str):
        skill_dir = repo_root / path
        if not skill_dir.is_dir():
            errors.append(f"{name}: path does not exist: {path}")
        elif isinstance(entrypoint, str) and not (skill_dir / entrypoint).is_file():
            errors.append(f"{name}: entrypoint does not exist: {path}/{entrypoint}")
    else:
        skill_dir = None

    languages = skill.get("languages")
    if not isinstance(languages, list) or "en" not in languages:
        errors.append(f"{name}: languages must include en")
    elif skill_dir is not None:
        for language in languages:
            if language == "en":
                continue
            translation = skill_dir / "translations" / f"{language}.md"
            if not translation.is_file():
                errors.append(f"{name}: missing translation for {language}: {translation.relative_to(repo_root)}")

    modules = skill.get("modules")
    if not isinstance(modules, list) or not modules:
        errors.append(f"{name}: modules must be a non-empty list")

    validation = skill.get("validation", {})
    if not isinstance(validation, dict):
        errors.append(f"{name}: validation must be an object")
    else:
        script = validation.get("script")
        if not isinstance(script, str) or not (repo_root / script).is_file():
            errors.append(f"{name}: validation.script does not exist")

    install = skill.get("install", {})
    if not isinstance(install, dict):
        errors.append(f"{name}: install must be an object")
    else:
        local_script = install.get("local_script")
        if not isinstance(local_script, str) or not local_script.strip():
            errors.append(f"{name}: install.local_script must be a non-empty string")
        else:
            script_path = local_script.split()[0]
            if not (repo_root / script_path).is_file():
                errors.append(f"{name}: install.local_script path does not exist")

    distribution = skill.get("distribution", {})
    if distribution:
        if not isinstance(distribution, dict):
            errors.append(f"{name}: distribution must be an object")
        else:
            package_script = distribution.get("package_script")
            if not isinstance(package_script, str) or not package_script.strip():
                errors.append(f"{name}: distribution.package_script must be a non-empty string")
            else:
                script_path = package_script.split()[0]
                if not (repo_root / script_path).is_file():
                    errors.append(f"{name}: distribution.package_script path does not exist")

            publish_script = distribution.get("publish_script")
            if publish_script is not None:
                if not isinstance(publish_script, str) or not publish_script.strip():
                    errors.append(f"{name}: distribution.publish_script must be a non-empty string")
                else:
                    script_path = publish_script.split()[0]
                    if not (repo_root / script_path).is_file():
                        errors.append(f"{name}: distribution.publish_script path does not exist")

            release_workflow = distribution.get("release_workflow")
            if release_workflow is not None:
                if not isinstance(release_workflow, str) or not (repo_root / release_workflow).is_file():
                    errors.append(f"{name}: distribution.release_workflow does not exist")

            tag_pattern = distribution.get("tag_pattern")
            if tag_pattern is not None:
                expected_prefix = f"skills/{name}/v"
                if not isinstance(tag_pattern, str) or not tag_pattern.startswith(expected_prefix):
                    errors.append(f"{name}: distribution.tag_pattern must start with {expected_prefix}")

            registry_route = distribution.get("registry_route")
            if not isinstance(registry_route, str) or not registry_route.startswith("/"):
                errors.append(f"{name}: distribution.registry_route must be an absolute route")

    evaluation = skill.get("evaluation", {})
    if evaluation:
        if not isinstance(evaluation, dict):
            errors.append(f"{name}: evaluation must be an object")
        else:
            prompts = evaluation.get("prompts")
            if not isinstance(prompts, str) or not (repo_root / prompts).is_file():
                errors.append(f"{name}: evaluation.prompts does not exist")

            baseline_responses = evaluation.get("baseline_responses")
            if baseline_responses is not None:
                if not isinstance(baseline_responses, str) or not (repo_root / baseline_responses).is_dir():
                    errors.append(f"{name}: evaluation.baseline_responses does not exist")

            failure_responses = evaluation.get("failure_responses")
            if failure_responses is not None:
                if not isinstance(failure_responses, str) or not (repo_root / failure_responses).is_dir():
                    errors.append(f"{name}: evaluation.failure_responses does not exist")

            edge_responses = evaluation.get("edge_responses")
            if edge_responses is not None:
                if not isinstance(edge_responses, str) or not (repo_root / edge_responses).is_dir():
                    errors.append(f"{name}: evaluation.edge_responses does not exist")

            field_regression_prompts = evaluation.get("field_regression_prompts")
            if field_regression_prompts is not None:
                if not isinstance(field_regression_prompts, str) or not (repo_root / field_regression_prompts).is_file():
                    errors.append(f"{name}: evaluation.field_regression_prompts does not exist")

            field_regression_responses = evaluation.get("field_regression_responses")
            if field_regression_responses is not None:
                if not isinstance(field_regression_responses, str) or not (repo_root / field_regression_responses).is_dir():
                    errors.append(f"{name}: evaluation.field_regression_responses does not exist")

            regression_cases = evaluation.get("regression_cases")
            if regression_cases is not None:
                if not isinstance(regression_cases, str) or not (repo_root / regression_cases).is_file():
                    errors.append(f"{name}: evaluation.regression_cases does not exist")

            grades = evaluation.get("grades")
            if grades is not None:
                expected_grades = ["excellent", "pass", "risky", "fail"]
                if grades != expected_grades:
                    errors.append(f"{name}: evaluation.grades must be {expected_grades}")

            score_script = evaluation.get("score_script")
            if not isinstance(score_script, str) or not score_script.strip():
                errors.append(f"{name}: evaluation.score_script must be a non-empty string")
            else:
                script_path = score_script.split()[0]
                if not (repo_root / script_path).is_file():
                    errors.append(f"{name}: evaluation.score_script path does not exist")

if errors:
    for error in errors:
        print(f"FAILED: {error}")
    sys.exit(1)

print("skill registry checks passed.")
PY
