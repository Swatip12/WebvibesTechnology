# 🗄️ How to Add MySQL Database in Railway - Step by Step

## Don't worry! It's actually super easy. Let me show you exactly what to click.

---

## 📋 What You'll Do

You'll create a Railway account, create a project, and add a MySQL database with just a few clicks. Railway does all the hard work for you!

---

## 🎯 Step-by-Step Instructions

### Step 1: Sign Up for Railway (2 minutes)

1. Open your web browser
2. Go to: **https://railway.app**
3. You'll see a purple website
4. Click the button that says **"Login with GitHub"** (top right corner)
5. It will ask you to authorize Railway - click **"Authorize"**
6. Done! You're now logged into Railway

---

### Step 2: Create a New Project (1 minute)

1. You'll see the Railway dashboard (purple background)
2. Look for a button that says **"New Project"** (usually in the center or top)
3. Click **"New Project"**
4. You'll see several options:
   - Deploy from GitHub repo
   - Deploy from template
   - Empty project
5. Click **"Deploy from GitHub repo"**
6. Select your repository (it should show your webvibes-portal repo)
7. Railway will start scanning your repository

---

### Step 3: Add MySQL Database (This is the important part!)

Now here's where you add the database:

1. You'll see your project dashboard (it might show your backend service)
2. Look for a button that says **"New"** or **"+ New"** (usually top right)
3. Click **"New"**
4. You'll see a menu with options:
   - **Empty Service**
   - **GitHub Repo**
   - **Database** ← Click this one!
   - Template
5. Click **"Database"**
6. You'll see database options:
   - PostgreSQL
   - **MySQL** ← Click this one!
   - MongoDB
   - Redis
7. Click **"Add MySQL"**

**That's it!** Railway will now:
- Create a MySQL database for you
- Start it automatically
- Generate all the connection details
- Make them available as environment variables

You'll see a new card/box appear in your project with the MySQL logo.

---

### Step 4: View Your Database Details (Optional - just to see)

1. Click on the MySQL card/box in your project
2. You'll see tabs at the top: **Variables**, **Settings**, **Metrics**, etc.
3. Click **"Variables"**
4. You'll see Railway automatically created these for you:
   - `MYSQL_HOST` (the database server address)
   - `MYSQL_PORT` (usually 3306)
   - `MYSQL_DATABASE` (your database name)
   - `MYSQL_USER` (username)
   - `MYSQL_PASSWORD` (password)
   - `MYSQL_URL` (complete connection string)

**You don't need to copy these!** Railway automatically makes them available to your backend service.

---

### Step 5: Add Your Backend Service (2 minutes)

Now add your Spring Boot backend:

1. Click **"New"** again (top right)
2. This time click **"GitHub Repo"**
3. Select your repository again
4. Railway will ask you to configure the service

**Important Settings:**

Look for these fields and fill them in:

- **Service Name**: Type `webvibes-backend`
- **Root Directory**: Type `backend` (this tells Railway your backend code is in the backend folder)
- **Build Command**: Type `./mvnw clean package -DskipTests`
- **Start Command**: Type `java -jar target/portal-0.0.1-SNAPSHOT.jar`

Click **"Deploy"** or **"Add Service"**

---

### Step 6: Add Environment Variables to Backend (3 minutes)

This connects your backend to the database:

1. Click on your **backend service** card (the one you just created)
2. Click the **"Variables"** tab at the top
3. You'll see a button **"+ New Variable"** or **"Raw Editor"**
4. Click **"Raw Editor"** (easier to paste multiple variables)
5. Copy and paste this EXACTLY:

```
SPRING_DATASOURCE_URL=jdbc:mysql://${{MYSQL_HOST}}:${{MYSQL_PORT}}/${{MYSQL_DATABASE}}
SPRING_DATASOURCE_USERNAME=${{MYSQL_USER}}
SPRING_DATASOURCE_PASSWORD=${{MYSQL_PASSWORD}}
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.MySQLDialect
SPRING_JPA_SHOW_SQL=false
SPRING_PROFILES_ACTIVE=prod
CORS_ALLOWED_ORIGINS=https://webvibes.co.in,https://www.webvibes.co.in
SERVER_PORT=8080
```

6. Click **"Save"** or **"Update Variables"**

**What just happened?**
- The `${{MYSQL_HOST}}` syntax tells Railway to use the MySQL database you created
- Railway automatically replaces these with the real values
- Your backend now knows how to connect to the database!

---

### Step 7: Deploy and Get Your URL (5 minutes)

1. Railway will automatically start deploying your backend
2. You'll see logs scrolling (this is normal - it's building your app)
3. Wait 5-10 minutes for the build to complete
4. Once done, you'll see a **"Deployments"** section showing "Active"
5. Look for **"Settings"** tab in your backend service
6. Scroll down to find **"Domains"**
7. Click **"Generate Domain"**
8. Railway will give you a URL like: `webvibes-backend-production.up.railway.app`
9. **Copy this URL!** You'll need it for your frontend

---

## 🎉 You're Done with the Database Part!

Your database is now:
- ✅ Created
- ✅ Running
- ✅ Connected to your backend
- ✅ Ready to store data

---

## 🧪 Test Your Backend

1. Copy your Railway backend URL
2. Open a new browser tab
3. Go to: `https://YOUR-RAILWAY-URL.up.railway.app/api/internships`
4. You should see either:
   - `[]` (empty array - this is good! Database is working)
   - Or some JSON data if you have internships

If you see this, your backend and database are working! 🎉

---

## 🤔 Common Questions

**Q: Do I need to install MySQL on my computer?**
A: No! Railway hosts it in the cloud for you.

**Q: Do I need to create tables in the database?**
A: No! Spring Boot will create them automatically when it starts (because we set `ddl-auto=update`).

**Q: How much does the database cost?**
A: Railway charges $5/month total for everything (backend + database).

**Q: What if I make a mistake?**
A: You can delete the database and create a new one anytime. Just click the database card → Settings → Delete.

**Q: Can I see my data in the database?**
A: Yes! Click on the MySQL card → Data tab. Railway provides a built-in database viewer.

---

## 📸 Visual Summary

Here's what your Railway project should look like when done:

```
┌─────────────────────────────────────┐
│     Railway Project Dashboard       │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   MySQL      │  │  Backend    │ │
│  │   Database   │  │  Service    │ │
│  │              │  │             │ │
│  │  Running ✓   │  │  Running ✓  │ │
│  └──────────────┘  └─────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

You should see TWO cards:
1. MySQL (your database)
2. webvibes-backend (your Spring Boot app)

Both should show "Running" or "Active" status.

---

## 🆘 Still Confused?

If you're stuck on any step, tell me:
1. Which step number you're on
2. What you see on your screen
3. What button/option you're looking for

I'll help you through it! 😊

---

## ➡️ What's Next?

Once your backend is deployed on Railway:
1. Copy your Railway backend URL
2. Update your frontend code with that URL
3. Deploy frontend to Vercel
4. Connect your domain

Check `QUICK_DEPLOY_STEPS.md` for the complete flow!
