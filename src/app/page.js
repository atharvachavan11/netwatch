import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Net<span className="text-cyan-400">Watch</span>
        </h1>
        <div className="space-x-6 text-sm">
          <a href="#features" className="hover:text-cyan-400">Features</a>
          <a href="#about" className="hover:text-cyan-400">About</a>
          <a href="#contact" className="hover:text-cyan-400">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Real-Time Network <br />
          <span className="text-cyan-400">Monitoring & Security</span>
        </h2>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Monitor traffic, detect intrusions, and maintain complete visibility
          of your network infrastructure in real time.
        </p>

        <div className="mt-10 space-x-4">
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-600 hover:border-cyan-400 rounded-lg">
            View Dashboard
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-gray-950">
        <h3 className="text-3xl font-bold text-center mb-14">
          Core Features
        </h3>

    

        <div className="grid md:grid-cols-3 gap-10">

          <Link href="/ip-validation">
            <Feature
              title="IP Address Validation"
              desc="Validate IPv4 and IPv6 addresses to ensure correct network input."
            />
          </Link>

          <Link href="/ping-monitoring">
            <Feature
              title="Ping Monitoring"
              desc="Check host reachability and network latency."
            />
          </Link>

          <Link href="/device-monitoring">
            <Feature
              title="Device Monitoring"
              desc="View connected devices and their online/offline status."
            />
          </Link>

          <Link href="/port-status">
            <Feature
              title="Port Status Check"
              desc="Identify open and closed ports for common network services."
            />
          </Link>

          <Link href="/logs">
            <Feature
              title="Network Logs"
              desc="Track events, IP checks, and network activity logs."
            />
          </Link>

          <Link href="/alerts">
            <Feature
              title="Alerts & Notifications"
              desc="Receive alerts for invalid IPs and network issues."
            />
          </Link>

        </div>

      </section>

      {/* About */}
      <section id="about" className="px-8 py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">Why NetWatch?</h3>
        <p className="max-w-3xl mx-auto text-gray-400">
          NetWatch is built for network administrators, SOC teams,
          and cybersecurity professionals who need full visibility
          and control over their infrastructure.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} NetWatch. All rights reserved.
      </footer>

    </main>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-500 transition">
      <h4 className="text-xl font-semibold mb-3 text-cyan-400">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
