# 🚀 Deploy to webvibes.co.in - Quick Start Guide

## ✅ What's Been Done

Your backend configuration has been updated to use environment variables, making it ready for cloud deployment.

---

## 🎯 Next Steps (30 minutes total)

### Step 1: Commit Your Changes (2 minutes)

```bash
git add backend/src/main/resources/application.properties
git commit -m "Configure backend for Railway deployment with environment variables"
git push
```

### Step 2: Deploy Backend to Railway (10 minutes)

#### 2.1 Create Railway Account
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

#### 2.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway will scan and detect your project

#### 2.3 Add MySQL Database
1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway creates the database instantly
4. **Important**: Railway automatically provides these variables:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_DATABASE`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`

#### 2.4 Configure Backend Service
1. Click "New" → "GitHub Repo"
2. Select your repository again
3. Configure settings:
   - **Service Name**: `webvibes-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/portal-0.0.1-SNAPSHOT.jar`

#### 2.5 Set Environment Variables
In the backend service, add these variables:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}
SPRING_DATASOURCE_USERNAME=${MYSQL_USER}
SPRING_DATASOURCE_PASSWORD=${MYSQL_PASSWORD}
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.MySQLDialect
SPRING_JPA_SHOW_SQL=false
SPRING_PROFILES_ACTIVE=prod
CORS_ALLOWED_ORIGINS=https://webvibes.co.in,https://www.webvibes.co.in
SERVER_PORT=8080
```

**Note**: The `${MYSQL_*}` variables are automatically provided by Railway!

#### 2.6 Deploy
1. Click "Deploy"
2. Wait 5-10 minutes for the build
3. Once deployed, copy your backend URL (something like):
   `https://webvibes-backend-production.up.railway.app`

### Step 3: Update Frontend Configuration (3 minutes)

Update `frontend/src/environments/environment.prod.ts` with your Railway backend URL:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-RAILWAY-URL.up.railway.app/api',
  wsUrl: 'wss://YOUR-RAILWAY-URL.up.railway.app/ws'
};
```

Replace `YOUR-RAILWAY-URL` with your actual Railway URL!

Then commit:
```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Update production API URL to Railway backend"
git push
```

### Step 4: Deploy Frontend to Vercel (10 minutes)

#### 4.1 Import to Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`

#### 4.2 Deploy
1. Click "Deploy"
2. Wait 3-5 minutes
3. You'll get a temporary URL like: `https://webvibes-portal.vercel.app`
4. Test it to make sure everything works!

### Step 5: Connect Custom Domain (5 minutes + DNS wait)

#### 5.1 Add Domain in Vercel
1. In your Vercel project, go to "Settings" → "Domains"
2. Add: `webvibes.co.in`
3. Add: `www.webvibes.co.in`
4. Vercel will show you the DNS records to configure

#### 5.2 Update DNS Records
Go to your domain registrar (where you bought webvibes.co.in):

**Add these DNS records:**

For `webvibes.co.in`:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

For `www.webvibes.co.in`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### 5.3 Wait for DNS Propagation
- **Time**: Usually 10 minutes to 24 hours
- **Check status**: https://www.whatsmydns.net
- Vercel will automatically issue SSL certificate once DNS is verified

---

## 🎉 You're Done!

Your website will be live at:
- **https://webvibes.co.in**
- **https://www.webvibes.co.in**

**Total Cost**: ~₹400-500/month
- Railway: $5/month (~₹400) - includes backend + MySQL database
- Vercel: FREE
- Domain: Already owned

---

## 🔍 Testing Your Deployment

### Test Backend (Railway)
Visit: `https://YOUR-RAILWAY-URL.up.railway.app/api/internships`

You should see JSON data or an empty array.

### Test Frontend (Vercel)
Visit: `https://webvibes.co.in` (after DNS propagation)

All pages should load and forms should work!

---

## 🐛 Troubleshooting

### Backend Won't Start?
1. Check Railway logs: Click on your backend service → "Deployments" → View logs
2. Common issues:
   - Missing environment variables
   - Database connection failed (check MYSQL_* variables are set)
   - Build failed (check Java version compatibility)

### Frontend Can't Connect to Backend?
1. Check CORS settings in Railway
2. Make sure `CORS_ALLOWED_ORIGINS` includes your Vercel URL
3. Check browser console for errors

### Domain Not Working?
1. DNS takes time (up to 24 hours)
2. Check DNS propagation: https://www.whatsmydns.net
3. Make sure you added both A and CNAME records correctly

---

## 📋 Deployment Checklist

- [ ] Backend code committed and pushed to GitHub
- [ ] Railway account created
- [ ] MySQL database added in Railway
- [ ] Backend service configured in Railway
- [ ] Environment variables set in Railway
- [ ] Backend deployed successfully (check logs)
- [ ] Backend URL copied
- [ ] Frontend environment.prod.ts updated with Railway URL
- [ ] Frontend changes committed and pushed
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Frontend working on Vercel temporary URL
- [ ] Custom domain added in Vercel
- [ ] DNS A record added for webvibes.co.in
- [ ] DNS CNAME record added for www.webvibes.co.in
- [ ] DNS propagated (check whatsmydns.net)
- [ ] SSL certificate issued by Vercel
- [ ] Website accessible at https://webvibes.co.in
- [ ] All pages working correctly
- [ ] Forms submitting successfully

---

## 💡 Pro Tips

1. **Test Backend First**: Always test your Railway backend URL directly before connecting frontend
2. **Check Logs**: Railway has excellent logging - use it when debugging
3. **CORS is Critical**: Make sure your Vercel domain is in CORS_ALLOWED_ORIGINS
4. **DNS Takes Time**: Don't panic if domain doesn't work immediately
5. **Use HTTPS**: Both Railway and Vercel provide free SSL certificates automatically

---

## 🆘 Need Help?

If you get stuck:

1. **Railway Issues**: 
   - Check deployment logs in Railway dashboard
   - Visit Railway Discord: https://discord.gg/railway

2. **Vercel Issues**:
   - Check build logs in Vercel dashboard
   - Excellent docs: https://vercel.com/docs

3. **DNS Issues**:
   - Contact your domain registrar support
   - Use whatsmydns.net to check propagation

---

## 🚀 Ready to Deploy?

Start with Step 1 above and work through each step. The whole process takes about 30 minutes (plus DNS propagation time).

**Good luck! Your website will be live soon! 🎉**
