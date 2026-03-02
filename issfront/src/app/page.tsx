"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function Home() {
    const router = useRouter();
    const [exiting, setExiting] = useState(false);

    // keep ref to remove listener on unmount
    const splineAppRef = useRef<any>(null);

    const go = () => {
        if (exiting) return;
        setExiting(true);
        setTimeout(() => router.push("/ppage"), 700); // change to /login if you want
    };

    function onLoad(splineApp: any) {
        splineAppRef.current = splineApp;

        const onMouseDown = (e: any) => {
            const name =
                e?.target?.name ??
                e?.target?.data?.name ??
                e?.target?.parent?.name ??
                "";

            // If the Start button (or its child) was clicked
            if (name === "StartButton") go();

            // If StartButton is a group and you click a child mesh, use this:
            // if (String(name).includes("StartButton")) go();
        };

        splineApp.addEventListener("mouseDown", onMouseDown);
        (splineApp as any).__onMouseDown = onMouseDown;
    }

    useEffect(() => {
        return () => {
            const app = splineAppRef.current;
            if (!app) return;
            const handler = (app as any).__onMouseDown;
            if (handler) {
                try {
                    app.removeEventListener("mouseDown", handler);
                } catch {
                    // ignore
                }
            }
        };
    }, []);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-[#020617]">
            <Spline
                scene="https://prod.spline.design/sbSiPffy23GgFPlS/scene.splinecode"
                onLoad={onLoad}
                className="absolute inset-0 w-full h-full"
            />

            {exiting && (
                <div className="absolute inset-0 bg-black animate-fadeOut z-50" />
            )}

            <style jsx global>{`
        @keyframes fadeOut {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeOut {
          animation: fadeOut 0.7s ease forwards;
        }
      `}</style>
        </main>
    );
}
