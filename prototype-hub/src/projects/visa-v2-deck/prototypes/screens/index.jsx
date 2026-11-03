import { useState } from 'react';
import { Page, Tabs } from '@ds';
import { FRAMES } from '../../screens/Frames.jsx';

const IDS = Object.keys(FRAMES);
const BASE = import.meta.env.BASE_URL;

// Each frame runs in its own iframe: the chat panel traps focus and locks
// scroll, so frames must not share a document.
export default function Screens() {
  const [index, setIndex] = useState(0);
  const id = IDS[index];
  const frame = FRAMES[id];
  return (
    <div style={{ background: '#f1f1f1', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
        <Page title="Deck screens" subtitle="Android 360 × 800 in a phone frame, web in the 560 slider, rendered from real Poltail components" />
        <Tabs
          wrap
          tabs={IDS.map((key) => ({ id: key, label: key }))}
          activeIndex={index}
          onSelect={(_id, _item, i) => setIndex(i)}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24 }}>
          {Array.from({ length: frame.states ?? 1 }, (_, state) => (
            <iframe
              key={`${id}-${state}`}
              title={`${id} state ${state + 1}`}
              src={`${BASE}frames.html?id=${id}&state=${state}`}
              width={frame.width}
              height={frame.height}
              style={{ border: 'none', maxWidth: '100%' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
