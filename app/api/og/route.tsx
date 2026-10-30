import { ImageResponse } from "next/og";
export const runtime = "edge";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Harkirat Singh";
  const stack = searchParams.get("stack") || "Computer Engineering · AI · Analytics";
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", padding: 56, background: "#EEEDEA", color: "#171715", fontFamily: "sans-serif" }}>
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 48, border: "1px solid #C9C7C1", background: "#F8F7F5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#6C6A63", fontSize: 22, letterSpacing: 2 }}><span>H ✳</span><span>COMPUTER ENGINEERING · 2023—2027</span></div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}><div style={{ width: 72, height: 4, marginBottom: 24, background: "#B83E17" }}/><div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -4 }}>{title}</div><div style={{ marginTop: 24, color: "#45443F", fontSize: 28 }}>{stack}</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#6C6A63", fontSize: 20 }}><span>Harkirat Singh · Patiala, India</span><span style={{ color: "#B83E17" }}>BUILD / INSPECT / IMPROVE ↗</span></div>
    </div>
  </div>, { width: 1200, height: 630 });
}
