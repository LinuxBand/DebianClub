#!/usr/bin/env python3
"""Convert VitePress markdown (docs/) -> Fumadocs i18n MDX (web/content/docs/).
- zh (default) -> <path>.mdx ; other langs -> <path>.<lang>.mdx (co-located)
- ::: tip/info/warning/danger/details [Title] ... ::: -> <Callout type=.. title=..>
- index.md (home layout) is skipped (landing rebuilt in React)
- frontmatter preserved; internal links already match target URLs (baseUrl '/')
"""
import os, re, sys

SRC = "/home/ivmm/DebianClub/docs"
DST = "/home/ivmm/DebianClub/web/content/docs"
LANGS = ["en", "de", "es", "fr", "ja", "ko", "pt"]  # non-default; zh is default (no suffix)
CALLOUT = {"tip": "info", "info": "info", "warning": "warn", "danger": "error",
           "caution": "warn", "details": "info", "note": "info", "important": "info"}

fence_open = re.compile(r'^:::\s*([a-zA-Z]+)\s*(.*?)\s*$')
fence_close = re.compile(r'^:::\s*$')

def convert(text: str) -> str:
    # split frontmatter
    fm = ""
    body = text
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            fm = text[:end + 5]
            body = text[end + 5:]
    out, lines, i = [], body.split("\n"), 0
    stack = []
    for line in lines:
        mo = fence_open.match(line)
        mc = fence_close.match(line)
        if mo and not (mc and not mo.group(1)):
            typ = mo.group(1).lower()
            title = mo.group(2).strip()
            ctype = CALLOUT.get(typ, "info")
            attrs = f' type="{ctype}"'
            if title:
                attrs += f' title={titlestr(title)}'
            out.append(f'<Callout{attrs}>')
            out.append("")
            stack.append(True)
        elif mc and stack:
            out.append("")
            out.append("</Callout>")
            stack.pop()
        else:
            out.append(line)
    return fm + "\n".join(out)

def titlestr(t: str) -> str:
    # JSX attribute: use quotes; escape any double quotes
    if '"' in t:
        return "{" + repr(t) + "}"
    return '"' + t + '"'

def walk_lang(root, lang):
    n = 0
    for dirpath, _, files in os.walk(root):
        # skip lang subdirs and .vitepress when scanning zh root
        rel0 = os.path.relpath(dirpath, root)
        if lang == "" and (rel0.split(os.sep)[0] in LANGS or rel0.startswith(".vitepress") or rel0.startswith("public")):
            continue
        for f in files:
            if not f.endswith(".md"):
                continue
            src = os.path.join(dirpath, f)
            rel = os.path.relpath(src, root)
            base = rel[:-3]  # strip .md
            if base == "index":
                continue  # landing handled in React
            suffix = "" if lang == "" else f".{lang}"
            dst = os.path.join(DST, base + suffix + ".mdx")
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(src, encoding="utf-8") as fh:
                text = fh.read()
            with open(dst, "w", encoding="utf-8") as fh:
                fh.write(convert(text))
            n += 1
    return n

if __name__ == "__main__":
    # clear sample content
    for s in ("index.mdx", "test.mdx"):
        p = os.path.join(DST, s)
        if os.path.exists(p):
            os.remove(p)
    total = walk_lang(SRC, "")  # zh default
    print(f"zh: {total}")
    for lang in LANGS:
        d = os.path.join(SRC, lang)
        if os.path.isdir(d):
            c = walk_lang(d, lang)
            total += c
            print(f"{lang}: {c}")
    print(f"TOTAL mdx files: {total}")
