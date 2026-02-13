// ─────────────────────────────────────────────────────────
// Canonical Kinetic Framework Definitions
// Single source of truth for all apps in the monorepo.
// ─────────────────────────────────────────────────────────

const FRAMEWORKS = {
  thinking: {
    id: "kinetic-thinking",
    name: "Kinetic Thinking Style",
    shortName: "Thinking",
    description: "Measures creative and dynamic thinking patterns",
    dimensions: {
      dim1: {
        name: "Uncertainty",
        description: "Attitude towards uncertainty — what we do",
        left: "Reason",
        right: "Play",
      },
      dim2: {
        name: "Possibility",
        description: "Attitude towards possibility — what we see",
        left: "Structure",
        right: "Openness",
      },
    },
    styles: {
      Focused: {
        quadrant: "left-bottom",
        coordinates: { x: "negative", y: "negative" },
        poles: ["Reason", "Structure"],
        traits: ["Organized", "Analytical", "Methodical", "Efficient"],
        description:
          "When facing new ideas or situations, you tend to (1) consider options based on clearly defined goals or a sense of purpose; and (2) deliberate action based on careful assessment of its merits and prospects. Your strength is in organizing information and making sense of the situation.",
      },
      Playful: {
        quadrant: "right-bottom",
        coordinates: { x: "positive", y: "negative" },
        poles: ["Play", "Structure"],
        traits: ["Provocative", "Exploratory", "Organized", "Methodical"],
        description:
          "When facing new ideas or situations, you tend to (1) consider options based on clearly defined goals or sense of purpose; and (2) deliberate action based on seeking new stimuli and setting things in motion for the sake of discovering something interesting. Your strength is in provoking the world the respond, in putting things into play.",
      },
      Incremental: {
        quadrant: "left-top",
        coordinates: { x: "negative", y: "positive" },
        poles: ["Reason", "Openness"],
        traits: ["Analytical", "Methodical", "Imaginative", "Pragmatic"],
        description:
          "When facing new ideas or situations, you tend to (1) consider options based on identifying gaps and a sense of what is missing or what else is possible; and (2) deliberate action based on careful assessment of its merits and prospects. Your strength is in finding weakest links, areas for improvement, and immediate action steps.",
      },
      Breakaway: {
        quadrant: "right-top",
        coordinates: { x: "positive", y: "positive" },
        poles: ["Play", "Openness"],
        traits: ["Provocative", "Exploratory", "Imaginative", "Visionary"],
        description:
          "When facing new ideas or situations, you tend to (1) consider options based on identified gaps and a sense of what is missing or what else is possible; and (2) deliberate action based on seeking new stimuli and setting things in motion for the sake of discovering something interesting. Your strength is in seeking new frontiers and painting a visionary future.",
      },
    },
    colors: {
      Focused: "#ff6f20",
      Playful: "#bed600",
      Incremental: "#9f60b5",
      Breakaway: "#009ddb",
      default: "#ff6f20",
    },
    backgroundImage: "/images/kinetic-thinking-background.png",
  },

  managing: {
    id: "kinetic-managing",
    name: "Kinetic Managing Style",
    shortName: "Managing",
    description: "Measures creative and dynamic managing patterns",
    dimensions: {
      dim1: {
        name: "Process",
        description: "Attitude towards process",
        left: "Control",
        right: "Enable",
      },
      dim2: {
        name: "Performance",
        description: "Attitude towards performance",
        left: "Productivity",
        right: "Learning",
      },
    },
    styles: {
      Efficient: {
        quadrant: "left-bottom",
        coordinates: { x: "negative", y: "negative" },
        poles: ["Control", "Productivity"],
        traits: ["Systematic", "Organized", "Results-driven", "Disciplined"],
        description:
          "You tend to manage through clear procedures, monitoring progress, and focusing on meeting deadlines and targets. Your strength is in driving efficiency and maintaining consistent output.",
      },
      Supportive: {
        quadrant: "right-bottom",
        coordinates: { x: "positive", y: "negative" },
        poles: ["Enable", "Productivity"],
        traits: ["Empowering", "Practical", "People-focused", "Adaptive"],
        description:
          "You tend to manage by giving people freedom to decide how they work while maintaining focus on deliverables. Your strength is in balancing autonomy with accountability.",
      },
      Inquisitive: {
        quadrant: "left-top",
        coordinates: { x: "negative", y: "positive" },
        poles: ["Control", "Learning"],
        traits: ["Analytical", "Curious", "Structured", "Reflective"],
        description:
          "You tend to manage through structured processes while valuing learning and experimentation. Your strength is in systematic inquiry and building organizational knowledge.",
      },
      Venturing: {
        quadrant: "right-top",
        coordinates: { x: "positive", y: "positive" },
        poles: ["Enable", "Learning"],
        traits: ["Exploratory", "Enabling", "Experimental", "Visionary"],
        description:
          "You tend to manage by enabling experimentation and prioritizing learning over immediate productivity. Your strength is in fostering innovation and adaptive capacity.",
      },
    },
    colors: {
      Efficient: "#ff6f20",
      Supportive: "#bed600",
      Inquisitive: "#9f60b5",
      Venturing: "#009ddb",
      default: "#ff6f20",
    },
    backgroundImage: "/images/kinetic-managing-background.png",
  },

  leading: {
    id: "kinetic-leading",
    name: "Kinetic Leading Style",
    shortName: "Leading",
    description: "Measures creative and dynamic leading patterns",
    dimensions: {
      dim1: {
        name: "Ecosystem",
        description: "Attitude towards ecosystem relationships",
        left: "Transact",
        right: "Collaborate",
      },
      dim2: {
        name: "Time",
        description: "Attitude towards time horizon",
        left: "Present",
        right: "Future",
      },
    },
    styles: {
      Troubleshooter: {
        quadrant: "left-bottom",
        coordinates: { x: "negative", y: "negative" },
        poles: ["Transact", "Present"],
        traits: ["Decisive", "Pragmatic", "Direct", "Action-oriented"],
        description:
          "You tend to lead through clear transactional relationships focused on solving immediate problems. Your strength is in decisive action and protecting current performance.",
      },
      "Co-creator": {
        quadrant: "right-bottom",
        coordinates: { x: "positive", y: "negative" },
        poles: ["Collaborate", "Present"],
        traits: ["Collaborative", "Relational", "Present-focused", "Inclusive"],
        description:
          "You tend to lead through collaborative partnerships focused on current challenges. Your strength is in building trust and co-creating solutions with stakeholders.",
      },
      Challenger: {
        quadrant: "left-top",
        coordinates: { x: "negative", y: "positive" },
        poles: ["Transact", "Future"],
        traits: ["Strategic", "Provocative", "Independent", "Visionary"],
        description:
          "You tend to lead through clear exchanges of value while focused on future opportunities. Your strength is in strategic positioning and challenging the status quo.",
      },
      Transformer: {
        quadrant: "right-top",
        coordinates: { x: "positive", y: "positive" },
        poles: ["Collaborate", "Future"],
        traits: ["Visionary", "Collaborative", "Systemic", "Transformative"],
        description:
          "You tend to lead through deep collaboration focused on long-term transformation. Your strength is in building ecosystems of shared purpose and shaping the future together.",
      },
    },
    colors: {
      Troubleshooter: "#ff6f20",
      "Co-creator": "#bed600",
      Challenger: "#9f60b5",
      Transformer: "#009ddb",
      default: "#ff6f20",
    },
    backgroundImage: "/images/kinetic-leading-background.png",
  },
};

// Cross-framework relationships (used by coach for tension exploration)
const CROSS_FRAMEWORK_TENSIONS = [
  {
    pair: ["thinking.dim1", "managing.dim1"],
    label: "Uncertainty ↔ Process",
    description:
      "e.g. a Breakaway thinker who manages as Efficient may experience tension between personal exploratory instincts and controlling team processes.",
  },
  {
    pair: ["thinking.dim2", "leading.dim2"],
    label: "Possibility ↔ Time",
    description:
      "e.g. an established-possibility thinker who leads with future orientation may struggle to see long-term possibilities they're pushing others toward.",
  },
  {
    pair: ["managing.dim2", "leading.dim1"],
    label: "Performance ↔ Ecosystem",
    description:
      "e.g. a productivity-focused manager who collaborates externally may find tensions between internal efficiency demands and partnership flexibility.",
  },
];

// Conceptual cube: the three frameworks form interconnected dimensions
const FRAMEWORK_CUBE = {
  description: "Thinking ↔ Managing ↔ Leading",
  connections: [
    { from: "thinking.dim1", to: "managing.dim1", label: "Uncertainty ↔ Process" },
    { from: "thinking.dim2", to: "leading.dim2", label: "Possibility ↔ Time" },
    { from: "managing.dim2", to: "leading.dim1", label: "Performance ↔ Ecosystem" },
  ],
};

// Helper: get a framework by key
function getFramework(key) {
  return FRAMEWORKS[key] || null;
}

// Helper: get all framework keys
function getFrameworkKeys() {
  return Object.keys(FRAMEWORKS);
}

// Helper: get style colors for a framework (flat map used by visualization)
function getStyleColors(frameworkKey) {
  const fw = FRAMEWORKS[frameworkKey];
  return fw ? fw.colors : null;
}

// Helper: build a compact framework summary for system prompts
function frameworkSummaryForPrompt(frameworkKey) {
  const fw = FRAMEWORKS[frameworkKey];
  if (!fw) return "";
  const d1 = fw.dimensions.dim1;
  const d2 = fw.dimensions.dim2;
  const styleList = Object.entries(fw.styles)
    .map(([name, s]) => `${name} (${s.poles.join("+")})`)
    .join(", ");
  return `${fw.name.toUpperCase()}\nAxes: ${d1.name} (${d1.left} ↔ ${d1.right}) × ${d2.name} (${d2.left} ↔ ${d2.right})\nStyles: ${styleList}`;
}

// Helper: build all-frameworks summary for system prompts
function allFrameworksSummaryForPrompt() {
  return getFrameworkKeys().map(frameworkSummaryForPrompt).join("\n\n");
}

// Helper: get STYLE_RESULT template values for coach output format
function styleResultTemplate(frameworkKey) {
  const fw = FRAMEWORKS[frameworkKey];
  if (!fw) return null;
  const d1 = fw.dimensions.dim1;
  const d2 = fw.dimensions.dim2;
  const styleNames = Object.keys(fw.styles).join("/");
  return {
    framework: frameworkKey,
    dim1_label: d1.name,
    dim1_left: d1.left,
    dim1_right: d1.right,
    dim2_label: d2.name,
    dim2_left: d2.left,
    dim2_right: d2.right,
    styles: styleNames,
  };
}

export {
  FRAMEWORKS,
  CROSS_FRAMEWORK_TENSIONS,
  FRAMEWORK_CUBE,
  getFramework,
  getFrameworkKeys,
  getStyleColors,
  frameworkSummaryForPrompt,
  allFrameworksSummaryForPrompt,
  styleResultTemplate,
};
