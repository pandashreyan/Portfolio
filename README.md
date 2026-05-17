# MotionFolio - Personal Portfolio Website

Welcome to MotionFolio, a dynamic and modern personal portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion. It showcases projects, skills, and provides interactive features like a contact form, guestbook, and an AI-powered project idea generator.

## ✨ Features

- **Project Showcase**: Display your projects with titles, descriptions, images, technologies used, and links to live demos and repositories.
- **Animated Transitions**: Smooth page transitions and element animations powered by Framer Motion for an enhanced user experience.
- **About Me Section**: A dedicated page to share your background, skills, experience, and achievements.
- **Contact Form**: Allows visitors to send messages directly through the website.
- **Guestbook**: Visitors can leave public messages and sign the guestbook.
- **AI Project Idea Generator**: An interactive tool using Genkit to generate project ideas based on user-provided keywords.
- **Responsive Design**: Fully responsive layout that adapts to various screen sizes.
- **Themed UI**: Utilizes ShadCN UI components with a customizable dark/light theme.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **AI Integration**: Genkit (for the project idea generator)
- **State Management**: React Hooks (useState, useEffect, useForm)
- **Linting & Formatting**: ESLint, Prettier (implied by Next.js setup)
- **Version Control**: Git & GitHub

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/motionfolio.git
    cd motionfolio
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add any necessary environment variables. For the AI features, you'll need:
    ```env
    GOOGLE_GENAI_API_KEY=your_google_ai_api_key
    ```
    You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

5.  **Run the Genkit development server (for AI features):**
    In a separate terminal, run:
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit server, usually on port 3100, which your Next.js app will communicate with for AI functionalities.

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📁 Folder Structure

Here's a brief overview of the key directories:

-   `public/`: Static assets (images, resume PDF, etc.).
-   `src/`: Contains all the source code.
    -   `ai/`: Genkit related code.
        -   `ai-instance.ts`: Genkit AI instance initialization.
        -   `dev.ts`: Genkit development server entry point.
        -   `flows/`: Genkit flows (e.g., `project-idea-flow.ts`).
    -   `app/`: Next.js App Router pages and layouts.
        -   `(pages)/`: Route groups for different sections (e.g., `about`, `projects`, `contact`, `guestbook`).
        -   `globals.css`: Global styles and Tailwind CSS theme configuration.
        -   `layout.tsx`: Root layout for the application.
        -   `page.tsx`: Homepage.
    -   `assets/`: Local static assets like images used in components.
    -   `components/`: Reusable React components.
        -   `ui/`: ShadCN UI components.
        -   `icons/`: Custom SVG icon components.
        -   Other custom components like `header.tsx`, `footer.tsx`, `ai-project-generator.tsx`, etc.
    -   `contexts/`: React context providers (e.g., `loading-context.tsx`).
    -   `hooks/`: Custom React hooks (e.g., `use-toast.ts`, `use-mobile.tsx`).
    -   `lib/`: Utility functions, data, and type definitions.
        -   `data.ts`: Static data for projects, skills, testimonials, etc.
        -   `guestbook-entries.json`: Stores guestbook entries (for local development).
        -   `motion.ts`: Framer Motion animation variants.
        -   `utils.ts`: General utility functions like `cn`.
-   `package.json`: Lists project dependencies and scripts.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.
-   `components.json`: ShadCN UI configuration.
-   `tsconfig.json`: TypeScript configuration.

## 📜 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode with Turbopack.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server with hot-reloading for Genkit flows.
-   `npm run build`: Builds the app for production.
-   `npm start`: Starts the production server (after running `build`).
-   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.
-   `npm run typecheck`: Runs TypeScript to check for type errors.

## ☁️ Deployment

This Next.js application is well-suited for deployment on platforms like:

-   **Vercel**: (Recommended) The creators of Next.js provide seamless deployment.
-   Netlify
-   AWS Amplify
-   Other Node.js hosting providers.

Ensure your environment variables (especially `GOOGLE_GENAI_API_KEY`) are set up in your deployment environment.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/motionfolio/issues) if you want to contribute.

## 📄 License

This project can be considered under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (if you choose to add one).

---

Built with ❤️ by Shreyan Panda.
