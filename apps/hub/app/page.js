"use client";

import { useState } from "react";

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "";

const TOOLS = [
  {
    key: "assessment",
    title: "Assessment",
    description: "Take our Kinetic Styles assessments to explore how you think, manage, and lead.",
    path: "/assess",
    devPort: 3001,
    color: "#009ddb",
    icon: "\u2726",
  },
  {
    key: "dashboard",
    title: "Dashboard",
    description: "Explore aggregated assessment results with interactive scatterplots, density maps, and analytics.",
    path: "/dashboard",
    devPort: 3002,
    color: "#9f60b5",
    icon: "\u25A6",
  },
  {
    key: "analyzer",
    title: "Analyzer",
    description: "Upload or paste text to explore what linguistic markers reveal about your thinking style.",
    path: "/analyze",
    devPort: 3003,
    color: "#bed600",
    icon: "\u25C8",
  },
  {
    key: "coach",
    title: "Coach",
    description: "Have a guided conversation to explore your thinking, managing, and leading styles.",
    path: "/coach",
    devPort: 3004,
    color: "#ff6f20",
    icon: "\u25EC",
  },
];

function getHref(tool) {
  if (PLATFORM_URL) {
    return PLATFORM_URL + tool.path;
  }
  return `http://localhost:${tool.devPort}${tool.path}`;
}

export default function HubPage() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 44px)",
        background: "#fafafa",
        color: "#1f2937",
        fontFamily: "'Crimson Pro', Georgia, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        position: "relative",
      }}
    >
      {/* Responsive styles */}
      <style>{`
        .hub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .hub-title { font-size: 42px; }
        .hub-subtitle { font-size: 18px; }
        .hub-card-title { font-size: 21px; }
        .hub-card-desc { font-size: 16px; }
        .hub-card-icon { font-size: 26px; }
        @media (max-width: 640px) {
          .hub-grid { grid-template-columns: 1fr; gap: 14px; }
          .hub-title { font-size: 32px; }
          .hub-subtitle { font-size: 16px; }
          .hub-card-title { font-size: 19px; }
          .hub-card-desc { font-size: 15px; }
          .hub-card-icon { font-size: 22px; }
        }
      `}</style>

      <div style={{ maxWidth: 760, width: "100%", textAlign: "center" }}>
        <img
          src="/images/kinetic-logo.png"
          alt="Kinetic Thinking Styles"
          style={{ height: 64, width: "auto", marginBottom: 24 }}
        />
        <h1
          className="hub-title"
          style={{
            fontWeight: 300,
            color: "#111827",
            lineHeight: 1.3,
            margin: "0 0 14px 0",
          }}
        >
          The Kinetic Toolkit
        </h1>
        <p
          className="hub-subtitle"
          style={{
            color: "#6b7280",
            lineHeight: 1.7,
            marginBottom: 48,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
            fontStyle: "italic",
          }}
        >
          A suite of tools for developing new ways of thinking and working.
        </p>

        <div className="hub-grid">
          {TOOLS.map((tool) => (
            <a
              key={tool.key}
              href={getHref(tool)}
              style={{
                display: "block",
                padding: "28px 24px",
                borderRadius: 10,
                background: `linear-gradient(135deg, ${tool.color}06 0%, ${tool.color}02 100%)`,
                border: "1px solid #e5e7eb",
                borderTop: `3px solid ${tool.color}40`,
                textDecoration: "none",
                textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tool.color + "50";
                e.currentTarget.style.borderTopColor = tool.color;
                e.currentTarget.style.background = `linear-gradient(135deg, ${tool.color}0c 0%, ${tool.color}04 100%)`;
                e.currentTarget.style.boxShadow = `0 3px 14px ${tool.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.borderTopColor = tool.color + "40";
                e.currentTarget.style.background = `linear-gradient(135deg, ${tool.color}06 0%, ${tool.color}02 100%)`;
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <div
                className="hub-card-icon"
                style={{
                  marginBottom: 14,
                  color: tool.color,
                  lineHeight: 1,
                }}
              >
                {tool.icon}
              </div>
              <div
                className="hub-card-title"
                style={{
                  fontWeight: 600,
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                {tool.title}
              </div>
              <div
                className="hub-card-desc"
                style={{
                  color: "#6b7280",
                  lineHeight: 1.65,
                }}
              >
                {tool.description}
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <button
            onClick={() => setAboutOpen(true)}
            style={{
              background: "none",
              border: "none",
              fontSize: 15,
              color: "#9ca3af",
              cursor: "pointer",
              fontFamily: "'Crimson Pro', Georgia, serif",
              padding: "4px 8px",
            }}
          >
            About
          </button>
        </div>
      </div>

      {/* About slide-up panel */}
      {aboutOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setAboutOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.2)",
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 600,
              background: "#ffffff",
              borderRadius: "16px 16px 0 0",
              padding: "32px 32px 40px",
              boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
              fontFamily: "'Crimson Pro', Georgia, serif",
              animation: "slideUp 0.25s ease",
            }}
          >
            <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: "#111827", margin: 0 }}>About</h2>
              <button
                onClick={() => setAboutOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "4px 8px",
                  lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, margin: "0 0 16px 0" }}>
              The Kinetic Toolkit is based on the Kinetic Styles framework, a conceptual
              tool for developing new ways of thinking, managing, and leading.
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              Dimov, D. and Pistrui, J. (2023).{" "}
              <em>Kinetic thinking styles: A tool for developing entrepreneurial thinking</em>.{" "}
              <em>Journal of Business Venturing Design</em>, 2, 100015.{" "}
              <a
                href="https://doi.org/10.1016/j.jbvd.2023.100015"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4338ca", textDecoration: "underline" }}
              >
                doi.org/10.1016/j.jbvd.2023.100015
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
