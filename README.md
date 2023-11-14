# Chat App

This is a simple chat application developed using React for the frontend and Socket.io for the backend. It allows users to join chat rooms, send messages, and receive real-time updates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Backend Structure](#backend-structure)
- [Frontend Structure](#frontend-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat functionality.
- Multiple users can join a chat room.
- Automatic profanity filtering using Bad Words library.
- Displays typing indicators.
- Shows a welcome message when a user joins.

## Installation

### Backend

1. Clone the repository:

    ```
    git clone https://github.com/MockingYou/chat-app.git
    cd chat-app
    ```

2. Install dependencies:

    ```
    cd server
    npm install

3. Run the backend server:

    ```
    npm start
    ```

### Frontend

1. Open a new terminal and navigate to the root of the project:

    ```
    cd chat-app
    ```

2. Install frontend dependencies:

    ```
    cd frontend
    npm install
    ```

3. Start the React app:

    ```
    npm start
    ```

4. Visit `http://localhost:3000` in your browser.

## Usage

1. Open the application in your browser.
2. Enter a username and a room name.
3. Start chatting!

## Backend Structure

The backend is built using Node.js, Express, and Socket.io. The main server file is `server.js`, and the relevant logic is organized in the `utils` directory.

- `utils/messages.js`: Contains functions to generate chat messages.
- `utils/users.js`: Manages user-related functions (add, remove, get, get users in a room).
- `index.js`: Configures the Express server, Socket.io, and handles socket events.

## Frontend Structure

The frontend is built using React and communicates with the backend using Socket.io. The main components are organized in the `src/components` directory.

- `App.js`: The main component managing the chat application state and rendering child components.
- `Chat.js`: Renders the chat window and handles message sending.
- `Login.js`: Handles selecting a user and a room to join

