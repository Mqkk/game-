import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6ee7ff, #a78bfa)",
          color: "#0b0f1a",
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: -2,
          borderRadius: 40,
        }}
      >
        G+
      </div>
    ),
    size
  );
}
