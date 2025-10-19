# CipherStudio Deployment Guide

This guide covers deploying CipherStudio to production using Vercel (frontend) and Render (backend).

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account with repository
- Vercel account (free tier available)

### Step 1: Prepare Repository

1. Push your code to GitHub:
\`\`\`bash
git add .
git commit -m "Initial CipherStudio commit"
git push origin main
\`\`\`

2. Ensure your repository has:
- \`package.json\` with all dependencies
- \`next.config.mjs\` configuration
- \`.gitignore\` file

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`

5. Add environment variables:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
\`\`\`

6. Click "Deploy"

### Step 3: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

## Backend Deployment (Render)

### Prerequisites
- GitHub account with backend repository
- Render account (free tier available)
- MongoDB Atlas account
- AWS account (for S3)

### Step 1: Prepare Backend Repository

Create a new repository for your backend:

\`\`\`bash
mkdir cipherstudio-backend
cd cipherstudio-backend
git init
\`\`\`

Add the following files:

**package.json**
\`\`\`json
{
  "name": "cipherstudio-backend",
  "version": "1.0.0",
  "description": "CipherStudio Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "aws-sdk": "^2.1300.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
\`\`\`

**server.js**
\`\`\`javascript
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

**.env.example**
\`\`\`
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
\`\`\`

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: \`cipherstudio-backend\`
   - Environment: \`Node\`
   - Build Command: \`npm install\`
   - Start Command: \`npm start\`
   - Region: Choose closest to your users

5. Add environment variables:
   - \`MONGODB_URI\`: Your MongoDB Atlas connection string
   - \`JWT_SECRET\`: Generate a secure random string
   - \`AWS_ACCESS_KEY_ID\`: Your AWS access key
   - \`AWS_SECRET_ACCESS_KEY\`: Your AWS secret key
   - \`AWS_S3_BUCKET\`: Your S3 bucket name
   - \`FRONTEND_URL\`: Your Vercel frontend URL

6. Click "Create Web Service"

### Step 3: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Add to Render environment variables

### Step 4: Set Up AWS S3

1. Go to [AWS Console](https://console.aws.amazon.com)
2. Create S3 bucket
3. Create IAM user with S3 access
4. Get access keys
5. Add to Render environment variables

## Environment Variables

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
\`\`\`

### Backend (.env)
\`\`\`
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cipherstudio
JWT_SECRET=your-secret-key-here
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
\`\`\`

## Monitoring & Maintenance

### Vercel
- Monitor deployments in Vercel dashboard
- Check analytics and performance
- Set up error tracking with Sentry

### Render
- Monitor logs in Render dashboard
- Set up alerts for errors
- Monitor database usage

## Troubleshooting

### Frontend Issues

**Build fails:**
- Check Node version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors

**API calls fail:**
- Verify \`NEXT_PUBLIC_API_URL\` is correct
- Check CORS settings on backend
- Verify backend is running

### Backend Issues

**Database connection fails:**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Verify credentials

**S3 upload fails:**
- Verify AWS credentials
- Check S3 bucket permissions
- Verify bucket name

## Performance Optimization

### Frontend
- Enable image optimization
- Use code splitting
- Implement caching strategies

### Backend
- Add database indexing
- Implement caching (Redis)
- Use CDN for static files

## Security Checklist

- [ ] Environment variables are not committed
- [ ] JWT secret is strong and unique
- [ ] CORS is properly configured
- [ ] Database has authentication enabled
- [ ] S3 bucket has proper access controls
- [ ] HTTPS is enforced
- [ ] Rate limiting is implemented
- [ ] Input validation is in place

## Scaling

### Horizontal Scaling
- Use Render's auto-scaling
- Implement load balancing
- Use database replication

### Vertical Scaling
- Upgrade Render plan
- Increase MongoDB resources
- Optimize code and queries

## Backup & Recovery

### Database Backups
- Enable MongoDB Atlas backups
- Test restore procedures
- Document recovery process

### Code Backups
- Use GitHub for version control
- Tag releases
- Maintain changelog

## Support

For deployment issues:
- Check Vercel/Render documentation
- Review error logs
- Contact support@cipherschools.com
