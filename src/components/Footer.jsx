export default function Footer() {
  return (
    <footer className="footer border-t border-line bg-paper">
      <div className="container footer-inner flex flex-wrap items-center justify-between gap-5 py-[26px]">
        <p className="mono text-ink-mute">© {new Date().getFullYear()} Harkirat Singh — Built with care, in the open.</p>
        <a href="#home" className="mono text-ink-mute transition-colors hover:text-accent" data-cursor="hover">Back to top ↑</a>
      </div>
    </footer>
  );
}

