📝 To-Do App

    A fullstack To-Do App built with React (Vite) for the frontend, Node.js/Express for the backend, and MongoDB as the database. The app allows users to register, login, and manage their tasks efficiently with a user-friendly interface and real-time updates.

🚀 Live Demo

    Live Demo


✨ Features
    User Authentication (Register/Login)
    Create, Read, Update, and Delete (CRUD) operations for tasks
    Task prioritization (High/Low)
    Task filtering and sorting
    Responsive UI using Material UI
    Real-time updates with React hooks
    JWT-based user authentication
    Secure backend with CORS and environment variables

🛠️ Tech Stack

    Frontend: React, Vite, Material UI
    Backend: Node.js, Express
    Database: MongoDB (MongoDB Atlas)

    Hosting:

    Frontend: Vercel
    Backend: Render
    Database: MongoDB Atlas

🛠️ Installation

    Follow these steps to run the project locally.

    Prerequisites
    Node.js (v18.x or above)
    MongoDB Atlas Account for the database
    Clone the Repository

    git clone https://github.com/devdatt21/to_do_app.git
    cd to_do_app

    Install Backend Dependencies

    cd server
    npm install

    Install Frontend Dependencies
 
    cd ../frontend
    npm install
    
    Environment Variables
    
    Create a .env file in both server/ and frontend/ directories.

    Backend .env

    MONGO_DB_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    PORT=4000

    Frontend .env

    VITE_API_URL=https://your-backend-service.onrender.com/api

    Start the Development Servers

    Backend (Node.js/Express)


    cd server
    npm start

    Frontend (React/Vite)

    cd frontend
    npm run dev

Open your browser at http://localhost:5173.

🧩 API Endpoints
    User Authentication
    POST /api/users/register - Register a new user
    POST /api/users/login - Login with existing user credentials
    Task Management
    GET /api/tasks - Get all tasks for the logged-in user
    POST /api/tasks - Create a new task
    PUT /api/tasks/:id - Update a task
    DELETE /api/tasks/:id - Delete a task


🤖 Usage

    Register a new user or login with an existing account.
    Create tasks with titles, descriptions, due dates, and priority levels.
    View, edit, or delete tasks as needed.
    Mark tasks as complete or incomplete.

🐛 Troubleshooting

    CORS Error: Ensure your backend CORS configuration allows requests from your Vercel frontend URL.
    MongoDB Connection Error: Verify your MONGO_DB_URI in the backend .env file.
    API Requests Failing: Check that VITE_API_URL is correctly set in the frontend .env file.

🤝 Contributing

    Contributions are welcome! Please fork this repository and submit a pull request.