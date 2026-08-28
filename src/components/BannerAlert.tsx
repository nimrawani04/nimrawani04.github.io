import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Info,
  CheckCircle2,
  TriangleAlert,
  XCircle,
  ArrowRight,
  X,
  Award,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BannerVariant = "info" | "success" | "warning" | "error";

interface VariantStyle {
  icon: LucideIcon;
  label: string;
  accent: string;
  glow: string;
}

const VARIANT_STYLE: Record<BannerVariant, VariantStyle> = {
  info: {
    icon: Info,
    label: "Credential",
    accent: "#8b7dff",
    glow: "rgba(124, 108, 255, 0.30)",
  },
  success: {
    icon: CheckCircle2,
    label: "Verified",
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.28)",
  },
  warning: {
    icon: Award,
    label: "Honor",
    accent: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.26)",
  },
  error: {
    icon: TriangleAlert,
    label: "Specialized",
    accent: "#fb7185",
    glow: "rgba(251, 113, 133, 0.28)",
  },
};

export interface BannerAlertProps {
  variant?: BannerVariant;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  /** When set, renders a bottom progress bar that fires onDismiss when it fills. */
  autoDismissMs?: number;
  className?: string;
  provider?: string;
}

export function BannerAlert({
  variant = "info",
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
  autoDismissMs,
  className,
  provider,
}: BannerAlertProps) {
  const style = VARIANT_STYLE[variant];
  const Icon = style.icon;

  // Guard so the progress bar completing and the X click can never both advance.
  const dismissedRef = useRef(false);
  const dismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    onDismiss?.();
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 text-left font-sans shadow-2xl",
        className
      )}
      style={{ boxShadow: "0 20px 60px -30px rgba(0,0,0,0.9)" }}
    >
      {/* variant glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60"
        style={{ background: style.glow }}
      />
      {/* top hairline highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
        }}
      />
      {/* left accent edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px]"
        style={{
          background: `linear-gradient(180deg, transparent, ${style.accent}, transparent)`,
        }}
      />

      <div className="relative flex items-start gap-3.5">
        <div
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-inner"
          style={{
            borderColor: `${style.accent}45`,
            background: `${style.accent}1f`,
          }}
        >
          <Icon
            className="h-[18px] w-[18px]"
            strokeWidth={2}
            style={{ color: style.accent }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight leading-snug">
              {title}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide border border-white/10"
              style={{
                color: style.accent,
                background: `${style.accent}1a`,
              }}
            >
              {provider || style.label}
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300 font-normal">
            {message}
          </p>
          {actionLabel ? (
            <button
              type="button"
              onClick={onAction}
              className="group/act mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:underline"
              style={{ color: style.accent }}
            >
              <span>{actionLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover/act:translate-x-1" />
            </button>
          ) : null}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {typeof autoDismissMs === "number" ? (
        <div className="relative mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            key={title}
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{ background: style.accent, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: autoDismissMs / 1000, ease: "linear" }}
            onAnimationComplete={dismiss}
          />
        </div>
      ) : null}
    </div>
  );
}

export interface CertificateItem {
  title: string;
  provider: string;
  year: string;
  desc: string;
  link?: string;
  tags?: string[];
  variant?: BannerVariant;
}

export function CertificateBannerSlider({
  certificates,
  cycleMs = 5000,
}: {
  certificates: CertificateItem[];
  cycleMs?: number;
}) {
  const [index, setIndex] = useState(0);

  if (!certificates.length) return null;

  const current = certificates[index];
  const advance = () => setIndex((i) => (i + 1) % certificates.length);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Verified Credentials
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 font-semibold">
          {String(index + 1).padStart(2, "0")} / {String(certificates.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative min-h-[140px] w-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <BannerAlert
              variant={current.variant || "success"}
              title={current.title}
              provider={`${current.provider} · ${current.year}`}
              message={current.desc}
              actionLabel={current.link ? "Verify Certificate" : undefined}
              onAction={current.link ? () => window.open(current.link, "_blank") : undefined}
              autoDismissMs={cycleMs}
              onDismiss={advance}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        {certificates.map((cert, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Show ${cert.title}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{
                width: active ? 24 : 7,
                background: active
                  ? VARIANT_STYLE[cert.variant || "success"].accent
                  : "rgba(255,255,255,0.16)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
