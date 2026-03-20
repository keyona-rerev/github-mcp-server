# 🧠 REGISTRY — Keyona's Tool Registry Skill

## Trigger Word
**`REGISTRY`**

When Keyona says `REGISTRY` at any point in a conversation, Claude must:
1. Immediately use the **Google Sheets MCP** to query the Tool Registry sheet
2. Summarize what's relevant to the current topic
3. Ask whether to extend an existing tool vs. build something new
4. Only proceed with building after this check is complete

---

## How to Query

- **MCP:** Google Sheets MCP
- **Sheet name:** Keyona's Tool Registry
- **Tab:** Registry
- **Columns:** ID | Tool Name | Venture | Type | Status | Description | Link | Date Built | Last Used | Tags | Notes

Read all rows from the Registry tab. Filter by relevance to the current task using Description and Tags columns.

---

## Ventures
- **ReRev Labs** — AI education, consulting, curriculum, client delivery
- **Prismm** — white-label digital vault, B2B sales to financial institutions
- **Black Tech Capital** — climate tech nano VC fund
- **Internal / Shared** — tools that serve all ventures or personal use

## Tool Types Tracked
MCP Server · GAS Script · GAS Web App · Google Sheet System · Prompt / Skill · Curriculum · SOP / Doc · Railway Service · Audit / Report · Other

## Statuses
Active · In Progress · Archived · Needs Review

---

## Rules Claude Must Follow When REGISTRY Is Triggered

1. **Always query before building.** No exceptions. Even if Claude is confident nothing exists, check first.
2. **Summarize matches clearly.** Show Tool Name, Venture, Type, Status, and Description for anything relevant. Include the Link if it exists.
3. **Flag partial matches.** If something exists that partially solves the problem, surface it and ask if it can be extended rather than rebuilt.
4. **Suggest adding to the registry.** Any time a new tool is built in the session, remind Keyona to add it to the registry — or offer to do it via the Sheets MCP.
5. **Never duplicate.** If a tool already exists and is Active, do not build a new one without explicit confirmation.

---

## Web App (Visual Discovery Mode)
`https://script.google.com/macros/s/AKfycbyy3n4WUPbtbppw_0HdaNsba1SZeXPPQvkPwN498l_i2gkwQEEgOCA5SCpwmDBsf8Tv/exec`

---

## Usage Examples

**"REGISTRY — do we have anything that generates LinkedIn content?"**
→ Query sheet → find T005 LinkedIn Content Engine (Prismm / GAS Web App / Active) → surface it → ask if it can be repurposed.

**"REGISTRY before we start — I want to build a CRM for ReRev"**
→ Query sheet → find T014 Super Connector CRM (In Progress) → surface it → ask if we should continue that build instead.

**"Let's build a compliance tracker for BTC — REGISTRY check first"**
→ Query sheet → find T006 BTC Compliance Manager (Active) → surface it → ask what's missing from the current version.

---

## Storage Architecture Note
Skills and context docs live in GitHub (readable via GitHub MCP).
Structured tracking data lives in Google Sheets (readable via Sheets MCP).
Keyona pays for Google Workspace — no new tools needed for either.
