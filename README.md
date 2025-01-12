# CR-frontend
 
This React app provides a user interface for uploading PDF files, sending them to a backend API for processing, and displaying the extracted content. It is designed to interact with a backend deployed on Render, where the PDFs are processed and the text is extracted.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Build the App](#build-the-app)

## Features

- Drag-and-drop or file input for uploading PDFs.
- Sends the uploaded PDF to a backend server (hosted on Render) for processing.
- Displays an animated loading bar while the file is being processed.
- Displays the extracted text upon successful processing.
- Handles errors and provides feedback to the user.

## Tech Stack

- **React**: Frontend framework.
- **Axios**: HTTP client to make requests to the backend API.
- **CSS**: For styling the components.
- **Versel**: For deployment of the frontend React app.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (Node Package Manager)
- A modern web browser (Chrome, Firefox, etc.)
- A code editor like **VS Code** (optional)

## Getting Started

Follow these instructions to set up and run the app locally.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   
2. **Installing Dependencies**:
   
   ```bash
   npm install
   ```
   or
   ```bash
   npm i

4. **Installing Serve** :

   ```bash
   npm install -g serve
   
### Build the App
1. **Build the React App**:

   ```bash
   npm run build

6. **Serve production ready build**:

   ```bash
   serve -s build
