# Personal Portfolio

Welcome to my personal portfolio website! This is a modern, fully-featured portfolio built with cutting-edge technologies to showcase my skills, projects, and experience.

🌐 **[Visit the Live Website](https://personal-portfolio-rho-orpin-76.vercel.app/)**

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a comprehensive personal portfolio website designed to:
- Showcase my professional work and projects
- Highlight my technical skills and expertise
- Provide an interactive way for visitors to connect with me
- Demonstrate proficiency in modern web technologies

## Tech Stack

The website is built using modern technologies:

- **TypeScript** - For type-safe JavaScript development
- **React** - UI library for building interactive components
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling and responsive design
- **Three.js** - 3D graphics library for interactive visualizations
- **Gemini AI** - Powering the intelligent chatbot
- **Vercel Serverless Functions** - Backend that proxies Gemini and keeps the API key server-side
- **Vercel** - Hosting and deployment platform

## Features

### ✨ Key Highlights

#### 🤖 AI RAG Chatbot
- **Intelligent Assistant**: Powered by Google's Gemini AI
- **RAG (Retrieval-Augmented Generation)**: The chatbot grounds its answers in my resume to give accurate, contextual responses about my background, projects, and expertise
- **Real-time Interactions**: Chat with an AI assistant trained on my portfolio information
- **Natural Conversations**: Ask questions about my skills, projects, experience, and availability
- **Context Aware**: Understands previous conversation context for seamless interactions
- **Server-Side by Design**: The model call runs in a serverless function, so the API key, the system instruction, and the grounding context never reach the browser. The client sends only the message and recent turns
- **Guarded**: Input validation, safety settings, and per-IP rate limiting are enforced on the server, where a caller can't skip them

#### 🏔️ Rotating 3D Mountain Visualization
- **Interactive 3D Graphics**: Built with Three.js for stunning visual effects
- **Smooth Animations**: Continuously rotating 3D mountain scene that captures attention
- **Performance Optimized**: Efficient rendering that doesn't impact page performance
- **Responsive**: Scales beautifully on all device sizes
- **Immersive Experience**: Creates a unique and memorable first impression

#### 🚩 Hidden CTF Challenge
- **A Three-Stage Treasure Hunt**: There's a capture-the-flag puzzle hidden in the site, rewarding visitors who poke around
- **Starts in the Browser Console**: Stage 1 is a nudge printed to the console — the rest of the trail unfolds from there
- **Ends at the Vault**: A terminal-styled challenge screen with a cipher to crack and a flag to claim
- **Discoverable, Not Obnoxious**: A dismissible banner hints that the hunt exists, with an optional nudge for anyone who wants one
- **Progress Persists**: Solved state is remembered in `localStorage`, so the site greets returning solvers accordingly
- **Zero Cost to Everyone Else**: The vault is lazy-loaded and only fetched once triggered, so a normal visit never pays for it

> The trail is intentionally left undocumented here — half the fun is finding it. If you want to read the answers instead of earning them, they're in `src/components/Ctf.tsx`.

#### 📱 Responsive Design
- Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- Optimized viewing experience across all screen sizes
- Adaptive layouts for different screen resolutions

#### 🎨 Modern UI/UX
- Clean and professional design aesthetic
- Smooth animations and transitions throughout
- Intuitive navigation and user interface
- Dark/Light mode support
- Beautiful color schemes and typography

#### 📂 Project Showcase
- Detailed project cards with descriptions, technologies used, and live links
- GitHub repository links for each project
- Filter and search functionality
- Showcase of completed work and case studies

#### 💼 Professional Sections
- **About Me**: Detailed bio and professional summary
- **Skills & Expertise**: Technical and soft skills overview
- **Work Experience**: Career history and accomplishments
- **Education**: Academic background and certifications
- **Projects Portfolio**: Comprehensive project gallery
- **Contact Information**: Multiple ways to get in touch

#### ⚡ Performance Optimized
- Fast load times and optimized performance
- Optimized images and assets for web
- SEO-friendly structure and metadata
- Deployed on Vercel for global CDN coverage
- Lazy loading of components and images

#### 🎯 Interactive Elements
- Smooth scroll animations
- Hover effects and interactive buttons
- Animated section transitions
- Live chat widget with Gemini AI

#### 🔐 Security & Privacy
- Secure API integrations
- Privacy-respecting analytics
- Safe user data handling

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranav3142/PersonalPortfolio.git
   cd PersonalPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local` and fill in your key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   > **Do not prefix this with `VITE_`.** Vite inlines every `VITE_*` variable
   > into the browser bundle at build time, which would publish the key to
   > anyone who views source. The key is read only by the backend.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This serves the frontend on `http://localhost:5173`. The chatbot calls
   `/api/chat`, which is proxied to `http://localhost:3000` — so to exercise it
   locally, run the backend alongside in a second terminal:
   ```bash
   npm run dev:api    # vercel dev, serves the function on :3000
   ```
   The rest of the site works without it.

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the website locally.

### Build for Production

```bash
npm run build
```
This type-checks both `frontend/` and `backend/`, then creates an optimized
production build in `frontend/dist`. Preview it with `npm run preview`, and
type-check on its own with `npm run typecheck`.

### Deploy to Vercel

`vercel.json` sets the build command, the output directory, and the files the
serverless function needs, so deployment is largely automatic:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. **Add `GEMINI_API_KEY` in Project Settings → Environment Variables.** The
   chatbot returns a 503 without it; nothing else on the site is affected
4. Leave the project's Root Directory at the repository root — Vercel only
   picks up serverless functions from a top-level `api/` directory

## Project Structure

The repository is split into a `frontend/` app and a `backend/` that keeps the
Gemini API key off the client.

```text
PersonalPortfolio/
├── frontend/               # The React single-page app
│   ├── public/             # Static assets (resume, models, project images)
│   ├── src/
│   │   ├── components/     # Section components (Hero, About, Projects, ...)
│   │   │   ├── Chatbot.tsx # Chat widget — calls /api/chat, holds no key
│   │   │   ├── ThreeBackground.tsx  # Three.js 3D background scene
│   │   │   ├── Ctf.tsx     # Hidden CTF vault (lazy-loaded)
│   │   │   ├── CtfBanner.tsx   # Dismissible nudge toward the CTF
│   │   │   └── ui/         # Reusable UI primitives (Button, Card, ...)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # Global styles / Tailwind entry
│   ├── index.html          # Vite HTML entry point
│   ├── vite.config.ts      # Vite configuration
│   ├── tailwind.config.ts  # Tailwind configuration
│   └── tsconfig.json       # Frontend TypeScript configuration
├── backend/                # Server-side logic — host-agnostic
│   ├── chat.ts             # Gemini proxy: validation, safety, model call
│   ├── prompt.ts           # System instruction (never sent to the client)
│   ├── resume.ts           # Loads the resume that grounds the model
│   ├── rateLimit.ts        # Best-effort per-IP throttling
│   └── tsconfig.json       # Backend TypeScript configuration
├── api/
│   └── chat.ts             # Vercel entry point — thin adapter over backend/
├── vercel.json             # Build, output directory, function config
├── .env.example            # Environment variable template
├── package.json            # Dependencies and scripts for both halves
└── README.md               # This file
```

## Contributing

Contributions, feedback, and suggestions are welcome! If you'd like to:

- Report a bug
- Suggest new features
- Improve the code or documentation

Please feel free to open an issue or submit a pull request.

## License

This project is open source and available under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

### 📞 Get in Touch

Feel free to connect with me through:

- 🌐 **Website:** [https://personal-portfolio-rho-orpin-76.vercel.app/](https://personal-portfolio-rho-orpin-76.vercel.app/)
- 🐙 **GitHub:** [github.com/pranav3142](https://github.com/pranav3142)

*Made with ❤️ by Pranav*
