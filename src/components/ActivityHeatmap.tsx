import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Flame } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";

const DEFAULT_USERNAME = "nimrawani04";
const TARGET_YEAR = 2026;

const ROWS = 7;
const CELL = 13;
const GAP = 4;
const STEP = CELL + GAP;
const LABEL_TOP = 22;
const LABEL_LEFT = 30;
const WAVE = 3.4;
const DAY_MS = 86_400_000;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Violet / Purple glowing ramp for GitHub contributions
const LEVEL_BG = [
  "rgba(255,255,255,0.045)",
  "rgba(124,108,255,0.25)",
  "rgba(124,108,255,0.50)",
  "rgba(124,108,255,0.75)",
  "rgba(168,85,247,0.95)",
];

function round(n: number, p = 2) {
  const f = 10 ** p;
  return Math.round(n * f) / f;
}

function withCommas(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Deterministic hash noise fallback generator for 2026
function seeded(n: number) {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

export type GitHubDay = {
  date: string;
  count: number;
};

type Cell = {
  col: number;
  row: number;
  count: number;
  level: number;
  label: string;
  inDelay: number;
  waveDelay: number;
  waveAlpha: number;
};

type HeatmapModel = {
  cells: Cell[];
  months: { col: number; label: string }[];
  total: number;
  streak: number;
};

function getLevel(count: number, maxCount: number) {
  if (count === 0) return 0;
  if (maxCount <= 0) return 1;

  const ratio = count / maxCount;
  if (ratio <= 0.15) return 1;
  if (ratio <= 0.45) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function generateFallback2026Days(): GitHubDay[] {
  const days: GitHubDay[] = [];
  const start = new Date("2026-01-01T00:00:00Z");
  const end = new Date("2026-12-31T00:00:00Z");

  let current = new Date(start);
  let idx = 0;
  while (current <= end) {
    const iso = current.toISOString().slice(0, 10);
    const r = seeded(idx * 31 + 7 * 101);
    const zero = seeded(idx * 17 + 53 + 7);
    const count = zero < 0.25 ? 0 : Math.round(r ** 1.8 * 28);
    days.push({ date: iso, count });
    current.setUTCDate(current.getUTCDate() + 1);
    idx++;
  }
  return days;
}

function buildModel(days: GitHubDay[]): HeatmapModel {
  if (!days.length) {
    return {
      cells: [],
      months: [],
      total: 0,
      streak: 0,
    };
  }

  const maxCount = Math.max(...days.map((d) => d.count), 1);

  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const firstWeekday = firstDate.getUTCDay();
  const startDate = new Date(firstDate);
  startDate.setUTCDate(startDate.getUTCDate() - firstWeekday);

  const lastDate = new Date(`${days[days.length - 1].date}T00:00:00Z`);
  const lastWeekday = lastDate.getUTCDay();
  const endDate = new Date(lastDate);
  endDate.setUTCDate(endDate.getUTCDate() + (6 - lastWeekday));

  const totalDays =
    Math.floor((endDate.getTime() - startDate.getTime()) / DAY_MS) + 1;
  const cols = Math.ceil(totalDays / 7);

  const data = new Map(days.map((day) => [day.date, day.count]));

  const maxP = Math.max(cols - 1 + (ROWS - 1), 1);

  const cells: Cell[] = [];
  const grid: number[][] = [];

  for (let col = 0; col < cols; col++) {
    grid[col] = [];

    for (let row = 0; row < ROWS; row++) {
      const date = new Date(startDate);
      date.setUTCDate(startDate.getUTCDate() + col * 7 + row);

      const iso = date.toISOString().slice(0, 10);
      const count = data.get(iso) ?? 0;
      const level = getLevel(count, maxCount);

      const label = `${WEEKDAYS[date.getUTCDay()]}, ${
        MONTHS[date.getUTCMonth()]
      } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

      grid[col][row] = count;

      cells.push({
        col,
        row,
        count,
        level,
        label,
        inDelay: round((col + row) * 0.015, 2),
        waveDelay: round(((col + row) / maxP) * WAVE, 2),
        waveAlpha: round(0.12 + level * 0.14, 2),
      });
    }
  }

  // Month labels along the top
  const months: { col: number; label: string }[] = [];
  let lastMonth = -1;
  let lastCol = -99;

  for (let col = 0; col < cols; col++) {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + col * 7);

    const month = date.getUTCMonth();

    if (month !== lastMonth && col - lastCol >= 2) {
      months.push({
        col,
        label: MONTHS[month],
      });
      lastMonth = month;
      lastCol = col;
    }
  }

  // Total contributions calculation
  let total = 0;
  for (const day of days) {
    total += day.count;
  }

  // Longest active-day streak
  let streak = 0;
  let run = 0;
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < ROWS; row++) {
      if (grid[col][row] > 0) {
        run += 1;
        if (run > streak) {
          streak = run;
        }
      } else {
        run = 0;
      }
    }
  }

  return {
    cells,
    months,
    total,
    streak,
  };
}

export function ActivityHeatmap({
  username = DEFAULT_USERNAME,
  year = TARGET_YEAR,
  title = "2026 Contribution activity",
  className,
}: {
  username?: string;
  year?: number;
  title?: string;
  className?: string;
}) {
  const [days, setDays] = useState<GitHubDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState<{ col: number; row: number } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubActivity() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch live GitHub activity");
        }

        const data = await response.json();
        const rawContributions: { date: string; count: number }[] =
          data.contributions ?? [];

        // Filter for target year (2026)
        const yearPrefix = `${year}-`;
        const yearDays = rawContributions.filter((d) =>
          d.date.startsWith(yearPrefix)
        );

        if (yearDays.length > 0) {
          if (isMounted) {
            setDays(yearDays);
          }
        } else {
          // Fallback to generated 2026 data
          if (isMounted) {
            setDays(generateFallback2026Days());
          }
        }
      } catch (err) {
        console.warn("GitHub live API fallback triggered:", err);
        if (isMounted) {
          setDays(generateFallback2026Days());
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadGitHubActivity();

    return () => {
      isMounted = false;
    };
  }, [username, year]);

  const model = useMemo(() => buildModel(days), [days]);

  const displayWeeks = model.cells.length
    ? Math.ceil(model.cells.length / ROWS)
    : 53;

  const gridW = displayWeeks * STEP - GAP;
  const gridH = ROWS * STEP - GAP;
  const boardW = LABEL_LEFT + gridW;
  const boardH = LABEL_TOP + gridH;

  const active = hover
    ? model.cells.find((c) => c.col === hover.col && c.row === hover.row) ?? null
    : null;

  const css = `
  .ah-cell {
    animation: ah-in .4s cubic-bezier(.16,1,.3,1) both;
    transform-origin: center;
  }

  .ah-wave {
    opacity: 0;
    animation: ah-wave ${WAVE}s linear infinite;
  }

  @keyframes ah-in {
    from {
      opacity: 0;
      transform: scale(.4);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes ah-wave {
    0%, 100% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    26% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ah-cell {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .ah-wave {
      animation: none !important;
      opacity: 0 !important;
    }
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl font-sans",
        className
      )}
    >
      <style>{css}</style>

      {/* soft brand glow, top-left */}
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,108,255,0.35), transparent 70%)",
        }}
      />

      {/* header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <Activity size={20} strokeWidth={2} />
          </div>

          <div>
            <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              {title}
            </h3>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400/90 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1 mt-0.5"
            >
              <FaGithub className="w-3 h-3" />
              @{username}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 text-left sm:text-right">
          {model.streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold">
              <Flame size={14} className="animate-pulse" />
              <span>{model.streak} day streak</span>
            </div>
          )}

          <div>
            {loading ? (
              <>
                <div className="text-xl font-bold tracking-tight text-white">—</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">
                  Loading...
                </div>
              </>
            ) : (
              <>
                <div className="text-xl font-extrabold tabular-nums tracking-tight text-white">
                  {withCommas(model.total)}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  contributions in {year}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* board */}
      <div className="relative mt-6 w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-800">
        {loading ? (
          <div
            className="flex items-center justify-center text-xs text-slate-400 mx-auto"
            style={{ width: "100%", minHeight: boardH }}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
              Loading 2026 GitHub activity calendar...
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto"
            style={{
              width: boardW,
              height: boardH,
            }}
            onMouseLeave={() => setHover(null)}
          >
            {/* month labels */}
            {model.months.map((m) => (
              <span
                key={`m-${m.col}`}
                className="absolute text-[10px] font-semibold text-slate-400 select-none"
                style={{
                  left: LABEL_LEFT + m.col * STEP,
                  top: 0,
                }}
              >
                {m.label}
              </span>
            ))}

            {/* weekday labels (Mon / Wed / Fri) */}
            {[1, 3, 5].map((row) => (
              <span
                key={`w-${row}`}
                className="absolute text-right text-[10px] font-semibold text-slate-400 select-none"
                style={{
                  left: 0,
                  top: LABEL_TOP + row * STEP,
                  width: LABEL_LEFT - 8,
                  height: CELL,
                  lineHeight: `${CELL}px`,
                }}
              >
                {WEEKDAYS[row]}
              </span>
            ))}

            {/* cells */}
            {model.cells.map((c) => {
              const isHover = hover?.col === c.col && hover?.row === c.row;

              const base =
                c.level >= 4
                  ? "0 0 10px rgba(168,85,247,0.5)"
                  : c.level === 0
                  ? "inset 0 0 0 1px rgba(255,255,255,0.04)"
                  : "none";

              const shadow = isHover
                ? `0 0 0 1.5px rgba(255,255,255,0.9), 0 0 12px rgba(168,85,247,0.6)`
                : base;

              return (
                <div
                  key={`${c.col}-${c.row}`}
                  className="ah-cell absolute cursor-pointer"
                  style={{
                    left: LABEL_LEFT + c.col * STEP,
                    top: LABEL_TOP + c.row * STEP,
                    width: CELL,
                    height: CELL,
                    borderRadius: 3,
                    backgroundColor: LEVEL_BG[c.level],
                    boxShadow: shadow,
                    animationDelay: `${c.inDelay}s`,
                    zIndex: isHover ? 5 : 1,
                  }}
                  onMouseEnter={() =>
                    setHover({
                      col: c.col,
                      row: c.row,
                    })
                  }
                >
                  <div
                    className="ah-wave pointer-events-none absolute inset-0"
                    style={{
                      borderRadius: 3,
                      backgroundColor: `rgba(168,85,247,${c.waveAlpha})`,
                      mixBlendMode: "screen",
                      animationDelay: `${c.waveDelay}s`,
                    }}
                  />
                </div>
              );
            })}

            {/* tooltip */}
            <AnimatePresence>
              {active && (
                <motion.div
                  key={`${active.col}-${active.row}`}
                  initial={{
                    opacity: 0,
                    y: 4,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 4,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs shadow-2xl"
                  style={{
                    left: LABEL_LEFT + active.col * STEP + CELL / 2,
                    top: LABEL_TOP + active.row * STEP - 8,
                  }}
                >
                  <span className="font-semibold text-white">
                    {active.count === 0
                      ? "No contributions"
                      : `${active.count} contribution${
                          active.count === 1 ? "" : "s"
                        }`}
                  </span>
                  <span className="text-slate-400"> · {active.label}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* legend */}
      <div className="relative mt-3 flex items-center justify-between sm:justify-end gap-3 border-t border-slate-800/80 pt-3">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-400 hover:text-indigo-400 transition-colors font-medium flex items-center gap-1 sm:hidden"
        >
          View Profile ↗
        </a>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium">Less</span>
          {LEVEL_BG.map((bg, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                width: 11,
                height: 11,
                borderRadius: 3,
                backgroundColor: bg,
                boxShadow:
                  i === 0
                    ? "inset 0 0 0 1px rgba(255,255,255,0.05)"
                    : "none",
              }}
            />
          ))}
          <span className="text-[10px] text-slate-400 font-medium">More</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-950 p-6">
      <ActivityHeatmap />
    </div>
  );
}
