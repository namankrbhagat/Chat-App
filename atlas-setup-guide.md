# MongoDB Atlas Setup Guide

## Step-by-Step Atlas Setup

### 1. Create Account & Cluster

- Go to [MongoDB Atlas](https://cloud.mongodb.com)
- Sign up with Google/GitHub/Email
- Choose "Build a Database"
- Select "FREE" tier (M0 Sandbox)
- Choose cloud provider (AWS/Google/Azure)
- Select region closest to you
- Name your cluster (e.g., "chatapp-cluster")
- Click "Create Cluster"

### 2. Database Access

- Go to "Database Access" in sidebar
- Click "Add New Database User"
- Authentication: Password
- Username: `chatapp`
- Password: (create strong password)
- Database User Privileges: "Read and write to any database"
- Click "Add User"

### 3. Network Access

- Go to "Network Access" in sidebar
- Click "Add IP Address"
- Choose "Allow access from anywhere" (0.0.0.0/0)
- Click "Confirm"

### 4. Get Connection String

- Go to "Database" in sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string

### 5. Update Environment Variables

#### For Local Development (.env in backend folder):

```
MONGODB_URI=mongodb+srv://chatapp:your-password@chatapp-cluster.xxxxx.mongodb.net/Chat-App?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

#### For Production Deployment:

```
MONGODB_URI=mongodb+srv://chatapp:your-password@chatapp-cluster.xxxxx.mongodb.net/Chat-App?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
CLIENT_ORIGIN=https://your-frontend-domain.com
NODE_ENV=production
```

## Testing Your Connection

### Test locally:

1. Update your backend/.env file with the Atlas connection string
2. Start your backend: `cd backend && npm start`
3. Check if it connects successfully

### Expected output:

```
MongoDB connected: chatapp-cluster-shard-00-00.xxxxx.mongodb.net
Server running on PORT: 3000
```

## Data Migration (If you have existing data)

### Option 1: Start Fresh (Recommended for new app)

- Just use the new Atlas database
- No migration needed

### Option 2: Migrate Existing Data

If you have important data in your local MongoDB:

1. **Install MongoDB Database Tools:**

   - Download from: https://www.mongodb.com/try/download/database-tools
   - Or use: `choco install mongodb-database-tools`

2. **Export from local:**

   ```bash
   mongodump --db Chat-App --out ./backup
   ```

3. **Import to Atlas:**
   ```bash
   mongorestore --uri="mongodb+srv://chatapp:password@cluster.xxxxx.mongodb.net" ./backup/Chat-App
   ```

## Deployment Platforms

### Railway (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy backend with environment variables
4. Deploy frontend separately

### Render

1. Go to [Render.com](https://render.com)
2. Create Web Service for backend
3. Create Static Site for frontend
4. Add environment variables

### Vercel + Railway

1. Deploy frontend on [Vercel.com](https://vercel.com)
2. Deploy backend on Railway
3. Best performance for both

## Security Best Practices

1. **Use strong passwords** for database users
2. **Limit network access** to specific IPs when possible
3. **Enable encryption** in transit (Atlas does this by default)
4. **Regular backups** (Atlas provides automatic backups)
5. **Monitor access** through Atlas dashboard

## Troubleshooting

### Connection Issues:

- Check if IP is whitelisted in Network Access
- Verify username/password in connection string
- Ensure cluster is running (not paused)

### Performance Issues:

- Check if you're using the right cluster tier
- Monitor usage in Atlas dashboard
- Consider upgrading if needed

### Common Errors:

- `Authentication failed`: Check username/password
- `Network timeout`: Check IP whitelist
- `Database not found`: The database will be created automatically
