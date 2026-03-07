# 🎓 AI Academy by RiWoT

A production-grade, high-fidelity learning platform for Artificial Intelligence, Machine Learning, and Data Science.

![AI Academy Banner](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000)

## 🚀 Vision
AI Academy is designed to bridge the gap between semi-functional prototypes and premium SaaS-quality educational tools. It provides a seamless, high-performance environment for students to master the technologies shaping our future.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: MDX (next-mdx-remote)
- **Code Execution**: Pyodide (WASM) & Monaco Editor
- **AI**: Google Gemini (Gemma 3 models)
- **Icons**: Lucide React
- **Components**: Radix UI

## 📂 Project Structure
```text
├── content/
│   ├── courses/        # Nested Course > Chapter > Lesson hierarchy
│   ├── tracks/         # Track definitions and course ordering
│   └── content-index.json # Automatically generated curriculum index
├── src/
│   ├── app/            # Next.js App Router pages and API routes
│   ├── components/     # Reusable React components (Quiz, Playground, etc.)
│   └── lib/            # Shared utilities and services (AI, content, Pyodide)
```

## 🏗️ Content Organization
The platform follows a strict hierarchical structure:
1. **Tracks**: High-level learning paths (e.g., AI for Beginners, Data Science).
2. **Courses**: Focused subjects within a track (e.g., Intro to Python, ML Engineering).
3. **Chapters**: Logical modules within a course.
4. **Lessons**: Individual MDX files containing theory, code snippets, and exercises.

## 🧪 Key Features
- **Interactive Python Playground**: Run production Python code in the browser with zero setup.
- **Smart AI Tutor**: Context-aware AI assistant that knows the entire curriculum.
- **High-Performance MDX**: Optimized content rendering with custom interactive components.
- **Responsive & Modern UI**: Premium dark-mode design inspired by Vercel and Stripe.

## 👥 Credits
- **Mir Luqman**: Lead Platform Architect
- **Ibraheem Rashid**: Full-Stack Architect

---
Built with ❤️ by **RiWoT**
