# WebVibes Technology - Deployment Instructions

## Building the Application

### Frontend (Angular)

1. **Build for Production:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `dist` folder with optimized production files.

2. **Build Output Location:**
   - Files will be in: `frontend/dist/frontend/browser/`

### Backend (Spring Boot)

1. **Build the JAR file:**
   ```bash
   cd backend
   ./mvnw clean package
   ```
   Or on Windows:
   ```bash
   .\mvnw.cmd clean package
   ```

2. **JAR Location:**
   - File will be in: `backend/target/portal-0.0.1-SNAPSHOT.jar`

## Deployment Options

### Option 1: Deploy to Apache/Nginx (Recommended for Production)

#### Apache Configuration
Create/edit `.htaccess` in your Angular dist folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration
Add to your nginx.conf:

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/frontend/dist/frontend/browser;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Proxy API requests to Spring Boot backend
  location /api/ {
    proxy_pass http://localhost:8080/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # WebSocket support
  location /ws/ {
    proxy_pass http://localhost:8080/ws/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
  }
}
```

### Option 2: Deploy to Cloud Platforms

#### Netlify (Frontend Only)
1. Create `netlify.toml` in frontend root:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy:
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist/frontend/browser
```

#### Vercel (Frontend Only)
1. Create `vercel.json` in frontend root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

2. Deploy:
```bash
npm install -g vercel
cd frontend
vercel --prod
```

#### Heroku (Full Stack)

**Frontend (as static site):**
1. Add `static.json` in frontend root:
```json
{
  "root": "dist/frontend/browser",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

**Backend (Spring Boot):**
1. Add `Procfile` in backend root:
```
web: java -jar target/portal-0.0.1-SNAPSHOT.jar
```

### Option 3: Docker Deployment

#### Frontend Dockerfile
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

#### Backend Dockerfile
Create `backend/Dockerfile`:
```dockerfile
FROM maven:3.8.5-openjdk-17 as build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Docker Compose
Create `docker-compose.yml` in project root:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    networks:
      - webvibes-network

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - webvibes-network

networks:
  webvibes-network:
    driver: bridge
```

Run with:
```bash
docker-compose up -d
```

## Important Notes

1. **Environment Variables:**
   - Update API URLs in `frontend/src/environments/environment.prod.ts`
   - Set database credentials in `backend/src/main/resources/application-prod.properties`

2. **CORS Configuration:**
   - Ensure backend CORS settings allow your frontend domain

3. **Database:**
   - Set up MySQL database on your server
   - Run the SQL scripts from `setup-database.sql`

4. **SSL/HTTPS:**
   - Use Let's Encrypt for free SSL certificates
   - Configure your web server for HTTPS

## Testing Deployment

After deployment, test these URLs:
- `http://your-domain.com/` (Home)
- `http://your-domain.com/internships` (Direct URL)
- `http://your-domain.com/admin/internships` (Admin - Direct URL)
- Refresh any page to ensure routing works

All URLs should work without 404 errors!
