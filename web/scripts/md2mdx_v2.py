#!/usr/bin/env python3
"""Convert VitePress markdown (docs/) -> Fumadocs i18n MDX (web/content/docs/).
- zh (default) -> <path>.mdx ; other langs -> <path>.<lang>.mdx (co-located)
- Ensure frontmatter `title` (Fumadocs requires it): existing, else first H1, else slug
- Strip the leading H1 (Fumadocs renders title via DocsTitle -> no duplicate)
- ::: tip/info/warning/danger/details [Title] ... ::: -> <Callout type title>
- index.md skipped (landing rebuilt in React)
"""
import os, re, shutil

SRC = "/home/ivmm/DebianClub/docs"
DST = "/home/ivmm/DebianClub/web/content/docs"
LANGS = ["en", "de", "es", "fr", "ja", "ko", "pt"]
CALLOUT = {"tip": "info", "info": "info", "warning": "warn", "danger": "error",
           "caution": "warn", "details": "info", "note": "info", "important": "info"}

fence_open = re.compile(r'^:::\s*([a-zA-Z]+)\s*(.*?)\s*$')
fence_close = re.compile(r'^:::\s*$')
h1_re = re.compile(r'^#\s+(.+?)\s*$')


def yaml_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def jsx_attr(t):
    return ("{" + repr(t) + "}") if '"' in t else ('"' + t + '"')


def split_fm(text):
    title = desc = None
    body = text
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            for line in text[4:end].split("\n"):
                m = re.match(r'^(title|description):\s*(.*)$', line)
                if m:
                    v = m.group(2).strip()
                    if len(v) >= 2 and v[0] in "\"'" and v[-1] == v[0]:
                        v = v[1:-1]
                    if m.group(1) == "title":
                        title = v
                    else:
                        desc = v
            body = text[end + 5:]
    return title, desc, body


def convert(text, fallback):
    fm_title, fm_desc, body = split_fm(text)
    h1 = None
    kept = []
    for line in body.split("\n"):
        m = h1_re.match(line)
        if m and h1 is None:
            h1 = m.group(1).strip()
            continue
        kept.append(line)
    while kept and kept[0].strip() == "":
        kept.pop(0)
    out, stack = [], []
    for line in kept:
        mo = fence_open.match(line)
        mc = fence_close.match(line)
        if mo:
            attrs = f' type="{CALLOUT.get(mo.group(1).lower(), "info")}"'
            t = mo.group(2).strip()
            if t:
                attrs += f' title={jsx_attr(t)}'
            out.append(f'<Callout{attrs}>'); out.append("")
            stack.append(True)
        elif mc and stack:
            out.append(""); out.append("</Callout>")
            stack.pop()
        else:
            out.append(line)
    title = fm_title or h1 or fallback
    fm = ["---", f"title: {yaml_str(title)}"]
    if fm_desc:
        fm.append(f"description: {yaml_str(fm_desc)}")
    fm.append("---")
    return "\n".join(fm) + "\n\n" + "\n".join(out).lstrip("\n")


def walk(root, lang):
    n = 0
    for dp, _, files in os.walk(root):
        rel0 = os.path.relpath(dp, root).split(os.sep)[0]
        if lang == "" and (rel0 in LANGS or rel0 in (".vitepress", "public")):
            continue
        for f in files:
            if not f.endswith(".md"):
                continue
            base = os.path.relpath(os.path.join(dp, f), root)[:-3]
            if base == "index":
                continue
            dst = os.path.join(DST, base + ("" if lang == "" else f".{lang}") + ".mdx")
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(os.path.join(dp, f), encoding="utf-8") as fh:
                text = fh.read()
            fb = base.split("/")[-1].replace("-", " ").title()
            with open(dst, "w", encoding="utf-8") as fh:
                fh.write(convert(text, fb))
            n += 1
    return n


if __name__ == "__main__":
    if os.path.isdir(DST):
        shutil.rmtree(DST)
    os.makedirs(DST)
    total = walk(SRC, "")
    print("zh:", total)
    for lang in LANGS:
        if os.path.isdir(os.path.join(SRC, lang)):
            c = walk(os.path.join(SRC, lang), lang)
            total += c
            print(f"{lang}: {c}")
    print("TOTAL:", total)
