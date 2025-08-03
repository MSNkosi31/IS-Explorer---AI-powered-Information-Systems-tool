# IS Explorer

This is a Next.js application built to explore Information Systems topics. It uses AI to generate summaries, quizzes, and answer questions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later is recommended)
*   A package manager like `npm` or `yarn`. This project uses `npm` by default.
*   [VS Code](https://code.visualstudio.com/) or another code editor of your choice.

### Installation & Setup

1.  **Clone the repository**
    If you have access to the repository, clone it to your local machine. If you received the files directly, simply open the project folder in VS Code.

2.  **Install Dependencies**
    Open a terminal in VS Code (you can use `Ctrl+\``) and run the following command to install all the necessary packages defined in `package.json`:
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**
    This project uses Google's Gemini for its AI features, which requires an API key.
    
    a. Create a new file named `.env.local` in the root of your project.
    
    b. Add the following line to the `.env.local` file, replacing `YOUR_GEMINI_API_KEY` with your actual key:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

Once the dependencies are installed and your environment variables are set, you can start the development server.

1.  **Run the Next.js App**
    In your terminal, run the following command:
    ```sh
    npm run dev
    ```
    This will start the main web application.

2.  **Open in Browser**
    Open your web browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

You are now ready to start developing!