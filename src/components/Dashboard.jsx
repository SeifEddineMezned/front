import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="relative w-screen h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <video
        src="/videos/comz.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest font-mono z-10 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
      >
        Return to Home
      </button>
    </main>
  );
}
