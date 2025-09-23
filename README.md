# Inbound Insight - AI-Powered Supply Chain Management

This is a [Next.js](https://nextjs.org/) project built with Firebase Studio. It's an AI-powered dashboard for managing inbound supply chains.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repo (or download the files)**
    If you have the project files, you can skip this step.

    ```sh
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Install NPM packages**
    This will install all the necessary dependencies for the project.

    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    The project uses Genkit with Google AI, which requires an API key.

    - Create a new file named `.env` in the root of your project.
    - Add the following line to it:
      ```
      GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
      ```
    - You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

You'll need to run two separate development servers for this project: one for the Next.js frontend and one for the Genkit AI flows.

1.  **Start the Next.js development server:**
    Open a terminal and run:

    ```sh
    npm run dev
    ```

    This will start the web application, usually on [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit development server:**
    Open a second terminal and run:
    ```sh
    npm run genkit:dev
    ```
    This will start the Genkit server, which the Next.js app will call for AI features. You can view the Genkit developer UI at [http://localhost:4000](http://localhost:4000).

Now you can open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application running.
