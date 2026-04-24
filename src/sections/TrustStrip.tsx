const platforms = ['META', 'GOOGLE', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT']

export default function TrustStrip() {
  return (
    <section className="bg-bg-core border-y border-border-dark py-10">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="font-inter text-sm sm:text-base font-medium text-text-muted tracking-[0.05em] hover:text-text-secondary transition-colors duration-200 cursor-default"
            >
              {platform}
            </span>
          ))}
        </div>
        <p className="text-center font-mono text-xs text-text-muted mt-4 tracking-[0.02em]">
          Multi-platform growth across real businesses
        </p>
      </div>
    </section>
  )
}
