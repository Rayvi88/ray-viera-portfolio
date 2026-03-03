"use client";

import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

function ContactParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.5,
      opacity: Math.random() * 0.55 + 0.15,
      speedX: (Math.random() - 0.5) * 0.28,
      speedY: (Math.random() - 0.5) * 0.28,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,195,208," + (0.15 * (1 - dist / 85)) + ")";
            ctx.lineWidth = 0.7;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,195,208," + p.opacity + ")";
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

function SubjectOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-start gap-2 cursor-pointer" onClick={onChange}>
      <div
        className="mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          borderColor: checked ? "#00C3D0" : "#C8C4BC",
          backgroundColor: checked ? "#00C3D0" : "transparent",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className="text-sm leading-tight transition-colors duration-200"
        style={{ color: checked ? "#1a1a1a" : "#6B7280" }}
      >
        {label}
      </span>
    </label>
  );
}

function UnderlineInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#9CA3AF" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="bg-transparent outline-none text-sm pb-1.5"
        style={{
          color: "#1a1a1a",
          borderBottom: "1.5px solid " + (focused ? "#00C3D0" : "#E8E4DC"),
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

const MAX_CHARS = 250;

function MessageArea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const remaining = MAX_CHARS - value.length;
  const isNearLimit = remaining <= 40;
  const isAtLimit = remaining <= 0;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-xs" style={{ color: "#9CA3AF" }}>
          Message
        </label>
        <span
          className="text-xs transition-colors duration-200"
          style={{
            color: isAtLimit ? "#EF4444" : isNearLimit ? "#F59E0B" : "#C4BDB5",
          }}
        >
          {remaining}/{MAX_CHARS}
        </span>
      </div>
      <textarea
        placeholder="Write your message.."
        value={value}
        maxLength={MAX_CHARS}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="bg-transparent outline-none text-sm resize-none pb-1.5 w-full"
        style={{
          color: "#1a1a1a",
          borderBottom: "1.5px solid " + (focused ? "#00C3D0" : "#E8E4DC"),
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

export default function ContactMe() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");

  const subjects = [
    "Decision Critical UX Design",
    "Data Heavy Interface & Dashboard Design",
    "Process & Workflow Simplification",
    "UX Strategy & System Redesign",
  ];

  const handleSend = async () => {
    if (!firstName || !email || !message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, subject, message }),
      });
      if (res.ok) {
        setStatus("success");
        setFirstName(""); setLastName(""); setEmail("");
        setPhone(""); setMessage(""); setSubject("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel = status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error, try again" : "Send Message";
  const btnColor = status === "success" ? "#00C3D0" : status === "error" ? "#EF4444" : "#1a1a1a";

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-8" style={{ backgroundColor: "#FFFCF6" }}>
      <div
        className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col lg:grid lg:grid-cols-5"
        style={{ border: "1.5px solid #E8E4DC" }}
      >
        {/* LEFT */}
        <div className="lg:col-span-2 relative flex flex-col justify-between p-6 sm:p-8 overflow-hidden" style={{ minHeight: "220px" }}>
          <ContactParticles />
          <div className="relative z-10 flex flex-col justify-between h-full gap-6 lg:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 sm:mb-4" style={{ color: "#00C3D0" }}>
                Let&apos;s start
                <br />
                a conversation
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                UX/UI Expert specialized in visual clarity for complex systems.
                Open to strategic collaborations and high-impact design challenges.
              </p>
            </div>
            <div className="flex flex-row lg:flex-col gap-4">
              <a href="https://www.linkedin.com/in/ray-viera/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-fit group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity duration-200 group-hover:opacity-80" style={{ backgroundColor: "#00C3D0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#00C3D0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#374151" }}>raymvier@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between gap-6"
          style={{ backgroundColor: "#FFFCF6", borderTop: "1.5px solid #E8E4DC" }}
        >
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <UnderlineInput label="First Name" value={firstName} onChange={setFirstName} />
              <UnderlineInput label="Last Name" value={lastName} onChange={setLastName} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <UnderlineInput label="Email" type="email" value={email} onChange={setEmail} />
              <UnderlineInput label="Phone Number (optional)" placeholder="+0 000 0000 000" type="tel" value={phone} onChange={setPhone} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold" style={{ color: "#374151" }}>Select Subject?</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {subjects.map((s) => (
                  <SubjectOption key={s} label={s} checked={subject === s} onChange={() => setSubject(s)} />
                ))}
              </div>
            </div>
            <MessageArea value={message} onChange={setMessage} />
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSend}
              disabled={status === "loading"}
              className="w-full sm:w-auto px-8 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95 disabled:cursor-not-allowed"
              style={{ backgroundColor: btnColor, color: "#ffffff", minWidth: "170px" }}
            >
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}