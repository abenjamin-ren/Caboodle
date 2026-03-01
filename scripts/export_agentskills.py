#!/usr/bin/env python3
"""
Export canonical skills to agentskills.io format.

agentskills.io format:
  dist/agentskills/<skill-id>/
    SKILL.md        <- rendered prompt with front-matter
    templates/      <- copied as-is
    examples/       <- copied as-is

Usage:
    python3 scripts/export_agentskills.py
"""

from __future__ import annotations

import os
import shutil
from typing import Optional

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS_DIR = os.path.join(ROOT, "skills")
DIST_DIR = os.path.join(ROOT, "dist", "agentskills")


def load_skill(skill_dir: str) -> Optional[dict]:
    yaml_path = os.path.join(skill_dir, "skill.yaml")
    if not os.path.isfile(yaml_path):
        return None
    with open(yaml_path, "r") as f:
        return yaml.safe_load(f)


def load_prompt(skill_dir: str) -> str:
    md_path = os.path.join(skill_dir, "SKILL.md")
    if not os.path.isfile(md_path):
        return ""
    with open(md_path, "r") as f:
        return f.read()


def render_agentskills_md(meta: dict, prompt: str) -> str:
    lines = ["---"]

    lines.append(f"title: \"{meta['title']}\"")
    lines.append(f"description: \"{meta.get('description', '')}\"")
    lines.append(f"version: \"{meta.get('version', '3.0.0')}\"")

    tags = meta.get("tags", [])
    if tags:
        lines.append(f"tags: [{', '.join(tags)}]")

    lines.append(f"orca_round: \"{meta.get('orca_round', '')}\"")
    lines.append(f"orca_pillar: \"{meta.get('orca_pillar', '')}\"")
    lines.append(f"orca_step: {meta.get('orca_step', 0)}")

    roles = meta.get("roles", [])
    if roles:
        lines.append(f"roles: [{', '.join(roles)}]")

    if meta.get("difficulty"):
        lines.append(f"difficulty: \"{meta['difficulty']}\"")
    if meta.get("estimated_duration_minutes"):
        lines.append(f"estimated_duration_minutes: {meta['estimated_duration_minutes']}")

    # Sources
    sources = meta.get("sources")
    if sources:
        lines.append("sources:")
        reads = sources.get("reads_from_site", [])
        if reads:
            lines.append("  reads_from_site:")
            for read in reads:
                lines.append(f"    - path: \"{read.get('path', '')}\"")
                lines.append(f"      description: \"{read.get('description', '')}\"")

    # Publishing
    publishing = meta.get("publishing")
    if publishing:
        lines.append("publishing:")
        if publishing.get("output_dir"):
            lines.append(f"  output_dir: \"{publishing['output_dir']}\"")
        if publishing.get("filename_template"):
            lines.append(f"  filename_template: \"{publishing['filename_template']}\"")
        if publishing.get("update_existing") is not None:
            lines.append(f"  update_existing: {str(publishing['update_existing']).lower()}")

    lines.append("---")
    lines.append("")

    # Inputs section
    inputs = meta.get("inputs", [])
    if inputs:
        lines.append("## Inputs")
        lines.append("")
        for inp in inputs:
            req = " *(required)*" if inp.get("required") else " *(optional)*"
            lines.append(f"- **{inp['name']}**{req}: {inp.get('description', '')}")
            if inp.get("source_skill"):
                lines.append(f"  - Source: `{inp['source_skill']}`")
        lines.append("")

    # Outputs section
    outputs = meta.get("outputs", [])
    if outputs:
        lines.append("## Outputs")
        lines.append("")
        for out in outputs:
            lines.append(f"- **{out['name']}** ({out.get('artifact_type', 'document')}): {out.get('description', '')}")
        lines.append("")

    # Collaboration checkpoints
    checkpoints = meta.get("collaboration_checkpoints", [])
    if checkpoints:
        lines.append("## Collaboration Checkpoints")
        lines.append("")
        for cp in checkpoints:
            cp_type = cp.get("type", "user-input")
            req = " *(required)*" if cp.get("required") else ""
            lines.append(f"- **{cp['id']}** ({cp_type}){req}: {cp.get('prompt', '')}")
        lines.append("")

    # Definition of Done
    dod = meta.get("definition_of_done", [])
    if dod:
        lines.append("## Definition of Done")
        lines.append("")
        for item in dod:
            lines.append(f"- [ ] {item}")
        lines.append("")

    lines.append("---")
    lines.append("")
    lines.append(prompt)

    return "\n".join(lines)


def export_skill(skill_id: str, skill_dir: str) -> None:
    meta = load_skill(skill_dir)
    if meta is None:
        print(f"  ⚠ Skipping {skill_id}: no skill.yaml found")
        return

    prompt = load_prompt(skill_dir)
    out_dir = os.path.join(DIST_DIR, skill_id)
    os.makedirs(out_dir, exist_ok=True)

    rendered = render_agentskills_md(meta, prompt)
    with open(os.path.join(out_dir, "SKILL.md"), "w") as f:
        f.write(rendered)

    for subdir in ("templates", "examples"):
        src = os.path.join(skill_dir, subdir)
        dst = os.path.join(out_dir, subdir)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)

    print(f"  ✓ Exported {skill_id}")


def main():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)

    print("Exporting skills to agentskills.io format...")
    print(f"  Source: {SKILLS_DIR}")
    print(f"  Target: {DIST_DIR}")
    print()

    exported = 0
    for entry in sorted(os.listdir(SKILLS_DIR)):
        skill_dir = os.path.join(SKILLS_DIR, entry)
        if os.path.isdir(skill_dir) and not entry.startswith("."):
            export_skill(entry, skill_dir)
            exported += 1

    print(f"\nDone. {exported} skill(s) exported to {DIST_DIR}")


if __name__ == "__main__":
    main()
