import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      <img
        src="/img/com.png"
        alt="Coming Soon"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay to hold buttons */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">

        {/* Download Button */}
        <a
          href="https://mega.nz/file/t6tklCyY#26g2T4z7W_5ss8PL3-2AEQvZOFyGvZUtNuTMkxCXZHA"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-[600px] pointer-events-auto flex items-center gap-3 px-8 py-4 mb-6 rounded-full bg-pink-200 text-pink-900 font-semibold tracking-wide uppercase shadow-md transition-all duration-300 hover:scale-105 hover:bg-pink-300 hover:shadow-lg active:scale-95"
        >
          <img
            src="/img/xi.webp"
            alt="Xowy Icon"
            className="w-10 h-10 object-cover rounded-full"
          />
          Download Xowy Now
        </a>
      </div>

      {/* QR Code Section */}
      <div className="absolute left-48 lg:left-80 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5 bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
        <img
          src="/img/qr.png"
          alt="QR Code"
          className="w-64 h-64 object-cover rounded-xl border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300"
        />
        <p className="text-white/90 font-mono tracking-widest uppercase text-base font-semibold text-center max-w-[200px]">
          Scan this to use Xow
        </p>
      </div>

      {/* Return Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest font-mono bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm z-20"
      >
        Return to Home
      </button>
    </main>
  );
}
