# Aether Weather

A premium, glassmorphism-styled weather application built with Next.js 14, TypeScript, and Tailwind CSS.
Powered by [Weatherstack API](https://weatherstack.com).

## Features

- **Current Weather**: Real-time temperature, wind, humidity, visibility, and more.
- **Historical Data**: Interactive charts showing temperature trends for past dates.
- **Marine Weather**: Tides and marine condition forecasts.
- **Location Services**: Geolocation support and city search with autocomplete.
- **Customization**: Toggle between Metric/Imperial units and save favorite locations.
- **Design**: Modern Glassmorphism UI with dynamic animated backgrounds.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weatherapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Weatherstack API key:
   ```env
   WEATHERSTACK_API_KEY=your_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Folder Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (GlassCard, SearchBar, Charts).
- `/hooks`: Custom React hooks (useWeather).
- `/services`: API service abstraction.
- `/store`: Zustand state management.
- `/types`: TypeScript definitions.

## License

MIT
