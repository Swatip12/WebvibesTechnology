# WebSocket Real-Time Updates - Testing Guide

## Overview
The internship portal implements real-time updates using WebSocket (STOMP over SockJS) to automatically refresh the internships list when changes occur on the backend.

## Implementation Details

### Backend Configuration
- **WebSocket Endpoint**: `http://localhost:8080/ws`
- **Topic**: `/topic/internships`
- **Protocol**: STOMP over SockJS
- **CORS**: Configured for `http://localhost:4200`

### Frontend Implementation
The `InternshipsComponent` subscribes to WebSocket updates in the constructor:
```typescript
this.socket.onInternships().subscribe((data) => {
  console.log('WebSocket update received for internships:', data);
  this.load();
});
```

### WebSocket Events
The backend broadcasts messages on `/topic/internships` when:
1. **New internship created** - Sends the new internship object
2. **Internship updated** - Sends the updated internship object
3. **Internship deleted** - Sends `"deleted:{id}"` message

## Testing WebSocket Functionality

### Prerequisites
1. MySQL database running with credentials:
   - Database: `webvibes_portal`
   - Username: `webvibes_user`
   - Password: `webvibes_pass`
2. Backend running on port 8080
3. Frontend running on port 4200

### Test Procedure

#### 1. Start the Application
```bash
# Terminal 1 - Start Backend
cd backend
mvnw.cmd spring-boot:run

# Terminal 2 - Start Frontend
cd frontend
npm start
```

#### 2. Open Browser Console
1. Navigate to `http://localhost:4200/internships`
2. Open browser DevTools (F12)
3. Go to Console tab

#### 3. Verify WebSocket Connection
You should see console logs:
```
WebSocket connection initiated
Subscribing to WebSocket topic: /topic/internships
WebSocket connected successfully
```

#### 4. Test Real-Time Updates

**Option A: Using Admin Interface (when implemented)**
1. Open admin panel in another browser tab
2. Create/update/delete an internship
3. Switch back to internships page
4. Verify the list updates automatically without page refresh

**Option B: Using API Directly**
Use a tool like Postman or curl to trigger backend changes:

```bash
# Create a new internship
curl -X POST http://localhost:8080/api/internships \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Development Intern",
    "department": "Engineering",
    "location": "Bangalore",
    "durationWeeks": 12,
    "description": "Work on exciting projects",
    "active": true
  }'

# Update an internship (replace {id} with actual ID)
curl -X PUT http://localhost:8080/api/internships/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "department": "Engineering",
    "location": "Bangalore",
    "durationWeeks": 12,
    "description": "Updated description",
    "active": true
  }'

# Delete an internship (replace {id} with actual ID)
curl -X DELETE http://localhost:8080/api/internships/{id}
```

#### 5. Verify Console Logs
After each API call, check the browser console for:
```
Message received on /topic/internships: {internship data}
WebSocket update received for internships: {internship data}
```

The internships list should automatically refresh without manual page reload.

### Expected Behavior
- ✅ WebSocket connects automatically when page loads
- ✅ Console shows subscription confirmation
- ✅ When backend creates/updates/deletes internship, frontend receives notification
- ✅ Internships list refreshes automatically
- ✅ No page reload required
- ✅ Filters and search remain applied after update

### Troubleshooting

#### WebSocket Connection Fails
- **Check**: Backend is running on port 8080
- **Check**: CORS configuration allows `http://localhost:4200`
- **Check**: No firewall blocking WebSocket connections
- **Console Error**: "WebSocket error" - Backend not reachable

#### No Updates Received
- **Check**: Backend `SimpMessagingTemplate` is broadcasting messages
- **Check**: Topic name matches: `/topic/internships`
- **Verify**: Backend logs show "convertAndSend" calls
- **Test**: Use browser Network tab to see WebSocket frames

#### Database Connection Issues
- **Error**: "Access denied for user 'webvibes_user'"
- **Solution**: Create MySQL database and user:
```sql
CREATE DATABASE webvibes_portal;
CREATE USER 'webvibes_user'@'localhost' IDENTIFIED BY 'webvibes_pass';
GRANT ALL PRIVILEGES ON webvibes_portal.* TO 'webvibes_user'@'localhost';
FLUSH PRIVILEGES;
```

## Code Enhancements Made

### 1. Enhanced Logging in SocketService
Added comprehensive logging for:
- Connection status
- Subscription events
- Message reception
- Disconnection events

### 2. Enhanced Logging in InternshipsComponent
Added logging to track when WebSocket updates trigger data refresh.

### 3. Connection Lifecycle Tracking
Added callbacks for:
- `onConnect` - Confirms successful connection
- `onWebSocketClose` - Tracks disconnections
- Better error reporting

## Verification Checklist
- [x] WebSocket configuration exists in backend
- [x] STOMP endpoint registered at `/ws`
- [x] Topic `/topic/internships` configured
- [x] Backend broadcasts on create/update/delete
- [x] Frontend subscribes to topic on component init
- [x] Frontend reloads data when message received
- [x] Console logging added for debugging
- [x] Error handling implemented
- [x] Reconnection logic in place (3-second delay)

## Next Steps
Once the database is set up and both servers are running:
1. Follow the test procedure above
2. Verify console logs show WebSocket activity
3. Confirm automatic list updates work
4. Test with multiple browser tabs to see real-time sync
