# 🚀 Chat App Deployment Guide

## Deployment Options

### Option 1: Railway (Recommended)

Railway is perfect for full-stack apps with WebSocket support.

#### Steps:

1. **Sign up at [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy Backend:**
   - Select the `backend` folder
   - Add environment variables:
     ```
     JWT_SECRET=your-secure-jwt-secret
     MONGODB_URI=your-mongodb-atlas-uri
     CLOUDINARY_CLOUD_NAME=your-cloudinary-name
     CLOUDINARY_API_KEY=your-cloudinary-key
     CLOUDINARY_API_SECRET=your-cloudinary-secret
     CLIENT_ORIGIN=https://your-frontend-domain.com
     NODE_ENV=production
     ```
4. **Deploy Frontend:**
   - Create a new service for frontend
   - Select the `frontend` folder
   - Add environment variables:
     ```
     VITE_API_URL=https://your-backend-domain.railway.app/api
     VITE_SOCKET_URL=https://your-backend-domain.railway.app
     ```

### Option 2: Render

Alternative platform with good WebSocket support.

#### Steps:

1. **Sign up at [Render.com](https://render.com)**
2. **Deploy Backend:**
   - Create new Web Service
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Deploy Frontend:**
   - Create new Static Site
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Option 3: Vercel + Railway (Hybrid)

- **Frontend on Vercel** (excellent for React apps)
- **Backend on Railway** (great for Node.js with WebSockets)

## Database Setup (MongoDB Atlas)

1. **Create account at [MongoDB Atlas](https://cloud.mongodb.com)**
2. **Create a new cluster**
3. **Get connection string**
4. **Add to environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Chat-App?retryWrites=true&w=majority
   ```

## Environment Variables Required

### Backend (.env)

```
JWT_SECRET=your-super-secure-jwt-secret
MONGODB_URI=your-mongodb-atlas-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLIENT_ORIGIN=https://your-frontend-domain.com
NODE_ENV=production
PORT=3000
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend-domain.com/api
VITE_SOCKET_URL=https://your-backend-domain.com
```

## Quick Deploy Commands

### Build for Production

```bash
# Install dependencies
npm install

# Build frontend
cd frontend && npm run build

# The built files will be in frontend/dist
```

### Test Production Build Locally

```bash
# Start backend
cd backend && npm start

# The backend will serve the built frontend at http://localhost:3000
```

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is loading correctly
- [ ] Database connection is working
- [ ] Authentication is working
- [ ] Real-time messaging (WebSocket) is working
- [ ] Image uploads are working (if using Cloudinary)
- [ ] CORS is configured correctly
- [ ] HTTPS is enabled (for production)

## Troubleshooting

### Common Issues:

1. **CORS errors**: Check CLIENT_ORIGIN environment variable
2. **WebSocket not working**: Ensure platform supports WebSockets
3. **Database connection**: Verify MONGODB_URI is correct
4. **Authentication failing**: Check JWT_SECRET is set
5. **Images not uploading**: Verify Cloudinary credentials

### Support:

- Check platform logs for errors
- Verify all environment variables are set
- Test API endpoints manually
- Check browser console for frontend errors
