# Backend Specifications: Featured Recipe API

## 1. Get Featured Recipe
Returns a single recipe based on the specified filter criteria (views or ratings over a time period).

- **Method:** `GET`
- **Endpoint:** `/recipes/featured`
- **Query Params:**
  - `filter` (required, string): One of the following values:
    - `most_viewed_month`: The recipe with the highest view count in the last 30 days.
    - `most_viewed_week`: The recipe with the highest view count in the last 7 days.
    - `best_rated_month`: The recipe with the highest average rating (calculated from comments/reviews) in the last 30 days.
    - `best_rated_week`: The recipe with the highest average rating in the last 7 days.

**Response Example:**
```json
{
  "id": 123,
  "title": "Lasanha de Berinjela",
  "slug": "lasanha-de-berinjela",
  "description": "Uma lasanha leve e deliciosa...",
  "images": ["https://example.com/image.jpg"],
  "cookTime": "45 min",
  "quantity": 4,
  "rating": 4.8,
  "views": 1500,
  "createdAt": "2023-10-01T10:00:00Z",
  "mealType": "LUNCH",
  "prepTimeCategory": "QUICK"
}
```

**Notes:**
- If no recipe meets the criteria (e.g., no views in the last week), the API should fallback to a default logic (e.g., most viewed all time or latest recipe).
- The `rating` field should be a number between 0 and 5.
- The `views` field represents the count for the requested period (or total if that's how the backend implements it, but period-specific is preferred).
