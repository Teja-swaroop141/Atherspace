const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-lg bg-gradient-cta shadow-pop" />
      <div className="absolute inset-[3px] rounded-[7px] bg-background flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-sm bg-gradient-cta rotate-45" />
      </div>
    </div>
    <span className="font-display text-lg font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      AtherSpace
    </span>
  </div>
);

export default Logo;
