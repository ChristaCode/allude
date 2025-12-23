# Virtual Assistant Architecture Presentation

An interactive, single-page React application presenting a system architecture proposal for a virtual assistant for machinists.

## Features

- 🎯 **7 Comprehensive Sections**: Problem statement, architecture diagrams, component deep dives, design decisions, MVP scope, tradeoffs, and tech stack
- 🧭 **Easy Navigation**: Sidebar navigation, previous/next buttons, and keyboard shortcuts (arrow keys)
- 📊 **Progress Indicator**: Visual progress bar at the top showing current section
- 🎨 **Modern Design**: Clean, professional UI with smooth transitions and hover effects
- 📱 **Responsive**: Works well on laptop presentations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

## Navigation

- **Sidebar**: Click any section to jump directly to it
- **Previous/Next Buttons**: Navigate sequentially through sections
- **Keyboard**: Use left/right arrow keys to navigate

## Sections

1. **Problem & Overview**: Introduction to the problem and project scope
2. **High-Level Architecture**: Visual component diagram with data flow
3. **Component Deep Dives**: Detailed breakdown of ingestion, query processing, and response generation
4. **Key Design Decisions**: Interactive cards showing architectural choices with pros/cons
5. **MVP Scope**: Prioritized feature list (P0, P1, P2)
6. **Tradeoffs & Risks**: Risk assessment with mitigation strategies
7. **Tech Stack & Next Steps**: Technology choices and implementation timeline

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

## Project Structure

```
allude/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## Customization

The architecture content is embedded in `App.jsx`. You can easily modify:
- Section content and structure
- Color scheme (update Tailwind config)
- Add more sections
- Modify navigation behavior

## License

MIT

