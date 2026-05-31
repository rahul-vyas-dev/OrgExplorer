import React from "react";

function StatsSection() {
  return (
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
  );
}

export default StatsSection;
