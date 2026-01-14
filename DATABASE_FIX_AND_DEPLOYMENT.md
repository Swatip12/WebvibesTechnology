# 🔧 Database Connection Fix & Deployment Guide

## 🚨 Current Problem

Your backend is failing with: **"Communications link failure - Connection refused"**

This means your Spring Boot app can't find the MySQL database.

---

## ✅ Solution: Use Railway (Easiest & Cheapest)

Railway automatically provides a MySQL database and connects it for you!

### Step 1: Deploy to Railway (15 minutes)

#### 1.1 Sign Up
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway

#### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `webvibes-portal` repository
4. Railway will detect it's a monorepo

#### 1.3 Add MySQL Database
1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will create and configure the database automatically
4. **Copy the connection details** (you'll need these)

#### 1.4 Configure Backend Service
1. Click "New" → "GitHub Repo"
2. Select your repository
3. Configure the service:

```yaml
Service Name: webvibes-backend
Root Directory: backend
Build Command: ./mvnw clean package -DskipTests
Start Command: java -jar target/portal-0.0.1-SNAPSHOT.jar
```

#### 1.5 Add Environment Variables

Railway auto-generates database variables, but you need to add these:

```env
# Database (Railway provides these automatically as MYSQL_*)
SPRING_DATASOURCE_URL=jdbc:mysql://${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}
SPRING_DATASOURCE_USERNAME=${MYSQL_USER}
SPRING_DATASOURCE_PASSWORD=${MYSQL_PASSWORD}

# Spring Configuration
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.MySQLDialect
SPRING_PROFILES_ACTIVE=prod

# CORS (update after you get your Vercel URL)
CORS_ALLOWED_ORIGINS=https://webvibes.co.in,https://www.webvibes.co.in

# Server
SERVER_PORT=8080
```

**Important:** Railway provides `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD` automatically!

#### 1.6 Deploy
1. Click "Deploy"
2. Wait 5-10 minutes for build
3. Railway will give you a URL like: `https://webvibes-backend-production.up.railway.app`

---

## Step 2: Update Backend Configuration

You need to update your `application.properties` to use environment variables:

### Update `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
spring.jpa.database-platform=${SPRING_JPA_DATABASE_PLATFORM:org.hibernate.dialect.MySQLDialect}
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=${SERVER_PORT:8080}

# CORS Configuration
cors.allowed.origins=${CORS_ALLOWED_ORIGINS:http://localhost:4200}

# Active Profile
spring.profiles.active=${SPRING_PROFILES_ACTIVE:dev}
```

### Commit and Push:
```bash
git add backend/src/main/resources/application.properties
git commit -m "Fix database configuration for Railway"
git push
```

Railway will automatically redeploy!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend Environment

Create/Update `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://webvibes-backend-production.up.railway.app/api',
  wsUrl: 'wss://webvibes-backend-production.up.railway.app/ws'
};
```

Replace `webvibes-backend-production.up.railway.app` with your actual Railway URL!

### 3.2 Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Angular
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`

5. Click "Deploy"
6. Wait 3-5 minutes

---

## Step 4: Connect Custom Domain

### 4.1 Add Domain in Vercel
1. Go to your project in Vercel
2. Settings → Domains
3. Add: `webvibes.co.in`
4. Add: `www.webvibes.co.in`

### 4.2 Update DNS Records

Go to your domain registrar (where you bought webvibes.co.in):

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

### 4.3 Update CORS in Railway

Once you have your Vercel URL, update the CORS environment variable in Railway:

```env
CORS_ALLOWED_ORIGINS=https://webvibes.co.in,https://www.webvibes.co.in,https://your-vercel-url.vercel.app
```

---

## Step 5: Initialize Database

### 5.1 Connect to Railway MySQL

Railway provides a MySQL client in the dashboard:

1. Go to your MySQL database in Railway
2. Click "Connect"
3. Use the provided connection string

### 5.2 Run Your SQL Scripts

```sql
-- Run your setup-database.sql
-- Run your sample-internships.sql (optional)
```

Or let Spring Boot create tables automatically (it will with `ddl-auto=update`)!

---

## 🎉 Final Result

Your website will be live at:
- **https://webvibes.co.in**
- **https://www.webvibes.co.in**

**Total Cost: ~₹400-500/month**
- Railway: $5/month (~₹400)
- Vercel: FREE
- Domain: Already owned

---

## 🔍 Troubleshooting

### Backend Still Won't Connect?

Check Railway logs:
1. Go to Railway dashboard
2. Click on your backend service
3. Click "Deployments" → View logs
4. Look for connection errors

### Common Issues:

**Issue 1: "Unknown database"**
- Solution: Make sure `SPRING_JPA_HIBERNATE_DDL_AUTO=update` is set
- This tells Spring to create tables automatically

**Issue 2: "Access denied"**
- Solution: Check that Railway's MySQL variables are correctly referenced

**Issue 3: Frontend can't reach backend**
- Solution: Check CORS settings in Railway
- Make sure your Vercel URL is in `CORS_ALLOWED_ORIGINS`

---

## 📊 Quick Comparison: Hosting Options

| Option | Monthly Cost | Database Included | Ease of Setup |
|--------|-------------|-------------------|---------------|
| **Railway** | ₹400 | ✅ Yes (MySQL) | ⭐⭐⭐⭐⭐ Easiest |
| Heroku | ₹1500 | ✅ Yes (PostgreSQL) | ⭐⭐⭐⭐ Easy |
| DigitalOcean | ₹600 | ❌ Setup yourself | ⭐⭐ Complex |
| AWS | ₹1000+ | ❌ Setup yourself | ⭐ Very Complex |

**Recommendation: Use Railway!** It's the easiest and most cost-effective for your needs.

---

## 🚀 Quick Start Commands

```bash
# 1. Update application.properties (see Step 2)
# 2. Commit changes
git add .
git commit -m "Configure for Railway deployment"
git push

# 3. Deploy to Railway (via dashboard)
# 4. Deploy to Vercel (via dashboard)
# 5. Update DNS records
# 6. Wait for DNS propagation (2-24 hours)
```

---

## ✅ Checklist

- [ ] Railway account created
- [ ] MySQL database added in Railway
- [ ] Backend service configured in Railway
- [ ] Environment variables set in Railway
- [ ] application.properties updated
- [ ] Changes committed and pushed
- [ ] Backend deployed successfully
- [ ] Frontend environment.prod.ts updated
- [ ] Frontend deployed to Vercel
- [ ] Custom domain added in Vercel
- [ ] DNS records updated
- [ ] CORS updated with Vercel URL
- [ ] Database tables created
- [ ] Website accessible at webvibes.co.in

---

## 💡 Pro Tips

1. **Test Backend First**: Visit your Railway URL + `/api/internships` to test
2. **Check Logs**: Always check Railway logs if something fails
3. **DNS Takes Time**: DNS propagation can take 2-24 hours
4. **Use HTTPS**: Railway and Vercel provide free SSL certificates
5. **Monitor Costs**: Railway has a $5/month plan, monitor your usage

---

## 🆘 Need Help?

If you're still stuck:
1. Check Railway logs for specific errors
2. Verify all environment variables are set correctly
3. Make sure your GitHub repo is up to date
4. Test the backend URL directly before connecting frontend

**The main issue was: No database configured!** Railway solves this by providing MySQL automatically.
