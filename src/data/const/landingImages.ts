import globalOrgMap from "../../assets/images/hero-world-map-image.png";
import orgexplorerLogoMinimal from "../../assets/images/OE-logo-1.png";
import oeTechnicalMark from "../../assets/images/OE-logo-2.png";
import orgGrowthGraph from "../../assets/images/hero-stocks-image.webp";
import oeGradientSymbol from "../../assets/images/hero-shaded-graph-image.avif";
import oeFinalMark from "../../assets/images/hero-clean-image.avif";
import orgVirtualGraph from "../../assets/images/hero-virtual-graph-image.avif";
import type { LandingImage } from "@/types/landingImageType";

export const landingImages: LandingImage[] = [
    {
        id: "org-growth-graph",
        src: orgGrowthGraph,
        alt: "Interactive time-series graph showing long-term growth of open-source organization activity",
        title: "Organization activity growth over time",
        ariaLabel: "Organization contribution growth visualization",
        role: "hero-visual",
        priority: true,
        delay: 0,
        objectFit: "cover",
        background: "dark",
        caption: "See how organizations evolve through contribution trends"
    },

    {
        id: "global-org-map",
        src: globalOrgMap,
        alt: "World map highlighting geographic distribution of contributors in an open-source organization",
        title: "Global contributor distribution",
        ariaLabel: "World map of organization contributors",
        role: "showcase",
        priority: false,
        delay: 1200,
        objectFit: "cover",
        background: "dark",
        caption: "Open source is global — visualize contributors across the world"
    },

    {
        id: "orgexplorer-logo-minimal",
        src: orgexplorerLogoMinimal,
        alt: "Minimal Org Explorer logo representing exploration of open-source organizations",
        title: "Org Explorer logo",
        ariaLabel: "Org Explorer brand logo",
        role: "branding",
        priority: false,
        delay: 2400,
        objectFit: "cover",
        background: "dark",
        caption: "Org Explorer — understand organizations, not just repositories"
    },

    {
        id: "oe-technical-mark",
        src: oeTechnicalMark,
        alt: "OE technical mark symbolizing data, graphs, and organizational structure",
        title: "OE technical identity",
        ariaLabel: "OE technical logo mark",
        role: "branding",
        priority: false,
        delay: 3600,
        objectFit: "cover",
        background: "dark",
        caption: "A technical identity built for developers"
    },

    {
        id: "oe-gradient-symbol",
        src: oeGradientSymbol,
        alt: "Gradient OE symbol representing connections and relationships in open-source ecosystems",
        title: "Connections and relationships",
        ariaLabel: "OE gradient logo representing relationships",
        role: "conceptual",
        priority: false,
        delay: 4800,
        objectFit: "cover",
        background: "dark",
        caption: "Visualizing relationships, not just numbers"
    },

    {
        id: "oe-final-mark",
        src: oeFinalMark,
        alt: "Final OE mark for Org Explorer landing experience",
        title: "Org Explorer final mark",
        ariaLabel: "Org Explorer final logo",
        role: "closing-visual",
        priority: false,
        delay: 6000,
        objectFit: "cover",
        background: "dark",
        caption: "Explore organizations with clarity"
    },

    {
        id: "virtual-graph",
        src: orgVirtualGraph,
        alt: "A graph image",
        title: "Virtual Graph Image",
        ariaLabel: "A graph image showing connection with Node and Edges",
        role: "conceptual",
        priority: false,
        delay: 7200,
        objectFit: "cover",
        background: "dark",
        caption: "See Insights"
    }
];
