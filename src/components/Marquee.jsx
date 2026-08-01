import { useEffect, useRef } from "react";

const rowA = [
  "Full-Stack Engineering",
  "Machine Learning",
  "Generative AI",
  "System Design",
  "AI Products",
  "REST APIs",
  "Real-time Systems",
  "Databases",
  "Cloud Deployment",
];

const rowB = [
  "React",
  "Next.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Python",
  "TypeScript",
  "LangChain",
  "Docker",
  "Vercel",
];

function Row({ items, marker, rev, speed }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const group = track.querySelector(".marquee-group");
    if (!group) return;
    const base = group.scrollWidth;
    const target = window.innerWidth * 3;
    let copies = Math.ceil(target / base);
    if (copies % 2 !== 0) copies += 1;
    copies = Math.max(copies, 2);
    for (let i = 1; i < copies; i++) {
      track.appendChild(group.cloneNode(true));
    }
  }, []);

  return (
    <div
      ref={trackRef}
      className={`marquee-track marquee-track--${speed} flex w-max py-4 will-change-transform animate-marquee-rev ${
        rev ? "border-t border-line" : ""
      }`}
    >
      <div className="marquee-group flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
        {items.map((item) => (
          <span
            key={item}
            className="flex shrink-0 items-center gap-10"
          >
            <span className="marquee-text font-serif text-[clamp(1.4rem,3vw,2.2rem)] font-medium italic">
              {item}
            </span>
            <i className={`not-italic ${rev ? "text-accent-deep" : "text-accent"}`}>{marker}</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-paper-2" aria-hidden="true">
      <Row items={rowA} marker="*" speed="a" />
      <Row items={rowB} marker="◆" rev speed="b" />
    </div>
  );
}
