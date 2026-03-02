"use client"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Section } from '@/components/ui/Section'
import { ArrowDown, Eye, Brain, Navigation, Camera, MessageSquare, Globe } from 'lucide-react'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

export default function Home() {
    return (
        <main className="w-full text-foreground font-sans selection:bg-primary/30">
            {/* Fixed Navigation Header */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 pointer-events-none">
                <div className="pointer-events-auto">
                    <span className="font-bold text-xl tracking-tighter text-white">Xow<span className="text-primary">ME</span></span>
                </div>
                <div className="flex gap-6 pointer-events-auto">
                    <Link href="/login" className="text-sm font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                        Login
                    </Link>
                    <Link href="/dashboard" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md">
                        Dashboard
                    </Link>
                </div>
            </nav>

            <Scene>
                {/* ========== CHAPTER 1: HERO ========== */}
                <Section align="center" id="hero">
                    <div className="relative z-10 animate-fade-in">
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <Eye className="w-24 h-24 text-primary animate-pulse" />
                                <div className="absolute inset-0 w-24 h-24 bg-primary/30 blur-2xl animate-pulse"></div>
                            </div>
                        </div>
                        <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter mb-8 text-glow leading-none animate-float">
                            Xow<span className="text-primary">ME</span>
                        </h1>
                        <p className="text-3xl md:text-5xl text-cyan-200/90 mb-6 tracking-[0.2em] font-light font-mono uppercase">
                            AI Vision Assistant
                        </p>
                        <p className="text-xl md:text-2xl text-slate-400 mb-20 max-w-3xl mx-auto leading-relaxed">
                            Your eyes see the world.<br />
                            <span className="text-primary font-bold">XowME understands it.</span>
                        </p>
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 animate-bounce">
                            <span className="text-sm font-mono uppercase tracking-[0.5em] mb-3 block text-cyan-400">
                                Scroll to Discover
                            </span>
                            <ArrowDown className="mx-auto w-8 h-8 text-primary drop-shadow-[0_0_20px_rgba(6,182,212,1)]" />
                        </div>
                    </div>
                </Section>

                {/* ========== CHAPTER 2: THE PROBLEM ========== */}
                <Section align="center" id="problem">
                    <div className="max-w-5xl">
                        <h2 className="text-6xl md:text-8xl font-bold mb-12 text-center">
                            <span className="text-slate-500">You're surrounded by</span>
                            <br />
                            <span className="text-white">technology you don't understand</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {[
                                { emoji: "🔧", problem: "Complex machines", desc: "No manual? No clue." },
                                { emoji: "❓", problem: "Unknown objects", desc: "What is that part?" },
                                { emoji: "📋", problem: "Multi-step tasks", desc: "Lost after step 2" },
                            ].map((item, i) => (
                                <div key={i} className="glass-panel p-10 rounded-2xl text-center border border-red-500/30 hover:border-red-500 transition-all">
                                    <div className="text-7xl mb-4">{item.emoji}</div>
                                    <h3 className="text-2xl font-bold mb-3 text-red-400">{item.problem}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="glass-panel p-12 rounded-3xl border-2 border-primary/50 box-glow">
                            <h3 className="text-4xl font-bold mb-6 text-primary">XowME solves this</h3>
                            <p className="text-2xl text-slate-300 leading-relaxed">
                                Point your camera. Ask questions. Get guided instructions.
                                <br />
                                <span className="text-white font-bold">All in real-time.</span>
                            </p>
                        </div>
                    </div>
                </Section>

                {/* ========== FEATURE 1: SEE ========== */}
                <Section align="left" id="feature-see">
                    <div className="max-w-7xl w-full">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Feature Description */}
                            <div>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full mb-6">
                                    <Camera className="w-6 h-6 text-primary" />
                                    <span className="text-primary font-mono uppercase tracking-widest text-sm">Feature 01</span>
                                </div>

                                <h2 className="text-7xl font-bold mb-6 text-white">
                                    Real-Time<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
                                        Vision
                                    </span>
                                </h2>

                                <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                                    XowME sees your world through advanced computer vision.
                                    Every object. Every surface. Every detail.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "YOLOv8 Detection", value: "30 FPS", desc: "Lightning-fast object recognition" },
                                        { title: "Confidence Scoring", value: "98%+", desc: "Highly accurate identification" },
                                        { title: "Multi-Object Tracking", value: "50+ objects", desc: "Simultaneous detection" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/30 transition-all">
                                            <div className="text-4xl font-bold text-primary">{item.value}</div>
                                            <div>
                                                <div className="text-lg font-bold text-white">{item.title}</div>
                                                <div className="text-sm text-slate-400">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Visual Representation */}
                            <div className="relative">
                                <div className="glass-panel p-8 rounded-3xl border-2 border-primary/30">
                                    <div className="text-center mb-6">
                                        <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                                            <span className="text-green-400 font-mono text-sm">● ACTIVE SCAN</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900 rounded-2xl p-6 mb-6 relative overflow-hidden">
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { name: "Monitor", conf: "98%" },
                                                { name: "Keyboard", conf: "95%" },
                                                { name: "Mouse", conf: "99%" },
                                                { name: "Cup", conf: "92%" },
                                            ].map((obj, i) => (
                                                <div key={i} className="border-2 border-primary/50 rounded-lg p-4 hover:bg-primary/10 transition-all cursor-pointer">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-primary font-mono text-sm">{obj.name}</span>
                                                        <span className="text-xs text-green-400">{obj.conf}</span>
                                                    </div>
                                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: obj.conf }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Scanning line effect */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
                                        </div>
                                    </div>

                                    <div className="text-center text-sm font-mono text-slate-500">
                                        DETECTED: 4 objects • LATENCY: 23ms • FPS: 30
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ========== FEATURE 2: UNDERSTAND ========== */}
                <Section align="right" id="feature-understand">
                    <div className="max-w-7xl w-full">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left: Visual Chat Interface */}
                            <div className="order-2 md:order-1 relative">
                                <div className="glass-panel p-8 rounded-3xl border-2 border-secondary/30">
                                    <div className="space-y-4">
                                        {/* User question */}
                                        <div className="flex justify-end">
                                            <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-6 py-4 max-w-md">
                                                <p className="text-white">What's the port on the left side?</p>
                                            </div>
                                        </div>

                                        {/* AI Response */}
                                        <div className="flex justify-start">
                                            <div className="bg-secondary/20 border border-secondary/30 rounded-2xl rounded-tl-sm px-6 py-4 max-w-md">
                                                <p className="text-white mb-2">That's an <strong className="text-purple-400">HDMI 2.1 port</strong></p>
                                                <p className="text-slate-300 text-sm">Used for high-definition video output. Supports 4K @ 120Hz.</p>
                                            </div>
                                        </div>

                                        {/* User question */}
                                        <div className="flex justify-end">
                                            <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-6 py-4 max-w-md">
                                                <p className="text-white">How do I disconnect it safely?</p>
                                            </div>
                                        </div>

                                        {/* AI Response with steps */}
                                        <div className="flex justify-start">
                                            <div className="bg-secondary/20 border border-secondary/30 rounded-2xl rounded-tl-sm px-6 py-4 max-w-md">
                                                <p className="text-white mb-3"><strong>Safe disconnection:</strong></p>
                                                <ol className="space-y-2 text-sm text-slate-300">
                                                    <li className="flex gap-2">
                                                        <span className="text-purple-400 font-bold">1.</span>
                                                        <span>Turn off both devices</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-purple-400 font-bold">2.</span>
                                                        <span>Press the release tab if present</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="text-purple-400 font-bold">3.</span>
                                                        <span>Pull straight out gently</span>
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-slate-900/50 rounded-full border border-slate-700">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                        <span className="text-slate-400 text-sm">Ask anything about what you see...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Feature Description */}
                            <div className="order-1 md:order-2 text-right">
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary/10 border border-secondary/30 rounded-full mb-6">
                                    <span className="text-secondary font-mono uppercase tracking-widest text-sm">Feature 02</span>
                                    <Brain className="w-6 h-6 text-secondary" />
                                </div>

                                <h2 className="text-7xl font-bold mb-6 text-white">
                                    Visual<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-secondary">
                                        Intelligence
                                    </span>
                                </h2>

                                <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                                    Don't just see—understand. Ask XowME anything about your environment.
                                    Natural language. Instant answers.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Context-Aware AI", desc: "Understands visual relationships" },
                                        { title: "Multi-Turn Dialogue", desc: "Remembers conversation history" },
                                        { title: "Expert Knowledge", desc: "Technical specs & instructions" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10 hover:border-secondary/30 transition-all justify-end text-right">
                                            <div>
                                                <div className="text-lg font-bold text-white">{item.title}</div>
                                                <div className="text-sm text-slate-400">{item.desc}</div>
                                            </div>
                                            <div className="text-3xl">🧠</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ========== FEATURE 3: DO ========== */}
                <Section align="center" id="feature-do">
                    <div className="max-w-6xl">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                                <Navigation className="w-6 h-6 text-cyan-400" />
                                <span className="text-cyan-400 font-mono uppercase tracking-widest text-sm">Feature 03</span>
                            </div>

                            <h2 className="text-7xl md:text-8xl font-bold mb-8">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500">
                                    Step-by-Step
                                </span>
                                <br />
                                <span className="text-white">Guidance</span>
                            </h2>

                            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                                XowME doesn't just tell you what to do—it <strong className="text-white">shows you exactly where and how</strong>.
                                Highlighted objects. Numbered steps. Real-time feedback.
                            </p>
                        </div>

                        {/* Step Progress Visualization */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-primary/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                            <div className="relative glass-panel p-12 rounded-3xl border-2 border-primary/30">
                                {/* Progress Header */}
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold text-white mb-4">Task: Replace Battery</h3>
                                    <div className="inline-block px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
                                        <span className="text-green-400 font-mono text-sm">IN PROGRESS</span>
                                    </div>
                                </div>

                                {/* Steps Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                                    {[
                                        { num: 1, title: "Remove cover", status: "done" },
                                        { num: 2, title: "Disconnect cable", status: "active" },
                                        { num: 3, title: "Lift battery", status: "pending" },
                                        { num: 4, title: "Insert new one", status: "pending" },
                                    ].map((step) => (
                                        <div key={step.num} className={`
                                        p-6 rounded-2xl border-2 transition-all text-center
                                        ${step.status === 'done' ? 'bg-green-500/10 border-green-500/50' : ''}
                                        ${step.status === 'active' ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(6,182,212,0.5)] scale-105' : ''}
                                        ${step.status === 'pending' ? 'bg-slate-800/50 border-slate-700' : ''}
                                    `}>
                                            <div className={`
                                            w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold
                                            ${step.status === 'done' ? 'bg-green-500 text-white' : ''}
                                            ${step.status === 'active' ? 'bg-primary text-black animate-pulse' : ''}
                                            ${step.status === 'pending' ? 'bg-slate-700 text-slate-500' : ''}
                                        `}>
                                                {step.status === 'done' ? '✓' : step.num}
                                            </div>
                                            <h4 className={`font-bold mb-2 ${step.status === 'pending' ? 'text-slate-500' : 'text-white'}`}>
                                                {step.title}
                                            </h4>
                                            <span className={`text-xs uppercase tracking-wider
                                            ${step.status === 'done' ? 'text-green-400' : ''}
                                            ${step.status === 'active' ? 'text-primary' : ''}
                                            ${step.status === 'pending' ? 'text-slate-600' : ''}
                                        `}>
                                                {step.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Current Instruction */}
                                <div className="bg-primary/10 border-2 border-primary/50 rounded-2xl p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="bg-primary text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-3">Disconnect the battery cable</h4>
                                            <p className="text-lg text-slate-300 mb-4">
                                                Locate the <strong className="text-primary">white connector</strong> on the left side.
                                                Gently pull straight up to disconnect.
                                            </p>
                                            <div className="flex gap-4">
                                                <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                                                    <span className="text-yellow-400 text-sm">⚠️ Avoid applying force</span>
                                                </div>
                                                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                                                    <span className="text-blue-400 text-sm">💡 Use plastic tool if stuck</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-12">
                                    <div className="flex justify-between text-sm text-slate-400 mb-3">
                                        <span>Overall Progress</span>
                                        <span>25% Complete</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-500" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ========== ARCHITECTURE ========== */}
                <Section align="center" id="architecture">
                    <div className="max-w-6xl">
                        <h2 className="text-6xl md:text-7xl font-bold mb-6 text-center">
                            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Performance</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-16 text-center max-w-3xl mx-auto">
                            Enterprise-grade architecture. Consumer-grade simplicity.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Camera className="w-12 h-12" />,
                                    title: "Mobile Edge",
                                    desc: "On-device ML processing for instant response",
                                    tech: ["CoreML", "MediaPipe", "TensorFlow Lite"],
                                    color: "primary"
                                },
                                {
                                    icon: <Brain className="w-12 h-12" />,
                                    title: "AI Cloud",
                                    desc: "Advanced neural networks for deep understanding",
                                    tech: ["GPT-4 Vision", "YOLOv8", "Custom Models"],
                                    color: "secondary"
                                },
                                {
                                    icon: <Globe className="w-12 h-12" />,
                                    title: "Web Platform",
                                    desc: "Cross-device sync and session management",
                                    tech: ["Next.js", "WebSocket", "Redis"],
                                    color: "cyan-400"
                                },
                            ].map((item, i) => (
                                <div key={i} className={`glass-panel p-8 rounded-2xl border border-white/10 hover:border-${item.color} transition-all group hover:scale-105`}>
                                    <div className={`text-${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 text-${item.color}`}>{item.title}</h3>
                                    <p className="text-slate-400 mb-6">{item.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tech.map((t, j) => (
                                            <span key={j} className={`text-xs px-3 py-1 bg-${item.color}/10 border border-${item.color}/30 rounded-full text-${item.color}`}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ========== STATS ========== */}
                <Section align="center" id="stats">
                    <div className="max-w-6xl">
                        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">
                            Built to Impress
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { stat: "< 50ms", label: "Response Time", icon: "⚡" },
                                { stat: "99.2%", label: "Accuracy", icon: "🎯" },
                                { stat: "30 FPS", label: "Detection Speed", icon: "📹" },
                                { stat: "50+", label: "Objects Tracked", icon: "👁️" },
                            ].map((item, i) => (
                                <div key={i} className="text-center group">
                                    <div className="glass-panel p-8 rounded-2xl border border-primary/20 hover:border-primary hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all">
                                        <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
                                        <div className="text-5xl md:text-6xl font-bold text-primary mb-3">{item.stat}</div>
                                        <div className="text-slate-400 uppercase text-sm tracking-widest">{item.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ========== FINAL CTA ========== */}
                <Section align="center" id="cta">
                    <div className="flex flex-col items-center z-10 max-w-5xl">
                        <h2 className="text-7xl md:text-9xl font-bold mb-12 text-center leading-none tracking-tighter">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-gradient">
                                Ready to See
                            </span>
                            <br />
                            <span className="text-white">Differently?</span>
                        </h2>

                        <p className="text-2xl text-slate-300 mb-16 max-w-3xl text-center leading-relaxed">
                            XowME is the future of human-AI collaboration.
                            <br />
                            <span className="text-primary font-bold">See. Understand. Do.</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto mb-20">
                            <Link href="/login" className="group px-14 py-7 bg-gradient-to-r from-primary to-cyan-400 text-black font-bold text-2xl rounded-full hover:shadow-[0_0_60px_rgba(6,182,212,1)] transition-all hover:scale-110 transform relative overflow-hidden text-center">
                                <span className="relative z-10">Try XowME Now</span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            </Link>
                            <Link href="/dashboard" className="px-14 py-7 bg-white/5 border-2 border-white/10 text-white font-bold text-2xl rounded-full hover:bg-white/10 hover:border-white/30 transition-all hover:scale-110 transform backdrop-blur-md text-center">
                                Watch Demo
                            </Link>
                        </div>

                        <div className="text-center">
                            <p className="text-slate-500 mb-4">Trusted by innovators worldwide</p>
                            <div className="flex gap-8 items-center justify-center opacity-50">
                                {["MIT", "Stanford", "Tesla", "Apple"].map((brand, i) => (
                                    <span key={i} className="text-2xl font-bold text-slate-600">{brand}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <footer className="absolute bottom-8 text-xs text-slate-600 font-mono uppercase tracking-widest">
                        XowME Systems © 2026 // The Future of Vision
                    </footer>
                </Section>
            </Scene>
        </main>
    )
}
