import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { PointerEvent } from 'react'

export default function PhotoCard3D() {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 140, damping: 20 })
  const sy = useSpring(py, { stiffness: 140, damping: 20 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const shine = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12), transparent 55%)`,
  )

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { px.set(0); py.set(0) }

  return (
    <div
      className="relative mx-auto w-full max-w-sm pb-4 pr-4"
      style={{ perspective: 1100 }}
      onPointerMove={reduce ? undefined : move}
      onPointerLeave={leave}
    >
      <motion.div
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-lg border border-accent/40"
          style={{ transform: 'translateZ(-30px) translate(16px, 16px)' }}
        />
        <div
          className="relative overflow-hidden rounded-lg border border-line shadow-[0_28px_60px_-28px_rgba(0,0,0,0.9)]"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img
            src="/id.jpg"
            alt="Portrait of Shivansh Aggarwal against a dark circuit-board background"
            width={720}
            height={720}
            className="aspect-square w-full object-cover"
          />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: shine }} />
        </div>
      </motion.div>
    </div>
  )
}
