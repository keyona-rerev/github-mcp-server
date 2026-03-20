---
name: registry
description: >
  Keyona's Tool Registry — query before building ANYTHING. Use this skill ANY TIME
  Keyona says the word "REGISTRY" anywhere in her message. Also trigger automatically
  when Keyona asks to build, create, or extend a tool, script, web app, MCP server,
  GAS project, Google Sheet system, or automation — even if she doesn't say REGISTRY —
  to prevent duplicates. This skill uses the Google Sheets MCP to query the live registry,
  surfaces relevant matches (exact and partial), and enforces a "check before you build"
  rule. Never duplicate an Active tool without explicit confirmation. Always remind Keyona
  to log newly built tools after the session.
---

# 🧠 Registry — Keyona's Tool Registry

This skill prevents duplicate builds and surfaces existing tools before anything new is
created. It connects to a live Google Sheet that tracks every tool, script, app, and
automation across ReRev Labs, Prismm, Black Tech Capital, and Internal/Shared use.

---

## Key facts

- **Sheet:** Keyona's Tool Registry
- **Tab:** Registry
- **Spreadsheet ID:** find via Google Sheets MCP (`sheets_list_spreadsheets` or search Drive for "Keyona's Tool Registry")
- **Web App (visual mode):** `https://script.google.com/macros/s/AKfycbyy3n4WUPbtbppw_0HdaNsba1SZeXPPQvkPwN498l_i2gkwQEEgOCA5SCpwmDBsf8Tv/exec`
- **Columns:** ID · Tool Name · Venture · Type · Status · Description · Link · Date Built · Last Used · Tags · Notes

---

## Step 0 — Trigger conditions

**Always run this skill when:**
- Keyona says `REGISTRY` anywhere in her message (hard trigger)
- Keyona asks to build, create, make, or extend any tool or automation (soft trigger)
- A request sounds like something that might already exist (judgment call — err on the side of checking)

**Do not skip the check.** Even if Claude is confident nothing exists, check first.

---

## Step 1 — Query the registry

Use **Google Sheets MCP** → `sheets_read_rows`:
- Sheet name: `Registry`
- Read all rows

Filter results by relevance to the current task using the **Description**, **Tags**, and **Tool Name** columns.

---

## Step 2 — Summarize matches

Present findings in this format:

**Exact matches** (tool clearly does what's being requested):
| ID | Tool Name | Venture | Type | Status | Description | Link |
|----|-----------|---------|------|--------|-------------|------|

**Partial matches** (tool overlaps or could be extended):
| ID | Tool Name | Venture | Type | Status | Description | Link |

**No matches:** State clearly that nothing relevant was found and it's safe to build new.

---

## Step 3 — Ask before building

Based on what you found:

- **Exact match (Active):** Surface it. Do NOT proceed with a new build without explicit confirmation. Ask: *"This already exists — want to extend it or build something separate?"*
- **Partial match:** Surface it. Ask: *"This partially covers your need — want to extend it or start fresh?"*
- **No match:** Confirm it's safe to build and proceed.
- **Match but Archived/Needs Review:** Surface it and ask if Keyona wants to revive it or build new.

---

## Step 4 — After building

Once a new tool is built in the session, remind Keyona:

> "🗂️ Don't forget to log this in the Registry. Want me to add it now via the Sheets MCP?"

If she says yes, use `sheets_append_rows` to add a new row with:
- ID (next sequential ID — check existing rows to find it)
- Tool Name
- Venture (ReRev Labs / Prismm / Black Tech Capital / Internal)
- Type (see types below)
- Status: `Active`
- Description (1–2 sentences)
- Link (if deployed)
- Date Built (today's date)
- Tags (comma-separated keywords)

---

## Reference: Ventures

| Venture | What it covers |
|---------|---------------|
| ReRev Labs | AI education, consulting, curriculum, client delivery |
| Prismm | White-label digital vault, B2B sales to financial institutions |
| Black Tech Capital | Climate tech nano VC fund |
| Internal / Shared | Tools that serve all ventures or personal use |

## Reference: Tool Types

`MCP Server` · `GAS Script` · `GAS Web App` · `Google Sheet System` · `Prompt / Skill` · `Curriculum` · `SOP / Doc` · `Railway Service` · `Audit / Report` · `Other`

## Reference: Statuses

`Active` · `In Progress` · `Archived` · `Needs Review`

---

## Usage examples

**"REGISTRY — do we have anything that generates LinkedIn content?"**
→ Query sheet → find T005 LinkedIn Content Engine (Prismm / GAS Web App / Active) → surface it → ask if it can be repurposed.

**"REGISTRY before we start — I want to build a CRM for ReRev"**
→ Query sheet → find T014 Super Connector CRM (In Progress) → surface it → ask if we should continue that build instead.

**"Let's build a compliance tracker for BTC"** *(no REGISTRY keyword)*
→ Soft trigger — query anyway → find T006 BTC Compliance Manager (Active) → surface it → ask what's missing.

**"I want to build something new — REGISTRY check first"**
→ Query sheet → no matches → confirm safe to build → proceed.
