# Backend Specifications: Email & Notifications

## 1. Email Features

The following triggers should send an email to the user.
Users must be able to opt-out of these emails via their account settings.

### Triggers & Scenarios

1.  **Welcome Email**
    *   **Trigger:** User successfully registers a new account.
    *   **Content:** Welcome message, brief introduction to the platform, link to complete profile.
    *   **Priority:** High.

2.  **Reply to Comment**
    *   **Trigger:** Another user replies to a comment made by the user (on a recipe or post).
    *   **Content:** "User X replied to your comment: [snippet]", link to the conversation.
    *   **Recipient:** The author of the original comment.

3.  **Like on Comment**
    *   **Trigger:** Another user likes a comment made by the user.
    *   **Content:** "User X liked your comment on [Recipe/Post Name]".
    *   **Recipient:** The author of the comment.

4.  **Like on Recipe/Post**
    *   **Trigger:** Another user likes/saves a recipe or post created by the user.
    *   **Content:** "User X liked your recipe [Recipe Name]".
    *   **Recipient:** The creator of the recipe/post.

5.  **New Follower**
    *   **Trigger:** User gets a new follower.
    *   **Content:** "User X started following you".

6.  **System/Security**
    *   **Email Verification:** Link to verify email address.
    *   **Password Recovery:** Link to reset password.

---

## 2. In-App Notifications API

The backend provides the following endpoints to manage the user's notification center.

### 1. List Notifications
Returns a paginated list of notifications for the authenticated user.

- **Method:** `GET`
- **Endpoint:** `/notifications`
- **Query Params:**
  - `page` (optional, number): Page number. Default: `1`.
  - `limit` (optional, number): Items per page. Default: `10`.

**Response Example:**
```json
{
  "data": [
    {
      "id": "1",
      "type": "COMMENT_REPLY",
      "actorId": "u1",
      "actorName": "Maria Silva",
      "actorAvatar": "https://...",
      "entityId": "r1",
      "entityName": "Feijoada Vegana",
      "message": "respondeu seu comentário",
      "isRead": false,
      "createdAt": "2023-10-27T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### 2. Unread Notification Count
Returns the total number of unread notifications.

- **Method:** `GET`
- **Endpoint:** `/notifications/unread-count`

**Response Example:**
```json
{
  "count": 5
}
```

### 3. Mark Notification as Read
Marks a specific notification as read.

- **Method:** `PATCH`
- **Endpoint:** `/notifications/:id/read`
- **URL Params:**
  - `id` (string/number): ID of the notification.

**Response Example:**
```json
{
  "success": true
}
```

### 4. Mark All Notifications as Read
Marks all notifications for the user as read.

- **Method:** `PATCH`
- **Endpoint:** `/notifications/read-all`

**Response Example:**
```json
{
  "success": true,
  "count": 5
}
```
