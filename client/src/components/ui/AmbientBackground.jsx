import React from "react";

/**
 * AmbientBackground — Animated gradient blobs that float across the canvas.
 *
 * Renders four layered, heavily-blurred gradient shapes that simulate
 * cinematic "light pools" floating in the background. Part of the
 * Linear/modern design system's ambient lighting layer.
 *
 * Place this once at the root layout level, behind all other content.
 */
const AmbientBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Primary blob — top-center (largest, most prominent) */}
      <div
        className="absolute"
        style={{ top: "-400px", left: "50%", marginLeft: "-450px", width: "900px", height: "1400px" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94,106,210,0.25) 0%, transparent 70%)",
            filter: "blur(150px)",
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </div>

      {/* Secondary blob — left side */}
      <div
        className="absolute"
        style={{ top: "20%", left: "-10%", width: "600px", height: "800px" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)",
            filter: "blur(120px)",
            animation: "float-reverse 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Tertiary blob — right side */}
      <div
        className="absolute"
        style={{ top: "30%", right: "-8%", width: "500px", height: "700px" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Bottom accent — pulsing glow at the lower edge */}
      <div
        className="absolute"
        style={{ bottom: "-100px", left: "50%", marginLeft: "-400px", width: "800px", height: "400px" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94,106,210,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "blob-pulse 8s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default AmbientBackground;
