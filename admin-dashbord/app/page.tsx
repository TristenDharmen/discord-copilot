"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("test").select("*");
      setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Server Copilot</h2>

        <nav className="space-y-4 text-slate-300">
          <Link href="/" className="block font-semibold text-white">
            Dashboard
          </Link>

          <Link href="/stats" className="block hover:text-white">
            Stats
          </Link>

          <Link href="/logs" className="block hover:text-white">
            Logs
          </Link>

          <Link href="/settings" className="block hover:text-white">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <span className="text-sm text-green-400">Supabase Connected</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-slate-400 text-sm">Total Records</p>
            <p className="text-3xl font-bold mt-2">{data.length}</p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-slate-400 text-sm">Latest Entry</p>
            <p className="text-lg mt-2">{data[0]?.name || "—"}</p>
          </div>

          <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
            <p className="text-slate-400 text-sm">Status</p>
            <p className="text-lg mt-2 text-green-400">Online</p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-lg font-semibold">Database Records</h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-800 hover:bg-slate-800"
                >
                  <td className="px-6 py-3 text-slate-400">
                    {row.id.slice(0, 8)}…
                  </td>
                  <td className="px-6 py-3">{row.name}</td>
                  <td className="px-6 py-3 text-slate-400">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
