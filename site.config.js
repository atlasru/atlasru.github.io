window.SITE = {
  profile: {
    intro: "Security research, OSINT / GEOINT, networking, desktop and Android software.",
    about: "I'm Yan. I mostly build practical tools around security, investigation, networking and local-first software — usually because I want to use them myself.",
    aboutFacts: [
      ["PLATFORMS", "Windows / Linux / Android / Web"],
      ["INTERESTS", "OSINT / GEOINT / malware analysis / networking / computer vision"],
      ["CURRENT", "Prism / LinkScope / dot. / SpectraScan / HAU"]
    ]
  },

  projects: [
    {
      name: "Prism",
      kind: "DDNet client",
      description: "Windows client built on DDNet with custom visuals, quality-of-life features and its own interface.",
      stack: ["C++", "DDNet", "Windows"],
      year: "2026",
      url: "https://github.com/atlasru/prism",
      visual: "prism",
      accent: "#9a85ff"
    },
    {
      name: "LinkScope",
      kind: "OSINT workspace",
      description: "Local-first desktop workspace for link analysis and large relationship graphs.",
      stack: ["Rust", "Tauri", "TypeScript"],
      year: "2026",
      url: "https://github.com/atlasru/linkscope",
      visual: "graph",
      accent: "#63e6d7"
    },
    {
      name: "dot.",
      kind: "VPN client",
      description: "Android and Windows VPN client built around Xray-core with a minimal AMOLED-first UI.",
      stack: ["Kotlin", "Compose", "Xray-core"],
      year: "2026",
      url: "https://github.com/atlasru/dot",
      visual: "route",
      accent: "#ff8e72"
    },
    {
      name: "SpectraScan",
      kind: "Computer vision",
      description: "Offline Android scanner and real-time target tracker using on-device vision models.",
      stack: ["Kotlin", "YOLO11n", "ONNX", "CameraX"],
      year: "2026",
      url: "https://github.com/atlasru/SpectraScan",
      visual: "target",
      accent: "#6ea8ff"
    },
    {
      name: "HAU",
      kind: "P2P messenger",
      description: "Peer-to-peer messenger experiment using Tox for identity and direct communication.",
      stack: ["C++", "Qt/QML", "Tox"],
      year: "2026",
      url: "https://github.com/atlasru/hau",
      visual: "peers",
      accent: "#d89cff"
    }
  ],

  stackGroups: [
    ["Languages", ["Python", "Kotlin", "TypeScript", "Rust", "C++"]],
    ["Frameworks", ["React", "Tauri", "FastAPI", "Jetpack Compose", "Qt/QML"]],
    ["Platforms / Tools", ["Android", "Linux", "Windows", "Git", "Xray-core"]]
  ],

  links: [
    ["GitHub", "github.com/atlasru", "https://github.com/atlasru"],
    ["Email", "gen0l@protonmail.com", "mailto:gen0l@protonmail.com"],
    ["Telegram", "@payloadlol", "https://t.me/payloadlol"]
  ]
};
