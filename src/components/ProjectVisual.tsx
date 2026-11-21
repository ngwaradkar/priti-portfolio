import type { Project } from '../data/portfolio';

/**
 * Generative monochrome previews — one per project — drawn in SVG so they're crisp,
 * tiny, and follow the theme. They illustrate the kind of testing each project involved
 * rather than pretending to be screenshots.
 */
export default function ProjectVisual({ motif, cover = false }: { motif: Project['motif']; cover?: boolean }) {
  return (
    <svg viewBox="0 0 800 560" preserveAspectRatio={cover ? 'xMidYMid slice' : 'xMidYMid meet'} className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`grid-${motif}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="560" fill="var(--surface)" />
      <rect width="800" height="560" fill={`url(#grid-${motif})`} opacity="0.6" />
      {motif === 'matrix' && <Matrix />}
      {motif === 'report' && <Report />}
      {motif === 'defect' && <Defect />}
      {motif === 'api' && <Api />}
      {motif === 'db' && <Db />}
      <style>{`
        @keyframes pv-blink { 0%,100% { opacity: .15 } 50% { opacity: 1 } }
        @keyframes pv-dash { to { stroke-dashoffset: -40 } }
        @keyframes pv-pop { 0%, 20% { opacity: 0; transform: translateY(8px) } 30%, 85% { opacity: 1; transform: none } 100% { opacity: 0 } }
        @keyframes pv-grow { 0%, 100% { transform: scaleY(.55) } 50% { transform: scaleY(1) } }
        @media (prefers-reduced-motion: reduce) { svg * { animation: none !important } }
      `}</style>
    </svg>
  );
}

const mono = { fontFamily: 'var(--font-mono)' } as const;

function Caption({ top, bottom }: { top?: string; bottom: string }) {
  return (
    <>
      {top && (
        <text x="56" y="80" {...mono} fontSize="12" fill="var(--muted)" letterSpacing="2">
          {top}
        </text>
      )}
      <text x="56" y="508" {...mono} fontSize="12" fill="var(--muted)" letterSpacing="2">
        {bottom}
      </text>
    </>
  );
}

/** Platforms × test passes: every cell lights up as it passes. */
function Matrix() {
  const rows = ['WEB', 'MOBILE', 'API', 'AUTOMATION'];
  const cols = 6;
  return (
    <g>
      {rows.map((label, r) => (
        <g key={label}>
          <text x="72" y={152 + r * 80} {...mono} fontSize="12" letterSpacing="2" fill="var(--muted)">
            {label}
          </text>
          {Array.from({ length: cols }, (_, c) => {
            const x = 240 + c * 78;
            const y = 124 + r * 80;
            const solid = (r + c) % 4 === 0;
            return (
              <g key={c}>
                <rect x={x} y={y} width="62" height="44" rx="8" fill={solid ? 'var(--fg)' : 'var(--bg)'} stroke="var(--fg)" strokeOpacity={solid ? 1 : 0.25} />
                <path
                  d={`M ${x + 22} ${y + 23} l 7 7 l 13 -15`}
                  fill="none"
                  stroke={solid ? 'var(--bg)' : 'var(--fg)'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: `pv-blink 4s ${((r * cols + c) * 0.23) % 4}s ease-in-out infinite` }}
                />
              </g>
            );
          })}
        </g>
      ))}
      <Caption bottom="WEB · MOBILE · API · AUTOMATION" />
    </g>
  );
}

/** Abstract quality report: bars and rows, no figures. */
function Report() {
  const bars = [0.5, 0.78, 0.62, 0.92, 0.7, 0.85];
  return (
    <g>
      <rect x="96" y="104" width="608" height="352" rx="10" fill="var(--bg)" stroke="var(--line)" />
      <rect x="124" y="130" width="150" height="10" rx="5" fill="var(--fg)" />
      {bars.map((v, i) => (
        <rect
          key={i}
          x={132 + i * 52}
          y={350 - v * 150}
          width="30"
          height={v * 150}
          rx="3"
          fill="var(--fg)"
          opacity={0.85}
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom', animation: `pv-grow 3.4s ${i * 0.3}s ease-in-out infinite` }}
        />
      ))}
      <line x1="124" y1="352" x2="448" y2="352" stroke="var(--line)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="496" cy={176 + i * 52} r="6" fill={i === 1 ? 'var(--fg)' : 'none'} stroke="var(--fg)" strokeOpacity={i === 1 ? 1 : 0.4} />
          <rect x="516" y={171 + i * 52} width={150 - (i % 2) * 40} height="8" rx="4" fill="var(--line)" />
        </g>
      ))}
      <Caption bottom="QUALITY REPORT · DEFECT TRACKING" />
    </g>
  );
}

/** Defect lifecycle: a bug travels from found to closed. */
function Defect() {
  const steps = ['NEW', 'ASSIGNED', 'FIXED', 'RETEST', 'CLOSED'];
  const xs = [100, 250, 400, 550, 700];
  return (
    <g>
      {xs.slice(0, -1).map((x, i) => (
        <g key={i}>
          <path d={`M ${x + 56} 280 H ${xs[i + 1] - 56}`} stroke="var(--line)" strokeWidth="2" />
          <path d={`M ${x + 56} 280 H ${xs[i + 1] - 56}`} stroke="var(--fg)" strokeWidth="2" strokeDasharray="4 16" style={{ animation: `pv-dash 1.2s ${i * 0.2}s linear infinite` }} />
        </g>
      ))}
      {steps.map((label, i) => {
        const solid = i === steps.length - 1;
        return (
          <g key={label}>
            <rect x={xs[i] - 56} y="254" width="112" height="52" rx="26" fill={solid ? 'var(--fg)' : 'var(--bg)'} stroke="var(--fg)" strokeOpacity={solid ? 1 : 0.4} />
            <text x={xs[i]} y="285" textAnchor="middle" {...mono} fontSize="12" letterSpacing="1.5" fill={solid ? 'var(--bg)' : 'var(--fg)'}>
              {label}
            </text>
          </g>
        );
      })}
      <circle cx="100" cy="196" r="6" fill="var(--fg)" style={{ animation: 'pv-blink 2.4s ease-in-out infinite' }} />
      <Caption top="JIRA" bottom="DEFECT LIFECYCLE · LOGGED, RETESTED, CLOSED" />
    </g>
  );
}

/** Request → response. */
function Api() {
  return (
    <g>
      <rect x="64" y="150" width="270" height="250" rx="10" fill="var(--bg)" stroke="var(--line)" />
      <text x="88" y="190" {...mono} fontSize="13" letterSpacing="1.5" fill="var(--fg)">
        REQUEST
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="88" y={214 + i * 30} width={190 - (i % 3) * 36} height="8" rx="4" fill="var(--line)" />
      ))}
      <rect x="466" y="150" width="270" height="250" rx="10" fill="var(--fg)" />
      <text x="490" y="190" {...mono} fontSize="13" letterSpacing="1.5" fill="var(--bg)">
        RESPONSE
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="490" y={214 + i * 30} width={190 - ((i + 1) % 3) * 36} height="8" rx="4" fill="var(--bg)" opacity=".45" />
      ))}
      <path d="M 334 240 H 466" stroke="var(--line)" strokeWidth="2" />
      <path d="M 334 240 H 466" stroke="var(--fg)" strokeWidth="2" strokeDasharray="4 16" style={{ animation: 'pv-dash 1.2s linear infinite' }} />
      <path d="M 466 310 H 334" stroke="var(--line)" strokeWidth="2" />
      <path d="M 466 310 H 334" stroke="var(--fg)" strokeWidth="2" strokeDasharray="4 16" style={{ animation: 'pv-dash 1.2s 0.4s linear infinite reverse' }} />
      <g style={{ animation: 'pv-pop 6s ease-in-out infinite' }}>
        <rect x="350" y="338" width="100" height="36" rx="18" fill="var(--bg)" stroke="var(--fg)" />
        <text x="400" y="361" textAnchor="middle" {...mono} fontSize="12" letterSpacing="1.5" fill="var(--fg)">
          VALIDATED
        </text>
      </g>
      <Caption bottom="MANUAL · API · END-TO-END" />
    </g>
  );
}

/** Application data checked against the database. */
function Db() {
  return (
    <g>
      <rect x="64" y="130" width="250" height="290" rx="10" fill="var(--bg)" stroke="var(--line)" />
      <text x="88" y="168" {...mono} fontSize="12" letterSpacing="2" fill="var(--muted)">
        APPLICATION
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="88" y={192 + i * 42} width="202" height="26" rx="6" fill="none" stroke="var(--line)" />
      ))}
      <rect x="486" y="130" width="250" height="290" rx="10" fill="var(--bg)" stroke="var(--fg)" strokeOpacity=".5" />
      <text x="510" y="168" {...mono} fontSize="12" letterSpacing="2" fill="var(--muted)">
        DATABASE
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="510" y={192 + i * 42} width="202" height="26" rx="6" fill={i === 2 ? 'var(--fg)' : 'var(--bg)'} stroke="var(--fg)" strokeOpacity={i === 2 ? 1 : 0.25} style={i === 2 ? undefined : { animation: `pv-blink 4s ${i * 0.5}s ease-in-out infinite` }} />
          <rect x="522" y={202 + i * 42} width={i % 2 ? 90 : 130} height="6" rx="3" fill={i === 2 ? 'var(--bg)' : 'var(--line)'} />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M 290 ${205 + i * 42} H 510`} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 7" style={{ animation: `pv-dash 1.6s ${i * 0.15}s linear infinite` }} />
        </g>
      ))}
      <circle cx="400" cy="289" r="22" fill="var(--bg)" stroke="var(--fg)" />
      <path d="M 390 289 l 7 7 l 14 -15" fill="none" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <Caption bottom="SQL · DATA VALIDATION · REGRESSION" />
    </g>
  );
}
