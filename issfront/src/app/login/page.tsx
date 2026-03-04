"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const LoginScene = dynamic(() => import("@/components/canvas/LoginScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#020617]" />,
});

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [isFocused, setIsFocused] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Portal intensity increases when user focuses on inputs
  const intensity = isFocused ? 2.5 : 1.2;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        router.push("/dashboard");
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // ✅ IMPORTANT: this controls the redirect_to in the confirmation email
            emailRedirectTo: "https://xowme.tn/auth/callback",
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        // If email confirmation is ON, Supabase may not return a session right away
        if (!data.session) {
          setMessage("Account created. Check your email to confirm your account.");
          return;
        }

        router.push("/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 3D Scene Background */}
      <LoginScene intensity={intensity} />

      {/* Cinematic Content Overlay */}
      <div className="relative z-10 w-full max-w-md p-6 animate-fade-in">
        {/* Glass Panel */}
        <div
          className="glass-panel rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:border-cyan-500/30"
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          {/* Subtle glow halo behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight text-glow">
              {isLogin ? "ACCESS PORTAL" : "INITIATE UPLINK"}
            </h1>
            <p className="text-cyan-200/60 text-sm uppercase tracking-widest font-mono">
              Secure Connection v4.0
            </p>
          </div>

          <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest ml-1">
                Identity
              </label>
              <input
                type="email"
                placeholder="OPERATOR ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest ml-1">
                Clearance
              </label>
              <input
                type="password"
                placeholder="PASSCODE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
            </div>

            {/* Error / Message */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-xs font-mono text-red-200/90 tracking-wide">
                  {error}
                </p>
              </div>
            )}

            {message && (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
                <p className="text-xs font-mono text-cyan-200/90 tracking-wide">
                  {message}
                </p>
              </div>
            )}

            {/* Action Button */}
            <button
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest mt-4 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Linking..." : isLogin ? "Establish Link" : "Register Operator"}
            </button>

            {/* Toggle */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setMessage(null);
                }}
                className="text-xs text-cyan-200/50 hover:text-cyan-400 transition-colors uppercase tracking-widest font-mono"
              >
                {isLogin ? "Request New Clearance?" : "Return to Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative footer */}
      <div className="absolute bottom-8 text-center w-full pointer-events-none">
        <p className="text-[10px] text-white/10 font-mono tracking-[0.5em] animate-pulse">
          SYSTEM SECURE • ENCRYPTION ACTIVE
        </p>
      </div>
    </main>
  );
}
