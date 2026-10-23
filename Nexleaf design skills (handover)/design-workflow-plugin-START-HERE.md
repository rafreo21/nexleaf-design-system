# START HERE — the checklist, and the prompts that run it

Installing the plugin gives you a generic workflow. It does **nothing useful** until you onboard.
This page is the whole onboarding: eleven boxes to tick, each with the prompt that does it.

Copy a prompt, paste it into a session started in your repo, answer what it asks.
Total time: about a day, most of it waiting on you to find file keys and nominate frames.

---

## Before you start — four things that must be true

Check these first. Three of the four are hard stops, and discovering them in week three is
expensive.

- [ ] **A Figma MCP connector is connected.** Without it nothing in Create or Verify runs.
- [ ] **Your component library is published from its own Figma file** — a different file from the
      one your product designs live in. If they are the same file, components cannot be versioned
      independently. Fix this before onboarding; the script will refuse otherwise.
- [ ] **The same components exist in code**, exported from one place. If they do not, this
      workflow's core rule has nothing to check against and you are installing a process, not an
      enforcement. Build the library first — that is the real project.
- [ ] **You have a tracker**, or you accept the `none` adapter and its limits.

> ```
> Check whether this repo is ready for the design workflow. Confirm a Figma connector is
> available, find our published component library file key and our product design file key
> and tell me whether they are the same file, locate where our components are exported from
> in code, and tell me which of the four prerequisites in START-HERE.md we do not meet.
> Do not change anything.
> ```

---

## Stage 1 · Configure

- [ ] **1. Fill in `ORG.md`** — about twenty values: your names, your Figma keys, your tracker,
      your URLs.

> ```
> Run onboard-design-workflow, stage 1 only. Read anything already in this repo first -
> CLAUDE.md, package.json, any existing design docs - and do not ask me for things you can
> read. Then interview me in four short rounds and write ORG.md at the repo root.
> Stop after ORG.md. Do not generate anything yet.
> ```

- [ ] **2. Apply it.** This is the step that makes the tokens real. Skipping it leaves every skill
      talking about `{{ORG_NAME}}`.

> ```
> Run: python3 scripts/apply-org.py --org ORG.md --skills skills
> Show me the dry run. If it is clean, run it again with --write and confirm it reports
> "no configurable token left in any skill". If it refuses, tell me exactly what is wrong
> with ORG.md and fix it with me - do not work around it.
> ```

- [ ] **3. Auto-load it.** Add `@ORG.md` to your repo's `CLAUDE.md` so every future session
      inherits the configuration.

> ```
> Add @ORG.md to CLAUDE.md so it auto-loads, then start a fresh session and confirm the
> workflow skill is reading our real values and not placeholders.
> ```

## Stage 2 · Wire the tracker

- [ ] **4. Create the two epics and the label groups.** Now, not on first use — a label that does
      not exist cannot be applied, and that failure surfaces weeks later as an unfiled ticket.

> ```
> Run onboard-design-workflow, stage 2. Load the adapter for our TRACKER_KIND, create the
> design-ops epic and the design-system epic, and create every label or custom field group
> the adapter requires. Then read each one back and tell me which of the seven operations
> you actually exercised and which are still untested.
> ```

## Stage 3 · Generate what cannot be copied

Order matters. Each depends on the one before.

- [ ] **5. Component inventory** — from your published library.

> ```
> Run onboard-design-workflow, stage 3a. Read our published component library and write
> DESIGN-SYSTEM-INVENTORY.md: every component with its key, its variant properties, and the
> code component it maps to. Then fill in design-system-context from it. Report components
> found in the library versus components mapped to code, and NAME the unmapped ones.
> ```

- [ ] **6. Nominate three reference frames** — a desktop screen you consider correct, a mobile
      screen, and one modal. You pick them; the workflow reads their geometry rather than asking
      you for numbers.

> ```
> I am nominating three reference frames: <desktop link>, <mobile link>, <modal link>.
> Run onboard-design-workflow, stage 3b. Read their real geometry and write
> DESIGN-LAYOUT-CONTRACT.md from it. Every value exact, never a range. Tell me which frame
> each number came from so I can check you read the right one.
> ```

- [ ] **7. Product context skeleton** — then start filling it from your own sources.

> ```
> Run onboard-design-workflow, stage 3c. Create our product-context skill from the skeleton.
> Then fill what you can from <our docs / this transcript / this walkthrough>, and CITE each
> fact. Leave anything you cannot trace blank and list it as an open question - do not guess
> an enum value.
> ```

## Stage 4 · Prove it

Configuration that has never been exercised is not working software.

- [ ] **8. Run one real flow end to end** — one ticket, one screen, one audit, one delivery.

> ```
> Run onboard-design-workflow, stage 4. Pick the smallest real screen we have and take it
> all the way: create the ticket through the adapter and read it back, compose the screen
> from our inventory in code and on canvas, run design-critique and figma-design-audit over
> it, and give me the local URL. Then report the five numbers and tell me plainly what you
> did NOT verify.
> ```

- [ ] **9. Confirm nothing is left generic.**

> ```
> Grep every skill for unresolved {{TOKENS}} and for the originating organisation's names.
> TRACKER_TICKET is prose and expected; anything else is a bug. Report counts, not prose.
> ```

## Stage 5 · Hand over

- [ ] **10. Learn the one loop that matters.** Every correction you give gets written into the
      contract or a skill **in the same turn as the fix**, with something that catches it next
      time. A rule nothing checks is a wish. This loop is the entire product; the rules are just
      what it has produced so far.

- [ ] **11. Accept that your standing-rules section is empty.** That is correct. Do not import
      another organisation's — they encode a different product, a different library, and a
      different person's judgement, and you will trust them without having earned them.

- [ ] **12. Run the acceptance checklist.** Installing is not the same as working.
      [`ACCEPTANCE-CHECKLIST.md`](ACCEPTANCE-CHECKLIST.md) proves each of the eleven boxes above
      actually functions here - the tracker round-trips, the binding rule refuses to hand-roll,
      the audit catches a planted defect, and a correction lands as a rule that survives a new
      session.

> ```
> Run the acceptance checklist in ACCEPTANCE-CHECKLIST.md, section A first. Show me the
> verify.py output verbatim, then walk me through B to F. Stop at anything that fails.
> ```

---

## Day-to-day, after onboarding

| You want to | Say |
|---|---|
| Start a new feature with scattered inputs | *"Run the workflow. Here is the meeting / doc / thread."* |
| Turn a settled PRD into work | *"Turn this PRD into tickets."* |
| Build a screen | *"Build `<screen>`"* — the binding rule and the inventory load themselves |
| Cover every state | *"Design the states for `<flow>`"* |
| Check a board against what was agreed | *"Audit `<link>` against what we agreed"* |
| Ship it | *"Give me the local URL"* — it will ask before publishing |

## When something is wrong

Say it plainly and in the moment. The expected response is a fix **and** a written rule in the same
turn. If you get the fix without the rule, ask for the rule — that is the half that compounds.
