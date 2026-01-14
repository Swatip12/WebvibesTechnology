# ⚡ Quick Deploy Steps - webvibes.co.in

## 🎯 Goal
Deploy your full-stack application to **webvibes.co.in** using Railway (backend) + Vercel (frontend)

**Total Time**: ~30 minutes + DNS propagation
**Total Cost**: ~₹400/month

---

## ✅ Step 1: Push Your Code (2 min)

```bash
git add .
git commit -m "Configure for Railway and Vercel deployment"
git push
```

---

## 🚂 Step 2: Railway - Backend + Database (10 min)

### Quick Setup:
1. **Sign up**: https://railway.app → Login with GitHub
2. **New Project** → "Deploy from GitHub repo" → Select your repo
3. **Add MySQL**: Click "New" → "Database" → "Add MySQL"
4. **Add Backend**: Click "New" → "GitHub Repo" → Select repo
   - Root Directory: `backend`
   - Build: `./mvnw clean package -DskipTests`
   - Start: `java -jar target/portal-0.0.1-SNAPSHOT.jar`

### Environment Variables (copy-paste these):
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

5. **Deploy** → Wait 5-10 min → Copy your URL

---

## 🎨 Step 3: Update Frontend (3 min)

Edit `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://YOUR-RAILWAY-URL.up.railway.app/api',
  wsUrl: 'wss://YOUR-RAILWAY-URL.up.railway.app/ws'
};
```

```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Update production API URL"
git push
```

---

## ▲ Step 4: Vercel - Frontend (10 min)

### Quick Setup:
1. **Sign up**: https://vercel.com → Login with GitHub
2. **New Project** → Import your repo
3. **Configure**:
   - Framework: Angular
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist/frontend/browser`
4. **Deploy** → Wait 3-5 min → Test the temporary URL

---

## 🌐 Step 5: Custom Domain (5 min + wait)

### In Vercel:
1. Settings → Domains
2. Add: `webvibes.co.in`
3. Add: `www.webvibes.co.in`

### In Your Domain Registrar:
Add these DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Wait:
- DNS propagation: 10 min - 24 hours
- Check: https://www.whatsmydns.net

---

## ✅ Done!

Your site will be live at:
- **https://webvibes.co.in**
- **https://www.webvibes.co.in**

---

## 🧪 Quick Tests

**Backend**: Visit `https://YOUR-RAILWAY-URL.up.railway.app/api/internships`
**Frontend**: Visit `https://webvibes.co.in`

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Backend won't start | Check Railway logs for errors |
| Frontend can't connect | Check CORS settings in Railway |
| Domain not working | Wait for DNS propagation (up to 24 hours) |
| Database errors | Verify MYSQL_* variables are set in Railway |

---

## 📚 Detailed Guides

- **Full Guide**: `DEPLOY_TO_WEBVIBES_DOMAIN.md`
- **Database Fix**: `DATABASE_FIX_AND_DEPLOYMENT.md`
- **All Options**: `CUSTOM_DOMAIN_HOSTING_GUIDE.md`

---

**Ready? Start with Step 1! 🚀**
