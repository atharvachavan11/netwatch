import net from "net";
import { NextResponse } from "next/server";

const PORTS = [443, 80, 53];

function tcpPing(host, port, timeout = 2500) {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.connect(port, host, () => {
      const time = Date.now() - start;
      socket.destroy();
      resolve({ success: true, time, port });
    });

    socket.on("error", () => {
      socket.destroy();
      resolve({ success: false, port });
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ success: false, port });
    });
  });
}

export async function POST(req) {
  const { host } = await req.json();
  if (!host) {
    return NextResponse.json({ error: "Host required" }, { status: 400 });
  }

  const transmitted = 4;
  let received = 0;
  const packets = [];
  const times = [];

  for (let i = 0; i < transmitted; i++) {
    let reply = null;

    for (const port of PORTS) {
      const res = await tcpPing(host, port);
      if (res.success) {
        reply = res;
        break;
      }
    }

    if (reply) {
      received++;
      times.push(reply.time);
      packets.push({
        seq: i + 1,
        status: "reply",
        bytes: 32,
        time: reply.time,
        ttl: 120,
        port: reply.port,
      });
    } else {
      packets.push({
        seq: i + 1,
        status: "timeout",
      });
    }
  }

  const packetLoss = Math.round(
    ((transmitted - received) / transmitted) * 100
  );

  return NextResponse.json({
    host,
    transmitted,
    received,
    packetLoss,
    latency: {
      min: times.length ? Math.min(...times) : 0,
      max: times.length ? Math.max(...times) : 0,
      avg: times.length
        ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
        : 0,
    },
    packets,
  });
}
