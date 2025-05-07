# Prodify: AI Chat Application for Product Marketing

A web-based, AI-powered chat assistant designed for marketing agents, agencies, and curious individuals to discuss a specific product. The AI delivers suggestions, insights, and honest reviews about the product—**never discussing competitors**. Each session is tightly scoped to a single product, and all conversations are anonymous.

---

## ✨ Features

- **Anonymous Access** — No authentication; users can start chatting immediately.
- **Single Product Per Chat** — Each conversation is tied to one product.
- **Competitor-Free AI** — If competitors are mentioned, the AI ends the chat politely.
- **Product-Specific AI Prompting** — AI responses are always based on the selected product's data.
- **Real-Time Streaming Chat** — Powered by Google Gemini 2.0 flash via the Vercel AI SDK.
- **Modern UI/UX** — Built with Next.js App Router, Tailwind CSS, and Lucide icons.

---

## 🛠️ Tech Specs

- **Frontend:** Next.js v15 (App Router)
- **Styling:** Tailwind CSS v4 + Roboto Flex font
- **Icons:** Lucide icon library
- **Backend:** Next.js Edge Runtime
- **AI Model:** Gemini 2.0 flash (via Vercel AI SDK, using `ai`, `@ai-sdk/react`, and `@ai-sdk/google`)
- **Database:** NeonDB (PostgreSQL) via Drizzle ORM
- **TypeScript:** End-to-end type safety
- **UI Library:** Shadcn UI
- **Dev Tools:** Biome.js, Drizzle Kit

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- NeonDB (PostgreSQL) database (or compatible)
- Google Gemini API key (via Vercel AI SDK)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Drish-xD/Prodify.git
   cd product-chat-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add:
   ```
   DATABASE_URL=your_neondb_connection_string
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

4. **Run database migrations:**
   ```bash
   npx drizzle-kit push
   ```

### Running the Application

```bash
npm run dev
# or
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

- `/src/app` — Next.js App Router pages and API routes
- `/src/components` — Reusable React components
- `/src/lib` — Database schema, utilities, and AI helpers
- `/src/types` — TypeScript type definitions

---

## 🧑‍💻 Usage

1. **Add a new product** with details and a list of competitors to avoid.
2. **Start a chat** about the product.
3. **Ask questions** and get AI-generated insights and reviews.
4. **If competitors are mentioned**, the chat will be terminated automatically.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ and AI in Cursor agentic mode.**
