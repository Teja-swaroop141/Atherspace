const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img src="/logo.svg" alt="AtherSpace Logo" className="h-8 w-8" />
    <span className="font-display text-lg font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      AtherSpace
    </span>
  </div>
);

export default Logo;
