import { useState, useRef } from "react";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef(null);
  const holdStart = useRef(null);
  const [holdPct, setHoldPct] = useState(0);

  const increment = () => {
    setCount((c) => Math.min(c + 1, 9999));
    setPressed(true);
    setTimeout(() => setPressed(false), 120);
  };

  const startHold = () => {
    setHolding(true);
    holdStart.current = Date.now();
    holdTimer.current = setInterval(() => {
      const elapsed = Date.now() - holdStart.current;
      const pct = Math.min(100, (elapsed / 650) * 100);
      setHoldPct(pct);
      if (pct >= 100) {
        setCount(0);
        clearHold();
      }
    }, 16);
  };

  const clearHold = () => {
    clearInterval(holdTimer.current);
    setHolding(false);
    setHoldPct(0);
  };

  const digits = String(count).padStart(4, "0").split("");

  return (
    <div className="tc-stage">
      <div className="tc-floor-shadow" />

      <div className="tc-body">
        <span className="tc-screw tc-screw-tl" />
        <span className="tc-screw tc-screw-tr" />
        <span className="tc-screw tc-screw-bl" />
        <span className="tc-screw tc-screw-br" />

        <div className="tc-brand-row">
          <span className="tc-brand-mark" />
          <span className="tc-brand">Counter App</span>
        </div>

        <div className="tc-window-frame">
          <div className="tc-window">
            {digits.map((d, i) => (
              <div key={i} className="tc-digit-cell">
                <div key={d + i} className="tc-digit-inner">
                  {d}
                </div>
              </div>
            ))}
          </div>
          <div className="tc-window-glare" />
        </div>

        <div className="tc-controls-row">
          <button
            onClick={increment}
            className={`tc-main-btn${pressed ? " tc-pressed" : ""}`}
            aria-label="Increment count"
          >
            <span className="tc-main-btn-label">CLICK</span>
            <span className="tc-main-btn-sub">tap to count</span>
          </button>

          <button
            onMouseDown={startHold}
            onMouseUp={clearHold}
            onMouseLeave={clearHold}
            onTouchStart={startHold}
            onTouchEnd={clearHold}
            className="tc-reset-btn"
            aria-label="Hold to reset"
          >
            <span
              className="tc-reset-fill"
              style={{ width: `${holdPct}%` }}
            />
            <span className="tc-reset-label">{holding ? "…" : "reset"}</span>
          </button>
        </div>

        <div className="tc-hint">hold reset to zero it out</div>
      </div>
    </div>
  );
}
