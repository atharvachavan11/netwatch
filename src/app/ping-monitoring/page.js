"use client";

import { useState } from "react";

export default function PingMonitor() {
  const [host, setHost] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePing() {
    if (!host) return;

    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">

        <h1 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          Ping Monitoring System
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="google.com or 8.8.8.8"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            onClick={handlePing}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
          >
            {loading ? "Pinging..." : "Ping"}
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-black text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 space-y-1">
            <p>
              Pinging {result.host} with 32 bytes of data:
            </p>

            {result.packets.map((p, i) => (
              <p key={i}>
                {p.status === "reply" ? (
                  <>
                    Reply from {result.host}: bytes={p.bytes} time={p.time}ms TTL={p.ttl}
                  </>
                ) : (
                  <>Request timed out.</>
                )}
              </p>
            ))}

            <br />

            <p>Ping statistics for {result.host}:</p>
            <p>
              Packets: Sent = {result.transmitted}, Received = {result.received},
              Lost = {result.transmitted - result.received} ({result.packetLoss}% loss)
            </p>

            <p>Approximate round trip times in milli-seconds:</p>
            <p>
              Minimum = {result.latency.min}ms, Maximum = {result.latency.max}ms,
              Average = {result.latency.avg}ms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
