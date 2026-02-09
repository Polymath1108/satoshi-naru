export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {"© "}{new Date().getFullYear()}{" Satoshi Naru. All rights reserved."}
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/polymath1108"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#84c11f] transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/naru-satoshi-2856923a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#84c11f] transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:satoshinaru213@gmail.com"
              className="text-muted-foreground hover:text-[#84c11f] transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
