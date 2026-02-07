"use client";

import { useState } from "react";

export default function IPValidationPage() {
  const [ip, setIp] = useState("");
  const [status, setStatus] = useState(null);

  function isValidIP(value) {
    const ipv4 =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    const ipv6 =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|::)$/;

    return ipv4.test(value) || ipv6.test(value);
  }

  const handleValidate = () => {
    if (!ip.trim()) {
      setStatus("empty");
    } else if (isValidIP(ip)) {
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-4">

      {/* Glass Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-xl">

        {/* Glow */}
        <div className="absolute -inset-0.5 bg-cyan-500/10 rounded-2xl blur-lg" />

        <div className="relative p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
            IP Address Validation
          </h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Validate IPv4 or IPv6 addresses instantly
          </p>

          {/* Input */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="192.168.1.1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />

            <button
              onClick={handleValidate}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition font-semibold"
            >
              Validate IP
            </button>
          </div>

          {/* Status */}
          <div className="mt-6 text-center">
            {status === "valid" && (
              <p className="text-green-400 font-medium">
                ✅ Valid IP Address
              </p>
            )}
            {status === "invalid" && (
              <p className="text-red-400 font-medium">
                ❌ Invalid IP Address
              </p>
            )}
            {status === "empty" && (
              <p className="text-yellow-400 font-medium">
                ⚠️ Please enter an IP addres
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
