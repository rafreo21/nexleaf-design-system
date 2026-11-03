import { createRoot } from 'react-dom/client';
import '@ds/global.css';
import '../visa-v2-deck/inter.css';
import '../visa-v2-deck/roboto.css';
import { Frame } from './screens/Frames.jsx';

// One frame per URL, for export: /frames.html?id=P6b&state=0
const params = new URLSearchParams(window.location.search);
await Promise.all([
  ...[450, 550, 650].map((weight) => document.fonts.load(`${weight} 14px Inter`)),
  ...[400, 500, 600].map((weight) => document.fonts.load(`${weight} 14px Roboto`)),
]);
createRoot(document.getElementById('root')).render(
  <Frame id={params.get('id')} state={Number(params.get('state') ?? 0)} />,
);
