#!/usr/bin/env python3
"""
Export canonical skills to Anthropic/Claude Agent Skills format.

Anthropic format:
  dist/anthropic/<skill-id>/
    system_prompt.md    <- full system prompt with embedded procedure
    metadata.json       <- structured metadata for tool registration

Usage:
    python3 scripts/export_anthropic.py
"""

from __future__ import annotations

import json
import os
import shutil
from typing import Optional

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS_DIR = os.path.join(ROOT, "skills")
DIST_DIR = os.path.join(ROOT, "dist", "anthropic")


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


def build_system_prompt(meta: dict, prompt: str) -> str:
    lines = []

    lines.append(f"# {meta['title']}")
    lines.append("")
    lines.append(f"You are an OOUX (Object-Oriented UX) facilitator guiding a user through **{meta['title']}** — "
                 f"Step {meta.get('orca_step', '?')} of the ORCA process "
                 f"(Round: {meta.get('orca_round', '?').title()}, Pillar: {meta.get('orca_pillar', '?').title()}).")
    lines.append("")
    lines.append(meta.get("description", ""))
    lines.append("")

    lines.append("<context>")
    lines.append("OOUX (Object-Oriented UX) is a design philosophy that aligns digital systems to how humans "
                 "naturally perceive reality — through concrete objects, not features. The ORCA process has 4 rounds "
                 "(Discovery, Definition, Design, Build) across 4 pillars (Objects, Relationships, "
                 "CTAs, Attributes) = 16 core steps plus 2 standalone skills. Each step produces a specific artifact "
                 "that is saved as a markdown page in the user's Caboodle resource site.")
    lines.append("</context>")
    lines.append("")

    # Sources
    sources = meta.get("sources")
    if sources:
        lines.append("<source_materials>")
        reads = sources.get("reads_from_site", [])
        if reads:
            lines.append("Before starting, read these existing site pages for context:")
            for read in reads:
                path = read.get("path", "")
                desc = read.get("description", "")
                lines.append(f"- site/docs/{path}: {desc}")
            lines.append("")
        accepts = sources.get("accepts_from_user", [])
        if accepts:
            lines.append("The user may provide these source materials:")
            for accept in accepts:
                req = " [REQUIRED]" if accept.get("required") else " [OPTIONAL]"
                lines.append(f"- {accept.get('type', 'any')}{req}: {accept.get('description', '')}")
        lines.append("</source_materials>")
        lines.append("")

    # Publishing
    publishing = meta.get("publishing")
    if publishing:
        lines.append("<publishing>")
        lines.append("Save the finished artifact as a markdown file:")
        if publishing.get("output_dir"):
            lines.append(f"- Directory: site/docs/{publishing['output_dir']}")
        if publishing.get("filename_template"):
            lines.append(f"- Filename: {publishing['filename_template']}")
        if publishing.get("update_existing"):
            lines.append("- If a file with this name already exists, update it.")
        if publishing.get("frontmatter"):
            fm = publishing["frontmatter"]
            if fm.get("title_template"):
                lines.append(f"- Title: {fm['title_template']}")
        lines.append("</publishing>")
        lines.append("")

    # Inputs
    inputs = meta.get("inputs", [])
    if inputs:
        lines.append("<required_inputs>")
        for inp in inputs:
            req_label = "REQUIRED" if inp.get("required") else "OPTIONAL"
            lines.append(f"- [{req_label}] {inp['name']}: {inp.get('description', '')}")
            if inp.get("source_skill"):
                lines.append(f"  (Produced by skill: {inp['source_skill']})")
        lines.append("</required_inputs>")
        lines.append("")

    # Outputs
    outputs = meta.get("outputs", [])
    if outputs:
        lines.append("<expected_outputs>")
        for out in outputs:
            lines.append(f"- {out['name']} ({out.get('artifact_type', 'document')}): {out.get('description', '')}")
        lines.append("</expected_outputs>")
        lines.append("")

    # Collaboration checkpoints
    checkpoints = meta.get("collaboration_checkpoints", [])
    if checkpoints:
        lines.append("<collaboration_checkpoints>")
        lines.append("IMPORTANT: At these checkpoints, you MUST pause and wait for user input before proceeding.")
        lines.append("Do NOT skip checkpoints or fill in answers on behalf of the user.")
        lines.append("")
        for cp in checkpoints:
            req_label = " [REQUIRED]" if cp.get("required") else ""
            lines.append(f"- **{cp['id']}** ({cp.get('type', 'user-input')}){req_label}: {cp.get('prompt', '')}")
        lines.append("</collaboration_checkpoints>")
        lines.append("")

    # Procedure
    procedure = meta.get("procedure", [])
    if procedure:
        lines.append("<procedure>")
        for step in procedure:
            timebox = f" [{step['timebox_minutes']} min]" if step.get("timebox_minutes") else ""
            lines.append(f"### Step {step['step']}: {step['title']}{timebox}")
            lines.append(step.get("instructions", ""))
            if step.get("checkpoint"):
                lines.append(f"> **CHECKPOINT: {step['checkpoint']}** — Pause and wait for user input before continuing.")
            if step.get("facilitation_tip"):
                lines.append(f"> **Facilitation tip:** {step['facilitation_tip']}")
            lines.append("")
        lines.append("</procedure>")
        lines.append("")

    # Definition of Done
    dod = meta.get("definition_of_done", [])
    if dod:
        lines.append("<definition_of_done>")
        lines.append("Before completing this skill, verify ALL of the following:")
        for item in dod:
            lines.append(f"- [ ] {item}")
        lines.append("</definition_of_done>")
        lines.append("")

    # Behavioral instructions
    lines.append("<instructions>")
    lines.append("1. Start by reading existing site pages for context (if any exist).")
    lines.append("2. Ask the user what source materials they have and what they're trying to accomplish.")
    lines.append("3. Guide them through the procedure step by step. Don't skip steps.")
    lines.append("4. At each collaboration checkpoint, STOP and wait for user input.")
    lines.append("5. Ask clarifying questions when the user's input is ambiguous.")
    lines.append("6. After each step, confirm the output before moving on.")
    lines.append("7. When all steps are complete, run through the Definition of Done checklist.")
    lines.append("8. If any DoD item is not met, guide the user back to the relevant step.")
    lines.append("9. Save the finished artifact as a markdown file in the resource site.")
    lines.append("10. Be encouraging but rigorous — OOUX rewards precision in naming and structure.")
    lines.append("</instructions>")
    lines.append("")

    if prompt.strip():
        lines.append("<detailed_guidance>")
        lines.append(prompt)
        lines.append("</detailed_guidance>")

    return "\n".join(lines)


def build_metadata_json(meta: dict) -> dict:
    result = {
        "id": meta.get("id", ""),
        "title": meta.get("title", ""),
        "description": meta.get("description", ""),
        "version": meta.get("version", "3.0.0"),
        "orca": {
            "round": meta.get("orca_round", ""),
            "pillar": meta.get("orca_pillar", ""),
            "step": meta.get("orca_step", 0),
        },
        "roles": meta.get("roles", []),
        "tags": meta.get("tags", []),
        "difficulty": meta.get("difficulty", ""),
        "estimated_duration_minutes": meta.get("estimated_duration_minutes", 0),
        "inputs": [
            {
                "name": inp["name"],
                "description": inp.get("description", ""),
                "required": inp.get("required", False),
            }
            for inp in meta.get("inputs", [])
        ],
        "outputs": [
            {
                "name": out["name"],
                "description": out.get("description", ""),
                "artifact_type": out.get("artifact_type", "document"),
            }
            for out in meta.get("outputs", [])
        ],
        "definition_of_done": meta.get("definition_of_done", []),
    }

    # Add sources if present
    sources = meta.get("sources")
    if sources:
        result["sources"] = sources

    # Add publishing if present
    publishing = meta.get("publishing")
    if publishing:
        result["publishing"] = publishing

    # Add collaboration checkpoints if present
    checkpoints = meta.get("collaboration_checkpoints", [])
    if checkpoints:
        result["collaboration_checkpoints"] = [
            {
                "id": cp.get("id", ""),
                "prompt": cp.get("prompt", ""),
                "type": cp.get("type", "user-input"),
                "required": cp.get("required", False),
            }
            for cp in checkpoints
        ]

    return result


def export_skill(skill_id: str, skill_dir: str) -> None:
    meta = load_skill(skill_dir)
    if meta is None:
        print(f"  ⚠ Skipping {skill_id}: no skill.yaml found")
        return

    prompt = load_prompt(skill_dir)
    out_dir = os.path.join(DIST_DIR, skill_id)
    os.makedirs(out_dir, exist_ok=True)

    system_prompt = build_system_prompt(meta, prompt)
    with open(os.path.join(out_dir, "system_prompt.md"), "w") as f:
        f.write(system_prompt)

    metadata = build_metadata_json(meta)
    with open(os.path.join(out_dir, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

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

    print("Exporting skills to Anthropic/Claude format...")
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
