<div align="center">

# ⚡ SNIPCAST

### Turn your source code into **beautiful, shareable** images.

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

<br/>

> **Most code screenshot tools try to be invisible.**
> **Snipcast goes the opposite direction — the tool itself is an experience.**

<br/>

[🚀 **Launch App**](https://codesnippt.vercel.app/studio) · [🌐 **Visit Website**](https://codesnippt.vercel.app) · [🐛 **Report Bug**](https://github.com/DShivam9/codesnippt/issues)

</div>

---

## 🎯 What is Snipcast?

**Snipcast** is a code snippet → image generator with an unapologetic **brutalist aesthetic**. It transforms your raw code into stunning, high-contrast, shareable visuals for Twitter/X, LinkedIn, blogs, documentation, or presentations.

No watermarks. No sign-ups. No nonsense. Just paste, style, and export.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Live Preview** | See your snippet update in real-time as you type and customize |
| 🎨 **28+ Syntax Themes** | From GitHub Dark to Synthwave '84 — find your exact vibe |
| 🌈 **Custom Backgrounds** | Curated vibrant gradients & bold solid colors behind your code |
| 💻 **Multi-Language Support** | JavaScript, TypeScript, Python, Rust, Go, HTML, CSS, SQL, Bash, JSON & more |
| 📐 **Adjustable Padding** | Fine-tune the breathing room around your snippet |
| 🔤 **Custom Font Sizes** | Scale your code text from compact to presentation-ready |
| 🪟 **Window Chrome Controls** | Toggle macOS-style traffic light dots for that polished look |
| 📤 **One-Click PNG Export** | High-quality image export powered by `html-to-image` |
| ⚡ **Fully Client-Side** | Zero backend — your code never leaves your browser |

---

## 🏗️ Tech Stack

```
Framework       → Next.js 15 (App Router) + React 19
Language        → TypeScript
Styling         → Tailwind CSS v4 + Custom CSS
Animations      → GSAP (GreenSock) + Framer Motion
Syntax Engine   → Shiki (VS Code-grade highlighting)
Export          → html-to-image
Icons           → Lucide React + Simple Icons
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/DShivam9/codesnippt.git

# Navigate to the project
cd codesnippt

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, or go directly to [http://localhost:3000/studio](http://localhost:3000/studio) to start creating.

---

## 📁 Project Structure

```
codesnippt/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page (brutalist hero + features)
│   │   ├── studio/
│   │   │   └── page.tsx      # The main studio/editor
│   │   ├── globals.css       # Design system & animations
│   │   └── layout.tsx        # Root layout with fonts & metadata
│   ├── components/
│   │   ├── CodeEditor.tsx    # Core editor with syntax highlighting
│   │   └── TransitionLink.tsx# Page transition wrapper
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── next.config.ts            # Next.js configuration
```

---

## 🎨 Design Philosophy

> *"Brutalism in design is about honesty — raw structure, bold typography, and zero pretension."*

Snipcast embraces this philosophy from end to end:

- **Maximum Contrast** — Stark black & white with punches of orange `#FF9F0A`
- **Hard Shadows** — Offset box shadows that feel tactile and deliberate
- **Thick Borders** — 4px borders everywhere, no soft rounded corners
- **Bold Typography** — Oversized, heavy-weight type that demands attention
- **Cinematic Animations** — GSAP-powered staggered reveals and marquees

The tool isn't just functional — it's an experience that makes sharing code feel creative, deliberate, and undeniably stylish.

---

## 🛣️ Roadmap

- [ ] Copy image to clipboard
- [ ] Custom color picker for backgrounds
- [ ] Social media share buttons
- [ ] Custom watermark/branding support
- [ ] More export formats (SVG, JPEG)
- [ ] Tab support for multiple snippets

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ☕ and brutalism by [@DShivam9](https://github.com/DShivam9)**

⭐ **Star this repo if you found it useful!** ⭐

</div>
