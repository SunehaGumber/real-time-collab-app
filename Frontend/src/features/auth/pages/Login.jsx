import { useState } from "react";
import {
  Network,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Activity,
  Building2,
  Check,
} from "lucide-react";
import { GoogleIcon,Avatar } from "../../common/Icons";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        backgroundColor: "#E2E8F0",
        fontFamily: "Inter, sans-serif",
        backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* ── Main Card ── */}
      <main
        className="w-full flex overflow-hidden"
        style={{
          maxWidth: 1100,
          height: 700,
          borderRadius: 12,
          backgroundColor: "#f0f4f8",
          border: "1px solid #c4c5d7",
          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.04)",
        }}
      >
        {/* ── Left: Canvas Panel ── */}
        <section
          className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#ffffff", padding: 32 }}
        >
          {/* Dot grid bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Presence avatars */}
          <div className="absolute top-8 left-8 flex items-center">
            <Avatar initials="KL" borderColor="#10b981" />
            <Avatar initials="AR" borderColor="#f59e0b" offset />
            <Avatar initials="MT" borderColor="#8b5cf6" offset />
            <span
              className="ml-3 text-xs font-medium tracking-wide"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#505f76" }}
            >
              5+ active now
            </span>
          </div>

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-md space-y-4">
            <div className="flex justify-center mb-6">
              <Network size={48} color="#264dd9" strokeWidth={1.5} />
            </div>
            <h1
              className="text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif", color: "#171c1f", letterSpacing: "-0.02em" }}
            >
              CollabSync
            </h1>
            <p className="text-lg leading-7" style={{ color: "#505f76" }}>
              A unified space for high-intensity collaboration. Systemic trust through minimal design.
            </p>

            {/* Project Pulse Card */}
            <div
              className="mt-12 p-6 text-left"
              style={{
                backgroundColor: "#f6fafe",
                border: "1px solid #c4c5d7",
                borderRadius: 8,
                boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} color="#264dd9" strokeWidth={1.8} />
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#505f76" }}
                >
                  Project Pulse
                </span>
              </div>
              <div
                className="w-full h-2 overflow-hidden"
                style={{ backgroundColor: "#e4e9ed", borderRadius: 9999 }}
              >
                <div
                  className="h-full transition-all duration-700"
                  style={{ width: "65%", backgroundColor: "#264dd9", borderRadius: 9999 }}
                />
              </div>
              <div
                className="mt-3 flex justify-between text-xs"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#444655" }}
              >
                <span>Milestone: Alpha Release</span>
                <span>65% complete</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Right: Login Panel ── */}
        <section
          className="w-full md:w-[450px] flex flex-col"
          style={{ backgroundColor: "#f6fafe", padding: "32px 48px" }}
        >
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-2">
              <Network size={24} color="#264dd9" strokeWidth={1.5} />
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "Manrope, sans-serif", color: "#264dd9" }}
              >
                CollabSync
              </span>
            </div>
            <div className="hidden md:block" />
            <button
              className="text-sm font-semibold transition-colors"
              style={{ color: "#505f76", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => (e.target.style.color = "#264dd9")}
              onMouseLeave={(e) => (e.target.style.color = "#505f76")}
            >
              Help
            </button>
          </header>

          {/* Form body */}
          <div className="flex-1 flex flex-col justify-center">
            <h2
              className="font-semibold mb-2"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: 32, lineHeight: "40px", color: "#171c1f", letterSpacing: "-0.01em" }}
            >
              Welcome back
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: "#444655", lineHeight: "24px" }}>
              Enter your credentials to access your workspace.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm" style={{ color: "#444655" }}>
                  Email Address
                </label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: emailFocused ? "#264dd9" : "#747686" }}
                  >
                    <Mail size={18} strokeWidth={1.8} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full h-11 pl-10 pr-4 outline-none transition-all text-sm"
                    style={{
                      backgroundColor: "#ffffff",
                      border: emailFocused ? "1px solid #264dd9" : "1px solid #c4c5d7",
                      borderRadius: 8,
                      boxShadow: emailFocused ? "0 0 0 3px rgba(38,77,217,0.12)" : "none",
                      color: "#171c1f",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm" style={{ color: "#444655" }}>
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-semibold"
                    style={{ color: "#264dd9", textDecoration: "none", fontFamily: "Inter, sans-serif" }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: passwordFocused ? "#264dd9" : "#747686" }}
                  >
                    <Lock size={18} strokeWidth={1.8} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className="w-full h-11 pl-10 pr-10 outline-none transition-all text-sm"
                    style={{
                      backgroundColor: "#ffffff",
                      border: passwordFocused ? "1px solid #264dd9" : "1px solid #c4c5d7",
                      borderRadius: 8,
                      boxShadow: passwordFocused ? "0 0 0 3px rgba(38,77,217,0.12)" : "none",
                      color: "#171c1f",
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#747686" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#264dd9")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#747686")}
                  >
                    {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                  </button>
                </div>
              </div>


              {/* Login Button */}
              <button
                type="button"
                className="w-full h-12 font-semibold text-sm transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: "#264dd9",
                  color: "#ffffff",
                  borderRadius: 8,
                  fontFamily: "Inter, sans-serif",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0035bd")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#264dd9")}
              >
                Log In
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: "1px solid #c4c5d7" }} />
              </div>
              <div className="relative flex justify-center">
                <span
                  className="px-4 text-sm"
                  style={{ backgroundColor: "#f6fafe", color: "#747686", fontFamily: "Inter, sans-serif" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <GoogleIcon />, label: "Google" },
                { icon: <Building2 size={20} strokeWidth={1.8} />, label: "SSO" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="h-11 flex items-center justify-center gap-2 text-sm font-semibold transition-all"
                  style={{
                    border: "1px solid #c4c5d7",
                    borderRadius: 8,
                    backgroundColor: "#ffffff",
                    color: "#171c1f",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f4f8")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer
            className="mt-8 pt-4 text-center text-sm"
            style={{ borderTop: "1px solid #c4c5d7", color: "#444655" }}
          >
            New to CollabSync?{" "}
            <a
              href="#"
              className="font-bold"
              style={{ color: "#264dd9", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Create an account
            </a>
          </footer>
        </section>
      </main>

      {/* Global Footer */}
      <div className="w-full mt-6 px-8" style={{ maxWidth: 1100 }}>
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs opacity-60"
          style={{ color: "#38485d" }}
        >
          <span>© 2024 CollabSync. Systemic trust through minimal design.</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors"
                style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#264dd9")}
                onMouseLeave={(e) => (e.target.style.color = "inherit")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}