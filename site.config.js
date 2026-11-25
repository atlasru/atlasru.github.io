// Editable content. No build step required.
window.ATLAS_SITE = {
  profile: {
    name: 'Yan / Atlas',
    github: 'atlasru',
    telegram: 'https://t.me/payloadlol',
    email: 'gen0l@protonmail.com'
  },
  projects: [
    {
      name: 'SaverYou',
      slug: 'saveryou',
      kind: 'LIVE / PRODUCTION',
      category: 'Telegram Business archiving',
      description: 'A live Telegram Business service for preserving message history, tracking edits and deletions, and exporting conversations. Includes an administration dashboard and Telegram Stars subscriptions.',
      stack: ['Python', 'PostgreSQL', 'Docker', 'Telegram Business API'],
      year: '2026',
      accent: '#9fbfff',
      art: 'archive',
      linkLabel: 'Open in Telegram',
      url: 'https://t.me/SaverYouRobot'
    },
    {
      name: 'LinkScope',
      slug: 'linkscope',
      kind: 'OSINT / INVESTIGATION',
      category: 'Local-first OSINT workspace',
      description: 'A local-first desktop workspace for link analysis, investigation, and large relationship graphs.',
      stack: ['Rust', 'Tauri', 'TypeScript'],
      year: '2026',
      accent: '#b0a3ff',
      art: 'network',
      url: 'https://github.com/atlasru/linkscope'
    },
    {
      name: 'dot.',
      slug: 'dot',
      kind: 'PRIVACY / NETWORKING',
      category: 'Cross-platform VPN client',
      description: 'Android and Windows VPN client built around Xray-core with a clean, AMOLED-first interface.',
      stack: ['Kotlin', 'Jetpack Compose', 'Xray-core'],
      year: '2026',
      accent: '#9fe9db',
      art: 'route',
      url: 'https://github.com/atlasru/dot'
    },
    {
      name: 'Prism',
      slug: 'prism',
      kind: 'GAMING / CLIENT',
      category: 'Custom DDNet client',
      description: 'A Windows DDNet client with custom visuals, quality-of-life features and a distinct interface.',
      stack: ['C++', 'DDNet', 'Windows'],
      year: '2026',
      accent: '#e1afff',
      art: 'prism',
      url: 'https://github.com/atlasru/prism'
    },
    {
      name: 'SpectraScan',
      slug: 'spectrascan',
      kind: 'VISION / ANDROID',
      category: 'On-device computer vision',
      description: 'Offline Android scanner and real-time target tracker powered by on-device computer vision.',
      stack: ['Kotlin', 'ONNX', 'CameraX'],
      year: '2026',
      accent: '#8ebcff',
      art: 'target',
      url: 'https://github.com/atlasru/SpectraScan'
    },
    {
      name: 'HAU',
      slug: 'hau',
      kind: 'P2P / MESSAGING',
      category: 'Decentralized messaging',
      description: 'A peer-to-peer messenger experiment based on Tox for identity and direct communication.',
      stack: ['C++', 'Qt/QML', 'Tox'],
      year: '2026',
      accent: '#ffc49e',
      art: 'peers',
      url: 'https://github.com/atlasru/hau'
    }
  ],
  stackGroups: [
    { label: 'LANGUAGES', items: ['Python', 'Rust', 'Kotlin', 'C++', 'TypeScript'] },
    { label: 'FRAMEWORKS', items: ['Tauri', 'Qt / QML', 'Jetpack Compose', 'React', 'FastAPI'] },
    { label: 'SYSTEMS & TOOLS', items: ['Git', 'Linux', 'Android', 'Xray-core', 'ONNX', 'Docker', 'PostgreSQL', 'Telegram Business API'] }
  ]
};