# CipherStudio Backend Setup Guide

This guide explains how to set up the Node.js/Express backend for CipherStudio with MongoDB and AWS S3 integration.

## Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (free tier available)
- AWS account with S3 bucket
- Environment variables configured

## Project Structure

\`\`\`
backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── File.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── files.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── fileController.js
│   ├── config/
│   │   ├── database.js
│   │   └── s3.js
│   └── app.js
├── .env
├── .env.example
├── package.json
└── server.js
\`\`\`

## Installation

1. Create backend directory:
\`\`\`bash
mkdir cipherstudio-backend
cd cipherstudio-backend
npm init -y
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install express mongoose dotenv cors aws-sdk jsonwebtoken bcryptjs
npm install --save-dev nodemon
\`\`\`

3. Create `.env` file:
\`\`\`
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
NODE_ENV=development
\`\`\`

## MongoDB Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  username: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Projects Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Files Collection
\`\`\`javascript
{
  _id: ObjectId,
  projectId: ObjectId (ref: Project),
  parentId: ObjectId (ref: File, nullable),
  name: String,
  type: String (enum: ['file', 'folder']),
  s3Key: String (nullable, only for files),
  content: String (for small files, optional),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Files
- `POST /api/files` - Create file/folder
- `GET /api/files/:projectId` - Get all files in project
- `GET /api/files/:id` - Get file details
- `PUT /api/files/:id` - Update file content
- `DELETE /api/files/:id` - Delete file

## Sample Implementation

### app.js
\`\`\`javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/files', require('./routes/files'));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
\`\`\`

### server.js
\`\`\`javascript
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
\`\`\`

### Authentication Middleware
\`\`\`javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
\`\`\`

## Deployment

### Deploy to Render

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy

### Deploy to Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

## Frontend Integration

Update your frontend API calls to use the backend:

\`\`\`javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Save project to backend
const saveProject = async (project) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(project)
  });
  return response.json();
};
\`\`\`

## Next Steps

1. Implement authentication in frontend
2. Connect frontend to backend APIs
3. Add file upload to S3
4. Implement real-time collaboration (optional)
5. Add deployment features
