# Graphic Chart

This project is a recreation of a combined chart using React, TypeScript, Vite, Tailwind CSS, and Recharts.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
This will generate a production-ready build in the `dist/` directory.

## Features
- **Cost (Area)**: Yellow filled area with a specific U-shape.
- **CPA (Line)**: Blue dashed line flat near zero.
- **ROI confirmed (Spline)**: Green smooth curve with a large marker at the valley.
- **Conversions (Line)**: Purple line with square markers at the start and end.
- **Custom Tooltip**: White card showing precise values on hover.
- **Salmon Background**: Stylized container matching the reference screenshot.
