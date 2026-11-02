---
name: "coldtrace-case-study-library"
description: "Lessons from 47 real product case studies (growth.design), with a guide to which ones apply to ColdTrace. Use when designing, critiquing or explaining a ColdTrace flow: onboarding, permissions, alerts, showing temperature or status data, trust, surveys or the AI chat. Loaded by coldtrace-design-backup for the case studies on a version's notes card. Adapted from Oluwatosin's product-case-study-library."
---

# Using this for ColdTrace

ColdTrace is cold-chain monitoring for health workers and Ministry staff, not a consumer subscription
app. Use cases on attention, trust and showing data. Treat growth tactics as a warning, not a model.

| ColdTrace work | Read |
|---|---|
| Alarms, escalated alerts, SMS copy | #28 Amber Alert, #10 Apple sleep reminder, #47 Johns Hopkins |
| Dashboards, status and KPI cards | #47 Johns Hopkins, #09 Been, #15 Spotify Wrapped |
| Readings saved, sync, long waits | #01 Labor perception bias, #04 Audible |
| Asking for location, camera, notifications | #49 Hopper, #29 LinkedIn, #33 Blinkist |
| Add Equipment and other wizards | #44 HEY (honest step counts), #08 Mine, #51 Trello |
| First use by a new facility or lab | #02 Too Good To Go, #14 Letterboxd, #43 Headspace |
| Daily recording habit, missed tasks | #53 Duolingo, #10 Apple sleep reminder |
| Maintenance and survey forms | #31 bank NPS survey, #26 Typeform |
| Copying a pattern or skipping research | #45 Product team pitfalls |

Rarely apply: paywalls, pricing, upgrades and checkout. Use them only for Spare Parts or similar
request flows, and only for the lesson.

When a health-worker task and a lesson disagree, the task wins. Friction that protects data
integrity is intended: an amendment reason is not a conversion problem.

# Product case study library

Lessons from the case studies at https://growth.design/case-studies, read on 6 October 2026. There are 53 in total. 47 could be read and are summarised below. For 6, only the title and summary loaded (listed at the end).

## How to use it

1. When designing or reviewing a flow, find the problem in the theme index, read the matching entries, and take the lesson, not the screens.
2. For more detail or a number, open the entry's link with WebFetch and read it before quoting.
3. Every entry keeps two things apart:
   - **Does:** what the company's product actually does. Cite this as how the company did it.
   - **Idea:** a change the case study suggests that the company had not shipped. Cite this as an idea, never as what the company did.
4. Quote a number only with the source given here or on the page. Grades and scores ("grade A", "score C") are the case study's own ratings, not data.

## How to cite a case

Name the company, say what they did, then give the link. Plain, so anyone can follow it. Example:

> LinkedIn asks to turn on notifications right after you send a message, so you hear when that person replies. https://growth.design/case-studies/linkedin-retention-triggers

No long dashes (em or en dashes) in anything written from this library.

## Patterns we never ship

- Shaming people for saying no ("End my personal growth", "I prefer to pay in full"): #22, #11, #53.
- Pre-selected paid options or subscriptions: #32, #17.
- Fake scarcity, panic countdowns, rigged prizes: #16, #52. Scarcity only on a real limit: #48.
- Hidden fees, fine print, surprise totals: #13, #36, #17, #05.
- Making it hard to leave (forced exit surveys, fake sadness, unclear confirmation, lock-in): #26, #36, #20.
- Fake personalisation ("picked for you" when it is not): #13.
- Fear-based upsells: #17.
- Ads disguised as content, hidden data collection: #40, #42, #20.

## Theme index

- **Onboarding and first value:** #02, #07, #08, #09, #14, #23, #33, #38, #39, #43, #44, #46, #49, #51, #52, #53
- **Sign-up and email confirmation:** #11, #13, #19, #21, #27, #44, #51
- **Permissions and notifications:** #02, #10, #28, #29, #33, #34, #43, #49, #52, #53
- **Free previews, trials and paywalls:** #03, #07, #08, #13, #34, #43, #46
- **Pricing, checkout, purchase and upgrade:** #04, #05, #13, #17, #21, #32, #37, #46, #48, #50
- **Retention, habits and re-engagement:** #10, #15, #29, #35, #39, #42, #53
- **Cancellation and offboarding:** #22, #26, #36
- **Surveys and feedback:** #07, #26, #31, #36
- **Trust, privacy and showing data or progress:** #01, #04, #09, #15, #20, #28, #33, #38, #47
- **Landing pages, ads and feeds:** #19, #30, #35, #40, #42
- **Team process:** #45

## The cases

**#01 Labor perception bias (HubSpot, Wise, The New York Times).** Does: Wise animates your money being processed and sent instead of dropping you on a log; HubSpot imports thousands of contacts in 0.01 seconds, so people doubt it worked. Idea: show the work when a key action finishes too fast to feel real. Principles: labor perception bias, visibility of system status. Avoid: fake waits that manipulate, like an election needle that jitters with no new data. https://growth.design/case-studies/labor-perception-bias

**#02 Too Good To Go.** Does: the intro lists features one by one; the value only lands later in the feed; notifications are asked for with a vague reason. Idea: explain why before how, show instead of tell, tie the notification ask to a benefit ("Don't miss your surprise bag"). Principles: aha moment, temptation bundling. https://growth.design/case-studies/too-good-to-go-onboarding

**#03 Strava.** Does: a free 30-day premium preview dressed like a paywall ("Upgrade", "25% Off", "Subscription"), so the gift reads as a sales pitch. Idea: a clear title and a call to action that matches the free offer; be clear rather than clever. Principles: contextual design, System 1 thinking. https://growth.design/case-studies/strava-premium-preview

**#04 Audible.** Does: buyers must work out credits against prices by hand, and bought credits appear only after a refresh, so buyers fear it failed. Idea: show balance and price up front; a reassuring confirmation that leads straight back to the book. Principles: cognitive load, post-purchase reassurance. https://growth.design/case-studies/audible-purchase-ux

**#05 McDonald's self-serve kiosks.** Does: goal shortcuts ("I want a burger"), bundles and big food photos; calories in fine print; no small size; the total hidden before last-minute add-ons. Idea: show the order's share of daily calories. Principles: jobs to be done, framing, sensory appeal. Avoid: hiding totals and health information to raise spend. Number: 15% revenue increase (the page cites a Fern video). https://growth.design/case-studies/mcdonalds-self-serve-ux

**#07 Grammarly.** Does: a short onboarding survey whose answers barely get used; setup asks the same questions again after payment; a generic landing page. Idea: say the plan suggestion comes from the answers, make the plan choice a step of onboarding, tailor the first screens to the answers. Principles: spark effect, personalisation clarity, reciprocity, Conway's law. Number: upgrade rate up 10%+ with a personalised paywall (Grammarly's own test). https://growth.design/case-studies/grammarly-onboarding-survey

**#08 Mine.** Does: an easy start builds momentum, then an abrupt email-access ask; the paywall lands before the first data reclaim is done, and the most motivating data shows only after paying. Idea: show the plan before the permission, let people finish one win for free, bring the motivating data forward. Principles: yes ladder, show the path forward, journey reorder. https://growth.design/case-studies/mine-trial-conversion

**#09 Been.** Does: a feature-list intro, a plain form for the first trip, then "0% of 195 countries". Idea: build meaning first, make the first action easy and colourful, celebrate each step instead of measuring against a far goal. Principles: priming, spark effect, goal-gradient effect, peak-end rule. https://growth.design/case-studies/been-onboarding

**#10 Apple sleep reminder.** Does: a standard banner that people learn to ignore. Idea: a harder-to-miss alert that explains why, one small swipe to start winding down, progress and a reward. Principles: banner blindness, spark effect, loss aversion, reactance. Avoid: so much friction that people switch it off. https://growth.design/case-studies/apple-sleep-notification

**#11 An online shop's email pop-up.** Does: a busy background, all caps, competing calls to action and a shaming opt-out ("I prefer to pay in full"). Idea: one clear focus on the email field, strong contrast, a product image, concrete benefits, no shaming. Principles: contrast, hierarchy, readability. https://growth.design/case-studies/design-blunders

**#13 Adobe free trial.** Does: three plans, an unrelated upsell and a card form with a large early-cancellation fee in fine print, all before any use; "monthly" and "yearly" are both annual contracts. Idea: let people try first (Rows drops new users straight into a file), explain plans plainly, ask for payment after value. Principles: cognitive load, value first. Avoid: hidden fees, fake personalisation, disguised annual contracts. Number: Rows reports sign-up conversion up 72% after a loginless experience (Rows blog). https://growth.design/case-studies/adobe-trial-ux

**#14 Letterboxd.** Does: a text-heavy carousel, asks with no reason given, a swipe deck with four overlapping actions and no end, an upgrade prompt right after onboarding. Idea: one simple choice per card with a clear stop and a visible result; build the home screen around two jobs. Principles: jobs to be done, Hick's law, stopping cues, feedback loops. https://growth.design/case-studies/letterboxd-jobs-to-be-done

**#15 Spotify Wrapped.** Does: a teaser a week ahead, each person's year told as a story, listening time framed as memories, built to share. Idea: a stronger teaser hook and one last reward at the end. Principles: curiosity gap, anticipation, storytelling, framing, bandwagon effect. https://growth.design/case-studies/spotify-wrapped-psychology

**#16 Temu.** Does: several countdown timers, a prize wheel everyone "wins", the prize split into coupons with spend thresholds and a 4-hour timer, warnings about losing coupons. Idea: reveal the prize before the sign-up wall. Avoid: all of these pressure tactics. https://growth.design/case-studies/temu-onboarding-psychology

**#17 GoDaddy.** Does: a £1 domain, then a pre-selected "Recommended" paid protection with fear copy, and a total that jumps because a 2-year term was applied. Idea: frame it as securing your own domain, show the steps, show every option above the fold. Principles: anchoring, default effect, reactance. Avoid: fear-based upsells, pre-selected paid options, surprise totals. https://growth.design/case-studies/godaddy-checkout-ux

**#19 A course provider's landing page.** Does: many repeated calls to action, a syllabus with no link, "accepting applications" with no way to apply, no type hierarchy. Idea: one main action, a low-effort question about the visitor, and clear hierarchy. Principles: proximity, squint test, spark effect. https://growth.design/case-studies/landing-page-ux-psychology

**#20 Meta Threads and Apple.** Does: Threads hides its data collection behind small grey links on a "How Threads works" screen and ties deleting it to Instagram; Apple's tracking opt-out does not stop fingerprinting. Idea: transparency at least as high as the intrusion; a privacy score at the top of app listings. Principles: transparency matched to intrusion, roach motel, privacy washing. https://growth.design/case-studies/apple-privacy-policy

**#21 Beehiiv.** Does: after subscribing, generic recommendations, then a premium offer with no reminder of whose offer it is. Idea: let the writer introduce the picks, label free against paid, cap at three, finish the writer's offer first. Principles: recognition over recall, singularity effect, Hick's law. https://growth.design/case-studies/beehiiv-newsletter-subscription-ux

**#22 Shortform.** Does: a clear billing page, then a cancel button labelled "End my personal growth" and the price shown per hour. Idea: use the same principles for the user: show time saved, help them confirm, allow a break. Principles: anchoring, reframing, pattern break. Avoid: user shaming. https://growth.design/case-studies/shortform-offboarding-quiz

**#23 Loom.** Does: videos play at 1.2x by default, reactions sit on the timeline, and the end of a video offers a pre-filled reply that leads into sign-up, replacing a generic "Get Loom" button. Idea: a simpler first view for people who are not users yet. Principles: status quo bias, reciprocity, self-initiated triggers, progressive disclosure. Number: 13% more comments from the end-of-video reply prompt (no source given). https://growth.design/case-studies/loom-psychology

**#26 Typeform.** Does: billing hidden under Preferences, a long list of lost features, a required exit survey with sad copy, ideas offered too late, a cold goodbye. Idea: show only the core loss, make the survey optional, offer ideas when usage drops, a warm goodbye based on the reason for leaving. Principles: loss aversion, peak-end rule, exit personalisation. Avoid: forced surveys, fake sadness. https://growth.design/case-studies/typeform-offboarding

**#27 Framer and sniper links.** Does: a passive "check your email" screen. Idea: a button that opens the person's inbox already searched for your sender (a "sniper link"). Number: 27% to 61% of new users never confirm their email (Litmus 2016, Mailchimp 2017). https://growth.design/case-studies/sniper-link

**#28 Amber Alert.** Does: long identical text alerts, vague place names, no images, nothing to tap. Idea: photos, a live map showing how near you are, quick actions to report, an update when the child is found. Principles: habituation, singularity effect, bystander effect, closure. https://growth.design/case-studies/amber-alert-ux

**#29 LinkedIn.** Does: right after you send a message, asks "Want to know when [name] answers?" instead of a generic permission prompt. Principles: micro-commitment, singularity effect, value over features. Number: 5 to 10% opt-in against 1 to 2% for random prompts (LinkedIn's product team). https://growth.design/case-studies/linkedin-retention-triggers

**#30 Balance.** Does: an ad styled as an Apple Notes screenshot that stopped scrolling but hid who it was from. Idea: keep the hook, make the name and the action clear, frame it as self-care. Principles: familiarity bias, Von Restorff effect, informative over creative. Avoid: cleverness that misleads, fake testimonials. https://growth.design/case-studies/balance-psychology

**#31 A bank's NPS survey.** Does: a cold email asking one question about two things (the staff member and the bank) on a 0 to 10 scale, tied to staff bonuses. Idea: a subject line about the customer's situation, a short human ask, say exactly what is being rated. Principles: double-barrelled question, Fitts's law, Goodhart's law. Number: NPS emails average 3% completion (Constant Contact 2022). https://growth.design/case-studies/nps-surveys

**#32 Amazon Subscribe & Save.** Does: the subscription is pre-selected and fills much of the screen; one-time purchase is a tiny radio button; a tiny per-unit price anchors the total. Idea: a "notify me" reminder people choose to set. Avoid: pre-selected subscriptions. https://growth.design/case-studies/amazon-purchase-ux

**#33 Blinkist onboarding.** Does: asks to track before earning trust, pushes a daily habit, recommendations ignore the answers, ends on recommendations instead of the saved book. Idea: earn trust first, start from the person's goal, take them to what they saved. Principles: respect before data, progressive disclosure, endowment effect. https://growth.design/case-studies/blinkist-user-onboarding

**#34 Blinkist trial paywall.** Does: tested a paywall that drops the feature list and only eases the fear of being charged after the trial, then offers a reminder before the trial ends. Numbers: trial sign-ups up 23%, notification opt-in from 6% to 74%, complaints down 55% (Jaycee Day, Blinkist, 2021). Principles: reactance, loss aversion. https://growth.design/case-studies/trial-paywall-challenge

**#35 YouTube.** Does: spots long scrolling and offers "something different", but shows similar videos with a hard-to-find way back. Idea: fewer options, a clear back button, a surprise pick, a decoy option. Principles: paradox of choice, decoy effect, discoverability. https://growth.design/case-studies/youtube-user-retention

**#36 Adobe cancellation.** Does: an unclear renewal email, a price that conflicts with it, a second login, a forced survey, a fear-of-missing-out screen, repeated offers that ignore the answers, and no clear confirmation. Idea: a clear renewal email, offers based on the survey, a final screen that confirms the cancellation. Avoid: friction to stop people leaving, hidden costs. https://growth.design/case-studies/adobe-cancel-subscription

**#37 Signal.** Does: a small donate prompt at the edge of the screen, no default amount, a flat thank-you. Idea: lead with why, pre-select the popular amount, add recurring giving, end with a warm thank-you. Principles: banner blindness, defaults, peak-end rule. https://growth.design/case-studies/signal-revenue

**#38 Brave.** Does: tailors its site to Chrome visitors, imports bookmarks instantly, shows trackers blocked and time saved on every new tab, but asks to be the default browser before any value. Idea: detect the chip type, use the download wait, ask to be default after value, show the import work. Principles: familiarity bias, labor illusion, reciprocity, progressive disclosure. Number: 20% of visitors do not finish the download steps (Brave 2021). https://growth.design/case-studies/brave-browser-onboarding

**#39 Clubhouse.** Does: invite-only exclusivity; asks new users to invite friends and follow 25 people before any value; no guidance in live rooms; noisy notifications; talks vanish when they end. Idea: highlights for latecomers, reassurance that listening is fine. Principles: status, scarcity, new behaviours need more onboarding. https://growth.design/case-studies/clubhouse-user-retention

**#40 Instagram.** Does: an ad every one or two posts, shopping inside posts, the navigation and Reels. Idea: none for Instagram; WeChat caps ads per day as a contrast. Avoid: ads disguised as content, targeting people when they are vulnerable. https://growth.design/case-studies/instagram-monetization

**#42 TikTok.** Does: full-screen looping videos, fast adaptation to what you watch, ads blended in, a weak "go to sleep" message. Idea: fewer starting categories, an incognito mode, a real wellbeing break. Principles: variable rewards, immersion, exit points. Avoid: slot-machine loops, hidden location use. https://growth.design/case-studies/tiktok-feed-psychology

**#43 Headspace.** Does: a goal picker, then a paywall and a notification ask before any meditation, and course suggestions that miss the goal. Idea: frame goals as outcomes, use loading time for value, ask for notifications after the first session, personalise the paywall to the goal. Principles: jobs to be done, reciprocity, labor illusion, Fogg behaviour model. https://growth.design/case-studies/headspace-user-onboarding

**#44 HEY.** Does: you pick your email address first and create a password after; but the counter says 3 steps when there are 4, and the first inbox floods you with features. Idea: an honest step count, try the Screener on a real email, one feature email a day. Principles: endowment effect, deferred account creation, contextual onboarding. https://growth.design/case-studies/hey-user-onboarding

**#45 Product team pitfalls.** Copying competitors, gut over research, testing late, executive whims, adding every suggestion, sharing only confirming evidence. Use when a team is about to copy a feature or skip research. https://growth.design/case-studies/product-team-pitfalls

**#46 Tinder.** Does: short profile steps, features unlocked as you swipe, three upsells in about 15 minutes each shown at the moment of need, a "Most Popular" tag and the highest price shown first. Idea: ask intent first, give photo guidance, add conversation starters. Principles: progressive disclosure, curiosity gap, descending price anchor, social proof. https://growth.design/case-studies/tinder-monetization

**#47 Johns Hopkins COVID-19 dashboard.** Does: circles over whole countries, running totals only, no recoveries, everything red. Idea: figures per population, active and recovered cases, a calmer colour, wording like "we know of". Principles: availability heuristic, negativity bias. Avoid: design that inflates fear. https://growth.design/case-studies/coronavirus-dashboard-ux

**#48 Uber Eats.** Does: a 5-minute countdown to join a nearby delivery and save on fees, utensils off by default, a "people also ordered" upsell. Idea: explain the timer as sharing a delivery, skip upsells when time is short. Principles: scarcity on a real limit, defaults, serial position effect. Avoid: scarcity without a real limit. https://growth.design/case-studies/uber-eats-scarcity

**#49 Hopper.** Does: asks for location too early and gets a no, but asks for notifications only when you tap to get price alerts and gets a yes. Idea: let the person trigger each request, give one clear recommendation. Principles: user-driven prompts, progressive disclosure, cognitive load. https://growth.design/case-studies/hopper-permission-requests-ux

**#50 Zapier.** Does: usage-based pricing, but a wordy limit email with many calls to action, usage hidden in a menu, a generic pricing page, a checkout full of exit links, confetti over the bill. Idea: a progress bar and one call to action, a pricing page that shows your usage and the plan that fits, no navigation at checkout, a confirmation that the problem is solved. Numbers: one call to action lifts email conversion 27% (CampaignMonitor 2019); removing navigation lifts conversion 28% (HubSpot 2014). https://growth.design/case-studies/zapier-upgrade

**#51 Trello.** Does: lets you use the product before confirming your email, asks your use case, turns what you type into cards live, offers one-click backgrounds, links straight to your inbox. Idea: consistent branding with the marketing site, fewer use-case options, a sniper link. Principles: deferred account creation, persona-based onboarding, endowment effect. Number: activation up 36% from personalisation experiments (Trello, via Appcues). https://growth.design/case-studies/trello-user-onboarding

**#52 An alarm app's onboarding mistakes.** Does: asks for notifications at once with vague copy, shows a fake limited-time discount within 10 seconds, then the same deal again as a "gift". Idea: ask after the aha moment, be specific, keep showing the outcome people came for. Avoid: faked scarcity. Number: 21% of users delete an app after first use (Localytics 2018). https://growth.design/case-studies/5-product-onboarding-mistakes-to-avoid

**#53 Duolingo.** Does: a lifecycle email timed to the user's travel, an easy one-tap lesson for returning users, a welcome-back gem reward followed by a bet on a 7-day streak, and stops sending notifications you ignore. Idea: focus the screen on the one-tap lesson, drop shaming copy, give a clear point to stop after the daily goal. Principles: happy path, investment after reward, streaks, exit points, respecting attention. Number: the gem bet raised Day-7 retention 14% (Duolingo blog). https://growth.design/case-studies/duolingo-user-retention

## Could not be read

Only the title and summary of these pages would load, so nothing above comes from them. Read them in a browser if the topic comes up.

- #06 Scarcity: the 3 pillars to using it ethically. https://growth.design/case-studies/scarcity
- #12 Social proof. https://growth.design/case-studies/social-proof
- #18 Framing effect. https://growth.design/case-studies/framing-effect
- #24 Mental models. https://growth.design/case-studies/mental-models
- #25 Zeigarnik effect. https://growth.design/case-studies/zeigarnik-effect
- #41 Psych framework. https://growth.design/case-studies/psych-framework