# 🚀 WebVibes.co.in - Custom Domain Hosting Guide

## Your Goal: Deploy to **webvibes.co.in**

Since Render now requires paid plans for backend hosting, here are the best alternatives to host your full-stack application on your custom domain.

---

## 🎯 Recommended Hosting Solutions

### Option 1: Railway + Vercel (Most Cost-Effective)
**Cost: ~₹800-1200/month**
- **Frontend**: Vercel (Free)
- **Backend + Database**: Railway ($5/month)
- **Domain**: Already owned

### Option 2: Heroku + Vercel (Reliable)
**Cost: ~₹1500-2000/month**
- **Frontend**: Vercel (Free)
- **Backend**: Heroku Eco ($7/month)
- **Database**: Heroku Postgres ($9/month)

### Option 3: DigitalOcean Droplet (Full Control)
**Cost: ~₹800-1200/month**
- **Everything**: DigitalOcean Droplet ($6/month)
- **Domain**: Already owned

### Option 4: AWS Free Tier (12 months free)
**Cost: Free for 1 year, then ~₹1000-1500/month**
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS EC2 (t2.micro)
- **Database**: AWS RDS (db.t3.micro)

---

## 🏆 RECOMMENDED: Option 1 - Railway + Vercel

This is the most cost-effective and developer-friendly option.

### Step 1: Deploy Backend on Railway (15 minutes)

#### 1.1 Sign Up for Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

#### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `webvibes-portal` repository
4. Railway will detect it's a monorepo

#### 1.3 Configure Backend Service
1. Click "Add Service" → "GitHub Repo"
2. Configure:
   - **Service Name**: `webvibes-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/portal-0.0.1-SNAPSHOT.jar`

#### 1.4 Add Database
1. Click "Add Service" → "Database" → "PostgreSQL"
2. Railway will automatically create and connect the database

#### 1.5 Configure Environment Variables
Railway will auto-generate database variables. Add these additional ones:

```env
CORS_ALLOWED_ORIGINS=https://webvibes.co.in,https://www.webvibes.co.in
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
JAVA_OPTS=-Xmx512m -Xms256m
```

#### 1.6 Deploy
1. Click "Deploy"
2. Wait 5-10 minutes
3. Copy your backend URL: `https://webvibes-backend-production.up.railway.app`

### Step 2: Update Frontend Configuration (5 minutes)

Update `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://webvibes-backend-production.up.railway.app/api',
  wsUrl: 'wss://webvibes-backend-production.up.railway.app/ws'
};
```

### Step 3: Deploy Frontend on Vercel (10 minutes)

#### 3.1 Import Project to Vercel
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure:
   - **Framework**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`

#### 3.2 Deploy
1. Click "Deploy"
2. Wait 3-5 minutes
3. You'll get a URL like: `https://webvibes-portal.vercel.app`

### Step 4: Connect Custom Domain (30 minutes + DNS propagation)

#### 4.1 Add Domain in Vercel
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add domain: `webvibes.co.in`
4. Add domain: `www.webvibes.co.in`
5. Vercel will show DNS records to configure

#### 4.2 Configure DNS Records
Go to your domain registrar where you bought `webvibes.co.in`:

**For webvibes.co.in:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www.webvibes.co.in:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### 4.3 Wait for DNS Propagation
- **Time**: 2-24 hours
- **Check**: https://www.whatsmydns.net

---

## 🔧 Alternative Options

### Option 2: Heroku Setup

If you prefer Heroku (more expensive but very reliable):

#### Backend on Heroku:
1. Create Heroku account
2. Install Heroku CLI
3. Create app: `heroku create webvibes-backend`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:mini`
5. Deploy: `git subtree push --prefix backend heroku main`

#### Cost: ~$16/month ($7 for app + $9 for database)

### Option 3: DigitalOcean Droplet

For full control and potentially lower costs:

#### Setup:
1. Create DigitalOcean account
2. Create $6/month droplet (Ubuntu)
3. Install Docker and Docker Compose
4. Deploy using Docker containers
5. Set up Nginx as reverse proxy
6. Configure SSL with Let's Encrypt

#### Cost: $6/month + domain

### Option 4: AWS Free Tier

If you haven't used AWS before:

#### Setup:
1. Create AWS account (12 months free tier)
2. Deploy frontend to S3 + CloudFront
3. Deploy backend to EC2 t2.micro
4. Use RDS db.t3.micro for database
5. Configure Route 53 for domain

#### Cost: Free for 12 months, then ~$15-20/month

---

## 📊 Cost Comparison

| Option | Monthly Cost | Pros | Cons |
|--------|-------------|------|------|
| Railway + Vercel | ~₹800 | Easy setup, good performance | Limited free tier |
| Heroku + Vercel | ~₹1500 | Very reliable, great docs | More expensive |
| DigitalOcean | ~₹600 | Full control, cheapest | Requires server management |
| AWS Free Tier | Free/₹1200 | Enterprise grade, free first year | Complex setup |

---

## 🚀 Quick Start (Railway + Vercel)

Here's the fastest way to get your site live on `webvibes.co.in`:

### 1. Push to GitHub (if not already done)
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push
```

### 2. Deploy Backend (Railway)
1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Configure backend service (root: `backend`)
6. Add PostgreSQL database
7. Add environment variables
8. Deploy

### 3. Update Frontend Config
```typescript
// frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-railway-backend-url.up.railway.app/api',
  wsUrl: 'wss://your-railway-backend-url.up.railway.app/ws'
};
```

### 4. Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Import GitHub repo
3. Set root directory to `frontend`
4. Deploy

### 5. Connect Domain
1. In Vercel: Settings → Domains
2. Add `webvibes.co.in` and `www.webvibes.co.in`
3. Update DNS records at your domain registrar
4. Wait for propagation

---

## 🎉 Final Result

Your website will be live at:
- **https://webvibes.co.in**
- **https://www.webvibes.co.in**

**Total monthly cost: ~₹800-1200**

---

## 🆘 Need Help?

If you need assistance with any step:

1. **Railway Issues**: Check Railway docs or Discord community
2. **Vercel Issues**: Excellent documentation at vercel.com/docs
3. **DNS Issues**: Contact your domain registrar support
4. **General Issues**: Railway and Vercel both have great support

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Railway
- [ ] Database connected and working
- [ ] Frontend environment updated
- [ ] Frontend deployed on Vercel
- [ ] Custom domain added in Vercel
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] All pages working
- [ ] Forms submitting correctly
- [ ] Admin panel accessible

---

**Recommendation**: Start with Railway + Vercel. It's the best balance of cost, ease of use, and reliability for your needs.

Would you like me to help you set up any of these options?