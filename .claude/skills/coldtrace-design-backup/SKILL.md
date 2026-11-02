---
name: "coldtrace-design-backup"
description: "Raphael's versioned design record for ColdTrace: after a prototype or design changes, offer to back it up in Figma with its version, idea, evidence, case studies and open questions, so PMs, Ednah and engineering can follow the reasoning without him in the room. Use when a prototype-hub flow is built or changed, when he asks for a new version, when he says \"back this up\", \"document this\", \"write up the reasoning\" or \"explain this to the PM\", or before a design review or handover. Adapted from Oluwatosin's figma-design-backup. Do NOT use for Vertage work or non-ColdTrace products."
---

# ColdTrace design backup

A prototype shows what was decided. This backup keeps **why**. Every version of a ColdTrace design
gets a record in Figma that a PM or engineer can read cold: the idea, the evidence, the rules it
works within, and what is still open.

This skill adds the **notes card and version trail**. It does not replace the build rules:
`DESIGN-LAYOUT-CONTRACT.md` still governs every frame.

## When it runs

- After a prototype-hub flow or Figma design is built or changed: **offer** the backup in one line.
- When Raphael asks for a new version: add it beside the old one, never over it.
- Before a design review or handover: check the latest version has a card.

**Never write to Figma unprompted.** The mirror rule and `prototype-review-then-publish` come first.
Say what diverged, ask, then build on his yes. If he says "go check it", read the frames first.

## Before building: gather the content

1. **Module and flow.** Name the module and flow, matching the hub slug, plus the Jira key (`PD-xx`).
2. **The idea.** Take it only from what Raphael said: this conversation, the meeting notes, or a
   frame he touched. If the reasoning was never discussed, ask him. **Never invent it.**
3. **Problem and evidence.** Use real sources: `docs/coldtrace-domain.md`, `docs/coldtrace-ux-findings.md`,
   `docs/add-equipment-flow-review.md`, a meeting, a PRD. Name the section. Quote live-platform
   behaviour only if the audit records it.
4. **Case studies.** Load `coldtrace-case-study-library` and pick only entries that shaped the design.
   No case study is fine. Padding is not.
5. **Rules it works within.** Load `figma-reference-registry` and `coldtrace-product-context`. List the
   settled decisions that apply, such as the 7-day and 3-day windows.
6. **Open questions.** Include product calls waiting on someone, and name who.
7. **Version history.** Read the flow's section and its prototype `CHANGELOG.md`.

## Where it goes

- **Same Figma file and page as the flow.** No separate backup file: one story, one place, and the
  parity tags keep working. If you cannot tell which file or page, ask.
- **One section per flow**, per contract §5. The version trail lives inside it.
- **New version = new frames beside the old**, named `<Screen>: v2 (PD-xx)`. The old frames stay as history.
- **Only touch sections you own.** Explicit allow-list, per the bulk-pass guardrail in §6b.

## The notes card (one per version)

Frame named `note · version · v<N>`, at the top of that version's frames.

House style: fill `#eaf4ff`, padding 12, spacing 10, title Inter Bold 14, body Regular 12/18.
Use warning `#FFF1E3` when an open decision blocks the version. The per-state notes keep their short
form from §6; this card does not replace them.

- **Version:** v1, v2, the date, and what changed since the last one.
- **Status:** Exploring, For review, Agreed or Superseded. Name who agreed it.
- **Problem:** what this solves, in one or two sentences.
- **The idea:** the reasoning, in Raphael's words where possible.
- **Evidence:** source and section.
- **Case studies used:** company, what they did, link. Mark a suggested idea the company never
  shipped as a suggestion. Quote numbers only with their source.
- **Rules respected:** the settled decisions this works within.
- **Open questions:** what needs an answer or a test, and who owns it.
- **Prototype:** hub URL and the state ids covered.
- **DS gaps:** anything composed because no component exists, with its ticket. PD-16 is the usual home.

## The design itself

Everything here already has an owner, so follow it rather than restating it:

| Need | Follow |
|---|---|
| Frame geometry, build order, refit | `DESIGN-LAYOUT-CONTRACT.md` §1 to §6b |
| Real components only | `ds-components-only`, `DESIGN-SYSTEM-INVENTORY.md` |
| Every state, annotated | `screen-states-and-interactions` |
| Desktop and mobile twins, state ids | `prototype-figma-parity` |
| Plugin calls | load `figma-use` before any `use_figma` |

Screenshots are never the design. Hub state switchers carry the click-through, so only add Figma
prototype links if he asks.

## House rules

- No em or en dashes in cards, notes, frame names or Jira comments. Use a colon or a full stop.
- Plain, short English. Explain why, not just what.
- Never put real facility names, contacts or personal data in a card.
- Amendment-window policy stays marked open until Ednah settles it.

## Done when

Read it back and report the numbers, never "looks complete":

```
Versions       v<N> added, older frames untouched
Notes card     present · sources named · no invented reasoning
Contract §7    the five numbers
Overlaps       0
```

Then comment on the Jira ticket, tell Raphael in one or two lines what was added with the Figma
link, and say plainly what is missing: undiscussed reasoning, an unsourced claim, an open question.
