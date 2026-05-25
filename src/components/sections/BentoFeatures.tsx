import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { MagicCard } from "@/components/ui/magic-card"
import { CodeIcon, DownloadIcon, LayoutTemplateIcon, PaletteIcon, SparklesIcon } from "lucide-react"

const features = [
  {
    Icon: SparklesIcon,
    name: "Intelligent Syntax",
    description: "Built-in Shiki syntax highlighting for over 100+ programming languages, beautifully rendered.",
    href: "#",
    cta: "Learn more",
    background: (
      <MagicCard
        className="absolute inset-0 right-0 top-0 origin-top h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        gradientColor="rgba(255,255,255,0.05)"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: PaletteIcon,
    name: "Beautiful Themes",
    description: "Choose from hand-crafted themes ranging from subtle dark modes to vibrant gradients.",
    href: "#",
    cta: "Learn more",
    background: (
      <MagicCard
        className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        gradientColor="rgba(255,255,255,0.05)"
      />
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: LayoutTemplateIcon,
    name: "Custom Padding",
    description: "Adjust padding, margins, and borders to get the exact framing you need for your snippet.",
    href: "#",
    cta: "Learn more",
    background: (
      <MagicCard
        className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        gradientColor="rgba(255,255,255,0.05)"
      />
    ),
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: DownloadIcon,
    name: "Export Formats",
    description: "Download in ultra-high resolution PNG, lightweight WebP, or copy directly to clipboard.",
    href: "#",
    cta: "Learn more",
    background: (
      <MagicCard
        className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        gradientColor="rgba(255,255,255,0.05)"
      />
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: CodeIcon,
    name: "Zero Setup",
    description: "No logins, no watermarks, no configuration. Just paste your code and generate.",
    href: "#",
    cta: "Learn more",
    background: (
      <MagicCard
        className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        gradientColor="rgba(255,255,255,0.05)"
      />
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
]

export default function BentoFeatures() {
  return (
    <section className="relative w-full py-24 px-4 bg-transparent overflow-hidden flex flex-col items-center">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Everything you need. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Nothing you don't.</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            A carefully crafted toolset designed for developers who care about presentation.
          </p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3 max-w-[900px] mx-auto">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
