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
    *   **Batching:** Consider batching if high volume (e.g., "User X and 5 others liked...").

4.  **Like on Recipe/Post**
    *   **Trigger:** Another user likes/saves a recipe or post created by the user.
    *   **Content:** "User X liked your recipe [Recipe Name]".
    *   **Recipient:** The creator of the recipe/post.

5.  **New Follower** (Future Scope)
    *   **Trigger:** User gets a new follower.
    *   **Content:** "User X started following you".

6.  **System/Security (Transactional - No Opt-out)**
    *   **Email Verification:** Link to verify email address.
    *   **Password Recovery:** Link to reset password.
    *   **Security Alerts:** Login from new device (Low priority for now).

---

## 2. In-App Notifications API

The backend needs to provide endpoints to manage the user's notification center (the bell icon in the menu).

### Data Model (Notification)

```json
{
  "id": "string (uuid)",
  "userId": "string (recipient)",
  "type": "COMMENT_REPLY" | "COMMENT_LIKE" | "RECIPE_LIKE" | "FOLLOW" | "SYSTEM",
  "actorId": "string (user who performed action)",
  "actorName": "string",
  "actorAvatar": "string (url)",
  "entityId": "string (id of the recipe/post/comment)",
  "entityName": "string (title of recipe/post)",
  "message": "string (e.g., 'respondeu seu comentário')",
  "isRead": "boolean",
  "createdAt": "date (ISO string)"
}
```

### Endpoints

#### `GET /notifications`
*   **Description:** Fetch a paginated list of notifications for the authenticated user.
*   **Query Params:** `page`, `limit` (default 10).
*   **Response:** `{ data: Notification[], meta: { total, page, totalPages } }`

#### `GET /notifications/unread-count`
*   **Description:** Get the count of unread notifications to display on the badge.
*   **Response:** `{ count: number }`

#### `PATCH /notifications/:id/read`
*   **Description:** Mark a specific notification as read.
*   **Response:** `{ success: true }`

#### `PATCH /notifications/read-all`
*   **Description:** Mark all notifications for the current user as read.
*   **Response:** `{ success: true, count: number }`

---

## 3. User Preferences API (Account Settings)

Add fields to the User entity or a separate `UserPreferences` entity to store email opt-in status.

### Schema Addition
```json
{
  "emailPreferences": {
    "newFollower": boolean,
    "recipeLike": boolean,
    "commentReply": boolean,
    "commentLike": boolean
    // ...
  }
}
```

#### `PATCH /account/preferences`
*   **Payload:** Partial `emailPreferences` object.
