"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import mammoth from "mammoth";
import KineticMatrix from "@kinetic/visualization";
import { FRAMEWORKS, frameworkSummaryForPrompt } from "@kinetic/frameworks";

// Build system prompt from shared framework definitions
const fw = FRAMEWORKS.thinking;
const d1 = fw.dimensions.dim1;
const d2 = fw.dimensions.dim2;
const styleList = Object.entries(fw.styles)
  .map(([name, s]) => `- ${name.toUpperCase()} (${s.poles[0].toLowerCase()} + ${s.poles[1].toLowerCase()}): ${s.description.split(".")[0]}`)
  .join("\n");

const SYSTEM_PROMPT = `You are an analytical tool for mapping text onto the Kinetic Thinking Styles (KTS) framework developed by Dimov & Pistrui (2023).

The KTS framework has two dimensions:

DIMENSION 1: ATTITUDE TOWARDS ${d1.name.toUpperCase()} (What we do)
This is a continuum from ${d1.left.toUpperCase()} to ${d1.right.toUpperCase()}.
- ${d1.left.toUpperCase()} pole: The text emphasises rational justification for actions, evidence-based decision making, anticipation and evaluation of consequences, accountability, structured planning, deliberate strategy. Language markers: causal reasoning ("because", "therefore", "in order to"), evidence references ("data shows", "analysis indicates"), risk mitigation, goal-outcome chains, evaluation criteria, due diligence.
- ${d1.right.toUpperCase()} pole: The text emphasises probing, experimenting, acting to see what happens, tolerance of ambiguity, improvisation, serendipity, trial and error. Language markers: exploratory framing ("let's see", "what if", "we tried"), comfort with not knowing, pivot language, emergence, surprise as positive, action for its own sake, iterative discovery.

DIMENSION 2: ATTITUDE TOWARDS ${d2.name.toUpperCase()} (What we see)
This is a continuum from ${d2.left.toUpperCase()} to ${d2.right.toUpperCase()}.
- ${d2.left.toUpperCase()} pole: The text operates within established categories and frameworks, evaluates fit and relevance of information against existing schema, focuses on what IS, convergent reasoning, validation against known patterns. Language markers: categorical language, taxonomies, benchmarking, fit assessment, established metrics, industry norms, historical precedent, "best practices".
- ${d2.right.toUpperCase()} pole: The text reframes situations, imagines alternatives, signals discontinuity, sees novel possibilities, focuses on what is NOT YET, divergent reasoning, future-oriented speculation. Language markers: metaphorical/analogical thinking, reframing ("what if we think of this as..."), possibility language, imagination, vision of transformation, disruption, questioning assumptions.

SCORING: Score each dimension from -10 to +10.
- Attitude towards ${d1.name.toLowerCase()}: -10 = pure ${d1.left.toLowerCase()}, +10 = pure ${d1.right.toLowerCase()}
- Attitude towards ${d2.name.toLowerCase()}: -10 = pure ${d2.left.toLowerCase()}, +10 = pure ${d2.right.toLowerCase()}

The four quadrants are:
${styleList}

Respond ONLY with valid JSON in this exact format, no markdown, no backticks:
{"uncertainty_score": <number -10 to 10>, "possibility_score": <number -10 to 10>, "style": "<${Object.keys(fw.styles).join("|")}>", "uncertainty_reasoning": "<2-3 sentences explaining the uncertainty dimension score with specific textual evidence>", "possibility_reasoning": "<2-3 sentences explaining the possibility dimension score with specific textual evidence>", "key_indicators": ["<phrase or pattern 1>", "<phrase or pattern 2>", "<phrase or pattern 3>", "<phrase or pattern 4>", "<phrase or pattern 5>"], "summary": "<1-2 sentence overall interpretation of the thinking style revealed in this text>"}`;

const SAMPLE_TEXTS = {
  "Personal reflection": `I am an Industrial Engineer – I believe in setting objectives, determining the best way to achieve them, and execute accordingly. I value rational thinking and structure. I gathered tons of information and was in a far better position to judge the viability of the project, but still, a lot of pieces of the puzzle didn't click. For example, there was a problem with finding the right domain experts that can build this type of complex software. And the funding was not guaranteed, so I had to drop it. I naturally tend to make decisions based on concrete data. Be it statistics, marketing, primary or secondary research. I like to have lots of data to use in making a decision.`,
  "Visionary founder pitch": `We're not building another analytics tool. We're reimagining what it means for a business to understand itself. What if your company could feel its own pulse — not through dashboards and KPIs, but through a living, breathing sense of where momentum is building and where energy is fading? We don't know exactly what form this will take yet, and that's the exciting part. We've been experimenting with some wild ideas — ambient data experiences, spatial computing interfaces — and every prototype surprises us. The market doesn't know it needs this yet, but when they see it, everything will shift.`,
  "Operations report": `Q3 operational efficiency improved by 3.2% against our target of 3.0%, driven primarily by the supply chain optimization initiative launched in Q1. Process standardisation across the three manufacturing sites has reduced variance in output quality from 4.1% to 2.8%. We recommend continuing the phased rollout of the new ERP modules, with Stage 3 implementation scheduled for Q4 pending successful completion of user acceptance testing. Risk assessment indicates two areas requiring attention: vendor concentration in the Southeast Asian supply corridor and pending regulatory changes in packaging standards. Mitigation plans are detailed in Appendix C.`,
  "Design thinking workshop": `Today we threw out the brief entirely. Instead of solving the problem as stated, we asked: whose problem is this really? We spent the morning in the field, just watching and listening, letting patterns emerge rather than hunting for them. One conversation with a nightshift nurse completely upended our assumptions — what we thought was a logistics problem turned out to be a trust problem. We prototyped three completely different directions in the afternoon, deliberately making them rough and provocative. The one that got the strongest reaction — both positive and negative — is the one we're pursuing tomorrow. We have no idea if it'll work, but it feels alive.`
};

const styleColors = Object.fromEntries(
  Object.entries(FRAMEWORKS.thinking.colors)
    .filter(([k]) => k !== "default")
    .map(([k, v]) => [k, { accent: v }])
);

function KTSMatrix({ uncertaintyScore, possibilityScore, style }) {
  const color = styleColors[style] || styleColors.Focused;
  return (
    <KineticMatrix
      dim1Score={uncertaintyScore}
      dim2Score={possibilityScore}
      accentColor={color.accent}
      backgroundSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/plot-background.png`}
      maxSize={400}
    />
  );
}

function DimensionBar({ label, leftLabel, rightLabel, score, color }) {
  const pct = ((score + 10) / 20) * 100;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>{leftLabel}</span>
        <span style={{ fontSize: 12, color: "#374151", fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Crimson Pro', Georgia, serif", fontStyle: "italic" }}>{rightLabel}</span>
      </div>
      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: 6, background: "#d1d5db" }} />
        <div style={{
          position: "absolute", left: `${pct}%`, top: -3, width: 12, height: 12,
          borderRadius: "50%", background: color, transform: "translateX(-50%)",
          boxShadow: `0 0 12px ${color}40`
        }} />
      </div>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 13, color, fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600 }}>
        {score > 0 ? "+" : ""}{score.toFixed(1)}
      </div>
    </div>
  );
}

function FileUpload({ onTextExtracted }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const inputRef = useRef(null);

  const processFile = async (file) => {
    setFileError(null);
    setFileName(file.name);
    setExtracting(true);
    const ext = file.name.split(".").pop().toLowerCase();

    try {
      if (ext === "txt" || ext === "md" || ext === "csv") {
        const text = await file.text();
        onTextExtracted(text, file.name, null);
      } else if (ext === "pdf") {
        const base64 = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result.split(",")[1]);
          reader.onerror = () => rej(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });
        onTextExtracted(null, file.name, { type: "pdf", base64 });
      } else if (ext === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        onTextExtracted(result.value, file.name, null);
      } else {
        setFileError(`Unsupported file type: .${ext}. Use PDF, DOCX, or TXT.`);
      }
    } catch (err) {
      setFileError("Could not read file. Please try another format.");
      console.error(err);
    } finally {
      setExtracting(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          padding: "24px 16px",
          border: `1.5px dashed ${dragActive ? "#9ca3af" : "#d1d5db"}`,
          borderRadius: 6,
          background: dragActive ? "#f3f4f6" : "#ffffff",
          cursor: "pointer", textAlign: "center", transition: "all 0.2s",
        }}
      >
        <input
          ref={inputRef} type="file" accept=".pdf,.docx,.txt,.md"
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
          style={{ display: "none" }}
        />
        <div style={{ fontSize: 13, color: "#6b7280", fontFamily: "'Crimson Pro', Georgia, serif" }}>
          {extracting ? (
            <span style={{ color: "#6b7280" }}>Extracting text…</span>
          ) : fileName ? (
            <span style={{ color: "#374151" }}>📄 {fileName}</span>
          ) : (
            <>
              <span style={{ color: "#6b7280" }}>Drop a file here</span>{" "}or{" "}
              <span style={{ color: "#374151", textDecoration: "underline" }}>browse</span>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>PDF · DOCX · TXT</div>
            </>
          )}
        </div>
      </div>
      {fileError && <div style={{ marginTop: 8, fontSize: 12, color: "#dc2626" }}>{fileError}</div>}
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState("text");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSample, setSelectedSample] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [sourceLabel, setSourceLabel] = useState(null);

  const analyzeText = useCallback(async () => {
    if (!text?.trim() && !pdfData) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let messages;
      if (pdfData) {
        messages = [{
          role: "user",
          content: [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdfData.base64 } },
            { type: "text", text: "Extract the main textual content from this document, then analyse it and map it onto the KTS framework. Respond only with JSON." },
          ],
        }];
      } else {
        const truncated = text.slice(0, 12000);
        messages = [{
          role: "user",
          content: `Analyse the following text and map it onto the KTS framework. Respond only with JSON.\n\nTEXT:\n${truncated}`,
        }];
      }

      // Call our own API route (not Anthropic directly)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const responseText = data.content
        .map((item) => (item.type === "text" ? item.text : ""))
        .filter(Boolean)
        .join("\n");

      const clean = responseText.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [text, pdfData]);

  const handleSampleSelect = (key) => {
    setSelectedSample(key);
    setText(SAMPLE_TEXTS[key]);
    setInputMode("text");
    setPdfData(null);
    setSourceLabel(null);
    setResult(null);
  };

  const handleFileText = (extractedText, fileName, pdf) => {
    setSourceLabel(fileName);
    setSelectedSample("");
    setResult(null);
    if (pdf) { setPdfData(pdf); setText(""); }
    else { setPdfData(null); setText(extractedText || ""); }
  };

  const colors = result ? styleColors[result.style] || styleColors.Focused : null;
  const canAnalyze = text.trim() || pdfData;

  return (
    <div style={{
      minHeight: "100vh", background: "#fafafa", color: "#1f2937",
      fontFamily: "'Crimson Pro', Georgia, serif", padding: "24px 16px",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 8 }} />
          <h1 style={{
            fontSize: 28, fontWeight: 400, color: "#111827", lineHeight: 1.2, margin: 0,
            borderBottom: "1px solid #e5e7eb", paddingBottom: 16
          }}>
            Kinetic Thinking Styles in Practice<br />
            <span style={{ fontSize: 18, color: "#6b7280", fontStyle: "italic" }}>Text Analyzer</span>
          </h1>
          <p style={{
            fontSize: 13, color: "#6b7280", marginTop: 12, lineHeight: 1.6, maxWidth: 620
          }}>
            Maps written text onto the Kinetic Thinking Styles framework by analysing linguistic markers
            of attitudes towards uncertainty (reason ↔ play) and possibility (structure ↔ openness).
          </p>
        </div>

        {/* Input mode tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
          {[{ key: "text", label: "Paste text" }, { key: "file", label: "Upload file" }].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setInputMode(tab.key); setResult(null); }}
              style={{
                padding: "8px 20px", fontSize: 12, fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: 1, textTransform: "uppercase",
                background: inputMode === tab.key ? "#ffffff" : "transparent",
                border: "1px solid #e5e7eb",
                borderBottom: inputMode === tab.key ? "1px solid #ffffff" : "1px solid #e5e7eb",
                color: inputMode === tab.key ? "#111827" : "#9ca3af",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Samples */}
        {inputMode === "text" && (
          <div style={{ marginBottom: 12 }}>
            <div style={{
              fontSize: 10, color: "#9ca3af", marginBottom: 6,
              textTransform: "uppercase", letterSpacing: 2, fontFamily: "Inter, system-ui, sans-serif"
            }}>
              Sample texts
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.keys(SAMPLE_TEXTS).map((key) => (
                <button key={key} onClick={() => handleSampleSelect(key)} style={{
                  padding: "5px 12px", fontSize: 11, fontFamily: "'Crimson Pro', Georgia, serif",
                  background: selectedSample === key ? "#f3f4f6" : "#ffffff",
                  border: `1px solid ${selectedSample === key ? "#d1d5db" : "#e5e7eb"}`,
                  borderRadius: 3, color: selectedSample === key ? "#111827" : "#6b7280", cursor: "pointer",
                }}>
                  {key}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        {inputMode === "text" ? (
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setSelectedSample(""); setPdfData(null); }}
            placeholder="Paste or type text to analyse..."
            style={{
              width: "100%", minHeight: 140, padding: 14, fontSize: 14, lineHeight: 1.7,
              fontFamily: "'Crimson Pro', Georgia, serif", background: "#ffffff",
              border: "1px solid #e5e7eb", borderRadius: 6,
              color: "#1f2937", resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
          />
        ) : (
          <FileUpload onTextExtracted={handleFileText} />
        )}

        {sourceLabel && inputMode === "file" && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>
            Source: {sourceLabel}
          </div>
        )}

        <button
          onClick={analyzeText}
          disabled={loading || !canAnalyze}
          style={{
            marginTop: 12, padding: "10px 28px", fontSize: 13,
            fontFamily: "'Crimson Pro', Georgia, serif", fontWeight: 600, letterSpacing: 1,
            background: loading || !canAnalyze ? "#e5e7eb" : "#002c5f",
            border: `1px solid ${loading || !canAnalyze ? "#d1d5db" : "#002c5f"}`, borderRadius: 4,
            color: loading || !canAnalyze ? "#9ca3af" : "#ffffff",
            cursor: loading || !canAnalyze ? "default" : "pointer",
          }}
        >
          {loading ? "Analysing…" : "Analyse"}
        </button>

        {error && (
          <div style={{
            marginTop: 16, padding: 12,
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 4, fontSize: 13, color: "#dc2626"
          }}>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ marginTop: 32, animation: "fadeIn 0.5s ease" }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

            <div style={{
              display: "inline-block", padding: "6px 18px",
              background: `${colors.accent}15`, border: `1px solid ${colors.accent}40`,
              borderRadius: 4, marginBottom: 20,
            }}>
              <span style={{
                fontSize: 11, color: "#9ca3af", textTransform: "uppercase",
                letterSpacing: 2, fontFamily: "Inter, system-ui, sans-serif"
              }}>
                Detected style:{" "}
              </span>
              <span style={{ fontSize: 16, color: colors.accent, fontWeight: 600 }}>
                {result.style}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              <div>
                <KTSMatrix
                  uncertaintyScore={result.uncertainty_score}
                  possibilityScore={result.possibility_score}
                  style={result.style}
                />
              </div>
              <div>
                <DimensionBar
                  label="Attitude towards uncertainty" leftLabel="Reason"
                  rightLabel="Play" score={result.uncertainty_score} color="#c4798a"
                />
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>
                  {result.uncertainty_reasoning}
                </div>
                <DimensionBar
                  label="Attitude towards possibility" leftLabel="Structure"
                  rightLabel="Openness" score={result.possibility_score} color="#7ab5a0"
                />
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>
                  {result.possibility_reasoning}
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 24, padding: 16,
              background: "#ffffff", border: "1px solid #e5e7eb",
              borderRadius: 6,
            }}>
              <div style={{
                fontSize: 11, color: "#9ca3af", textTransform: "uppercase",
                letterSpacing: 2, marginBottom: 10, fontFamily: "Inter, system-ui, sans-serif"
              }}>
                Key linguistic indicators
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {result.key_indicators?.map((ind, i) => (
                  <span key={i} style={{
                    padding: "4px 12px", fontSize: 12, fontStyle: "italic",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 3, color: "#6b7280",
                  }}>
                    &ldquo;{ind}&rdquo;
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: 16, padding: 16,
              borderLeft: `3px solid ${colors.accent}40`,
              background: `${colors.accent}08`,
              borderRadius: "0 6px 6px 0",
            }}>
              <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>
                {result.summary}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
