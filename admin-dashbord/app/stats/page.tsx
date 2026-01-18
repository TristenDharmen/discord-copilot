"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Stats = {
  total: number;
  latestName: string | null;
  latestTime: string | null;
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    latestName: null,
    latestTime: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("test")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data) return;

      setStats({
        total: data.length,
        latestName: data[0]?.name ?? null,
        latestTime: data[0]?.created_at ?? null,
      });
    };

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Records */}
        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Total Records</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>

        {/* Latest Entry */}
        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Latest Entry</p>
          <p className="text-lg mt-2">
            {stats.latestName ?? "—"}
          </p>
        </div>

        {/* Last Updated */}
        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400 text-sm">Last Updated</p>
          <p className="text-lg mt-2 text-slate-300">
            {stats.latestTime
              ? new Date(stats.latestTime).toLocaleString()
              : "—"}
          </p>
        </div>
      </div>
    </main>
  );
}
