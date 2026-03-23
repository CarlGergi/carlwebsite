"use client";

import { useEffect, useState } from "react";

export function SiteBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // On mobile, just render the noise grain — skip the heavy animated orbs
  if (isMobile) {
    return <div className="noise" />;
  }

  return (
    <>
      <div className="noise" />
      <div className="mesh-bg">
        {/* Primary luminous sweep */}
        <div
          className="mesh-orb"
          style={{
            top: "-20%",
            right: "-5%",
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(ellipse at 40% 40%, rgba(76, 110, 245, 0.1) 0%, rgba(55, 80, 190, 0.05) 40%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float1 25s ease-in-out infinite",
          }}
        />

        {/* Deep cobalt pool */}
        <div
          className="mesh-orb"
          style={{
            top: "25%",
            left: "-12%",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(30, 58, 138, 0.08) 0%, rgba(55, 80, 190, 0.03) 50%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float2 32s ease-in-out infinite",
          }}
        />

        {/* Electric accent */}
        <div
          className="mesh-orb"
          style={{
            bottom: "-5%",
            right: "0%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle at center, rgba(76, 110, 245, 0.07) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 65%)",
            filter: "blur(70px)",
            animation: "float3 22s ease-in-out infinite",
          }}
        />

        {/* Top-edge horizon line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(76, 110, 245, 0.08) 30%, rgba(107, 138, 255, 0.12) 50%, rgba(76, 110, 245, 0.08) 70%, transparent)",
          }}
        />
      </div>
    </>
  );
}
