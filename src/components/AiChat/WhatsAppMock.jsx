import { useEffect, useRef } from 'react';

// ─── WhatsApp channel — how the Nexleaf bot renders on WhatsApp ───────────────
//
// Documentation mockup of the production WhatsApp surface (see the panel for
// the in-app surface). Chat anatomy follows WhatsApp for Android as shown on
// whatsapp.com/meta-ai. WaFlow* follows the WhatsApp Flows components, with
// values read from the live previews in Meta's Flows docs. Colors and Roboto
// are WhatsApp's own — channel branding, not design-system tokens.
export const WA = {
  chatBg: '#efeae2',
  headerBg: '#ffffff',
  userBubble: '#d9fdd3',
  botBubble: '#ffffff',
  notice: '#d5f4e4',
  text: '#0a1014',
  meta: '#5b6368',
  tick: '#53bdeb',
  verified: '#007bfc',
  accent: '#1daa61',
  accentText: '#1b8755',
  disabled: '#b3b9bd',
  disabledBg: '#f0f2f5',
  divider: 'rgba(10,16,20,0.1)',
};

const FONT = 'Roboto, sans-serif';
const BUBBLE_SHADOW = '0 1px 0.5px rgba(11,20,26,0.13)';

export function WaTicks() {
  return (
    <svg width={16} height={11} viewBox="0 0 16 11" fill="none" aria-label="Read">
      <path d="m1 5.5 3 3L9.5 3M6.5 8.5l1 1L13 4" stroke={WA.tick} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WaTail = ({ side, fill }) => (
  <svg width={8} height={13} viewBox="0 0 8 13" aria-hidden="true" style={{ position: 'absolute', top: 0, [side]: -7 }}>
    <path d={side === 'right' ? 'M0 0h6.5c1.3 0 2 1.5 1.2 2.5L0 12.5V0Z' : 'M8 0H1.5C.2 0-.5 1.5.3 2.5L8 12.5V0Z'} fill={fill} />
  </svg>
);

// Reply-button arrow and the open-in-new arrow on a URL button.
const ReplyGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6.5 3.5 2.5 7.5l4 4M3 7.5h6.5a4 4 0 0 1 4 4v1" stroke={WA.accentText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const OpenGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M9.5 2.5h4v4M13.5 2.5 7.5 8.5M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" stroke={WA.accentText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ListGlyph = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5.5 3.5h8M5.5 8h8M5.5 12.5h8M2.5 3.5h.1M2.5 8h.1M2.5 12.5h.1" stroke={WA.accentText} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BubbleAction = ({ glyph, label }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 44,
    borderTop: `1px solid ${WA.divider}`,
    fontSize: 15, fontWeight: 500, color: WA.accentText,
  }}>
    {glyph}{label}
  </div>
);

// The message a reply is answering, shown above the reply.
const WaQuote = ({ name, text }) => (
  <div style={{ display: 'flex', overflow: 'hidden', borderRadius: 6, background: 'rgba(10,16,20,0.06)', marginBottom: 4 }}>
    <span style={{ width: 4, flexShrink: 0, background: WA.accentText }} />
    <div style={{ padding: '4px 8px', fontSize: 13, lineHeight: '18px' }}>
      <div style={{ fontWeight: 500, color: WA.accentText }}>{name}</div>
      <div style={{ color: WA.meta }}>{text}</div>
    </div>
  </div>
);

// `buttons` = reply buttons (up to 3); `cta` = one URL or Flow button; `list` =
// the button that opens a list message. All sit inside the message, under a
// divider, as they do in WhatsApp. `quote` = { name, text } on a reply.
export function WaBubble({ from = 'bot', time, buttons, cta, list, quote, children }) {
  const isUser = from === 'user';
  const hasActions = Boolean(buttons?.length || cta || list);
  const fill = isUser ? WA.userBubble : WA.botBubble;
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        position: 'relative',
        maxWidth: '82%', minWidth: hasActions ? '82%' : undefined,
        background: fill,
        borderRadius: 8,
        borderTopLeftRadius: isUser ? 8 : 0,
        borderTopRightRadius: isUser ? 0 : 8,
        boxShadow: BUBBLE_SHADOW,
        fontFamily: FONT, fontSize: 15, lineHeight: '20px', color: WA.text,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
        <div style={{ padding: '6px 8px 6px 9px', overflow: 'hidden' }}>
          {quote && <WaQuote {...quote} />}
          {children}
          <span style={{
            float: 'right', display: 'inline-flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap',
            margin: '7px 0 -3px 10px',
            fontSize: 11, lineHeight: '15px', color: WA.meta,
          }}>
            {time}
            {isUser && <WaTicks />}
          </span>
        </div>
        {buttons?.map((label) => <BubbleAction key={label} glyph={<ReplyGlyph />} label={label} />)}
        {cta && <BubbleAction glyph={<OpenGlyph />} label={cta} />}
        {list && <BubbleAction glyph={<ListGlyph />} label={list} />}
        <WaTail side={isUser ? 'right' : 'left'} fill={fill} />
      </div>
    </div>
  );
}

export function WaTypingBubble() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{
        position: 'relative',
        background: WA.botBubble, borderRadius: 8, borderTopLeftRadius: 0,
        boxShadow: BUBBLE_SHADOW,
        padding: '12px 14px', display: 'inline-flex', gap: 4,
      }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#9aa5ab', opacity: i === 1 ? 0.9 : 0.5 }} />
        ))}
        <WaTail side="left" fill={WA.botBubble} />
      </div>
    </div>
  );
}

// The light doodle wallpaper behind a default chat.
const WaWallpaper = () => (
  <svg width="100%" height="100%" aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
    <defs>
      <pattern id="wa-doodle" width="96" height="96" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="#5b6368" strokeOpacity="0.1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="16" r="7" />
          <path d="M11 15h.1M17 15h.1M11 19c1.8 1.5 4.2 1.5 6 0" />
          <path d="M44 8l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.3 2.8 1-5.9-4.2-4.1 5.9-.8L44 8Z" />
          <path d="M76 12c3-4 9-1 7 3-1.5 3-5 5-7 7-2-2-5.5-4-7-7-2-4 4-7 7-3Z" />
          <path d="M8 56h16v11H8zM8 56l8 6 8-6" />
          <path d="M44 52v15M44 52c5 1 8 3 8 7M44 67a3 3 0 1 1-3-3" />
          <circle cx="76" cy="60" r="8" />
          <path d="M76 52v16M68 60h16" />
          <path d="M20 84l6 6M26 84l-6 6" />
          <path d="M58 86c3-3 6 3 9 0s6 3 9 0" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wa-doodle)" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width={14} height={14} viewBox="0 0 20 20" aria-label="Verified">
    <path d="M10 1.5 12.2 3.6l3-.4 1 2.9 2.7 1.4-1 2.9 1 2.9-2.7 1.4-1 2.9-3-.4L10 18.5 7.8 16.4l-3 .4-1-2.9L1.1 12.5l1-2.9-1-2.9 2.7-1.4 1-2.9 3 .4L10 1.5Z" fill={WA.verified} />
    <path d="m6.9 10.1 2.1 2.1 4.1-4.4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const DefaultAvatar = () => (
  <span style={{ width: 36, height: 36, borderRadius: '50%', background: '#dfe5e7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3.4" fill="#fff" />
      <path d="M3.5 17.5c1-3.4 3.6-5 6.5-5s5.5 1.6 6.5 5" fill="#fff" />
    </svg>
  </span>
);

const WaHeader = ({ name, avatar }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 10, height: 56, boxSizing: 'border-box',
    padding: '0 12px', background: WA.headerBg, flexShrink: 0, position: 'relative',
    fontFamily: FONT,
  }}>
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-label="Back">
      <path d="M20 12H5M11 6l-6 6 6 6" stroke={WA.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ flexShrink: 0, display: 'inline-flex' }}>{avatar ?? <DefaultAvatar />}</span>
    <span style={{ fontSize: 16, lineHeight: '22px', fontWeight: 500, color: WA.text, whiteSpace: 'nowrap' }}>{name}</span>
    <VerifiedBadge />
  </div>
);

const WaComposer = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 6px 8px', flexShrink: 0, position: 'relative', fontFamily: FONT }}>
    <span style={{
      flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, height: 44, boxSizing: 'border-box',
      background: '#fff', borderRadius: 22, padding: '0 12px', boxShadow: BUBBLE_SHADOW,
    }}>
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-label="Emoji">
        <circle cx="11" cy="11" r="8.6" stroke={WA.meta} strokeWidth="1.5" />
        <path d="M7.4 13c1.8 2.4 5.4 2.4 7.2 0" stroke={WA.meta} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="9" r="1.1" fill={WA.meta} /><circle cx="14" cy="9" r="1.1" fill={WA.meta} />
      </svg>
      <span style={{ flex: 1, fontSize: 16, color: WA.meta }}>Message</span>
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-label="Camera">
        <path d="M3 8.5a2 2 0 0 1 2-2h2l1.4-2h5.2l1.4 2h2a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z" stroke={WA.meta} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11" cy="12" r="3.2" stroke={WA.meta} strokeWidth="1.5" />
      </svg>
    </span>
    <span style={{ width: 44, height: 44, borderRadius: '50%', background: WA.accent, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-label="Voice message">
        <path d="M5 9.5v3M8.3 6.5v9M11.6 4v14M14.9 7.5v7M18 10v2" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" transform="translate(-.5)" />
      </svg>
    </span>
  </div>
);

// Reusable phone shell (header + scrolling conversation + composer). `overlay`
// sits on top of the chat, for a WaFlowSheet.
export function WaPhone({ children, scrollKey, width = 375, height = 720, flat = false, name = 'Nexleaf Chat Bot', avatar, overlay }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [scrollKey]);
  return (
    <div style={{
      width, maxWidth: '100%', height, position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: WA.chatBg,
      border: flat ? 'none' : '1px solid #ebebeb', borderRadius: flat ? 0 : 12, overflow: 'hidden',
      fontFamily: FONT,
    }}>
      <WaWallpaper />
      <WaHeader name={name} avatar={avatar} />
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', position: 'relative', padding: '10px 14px 6px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
      <WaComposer />
      {overlay}
    </div>
  );
}

// The sheet a list message opens. A row is sent as soon as it is tapped, so
// there is no confirm button.
export function WaListSheet({ title, sections }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,20,26,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ background: '#fff', borderRadius: '12px 12px 0 0', fontFamily: FONT }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 56, fontSize: 16, fontWeight: 500, color: WA.text }}>
          {title}
          <span style={{ position: 'absolute', right: 12, width: 28, height: 28, borderRadius: '50%', background: WA.disabledBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-label="Close"><path d="M3 3l8 8M11 3l-8 8" stroke={WA.meta} strokeWidth="1.8" strokeLinecap="round" /></svg>
          </span>
        </div>
        {sections.map((section) => (
          <div key={section.title} style={{ paddingLeft: 16 }}>
            <div style={{ padding: '8px 0 6px', fontSize: 14, fontWeight: 500, color: WA.meta }}>{section.title}</div>
            {section.rows.map((row) => (
              <div key={row.id} style={{ borderTop: `1px solid ${WA.divider}`, padding: '13px 16px 13px 0', fontSize: 16, lineHeight: '22px', color: WA.text }}>{row.title}</div>
            ))}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${WA.divider}`, marginLeft: 16 }} />
        <div style={{ padding: '14px 16px 12px', textAlign: 'center', fontSize: 13, color: WA.meta }}>Tap an item to select it</div>
      </div>
    </div>
  );
}

// ─── WhatsApp Flows ───────────────────────────────────────────────────────────

const FlowIcon = ({ d }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={d} stroke={WA.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function WaFlowRadio({ checked }) {
  return (
    <span style={{
      width: 20, height: 20, borderRadius: '50%', boxSizing: 'border-box', flexShrink: 0,
      border: `2px solid ${checked ? WA.accent : WA.meta}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {checked && <span style={{ width: 10, height: 10, borderRadius: '50%', background: WA.accent }} />}
    </span>
  );
}

// Flows RadioButtonsGroup.
export function WaFlowRadioGroup({ label, description, options, value }) {
  return (
    <div>
      <div style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: WA.text }}>{label}</div>
      {description && <div style={{ fontSize: 14, lineHeight: '20px', color: WA.meta }}>{description}</div>}
      <div style={{ marginTop: 8 }}>
        {options.map((option) => (
          <div key={option.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 48 }}>
            <span style={{ fontSize: 16, lineHeight: '24px', color: WA.text }}>{option.title}</span>
            <WaFlowRadio checked={option.id === value} />
          </div>
        ))}
      </div>
    </div>
  );
}

// A Flow screen: the sheet that opens over the chat, its Footer button and the
// line WhatsApp adds under it.
export function WaFlowSheet({ title, footer, disabled = false, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,20,26,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: 44, boxSizing: 'border-box' }}>
      <div style={{ flex: 1, minHeight: 0, background: '#fff', borderRadius: '10px 10px 0 0', display: 'flex', flexDirection: 'column', fontFamily: FONT }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 12px', borderBottom: `1px solid ${WA.divider}`, flexShrink: 0 }}>
          <FlowIcon d="M6 6l12 12M18 6 6 18" />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#1c1e21' }}>{title}</span>
          <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true">
            {[6, 12, 18].map((cy) => <circle key={cy} cx="12" cy={cy} r="1.7" fill={WA.text} />)}
          </svg>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16 }}>{children}</div>
        <div style={{ padding: '12px 16px 10px', flexShrink: 0 }}>
          <div style={{
            height: 40, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: disabled ? WA.disabledBg : WA.accent, color: disabled ? WA.disabled : '#fff',
            fontSize: 14, fontWeight: 600,
          }}>{footer}</div>
          <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, lineHeight: '16px', color: WA.meta }}>
            Managed by the business. <span style={{ color: WA.accentText }}>Learn more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
