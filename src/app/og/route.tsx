import { ImageResponse } from "next/og";
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
// ImageResponse uses its own image renderer, not the browser/Tailwind stylesheet.
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#111210",
        color: "#f3f4ed",
        padding: 90,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#f0cf56",
          marginBottom: 36,
        }}
      >
        SOFTWARE ENGINEERING
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        Vinicius Martins
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 38,
          color: "#b8bdb0",
          marginTop: 24,
        }}
      >
        Frontend Architecture / Full Stack Development
      </div>
      <div
        style={{
          display: "flex",
          height: 5,
          width: 150,
          background: "#f0cf56",
          marginTop: 54,
        }}
      />
    </div>,
    size,
  );
}
