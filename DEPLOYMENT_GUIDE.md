# 🚀 WebVibes Technology - Complete Deployment Guide

## Your Goal: Deploy to **webvibestechno.in**

This guide will help you deploy your application so anyone can access it at `https://webvibestechno.in`

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Domain purchased (webvibestechno.in)
- [ ] Git installed on your computer

---

## Step 1: Push Code to GitHub (10 minutes)

### 1.1 Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name: `webvibes-portal`
4. Make it **Private** (recommended) or Public
5. Click "Create Repository"

### 1.2 Push Your Code

Open terminal in your project root and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - WebVibes Portal"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/webvibes-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Checkpoint:** Your code should now be visible on GitHub!

---

## Step 2: Deploy Backend on Render (15 minutes)

### 2.1 Sign Up for Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest option)
4. Authorize Render to access your repositories

### 2.2 Create Database

1. Click "New +" → "PostgreSQL" (or MySQL if available)
2. Configure:
   - **Name**: `webvibes-db`
   - **Database**: `webvibes_portal`
   - **User**: `webvibes_user`
   - **Region**: Singapore (closest to India)
   - **Plan**: Free
3. Click "Create Database"
4. **IMPORTANT:** Copy the "Internal Database URL" - you'll need this!

### 2.3 Create Web Service

1. Click "New +" → "Web Service"
2. Connect your `webvibes-portal` repository
3. Configure:
   - **Name**: `webvibes-backend`
   - **Region**: Singapore
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Runtime**: Java
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/portal-0.0.1-SNAPSHOT.jar`
   - **Plan**: Free

4. Add Environment Variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=<paste your database URL here>
   JAVA_OPTS=-Xmx512m -Xms256m
   ```

5. Click "Create Web Service"

6. Wait for deployment (5-10 minutes)

7. **Copy your backend URL**: `https://webvibes-backend.onrender.com`

✅ **Checkpoint:** Visit `https://webvibes-backend.onrender.com/api/internships` - should return JSON!

---

## Step 3: Update Frontend Configuration (5 minutes)

### 3.1 Create Production Environment File

Create `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://webvibes-backend.onrender.com/api',
  wsUrl: 'wss://webvibes-backend.onrender.com/ws'
};
```

### 3.2 Update Environment File

Update `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  wsUrl: 'ws://localhost:8080/ws'
};
```

### 3.3 Commit and Push

```bash
git add .
git commit -m "Add production environment configuration"
git push
```

---

## Step 4: Deploy Frontend on Vercel (10 minutes)

### 4.1 Sign Up for Vercel

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel

### 4.2 Import Project

1. Click "Add New..." → "Project"
2. Import your `webvibes-portal` repository
3. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   ```
   Name: NG_APP_API_URL
   Value: https://webvibes-backend.onrender.com/api
   ```

5. Click "Deploy"

6. Wait for deployment (3-5 minutes)

7. You'll get a URL like: `https://webvibes-portal.vercel.app`

✅ **Checkpoint:** Visit your Vercel URL - your website should be live!

---

## Step 5: Connect Your Custom Domain (30 minutes + 24-48 hours DNS)

### 5.1 Buy Domain (if not already purchased)

Go to one of these:
- **GoDaddy India**: https://www.godaddy.com/en-in (~₹599/year)
- **BigRock**: https://www.bigrock.in (~₹499/year)
- **Hostinger**: https://www.hostinger.in (~₹549/year)

Search for and purchase: **webvibestechno.in**

### 5.2 Add Domain in Vercel

1. In Vercel, go to your project
2. Click "Settings" → "Domains"
3. Add domain: `webvibestechno.in`
4. Add domain: `www.webvibestechno.in`
5. Vercel will show you DNS records to add

### 5.3 Configure DNS Records

Go to your domain registrar (GoDaddy/BigRock/Hostinger):

1. Find "DNS Management" or "Manage DNS"
2. Add these records (Vercel will provide exact values):

**For webvibestechno.in:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www.webvibestechno.in:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

3. Save changes

### 5.4 Wait for DNS Propagation

- **Time**: 24-48 hours (usually faster, 2-6 hours)
- **Check status**: https://www.whatsmydns.net

✅ **Checkpoint:** After DNS propagates, visit `https://webvibestechno.in` - your site is live!

---

## Step 6: Set Up Database (10 minutes)

### 6.1 Connect to Database

Use the database connection details from Render to connect via MySQL Workbench or command line.

### 6.2 Run SQL Scripts

Execute your database setup scripts:

```sql
-- Run setup-database.sql
-- Run sample-internships.sql (optional, for test data)
```

---

## 🎉 Final Result

Your website is now live at:
- **Main Site**: https://webvibestechno.in
- **With WWW**: https://www.webvibestechno.in
- **Backend API**: https://webvibes-backend.onrender.com/api

Anyone in the world can now:
- Search "webvibestechno.in" in Google
- Type the URL directly in their browser
- Access all pages including admin panel

---

## 📊 Cost Summary

| Service | Cost | What It Does |
|---------|------|--------------|
| Domain (.in) | ₹500-800/year | Your custom domain name |
| Vercel | FREE | Hosts your frontend |
| Render | FREE | Hosts backend + database |
| **Total** | **₹500-800/year** | Complete website! |

**Note:** Free tiers have limitations. For production with more traffic:
- Vercel Pro: $20/month
- Render Starter: $7/month
- Total: ~₹2,000/month

---

## 🔧 Maintenance & Updates

### To Update Your Website:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. **Automatic deployment!** Vercel and Render will auto-deploy

---

## 🆘 Troubleshooting

### Issue: Backend not connecting to database
**Solution:** Check DATABASE_URL environment variable in Render

### Issue: Frontend can't reach backend
**Solution:** Check CORS settings in Spring Boot and API URL in environment.prod.ts

### Issue: Domain not working after 48 hours
**Solution:** 
- Check DNS records are correct
- Use https://www.whatsmydns.net to verify propagation
- Contact domain registrar support

### Issue: "Application Error" on Render
**Solution:**
- Check Render logs
- Ensure build command is correct
- Check Java version compatibility

---

## 📞 Support

If you need help:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check Vercel logs: Dashboard → Your Project → Deployments → View Logs
3. Render Support: https://render.com/docs
4. Vercel Support: https://vercel.com/docs

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Database created on Render
- [ ] Backend deployed on Render
- [ ] Backend URL working
- [ ] Frontend environment configured
- [ ] Frontend deployed on Vercel
- [ ] Vercel URL working
- [ ] Domain purchased
- [ ] Domain added in Vercel
- [ ] DNS records configured
- [ ] DNS propagated (24-48 hours)
- [ ] Database tables created
- [ ] Test all pages work
- [ ] Test admin panel works
- [ ] Test form submissions work

---

## 🎊 Congratulations!

Your WebVibes Technology portal is now live and accessible to anyone in the world at **https://webvibestechno.in**!

Share your website:
- On social media
- With potential interns
- On your business cards
- In email signatures

Good luck with your internship portal! 🚀
