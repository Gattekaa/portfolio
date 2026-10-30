import { ImageResponse } from "next/og";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#111210",
        color: "#f0cf56",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 38,
        fontWeight: 700,
        letterSpacing: -4,
      }}
    >
      vm.
    </div>,
    size,
  );
}
