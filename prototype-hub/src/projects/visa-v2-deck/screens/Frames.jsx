import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AiChatPanel, NexleafLogo, AiChatConversation, AiChatMessage, AiChatResponse, AiChatActivity, AiChatComposer,
  Badge, Banner, BottomSheet, Btn, Card, CardField, CardSectionTitle, Cell, MetricCard, Modal, OptionList, Page,
  PolarisIconImg, Skeleton, Tabs, Tag,
} from '@ds';
import {
  BG_INFO, BG_PAGE, BG_SUCCESS, BG_SURFACE, BG_WARNING, BORDER_DEFAULT, COLOR_PRIMARY,
  MAGIC_BG_TAG_REST, RADIUS_LG, RADIUS_SM, TEXT_DEFAULT, TEXT_ON_PRIMARY, TEXT_SUBDUED,
} from '@ds/tokens/index.js';
import { WA, WaBubble, WaListSheet, WaPhone, WaTypingBubble } from '@ds/components/AiChat/WhatsAppMock.jsx';

const noop = () => {};
const FONT = 'Inter, sans-serif';
const QUESTION = 'The fridge at Kireka is not cooling';
const STEPS = [
  { id: 'status', label: 'Checking live device status...' },
  { id: 'logs', label: 'Checking data logs...' },
];
const stepsAt = (active) => STEPS.slice(0, active + 1)
  .map((step, i) => ({ ...step, status: i === active ? 'active' : 'done' }));
const stepsDone = STEPS.map((step) => ({ ...step, status: 'done' }));

// ─── Mobile — always 360 × 800 dp exactly, with no bezel or padding around it.
// Web sliders use the panel's own default, 560 wide. Screens only ever lay out
// at those widths, so nothing is cropped.
export const PHONE = { width: 360, height: 800 };
const BEZEL = 10;
// The handset is the screen plus its bezel; a mobile frame leaves room for the shadow.
const HANDSET = { width: PHONE.width + BEZEL * 2, height: PHONE.height + BEZEL * 2 };
const MOBILE = { width: HANDSET.width + 24, height: HANDSET.height + 32 };
export const SLIDER = { width: 560, height: 900 };

// Every button on a phone is the touch size, `large`; the web slider keeps the default.
const ButtonSize = createContext('medium');
const ActionBtn = (props) => <Btn size={useContext(ButtonSize)} {...props} />;

// Painted over the screen, so its opening also rounds the screen's corners.
const Bezel = () => {
  const { width: w, height: h } = HANDSET;
  const round = (x, y, rw, rh, r) => `M${x + r} ${y}h${rw - r * 2}a${r} ${r} 0 0 1 ${r} ${r}v${rh - r * 2}a${r} ${r} 0 0 1 ${-r} ${r}h${-(rw - r * 2)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(rh - r * 2)}a${r} ${r} 0 0 1 ${r} ${-r}Z`;
  return (
    <svg width={w + 3} height={h} viewBox={`0 0 ${w + 3} ${h}`} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
      <defs>
        <linearGradient id="bezel-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a9a9e" /><stop offset="0.5" stopColor="#4a4a4e" /><stop offset="1" stopColor="#8a8a8e" />
        </linearGradient>
      </defs>
      <rect x={w - 1} y="168" width="3" height="96" rx="1.5" fill="#6a6a6e" />
      <rect x={w - 1} y="292" width="3" height="56" rx="1.5" fill="#6a6a6e" />
      <path d={round(0, 0, w, h, 34) + round(BEZEL, BEZEL, PHONE.width, PHONE.height, 26)} fill="url(#bezel-metal)" fillRule="evenodd" />
      <path d={round(2, 2, w - 4, h - 4, 32) + round(BEZEL, BEZEL, PHONE.width, PHONE.height, 26)} fill="#0b0b0d" fillRule="evenodd" />
    </svg>
  );
};

const Handset = ({ style, children }) => (
  <div style={{ ...HANDSET, position: 'relative', flexShrink: 0, borderRadius: 34, boxShadow: '0 6px 16px rgba(0,0,0,0.18)', ...style }}>
    <div style={{ position: 'absolute', left: BEZEL, top: BEZEL, ...PHONE, overflow: 'hidden' }}>{children}</div>
    <Bezel />
  </div>
);

// `overlay(screen)` renders a sheet into the screen, status bar included.
function Device({ children, bottom = BG_SURFACE, overlay, style }) {
  const [screen, setScreen] = useState(null);
  return (
    <Handset style={style}>
      <div ref={setScreen} style={{
        ...PHONE, overflow: 'hidden', position: 'relative', transform: 'translate(0)',
        background: BG_SURFACE, display: 'flex', flexDirection: 'column',
      }}>
        <ButtonSize.Provider value="large">
          <StatusBar />
          <Viewport>{children}</Viewport>
          <div style={{ background: bottom }}><GestureBar /></div>
          {screen && overlay?.(screen)}
        </ButtonSize.Provider>
      </div>
    </Handset>
  );
}

// The app's own viewport. The transform makes the panel's fixed positioning
// resolve here; the -1px hides the panel's left border against the screen edge.
const Viewport = ({ children }) => (
  <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '0 0 0 -1px', transform: 'translate(0)' }}>{children}</div>
  </div>
);

const GestureBar = ({ color = TEXT_DEFAULT }) => (
  <div style={{ height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ width: 108, height: 4, borderRadius: 2, background: color }} />
  </div>
);

// Android status bar: time left; signal, wifi and battery right.
function StatusBar({ color = TEXT_DEFAULT }) {
  return (
    <div style={{
      height: 24, flexShrink: 0, padding: '0 16px', boxSizing: 'border-box', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: FONT, fontSize: 13, fontWeight: 550, color,
    }}>
      9:41
      <span style={{ position: 'absolute', left: '50%', top: 7, width: 10, height: 10, marginLeft: -5, borderRadius: '50%', background: TEXT_DEFAULT }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <svg width={16} height={14} viewBox="0 0 16 14"><path d="M15 1v12H1z" fill={color} /></svg>
        <PolarisIconImg name="WifiIcon" size={16} color={color} />
        <svg width={10} height={16} viewBox="0 0 10 16"><path d="M3 0h4v2h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2z" fill={color} /></svg>
      </span>
    </div>
  );
}

// ─── Chat — the real Ask AI panel, with its context as a Tag ──────────────────
function Chat({ children, width = PHONE.width + 1, composer = true }) {
  return (
    <AiChatPanel open title="ColdTrace AI" beta={false} disclaimer={null} width={width} onClose={noop}>
      <div style={{ padding: '4px 16px 8px', flexShrink: 0 }}>
        <Tag label="Viewing: Haier HBC-260 · Kireka" />
      </div>
      <AiChatConversation autoScroll={false}>{children}</AiChatConversation>
      {composer && <AiChatComposer placeholder="Type your follow-up…" onSend={noop} />}
    </AiChatPanel>
  );
}

const Reading = () => <Banner tone="warning" inCard>Last reading 14.2°C · above the safe 2–8°C range</Banner>;

function Checking({ phase = 3, question = true, open = true, options = false }) {
  const running = phase < 2;
  return (
    <>
      {question && <AiChatMessage role="user">{QUESTION}</AiChatMessage>}
      <AiChatResponse>{"I'll help you diagnose and resolve this issue. First, let me check a few things..."}</AiChatResponse>
      <AiChatActivity defaultOpen={open} done={!running} elapsed={phase + 1} steps={running ? stepsAt(phase) : stepsDone} />
      {phase >= 2 && (options ? <AiChatResponse {...TRIAGE}><Reading /></AiChatResponse> : <Reading />)}
    </>
  );
}

const NEXT_STEPS = {
  followUpsLabel: 'What would you like to do next?',
  onFollowUpSelect: noop,
};

const TRIAGE = {
  ...NEXT_STEPS,
  followUps: [
    { id: 'guide', label: 'Guide me through troubleshooting' },
    { id: 'ticket', label: 'Create a support ticket' },
    { id: 'dispatch', label: 'Dispatch a technician' },
  ],
};

const Troubleshoot = () => (
  <AiChatResponse
    title="Step 1 of 3"
    sources={[{ id: 'manual', label: 'From: Haier HBC-260 manual, p.12' }]}
    onSourceSelect={noop}
    followUpsLabel="Did that work?"
    followUps={[{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }]}
    onFollowUpSelect={noop}
  >
    Check the power cable is firmly connected and the socket is switched on.
  </AiChatResponse>
);

function ServiceRequest({ loading = false, sent = false, children }) {
  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CardSectionTitle title="Service request" />
        <CardField label="Facility" value="Kireka Health Centre" />
        <CardField label="Fridge" value="Haier HBC-260" />
        <CardField label="Issue" value="Not cooling, 14.2°C" />
        <CardField label="Tried" value="Power checked, door seal checked" />
        <CardField label="Vaccines inside" value="Yes" />
        {!sent && (
          <div style={{ position: 'relative', display: 'flex', gap: 8 }}>
            <ActionBtn variant="primary" loading={loading} onClick={noop}>Confirm</ActionBtn>
            <ActionBtn variant="secondary" onClick={noop}>Edit</ActionBtn>
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}

const Raised = () => (
  <AiChatResponse
    {...NEXT_STEPS}
    followUps={[{ id: 'view', label: 'View request' }, { id: 'call', label: 'Call technician' }]}
  >
    <Banner tone="success" inCard>
      <span style={{ display: 'block', fontWeight: 650 }}>Service request raised · SR-0000</span>
      {"A technician will contact you. You'll get updates by SMS."}
    </Banner>
  </AiChatResponse>
);

const TapMark = () => (
  <span style={{
    position: 'absolute', left: 16, top: -4, width: 40, height: 40, borderRadius: '50%',
    background: TEXT_DEFAULT, opacity: 0.25,
  }} />
);

// Android lock screen: a heads-up notification with its action as a text button.
function LockScreen() {
  return (
    <Handset>
    <div style={{ ...PHONE, background: TEXT_DEFAULT, display: 'flex', flexDirection: 'column', fontFamily: FONT }}>
      <StatusBar color={TEXT_ON_PRIMARY} />
      <div style={{ textAlign: 'center', color: TEXT_ON_PRIMARY, fontSize: 72, fontWeight: 450, lineHeight: '80px', marginTop: 96 }}>9:41</div>
      <div style={{ margin: '48px 8px 0', padding: 16, background: BG_SURFACE, borderRadius: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ flexShrink: 0, display: 'inline-flex' }}><NexleafLogo size={32} /></span>
        <div style={{ flex: 1, minWidth: 0, color: TEXT_DEFAULT }}>
          <div style={{ fontSize: 12, lineHeight: '16px', color: TEXT_SUBDUED }}>ColdTrace · now</div>
          <div style={{ fontSize: 14, fontWeight: 650, lineHeight: '20px', marginTop: 2 }}>Heat alarm · Haier HBC-260</div>
          <div style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>Kireka Health Centre · 14.2°C</div>
        </div>
        <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: BG_PAGE, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <PolarisIconImg name="ChevronDownIcon" size={16} color={TEXT_SUBDUED} />
        </span>
      </div>
      <span style={{ flex: 1 }} />
      <GestureBar color={TEXT_ON_PRIMARY} />
    </div>
    </Handset>
  );
}

// ─── WhatsApp — the Storybook mock, unchanged ─────────────────────────────────
const WA_TIMELINE = [
  { from: 'user', text: QUESTION },
  { typing: true },
  { from: 'bot', text: 'Is this the Haier HBC-260 in the vaccine room?', buttons: ['Yes', 'Different fridge'] },
  { from: 'user', text: 'Yes' },
  { typing: true },
  { from: 'bot', text: 'Last reading 14.2°C, above the safe 2–8°C. What would you like to do?', buttons: ['Troubleshoot', 'Report fault', 'Call technician'] },
  { typing: true },
  { from: 'bot', link: true, text: 'Need the full record?', cta: 'Open in ColdTrace' },
];

// Four options is too many for reply buttons (3 at most), so this is a list
// message. Businesses can only send one after the user writes first.
const LANGUAGE_PROMPT = 'Choose your language';
const LANGUAGE_LIST = [
  { from: 'user', text: 'Hi' },
  { from: 'bot', text: LANGUAGE_PROMPT, list: 'Select language' },
];
const LANGUAGE_REPLY = [
  ...LANGUAGE_LIST,
  { from: 'user', text: 'Français', quote: { name: 'Nexleaf Chat Bot', text: LANGUAGE_PROMPT } },
  { typing: true },
];
const LANGUAGE_ROWS = [
  { title: 'Languages', rows: [
    { id: 'en', title: 'English' },
    { id: 'fr', title: 'Français' },
    { id: 'sw', title: 'Kiswahili' },
    { id: 'pt', title: 'Português' },
  ] },
];

function WaThread({ entries, linkRef, overlay }) {
  return (
    <WaPhone flat width={PHONE.width + 1} height="100%" scrollKey={entries.length} avatar={<NexleafLogo size={36} />} overlay={overlay}>
      {entries.map((entry, i) => {
        if (entry.typing) return i === entries.length - 1 ? <WaTypingBubble key={i} /> : null;
        return (
          <div key={i} ref={entry.link ? linkRef : undefined}>
            <WaBubble from={entry.from} time="9:41" buttons={entry.buttons} cta={entry.cta} list={entry.list} quote={entry.quote}>{entry.text}</WaBubble>
          </div>
        );
      })}
    </WaPhone>
  );
}

const WaDevice = ({ style, sheet, children }) => <Device style={style} bottom={sheet ? BG_SURFACE : WA.chatBg}>{children}</Device>;

const CHANNELS = { width: 664, height: 852 };

function Channels({ state }) {
  const [line, setLine] = useState(null);
  const root = useRef(null);
  const link = useRef(null);
  const slice = useRef(null);
  const last = state >= WA_TIMELINE.length - 1;
  useLayoutEffect(() => {
    if (!last || !link.current) return;
    const r = root.current.getBoundingClientRect();
    const a = link.current.firstChild.firstChild.getBoundingClientRect();
    const b = slice.current.getBoundingClientRect();
    setLine({ x1: a.right - r.left, y1: a.top + 40 - r.top, x2: b.left + b.width / 2 - r.left, y2: b.top - r.top });
  }, [last]);
  return (
    <div ref={root} style={{ position: 'relative', ...CHANNELS, background: BG_PAGE, fontFamily: FONT }}>
      <WaDevice style={{ position: 'absolute', left: 12, top: 12 }}>
        <WaThread entries={WA_TIMELINE.slice(0, state + 1)} linkRef={link} />
      </WaDevice>
      {last && (
        <>
          <div ref={slice} style={{ position: 'absolute', right: 8, bottom: 12, width: 252 }}>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                <Tag label="Haier HBC-260 · Kireka" />
                <Reading />
              </div>
            </Card>
          </div>
          {line && (
            <svg {...CHANNELS} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <path d={`M${line.x1} ${line.y1}H${line.x2}V${line.y2}`} fill="none" stroke={COLOR_PRIMARY} strokeWidth="1.5" strokeDasharray="5 5" />
            </svg>
          )}
          {line && (
            <span style={{ position: 'absolute', left: line.x2 - 70, top: line.y1 - 24, fontSize: 13, fontWeight: 550, color: COLOR_PRIMARY }}>Deep link, prefilled</span>
          )}
        </>
      )}
    </div>
  );
}

// ─── Workshop board and prototype canvas — not product UI, on Poltail tokens ──
const BOARD_COLUMNS = ['Equipment status', 'Troubleshooting', 'Maintenance', 'Training', 'Support tickets', 'Service requests', 'Technician help'];
const BOARD_ROWS = [
  { label: 'What might they ask?', tone: BG_WARNING, notes: ['Is my fridge okay?', 'Why is it warm?', 'When is service due?', 'How do I log a reading?', 'Is my ticket open?', 'Who is coming?', 'Which part fits?'] },
  { label: 'What are they deciding?', tone: MAGIC_BG_TAG_REST, notes: ['Move the vaccines or wait?', 'Fix it or call someone?', 'Do it now or later?', 'Who needs a refresher?', 'Report it or not?', 'How urgent is it?', 'Repair or replace?'] },
  { label: 'What can ColdTrace do?', tone: BG_SUCCESS, notes: ['Show live status', 'Walk through the manual', 'Show what is due', 'Link the right module', 'Open a ticket', 'Raise a request', 'Open the record'] },
  { label: 'When does a person take over?', tone: BG_INFO, notes: ['Reading stays out of range', 'Steps did not fix it', 'Part needs swapping', 'Local rules apply', 'Ticket stalls', 'Vaccines at risk', 'Repair on site'] },
];
// The Build first columns are wider, and a spacer track sets them apart from the rest.
const BOARD = { first: 104, column: 93, spacer: 4, gap: 6, band: 6 };

function Workshop() {
  const { first, column, spacer, gap, band } = BOARD;
  const columns = { display: 'grid', gridTemplateColumns: `${first}px ${first}px ${spacer}px repeat(5, ${column}px)`, gap };
  const withSpacer = (cells) => [...cells.slice(0, 2), <span key="spacer" />, ...cells.slice(2)];
  return (
    <div style={{ width: 760, height: 824, boxSizing: 'border-box', padding: '24px 18px', background: BG_SURFACE, fontFamily: FONT, color: TEXT_DEFAULT, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', marginBottom: 20 }}>Where could AI help?</div>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          position: 'absolute', top: 0, bottom: -8, left: -band, width: first * 2 + gap + band * 2,
          background: BG_PAGE, borderRadius: RADIUS_LG,
        }} />
        <div style={{ position: 'relative', height: 72, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 8, boxSizing: 'border-box' }}>
          <div style={{ width: first * 2 + gap, textAlign: 'center' }}><Badge tone="success" progress="complete">Build first</Badge></div>
          <div style={{ ...columns, alignItems: 'end' }}>
            {withSpacer(BOARD_COLUMNS.map((name) => (
              <span key={name} style={{ fontSize: 13, fontWeight: 650, lineHeight: '16px' }}>{name}</span>
            )))}
          </div>
        </div>
        {BOARD_ROWS.map((row) => (
          <div key={row.label} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 550, lineHeight: '20px', color: TEXT_SUBDUED }}>{row.label}</span>
            <div style={{ ...columns, flex: 1 }}>
              {withSpacer(row.notes.map((note) => (
                <div key={note} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                  background: row.tone, borderRadius: RADIUS_SM, padding: 8,
                  fontSize: 13, fontWeight: 450, lineHeight: '18px',
                }}>{note}</div>
              )))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MiniScreen = ({ label, bars, button = true }) => (
  <div style={{ width: 76, flexShrink: 0 }}>
    <div style={{ fontSize: 13, color: TEXT_SUBDUED, marginBottom: 8, whiteSpace: 'nowrap' }}>{label}</div>
    <div style={{ height: 240, boxSizing: 'border-box', padding: 8, background: BG_SURFACE, border: `1px solid ${BORDER_DEFAULT}`, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton width="60%" height={8} animated={false} ariaLabel={null} />
      <Skeleton width="100%" height={56} animated={false} ariaLabel={null} />
      {bars.map((w, i) => <Skeleton key={i} width={w} height={8} animated={false} ariaLabel={null} />)}
      <span style={{ flex: 1 }} />
      {button && <span style={{ height: 16, borderRadius: 8, background: COLOR_PRIMARY }} />}
    </div>
  </div>
);

const Arrow = () => (
  <svg width={22} height={12} viewBox="0 0 22 12" style={{ flexShrink: 0, marginTop: 142 }}>
    <path d="M1 6h17" stroke={COLOR_PRIMARY} strokeWidth="1.5" />
    <path d="M16 2l5 4-5 4z" fill={COLOR_PRIMARY} />
  </svg>
);

const Mvp = () => (
  <div style={{ width: 398, height: 380, boxSizing: 'border-box', padding: '20px 15px', background: BG_PAGE, fontFamily: FONT }}>
    <Badge tone="info">Flow 1</Badge>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginTop: 16 }}>
      <MiniScreen label="Welcome" bars={['90%', '70%']} />
      <Arrow />
      <MiniScreen label="Pick device" bars={['90%', '90%', '90%']} button={false} />
      <Arrow />
      <MiniScreen label="Troubleshoot" bars={['90%', '80%', '50%']} />
      <Arrow />
      <MiniScreen label="Request" bars={['90%', '70%', '80%', '60%']} />
    </div>
  </div>
);

const FeedbackReasons = () => (
  <OptionList
    flush
    selected="not-fixed"
    onChange={noop}
    options={[
      { id: 'wrong-model', label: 'Wrong fridge model' },
      { id: 'not-fixed', label: "Didn't fix it" },
      { id: 'hard', label: 'Hard to follow' },
      { id: 'other', label: 'Something else' },
    ]}
  />
);
const Rated = () => (
  <AiChatResponse {...TRIAGE} onCopy={noop} onLike={noop} onDislike={noop}>Last reading 14.2°C, above the safe 2–8°C range.</AiChatResponse>
);

function Feedback() {
  return (
    <Device overlay={(screen) => (
      <BottomSheet open portalTarget={screen} title="What went wrong?" showCloseButton bodyPadding="8px 16px 24px" onClose={noop}>
        <FeedbackReasons />
        <div style={{ marginTop: 16 }}><ActionBtn variant="primary" fullWidth onClick={noop}>Send feedback</ActionBtn></div>
      </BottomSheet>
    )}>
      <Chat><Rated /></Chat>
    </Device>
  );
}

const Row = ({ title, amount }) => <Cell title={title} description={amount} />;

function Fintech() {
  return (
    <div style={{ width: 800, height: 1030, background: BG_PAGE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <Device>
        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Page title="Virtual card" flushTop />
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: FONT, color: TEXT_DEFAULT, fontSize: 14 }}>
              <span style={{ fontWeight: 650 }}>Virtual card</span>
              <span style={{ fontSize: 20, fontWeight: 650 }}>•••• 4821</span>
              <span style={{ color: TEXT_SUBDUED }}>Expires 08/27</span>
            </div>
          </Card>
          <MetricCard title="Available" metric="₦750,000" />
          <div style={{ display: 'flex', gap: 8 }}>
            <ActionBtn variant="primary" onClick={noop}>Fund card</ActionBtn>
            <ActionBtn variant="secondary" onClick={noop}>Freeze</ActionBtn>
          </div>
        </div>
      </Device>
      <Device>
        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Page title="Wallet" flushTop />
          <MetricCard title="Balance" metric="₦750,000" badge={{ tone: 'info', label: 'Cards (2 of 5)' }} />
          <Row title="Online store" amount="-₦12,500" />
          <Row title="Streaming subscription" amount="-₦4,400" />
          <Row title="Online store" amount="-₦8,200" />
        </div>
      </Device>
    </div>
  );
}

const Failure = () => (
  <>
    <AiChatMessage role="user">What does E1 mean on this fridge?</AiChatMessage>
    <Banner tone="info" inCard actions={[{ label: 'Retry', onClick: noop }]}>{"I can't reach live readings right now. Here's general guidance for this model."}</Banner>
    <span><Tag label="General guidance, not a live reading" /></span>
    <AiChatResponse title="Error E1 · Sensor fault">
      <Tabs fitted activeIndex={0} onSelect={noop} tabs={[{ id: 'exact', label: 'Exact error' }, { id: 'family', label: 'Error family' }, { id: 'causes', label: 'Likely causes' }]} />
    </AiChatResponse>
  </>
);

// The web slider: the same conversation in the 560 panel.
const Web = ({ children, overlay }) => (
  <div style={{ ...SLIDER, transform: 'translate(0)', overflow: 'hidden', background: BG_SURFACE, position: 'relative' }}>
    <Chat width={SLIDER.width}>{children}</Chat>
    {overlay}
  </div>
);

const InChat = ({ children, composer }) => <Device><Chat composer={composer}>{children}</Chat></Device>;

export const FRAMES = {
  'P1-hero': { width: 800, height: 1063, render: () => (
    <div style={{ width: 800, height: 1063, background: BG_PAGE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <div data-float="f1"><Device><Chat><Checking /></Chat></Device></div>
      <div data-float="f2"><WaDevice><WaThread entries={WA_TIMELINE.slice(0, 6)} /></WaDevice></div>
    </div>
  ) },
  'P5-workshop': { width: 760, height: 824, render: () => <Workshop /> },
  'P6a-alert': { ...MOBILE, render: () => <LockScreen /> },
  'P6b-checking': { ...MOBILE, render: () => <InChat><Checking /></InChat> },
  'P6c-troubleshoot': { ...MOBILE, render: () => <InChat><Troubleshoot /></InChat> },
  'P6d-confirm': { ...MOBILE, render: () => <InChat><ServiceRequest /></InChat> },
  'P6e-raised': { ...MOBILE, render: () => <InChat><ServiceRequest sent /><Raised /></InChat> },
  'P7-confirm': { ...MOBILE, states: 4, render: (s) => (
    <InChat>
      <ServiceRequest loading={s === 2} sent={s === 3}>{s === 1 && <TapMark />}</ServiceRequest>
      {s === 3 && <Raised />}
    </InChat>
  ) },
  'P8-channels': { ...CHANNELS, states: 8, render: (s) => <Channels state={s} /> },
  'P9-failure': { ...MOBILE, render: () => <InChat><Failure /></InChat> },
  'P11-working': { ...MOBILE, states: 4, render: (s) => (
    <InChat><Checking phase={Math.min(s, 2)} options={s === 3} /></InChat>
  ) },
  'P12-mvp': { width: 398, height: 380, render: () => <Mvp /> },
  'P13-live': { ...SLIDER, render: () => <Web><Troubleshoot /></Web> },
  'W6b-checking': { ...SLIDER, render: () => <Web><Checking /></Web> },
  'W6c-troubleshoot': { ...SLIDER, render: () => <Web><Troubleshoot /></Web> },
  'W6d-confirm': { ...SLIDER, render: () => <Web><ServiceRequest /></Web> },
  'W6e-raised': { ...SLIDER, render: () => <Web><ServiceRequest sent /><Raised /></Web> },
  'W7-confirm': { ...SLIDER, states: 4, render: (s) => (
    <Web>
      <ServiceRequest loading={s === 2} sent={s === 3}>{s === 1 && <TapMark />}</ServiceRequest>
      {s === 3 && <Raised />}
    </Web>
  ) },
  'W9-failure': { ...SLIDER, render: () => <Web><Failure /></Web> },
  'W11-working': { ...SLIDER, states: 4, render: (s) => <Web><Checking phase={Math.min(s, 2)} options={s === 3} /></Web> },
  'W14-feedback': { ...SLIDER, render: () => (
    <Web overlay={(
      <Modal open title="What went wrong?" onClose={noop} maxWidth={440} footer={<Btn variant="primary" onClick={noop}>Send feedback</Btn>}>
        <FeedbackReasons />
      </Modal>
    )}><Rated /></Web>
  ) },
  'P14-v3': { ...MOBILE, render: () => <Feedback /> },
  'P16-fairmoney': { width: 800, height: 1030, render: () => <Fintech /> },
  'P19-language': { ...MOBILE, states: 4, render: (s) => (
    <WaDevice sheet={s === 1}>
      <WaThread
        entries={[
          LANGUAGE_LIST,
          LANGUAGE_LIST,
          LANGUAGE_REPLY,
          [...LANGUAGE_REPLY.slice(0, -1), { from: 'bot', text: 'Parfait ! Pour quel établissement ?', buttons: ['Kireka Health Centre', 'Autre'] }],
        ][s]}
        overlay={s === 1 && <WaListSheet title="Select language" sections={LANGUAGE_ROWS} />}
      />
    </WaDevice>
  ) },
};

export function Frame({ id, state = 0 }) {
  const frame = FRAMES[id];
  // The panel takes focus on open; a still frame must not show the focus ring.
  useEffect(() => {
    const timer = setTimeout(() => document.activeElement?.blur(), 300);
    return () => clearTimeout(timer);
  }, []);
  return frame ? <div id="frame" style={{ width: frame.width, height: frame.height, overflow: 'hidden', background: BG_PAGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{frame.render(state)}</div> : null;
}
