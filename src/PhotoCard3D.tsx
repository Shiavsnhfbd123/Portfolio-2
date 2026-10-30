import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { profile } from "./data";
import { Icon } from "./Icon";

export default function PhotoCard3D() {
  const [open, setOpen] = useState(false);
  const popupId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);
  const controlsRef = useRef<HTMLSpanElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 20 });
  const sy = useSpring(py, { stiffness: 140, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const shine = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12), transparent 55%)`,
  );

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (e.pointerType !== "mouse") return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
  };

  const closePopup = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: Event) => {
      if (
        event.target instanceof Node &&
        !controlsRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        if (controlsRef.current?.contains(document.activeElement)) {
          triggerRef.current?.focus({ preventScroll: true });
        }
      }
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className="portrait-stage"
      style={{ perspective: 1100 }}
      onPointerMove={reduce ? undefined : move}
      onPointerLeave={leave}
    >
      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div
          className="portrait-frame"
          style={{ transform: "translateZ(20px)" }}
        >
          <img
            src={`${import.meta.env.BASE_URL}id.jpg`}
            alt="Portrait of Shivansh Aggarwal against a dark circuit-board background"
            width={720}
            height={720}
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
          <div className="portrait-overlay">
            <span>{profile.name.toUpperCase()}</span>
            <p>
              <span className="portrait-title">{profile.title}</span>
              <span
                ref={controlsRef}
                className="portrait-social-controls"
                onPointerLeave={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    !event.currentTarget.contains(document.activeElement)
                  ) {
                    setOpen(false);
                  }
                }}
                onFocus={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setOpen(true);
                }}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget) &&
                    !event.currentTarget.matches(":hover")
                  ) {
                    setOpen(false);
                  }
                }}
              >
                <button
                  ref={triggerRef}
                  type="button"
                  className="portrait-link"
                  aria-label="Open GitHub and LinkedIn profiles"
                  aria-expanded={open}
                  aria-controls={popupId}
                  title="Hover or click to choose GitHub or LinkedIn"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setOpen(true);
                  }}
                  onClick={() => setOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setOpen(true);
                      requestAnimationFrame(() =>
                        firstLinkRef.current?.focus({ preventScroll: true }),
                      );
                    }
                  }}
                >
                  <span aria-hidden="true">↗</span>
                </button>
                {open && (
                  <span
                    ref={popupRef}
                    id={popupId}
                    role="group"
                    aria-label="Social profiles"
                    className="portrait-social-popup"
                  >
                    <a
                      ref={firstLinkRef}
                      className="portrait-link"
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub (opens in a new tab)"
                      title="GitHub"
                      onClick={closePopup}
                    >
                      <Icon name="github" size={21} />
                    </a>
                    <a
                      className="portrait-link"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn (opens in a new tab)"
                      title="LinkedIn"
                      onClick={closePopup}
                    >
                      <Icon name="linkedin" size={21} />
                    </a>
                  </span>
                )}
              </span>
            </p>
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: shine }}
          />
        </div>
      </motion.div>
    </div>
  );
}
