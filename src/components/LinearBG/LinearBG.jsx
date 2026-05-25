import { useEffect, useRef } from "react";
import "./LinearBG.css";

/* ══════════════════════════════════════════════════════════
   LINEAR-STYLE ISOMETRIC PROJECT BOARD BACKGROUND
   For TeCloudex — dark, 3D tilted plane, slow diagonal pan
   ══════════════════════════════════════════════════════════ */

/* ─── DATA ───────────────────────────────────────────────── */
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT"];
const WEEKS  = [1, 5, 12, 19, 26];

const STATUS_LABELS = [
  { text: "On track",   color: "#3dd68c", icon: "◆", glow: "rgba(61,214,140,0.35)" },
  { text: "Off track",  color: "#f87171", icon: "◆", glow: "rgba(248,113,113,0.35)" },
  { text: "At risk",    color: "#facc15", icon: "◆", glow: "rgba(250,204,21,0.35)" },
  { text: "No updates", color: "#6b7280", icon: "○", glow: "rgba(107,114,128,0.2)" },
  { text: "On track",   color: "#3dd68c", icon: "◆", glow: "rgba(61,214,140,0.35)" },
  { text: "On track",   color: "#3dd68c", icon: "◆", glow: "rgba(61,214,140,0.35)" },
  { text: "At risk",    color: "#facc15", icon: "◆", glow: "rgba(250,204,21,0.35)" },
];

const PILL_CARDS = [
  { label: "Web",         dot: "#22d3ee",  dotGlow: "rgba(34,211,238,0.5)" },
  { label: "Design",      dot: "#22d3ee",  dotGlow: "rgba(34,211,238,0.5)" },
  { label: "Safari",      dot: "#f97316",  dotGlow: "rgba(249,115,22,0.5)" },
  { label: "Changelog",   dot: "#818cf8",  dotGlow: "rgba(129,140,248,0.5)" },
  { label: "Reliability", dot: "#f97316",  dotGlow: "rgba(249,115,22,0.5)" },
  { label: "Reliability", dot: "#f97316",  dotGlow: "rgba(249,115,22,0.5)" },
  { label: "Infra",       dot: "#3dd68c",  dotGlow: "rgba(61,214,140,0.5)" },
  { label: "Mobile",      dot: "#facc15",  dotGlow: "rgba(250,204,21,0.5)" },
  { label: "Desktop",     dot: "#3dd68c",  dotGlow: "rgba(61,214,140,0.5)" },
  { label: "iOS",         dot: "#a78bfa",  dotGlow: "rgba(167,139,250,0.5)" },
  { label: "Public Beta", dot: "#22d3ee",  dotGlow: "rgba(34,211,238,0.5)" },
  { label: "Internal",    dot: "#94a3b8",  dotGlow: "rgba(148,163,184,0.4)" },
  { label: "UI Refresh",  dot: "#3dd68c",  dotGlow: "rgba(61,214,140,0.5)", icon: "🔧" },
];

/* ─── CANVAS RENDERER ────────────────────────────────────── */
function IsometricCanvas() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    /* ── helpers ── */
    const lerp  = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    /* ── sizing ── */
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    /* ── isometric projection ──
       The "board" sits on a tilted plane. We use a CSS-like perspective
       projection directly in canvas to match the video's look:
       - rotateX ~55° (steep tilt toward viewer)
       - rotateZ ~-30° (slight left twist)
       - The board scrolls diagonally upper-right → lower-left
    ─────────────────────────────── */

    // Board is MUCH larger than screen so we can scroll
    const BOARD_W = 4000;
    const BOARD_H = 3000;
    const COL_W   = 80;   // week column width
    const ROW_H   = 56;   // lane height
    const LANES   = 28;

    // Projection: apply a perspective skew
    // We simulate the isometric look with ctx transforms
    // skewX / scaleY to create the tilted plane effect
    const tiltAngle = 0.52; // radians ≈ 30°

    function boardToScreen(bx, by, offset) {
      // Scroll: the board moves diagonally (bx increases, by increases over time)
      const scrollX = offset * 0.5;
      const scrollY = offset * 0.3;
      const x = bx - scrollX;
      const y = by - scrollY;

      // Isometric projection
      const sx = W * 0.5 + (x - y) * Math.cos(tiltAngle) * 0.85;
      const sy = H * 0.32 + (x + y) * Math.sin(tiltAngle) * 0.38 - y * 0.15;
      return { sx, sy };
    }

    // Depth fog: items further from centre get more transparent
    function depthAlpha(bx, by, offset) {
      const { sx, sy } = boardToScreen(bx, by, offset);
      const dx = (sx - W * 0.5) / (W * 0.5);
      const dy = (sy - H * 0.5) / (H * 0.5);
      const dist = Math.sqrt(dx * dx + dy * dy);
      return clamp(1 - dist * 0.65, 0.03, 0.92);
    }

    /* ── draw helpers ── */
    function drawLaneSurface(ctx, bx, by, w, h, offset, fillColor, strokeColor) {
      const corners = [
        boardToScreen(bx,     by,     offset),
        boardToScreen(bx + w, by,     offset),
        boardToScreen(bx + w, by + h, offset),
        boardToScreen(bx,     by + h, offset),
      ];
      const alpha = depthAlpha(bx + w/2, by + h/2, offset);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(corners[0].sx, corners[0].sy);
      for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].sx, corners[i].sy);
      ctx.closePath();
      ctx.fillStyle   = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth   = 0.5;
      ctx.stroke();
      ctx.restore();
    }

    function drawText(ctx, text, bx, by, offset, color, size, font) {
      const { sx, sy } = boardToScreen(bx, by, offset);
      const alpha = depthAlpha(bx, by, offset);
      if (alpha < 0.05) return;
      ctx.save();
      ctx.globalAlpha = alpha * 0.85;
      ctx.fillStyle   = color;
      ctx.font        = `${size}px ${font || "'Inter',sans-serif"}`;
      // Apply the isometric text skew so text lies flat on the plane
      ctx.transform(1, -0.12, Math.tan(tiltAngle) * 0.18, 0.78, 0, 0);
      // Compensate for the transform on position
      const tx = sx / 1 - sy * Math.tan(tiltAngle) * 0.18;
      const ty = sy / 0.78 + sx * 0.12;
      ctx.fillText(text, tx, ty);
      ctx.restore();
    }

    function drawPill(ctx, bx, by, label, dot, dotGlow, offset, iconText) {
      const { sx, sy } = boardToScreen(bx, by, offset);
      const alpha = depthAlpha(bx, by, offset);
      if (alpha < 0.06) return;

      const pillW = 130, pillH = 30, r = 15;
      ctx.save();
      ctx.globalAlpha = alpha;

      // Apply isometric skew transform around pill center
      ctx.translate(sx, sy);
      ctx.transform(1, -0.12, Math.tan(tiltAngle) * 0.18, 0.78, 0, 0);

      // Pill background
      ctx.beginPath();
      ctx.roundRect(-pillW/2, -pillH/2, pillW, pillH, r);
      ctx.fillStyle   = "rgba(26,26,32,0.88)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth   = 0.8;
      ctx.stroke();

      // Dot glow
      const grd = ctx.createRadialGradient(-pillW/2 + 20, 0, 0, -pillW/2 + 20, 0, 12);
      grd.addColorStop(0, dotGlow);
      grd.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(-pillW/2 + 20, 0, 12, 0, Math.PI*2);
      ctx.fillStyle = grd; ctx.fill();

      // Dot
      ctx.beginPath(); ctx.arc(-pillW/2 + 20, 0, 5, 0, Math.PI*2);
      ctx.fillStyle = dot; ctx.fill();

      // Label text
      ctx.fillStyle  = "rgba(230,230,240,0.9)";
      ctx.font       = "500 12px 'Inter',system-ui,sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(label, -pillW/2 + 33, 0);

      ctx.restore();
    }

    function drawStatusLabel(ctx, bx, by, text, color, icon, glow, offset) {
      const { sx, sy } = boardToScreen(bx, by, offset);
      const alpha = depthAlpha(bx, by, offset);
      if (alpha < 0.06) return;
      ctx.save();
      ctx.globalAlpha = alpha * 0.9;
      ctx.translate(sx, sy);
      ctx.transform(1, -0.12, Math.tan(tiltAngle) * 0.18, 0.78, 0, 0);

      // Icon glow
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
      grd.addColorStop(0, glow);
      grd.addColorStop(1, "transparent");
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI*2);
      ctx.fillStyle = grd; ctx.fill();

      // Icon
      ctx.fillStyle = color;
      ctx.font = "bold 10px 'Inter',system-ui,sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(icon, -2, 0);

      // Text
      ctx.fillStyle = color;
      ctx.font = "500 12px 'Inter',system-ui,sans-serif";
      ctx.fillText(text, 12, 0);

      ctx.restore();
    }

    /* ── Scene layout (board coordinates) ── */
    // Calendar grid columns: months × weeks
    const calStartX = 200;
    const calStartY = 200;
    const colCount  = 50; // total week columns

    // Lane definitions (baked positions)
    const laneData = Array.from({ length: LANES }, (_, i) => ({
      y: calStartY + i * ROW_H,
      color: i % 2 === 0
        ? "rgba(255,255,255,0.018)"
        : "rgba(255,255,255,0.008)",
    }));

    // Pill placements (bx, by, card)
    const pillPlacements = [
      { bx:  400, by: 420, card: 0 },
      { bx:  700, by: 560, card: 1 },
      { bx:  200, by: 640, card: 2 },
      { bx:  600, by: 700, card: 3 },
      { bx:  850, by: 840, card: 4 },
      { bx: 1000, by: 980, card: 5 },
      { bx:  550, by: 980, card: 6 },
      { bx:  750, by:1120, card: 7 },
      { bx:  350, by:1200, card: 8 },
      { bx:  900, by:1260, card: 9 },
      { bx:  600, by:1400, card:10 },
      { bx: 1150, by: 700, card:11 },
      { bx:  480, by:1260, card:12 },
      { bx:  280, by: 840, card: 0 },
      { bx: 1050, by: 560, card: 1 },
      { bx:  680, by: 280, card: 2 },
      { bx: 1300, by: 840, card: 6 },
      { bx: 1400, by: 420, card: 4 },
      { bx: 1200, by:1120, card: 7 },
      { bx: 1500, by: 700, card: 3 },
      { bx: 1600, by:1000, card: 8 },
      { bx: 1700, by: 560, card:11 },
      { bx: 1800, by: 840, card: 9 },
      { bx: 1900, by: 280, card:12 },
      { bx: 2000, by: 700, card: 5 },
      { bx: 2100, by:1120, card: 0 },
      { bx: 2200, by: 420, card: 4 },
    ];

    // Status label placements
    const statusPlacements = [
      { bx: 1200, by: 480, idx: 0 },
      { bx:  900, by: 320, idx: 1 },
      { bx: 1400, by: 640, idx: 2 },
      { bx: 1600, by: 320, idx: 3 },
      { bx: 1800, by: 480, idx: 4 },
      { bx:  700, by: 200, idx: 0 },
      { bx: 1000, by: 840, idx: 1 },
      { bx: 1100, by: 200, idx: 2 },
      { bx: 1700, by: 840, idx: 3 },
      { bx: 2000, by: 320, idx: 4 },
      { bx: 2300, by: 640, idx: 5 },
      { bx: 1500, by: 980, idx: 6 },
    ];

    // Calendar number placements
    const calPlacements = [];
    MONTHS.forEach((mon, mi) => {
      const monX = calStartX + mi * 380;
      WEEKS.forEach((wk, wi) => {
        const wkX = monX + wi * 72;
        calPlacements.push({ bx: wkX, by: calStartY - 80, text: String(wk), isWeek: true });
        if (wi === 0) {
          calPlacements.push({ bx: monX - 10, by: calStartY - 140, text: mon, isMonth: true });
        }
      });
    });

    /* ── Main render loop ── */
    let last = 0;
    const SPEED = 0.4; // px per frame

    function render(ts) {
      animRef.current = requestAnimationFrame(render);
      const dt = Math.min(ts - last, 50);
      last = ts;
      offsetRef.current += SPEED * (dt / 16.67);
      const off = offsetRef.current;

      ctx.clearRect(0, 0, W, H);

      // ── LANE SURFACES ──
      laneData.forEach((lane, i) => {
        drawLaneSurface(
          ctx,
          calStartX, lane.y,
          BOARD_W, ROW_H - 2,
          off,
          lane.color,
          "rgba(255,255,255,0.035)"
        );
      });

      // ── VERTICAL COLUMN DIVIDERS (week lines) ──
      for (let c = 0; c < colCount; c++) {
        const bx = calStartX + c * 72;
        const p0 = boardToScreen(bx, calStartY,              off);
        const p1 = boardToScreen(bx, calStartY + LANES * ROW_H, off);
        const alpha = depthAlpha(bx, calStartY + LANES * ROW_H / 2, off);
        if (alpha < 0.04) continue;
        ctx.save();
        ctx.globalAlpha = alpha * 0.25;
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.stroke();
        ctx.restore();
      }

      // ── CALENDAR NUMBERS ──
      calPlacements.forEach(cp => {
        const size  = cp.isMonth ? 13 : 11;
        const color = cp.isMonth
          ? "rgba(200,210,230,0.28)"
          : "rgba(180,190,210,0.18)";
        drawText(ctx, cp.text, cp.bx, cp.by, off, color, size);
      });

      // ── STATUS LABELS ──
      statusPlacements.forEach(sp => {
        const s = STATUS_LABELS[sp.idx % STATUS_LABELS.length];
        drawStatusLabel(ctx, sp.bx, sp.by, s.text, s.color, s.icon, s.glow, off);
      });

      // ── PILL CARDS ──
      pillPlacements.forEach(pp => {
        const card = PILL_CARDS[pp.card % PILL_CARDS.length];
        drawPill(ctx, pp.bx, pp.by, card.label, card.dot, card.dotGlow, off, card.icon);
      });

      // ── HORIZONTAL LANE HEADER BARS (the slightly raised bars in video) ──
      // These are slightly brighter lanes every ~4 rows
      for (let i = 0; i < LANES; i += 3) {
        const by = calStartY + i * ROW_H;
        drawLaneSurface(
          ctx,
          calStartX, by,
          BOARD_W, 2,
          off,
          "rgba(255,255,255,0.06)",
          "transparent"
        );
      }
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="lbg-canvas" />;
}

/* ─── VIGNETTE + OVERLAYS ─────────────────────────────────── */
function Overlays() {
  return (
    <>
      {/* Radial vignette — very dark at edges, clear in center */}
      <div className="lbg-vignette" />
      {/* Top gradient fade — merges into header area */}
      <div className="lbg-top-fade" />
      {/* Bottom gradient fade */}
      <div className="lbg-bottom-fade" />
      {/* Subtle center glow — tiny accent light */}
      <div className="lbg-center-glow" />
    </>
  );
}

/* ─── EXPORTED COMPONENT ──────────────────────────────────── */
export default function LinearBG({ children }) {
  return (
    <div className="lbg-root">
      <IsometricCanvas />
      <Overlays />
      {/* Children = your actual page content, sits above the bg */}
      <div className="lbg-content">{children}</div>
    </div>
  );
}
