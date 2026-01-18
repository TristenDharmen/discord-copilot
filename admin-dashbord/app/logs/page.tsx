"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Log = {
  id: string;
  name: string;
  created_at: string;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from("test")
        .select("*")
        .order("created_at", { ascending: false });

      setLogs(data || []);
    };

    fetchLogs();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Logs</h1>

      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-slate-800 hover:bg-slate-800"
              >
                <td className="px-6 py-3 text-slate-400">
                  {log.id.slice(0, 8)}…
                </td>
                <td className="px-6 py-3">{log.name}</td>
                <td className="px-6 py-3 text-slate-400">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
