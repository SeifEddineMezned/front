"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const DashboardScene = dynamic(() => import("@/components/canvas/DashboardScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#020617]" />,
});

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [userEmail, setUserEmail] = useState<string>("Loading...");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        // If not logged in, push to login
        router.push("/login");
        router.refresh();
        return;
      }

      setUserEmail(data.user.email ?? "Unknown");
    }

    loadUser();

    // Optional: keep UI updated if session changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (!session?.user) {
        router.push("/login");
        router.refresh();
        return;
      }

      setUserEmail(session.user.email ?? "Unknown");
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router, supabase]);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);

    router.push("/login");
    router.refresh();
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 3D World */}
      <DashboardScene />

      {/* HUD - Top Bar */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 pointer-events-none">
        <div className="glass-panel px-6 py-3 rounded-xl pointer-events-auto flex items-center gap-4 animate-fade-in">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <h1 className="text-white font-mono uppercase tracking-widest text-sm text-glow">
            Control Room /// Main Deck
          </h1>
        </div>

        <button
          className="glass-panel px-6 py-3 rounded-xl pointer-events-auto text-cyan-200/70 hover:text-white hover:bg-white/5 transition-all text-sm font-mono tracking-widest uppercase border border-white/5 hover:border-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? "Disconnecting..." : "Disconnect"}
        </button>
      </div>

      {/* HUD - Bottom Panels */}
      <div className="absolute bottom-8 left-0 w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none">
        {/* Panel 1 */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 animate-scan border-l-4 border-l-cyan-500 opacity-80">
          <h3 className="text-xs text-cyan-400 font-mono tracking-widest uppercase mb-1">
            System Status
          </h3>
          <div className="text-2xl text-white font-bold tracking-tight">OPTIMAL</div>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-cyan-500 w-[92%]" />
          </div>
        </div>

        {/* Panel 2 */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 opacity-80">
          <h3 className="text-xs text-purple-400 font-mono tracking-widest uppercase mb-1">
            Active Nodes
          </h3>
          <div className="text-2xl text-white font-bold tracking-tight flex items-baseline gap-2">
            4 <span className="text-sm text-white/40 font-normal">/ 4 ONLINE</span>
          </div>
          <p className="text-[10px] text-white/30 font-mono mt-1">Lat: 24ms • Loss: 0.0%</p>
        </div>

        {/* Panel 3 */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2 opacity-80 md:col-start-3">
          <h3 className="text-xs text-pink-400 font-mono tracking-widest uppercase mb-1">
            Recent Uplink
          </h3>
          <div className="text-sm text-white/80 font-mono">
            ID: <span className="text-white">{userEmail}</span>
          </div>
          <div className="text-[10px] text-white/40 font-mono">SESSION ACTIVE</div>
        </div>
      </div>

      {/* Central Graticule/Crosshair (pure aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] border border-white/5 rounded-3xl pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-white/20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-4 bg-white/20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-4 bg-white/20" />
      </div>
    </main>
  );
}
