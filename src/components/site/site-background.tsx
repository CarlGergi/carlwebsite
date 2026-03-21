"use client";

import { motion } from "framer-motion";

export function SiteBackground() {
  return (
    <>
      <div className="noise" />
      <div className="mesh-bg">
        {/* Primary luminous sweep — upper right, like light bending through glass */}
        <motion.div
          className="mesh-orb"
          style={{
            top: "-20%",
            right: "-5%",
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(ellipse at 40% 40%, rgba(37, 99, 235, 0.12) 0%, rgba(29, 78, 216, 0.06) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -60, 30, 0],
            rotate: [0, 5, -3, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Deep cobalt pool — mid-left, slower, deeper color */}
        <motion.div
          className="mesh-orb"
          style={{
            top: "25%",
            left: "-12%",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(30, 58, 138, 0.1) 0%, rgba(29, 78, 216, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* Electric accent — smaller, tighter, more vivid. Drifts across lower-right */}
        <motion.div
          className="mesh-orb"
          style={{
            bottom: "-5%",
            right: "0%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.09) 0%, rgba(99, 102, 241, 0.04) 40%, transparent 65%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* Center breath — subtle pulsing presence, ties the space together */}
        <motion.div
          className="mesh-orb"
          style={{
            top: "45%",
            left: "50%",
            width: "700px",
            height: "700px",
            marginLeft: "-350px",
            marginTop: "-350px",
            background:
              "radial-gradient(circle at center, rgba(37, 99, 235, 0.04) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
          animate={{
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top-edge horizon line — very subtle, adds depth like a distant light source */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.08) 30%, rgba(96, 165, 250, 0.12) 50%, rgba(59, 130, 246, 0.08) 70%, transparent)",
          }}
        />
      </div>
    </>
  );
}
