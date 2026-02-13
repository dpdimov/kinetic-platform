"use client";

import { usePathname } from "next/navigation";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const APPS = [
  { key: "hub",        label: "Home",       path: "/",          devPort: 3000 },
  { key: "assessment", label: "Assessment",  path: "/assess",    devPort: 3001 },
  { key: "dashboard",  label: "Dashboard",   path: "/dashboard", devPort: 3002 },
  { key: "analyzer",   label: "Analyzer",    path: "/analyze",   devPort: 3003 },
  { key: "coach",      label: "Coach",       path: "/coach",     devPort: 3004 },
];

function getHref(app) {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      return `http://localhost:${app.devPort}${app.path}`;
    }
    return app.path;
}

export default function PlatformNav({ currentApp }) {
  const pathname = usePathname();

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
          fontFamily: "'Crimson Pro', Georgia, serif",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <a
          href={getHref(APPS[0])}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={`${BASE_PATH}/images/kinetic-logo.png`}
            alt="Kinetic Thinking Styles"
            style={{ height: 28, width: "auto" }}
          />
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {APPS.slice(1).map((app) => {
            const isActive = currentApp === app.key;
            return (
              <a
                key={app.key}
                href={getHref(app)}
                style={{
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1f2937" : "#6b7280",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: 4,
                  background: isActive ? "#f3f4f6" : "transparent",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {app.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Spacer to offset fixed nav */}
      <div style={{ height: 44 }} />
    </>
  );
}
