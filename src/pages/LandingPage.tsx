import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

const quickExploreItems = ["AOSSIE-Org", "vercel", "facebook", "microsoft"];

interface GithubOrg {
  id: number;
  login: string;
  avatar_url: string;
}

export function HomePage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // DEBOUNCED VALUE
  const debouncedQuery = useDebounce(query, 1000);

  // FETCH ORGS
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["github-orgs", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];

      const response = await fetch(
        `https://api.github.com/search/users?q=${debouncedQuery}+type:org`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const data = await response.json();

      return data.items as GithubOrg[];
    },
    enabled: !!debouncedQuery.trim(),
    staleTime: 1000 * 60 * 5,
  });

  // FILTER ONLY ORGS
  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(
      (item) => item.login.toLowerCase() !== query.toLowerCase()
    );
  }, [suggestions, query]);

  const handleSelectOrg = (org: string) => {
    localStorage.setItem("selected-org", org);

    navigate("/overview");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    handleSelectOrg(query.trim());
  };

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-x-hidden border-b border-zinc-900">
        {/* BACKGROUND GLOW */}
        <div className="absolute left-1/2 top-[35%] h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-[#FCD34D]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          {/* TITLE */}
          <h1 className="max-w-5xl text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Architect Your
            <span className="block text-[#FCD34D]">Insights</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
            Unified analytics across one or many GitHub organizations. Transform
            raw engineering activity into high-fidelity intelligence for
            leadership, contributors, and governance.
          </p>

          {/* SEARCH */}
          <div className="relative mt-12 w-full max-w-3xl">
            <form
              role="search"
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 rounded-2xl border-2 border-zinc-900 bg-zinc-950/90 p-3 shadow-[0px_0px_100px_rgba(252,211,77,0.15)] backdrop-blur-xl md:flex-row"
            >
              <div className="relative flex flex-1 items-center gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-4">
                <Search className="h-5 w-5 text-zinc-500" />

                <input
                  id="org-search"
                  type="text"
                  value={query}
                  autoComplete="off"
                  aria-label="Search GitHub organization"
                  placeholder="Enter GitHub Organization Name..."
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggestions(false);
                    }, 200);
                  }}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  onKeyDown={(e) => {
                    if (!filteredSuggestions.length) return;

                    if (e.key === "ArrowDown") {
                      e.preventDefault();

                      setSelectedIndex((prev) =>
                        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
                      );
                    }

                    if (e.key === "ArrowUp") {
                      e.preventDefault();

                      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                    }

                    if (e.key === "Enter" && selectedIndex >= 0) {
                      e.preventDefault();

                      handleSelectOrg(filteredSuggestions[selectedIndex].login);
                    }
                  }}
                  className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none md:text-base"
                />
              </div>

              <Button
                type="submit"
                className="h-14.5 min-w-45 text-sm font-black uppercase tracking-[0.2em]"
              >
                Explore
                <ArrowRight className="size-4" />
              </Button>
            </form>

            {/* SUGGESTIONS */}
            {showSuggestions && query.trim() && (
              <div className="absolute left-0 top-[105%] z-50 flex max-h-96 w-full flex-col overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                {isLoading ? (
                  <div className="px-5 py-4 text-sm text-zinc-500">
                    Searching organizations...
                  </div>
                ) : filteredSuggestions.length > 0 ? (
                  filteredSuggestions.slice(0, 6).map((org, index) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => handleSelectOrg(org.login)}
                      className={cn(
                        "flex w-full items-center justify-between border-b border-zinc-900 px-5 py-4 text-left transition-colors last:border-none",
                        "hover:bg-zinc-900",
                        selectedIndex === index && "bg-zinc-900"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={org.avatar_url}
                          alt={org.login}
                          className="size-10 rounded-full border border-zinc-800 object-cover"
                        />

                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            {org.login}
                          </span>

                          <span className="text-xs text-zinc-500">
                            GitHub Organization
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="size-4 text-zinc-600" />
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-4 text-sm text-zinc-500">
                    No organization found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* QUICK ACCESS */}
          <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-5 border-t border-zinc-900 pt-10">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-600">
              Quick Explore Access
            </p>

            <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
              {quickExploreItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelectOrg(item)}
                  className="group flex items-center justify-between border border-zinc-900 bg-zinc-950 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#FCD34D] hover:shadow-[0px_0px_30px_rgba(252,211,77,0.15)]"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-[#FCD34D]">
                    {item}
                  </span>

                  <ArrowRight className="size-4 text-zinc-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FCD34D]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-zinc-900 bg-zinc-950/50">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 divide-y divide-zinc-900 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-center gap-5 px-6 py-10">
            <span className="text-5xl font-black text-[#FCD34D]">5,000</span>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Resource Load
              </p>

              <p className="mt-2 text-sm font-semibold uppercase text-white">
                Girth With PAT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-6 py-10">
            <span className="text-5xl font-black text-[#FCD34D]">1HR</span>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Data Freshness
              </p>

              <p className="mt-2 text-sm font-semibold uppercase text-white">
                Intelligent Cache
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 px-6 py-10">
            <span className="text-5xl font-black text-green-400">ZERO</span>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Engine Efficiency
              </p>

              <p className="mt-2 text-sm font-semibold uppercase text-white">
                Backend Latency
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative border-b border-zinc-900 bg-black py-24">
        <div className="w-full px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          {/* RIGHT FEATURES */}
          <OrgExplorerFeatures />
        </div>
      </section>
    </main>
  );
}
export default function OrgExplorerFeatures() {
  const features = [
    {
      title: "Interactive Org Visualization",
      desc: "Explore repositories, teams, and contributors through a dynamic relationship graph designed for instant understanding.",
      bullets: [
        "Live node graph",
        "Repository mapping",
        "Contributor insights",
      ],
      visual: (
        <div className="relative h-full w-full overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-violet-950 to-black p-8">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.4),transparent_60%)]" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/30 bg-violet-500/10 blur-0" />

          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.8)]"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${15 + Math.random() * 70}%`,
              }}
            />
          ))}

          <svg className="absolute inset-0 h-full w-full opacity-40">
            <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#8b5cf6" />
            <line x1="70%" y1="25%" x2="50%" y2="50%" stroke="#8b5cf6" />
            <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#8b5cf6" />
            <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#8b5cf6" />
          </svg>

          <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            142 repositories mapped
          </div>
        </div>
      ),
    },
    {
      title: "Zero Backend Delay",
      desc: "Everything runs instantly with direct GitHub API interactions and optimized client-side rendering.",
      bullets: [
        "Instant updates",
        "No server bottleneck",
        "Fast local rendering",
      ],
      visual: (
        <div className="relative h-full overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-orange-900 to-black p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.35),transparent_55%)]" />

          <div className="relative z-10 mt-20 space-y-6">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <span className="text-white/70">GitHub Data Sync</span>
              <span className="text-green-400">0.2s</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full animate-pulse rounded-full bg-linear-to-r from-orange-400 to-yellow-300" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {["Repos", "Teams", "Contributors"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Secure PAT Authentication",
      desc: "Your Personal Access Tokens stay encrypted and stored locally for maximum privacy and security.",
      bullets: [
        "Local-only storage",
        "Encrypted handling",
        "Privacy-first architecture",
      ],
      visual: (
        <div className="relative h-full overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-emerald-950 to-black p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25),transparent_60%)]" />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-xl">
              <div className="absolute h-72 w-72 animate-ping rounded-full border border-emerald-500/20" />

              <div className="rounded-3xl border border-white/10 bg-black/40 px-10 py-8 backdrop-blur-xl">
                <div className="text-center text-6xl">🔒</div>
                <p className="mt-4 text-center text-sm text-white/60">
                  Secure Local Authentication
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Auto Save & Auto Refresh",
      desc: "Your workspace updates automatically while preserving every interaction in real time.",
      bullets: [
        "Background syncing",
        "Real-time refresh",
        "Persistent workspace state",
      ],
      visual: (
        <div className="relative h-full overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-cyan-950 to-black p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2),transparent_60%)]" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-5xl text-cyan-300 animate-spin">
              ↻
            </div>

            <div className="space-y-3 w-full max-w-sm">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-white/70 backdrop-blur-xl">
                ✓ Workspace Auto-Saved
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-white/70 backdrop-blur-xl">
                ✓ GitHub Data Refreshed
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "One-Click Exporting",
      desc: "Export organization graphs and analytics instantly in multiple formats for sharing and documentation.",
      bullets: ["PNG & SVG export", "JSON snapshots", "Instant downloads"],
      visual: (
        <div className="relative h-full overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-fuchsia-950 to-black p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.25),transparent_60%)]" />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
              <div className="mb-6 text-xl font-semibold text-white">
                Export Workspace
              </div>

              <div className="space-y-4">
                {["PNG", "SVG", "JSON"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <span className="text-white/70">.{item.toLowerCase()}</span>
                    <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-105">
                      Export
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-black px-6 text-white md:px-12 lg:px-20">
      <div>
        <div className="mb-24">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-violet-400">
            Core Features
          </p>

          <h2 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Built for exploring GitHub organizations visually.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/60">
            A premium developer experience focused on performance, privacy,
            automation, and visual clarity.
          </p>
        </div>

        <div className="relative">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="sticky top-0 mb-20 h-screen"
              style={{ zIndex: index + 1 }}
            >
              <div className="grid h-full grid-cols-1 gap-10 rounded-[40px] border border-white/10 bg-[#09090b]/90 p-8 shadow-2xl backdrop-blur-2xl lg:grid-cols-2 lg:p-14">
                <div className="flex flex-col justify-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-violet-300 backdrop-blur-xl">
                    0{index + 1}
                  </div>

                  <h3 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                    {feature.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
                    {feature.desc}
                  </p>

                  <div className="mt-10 space-y-4">
                    {feature.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-center gap-3 text-white/75"
                      >
                        <div className="h-2 w-2 rounded-full bg-violet-400" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-105 lg:h-full">{feature.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
