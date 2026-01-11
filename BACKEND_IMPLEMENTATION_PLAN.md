# Backend Implementation Plan: Featured Recipes

## Overview
This document outlines the backend changes required to support the "Featured Recipe" filters on the frontend. The filters are:
- Most viewed (Month/Week)
- Highest rated (Month/Week)

## API Endpoint

**URL:** `GET /api/v1/recipes/featured`

**Query Parameters:**
- `filter`: String (Required). Values:
  - `most_viewed_month`
  - `most_viewed_week`
  - `best_rated_month`
  - `best_rated_week`

**Response:**
Returns a single `DetailedRecipe` object wrapped in a response envelope.

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Delicious Cake",
    ...
  }
}
```

## Database Changes Required

To support time-based filtering (Weekly/Monthly), the current simple `views` counter on the `Recipe` table is insufficient.

### 1. View Tracking
**Recommendation:** Create a `RecipeViews` table (or similar analytics structure) to track when views occur.

**Schema:**
- `id`: PK
- `recipeId`: FK to Recipe
- `viewedAt`: Timestamp (Default NOW)
- `userId`: FK (Optional, if tracking unique users)
- `ipAddress`: String (Optional, for duplicate prevention)

**Query Logic (Most Viewed):**
- **Week:** Count records in `RecipeViews` where `viewedAt` >= (NOW - 7 DAYS). Group by `recipeId`. Order by count DESC. Limit 1.
- **Month:** Count records in `RecipeViews` where `viewedAt` >= (NOW - 30 DAYS). Group by `recipeId`. Order by count DESC. Limit 1.

### 2. Rating Tracking
Currently, ratings might be derived from `RecipeComment` or a separate `Rating` table.

**Query Logic (Best Rated):**
- **Week:** Average `rating` from `RecipeComment` (or `Rating`) where `createdAt` >= (NOW - 7 DAYS). Group by `recipeId`. Order by Average Rating DESC. Limit 1.
- **Month:** Average `rating` from `RecipeComment` (or `Rating`) where `createdAt` >= (NOW - 30 DAYS). Group by `recipeId`. Order by Average Rating DESC. Limit 1.

*Note:* If the `rating` column on `Recipe` is a global average, it cannot be used for time-based filtering. You must query the source of the ratings with timestamps.

## Implementation Details

1.  **Controller (`FeaturedRecipeController`)**:
    - Validate `filter` query param.
    - Call appropriate service method based on filter.

2.  **Service (`RecipeService`)**:
    - `getMostViewed(period: 'week' | 'month')`
    - `getBestRated(period: 'week' | 'month')`

3.  **Optimization**:
    - These queries can be expensive. Consider caching the results (Redis or similar) with a TTL (e.g., 1 hour) since "Featured Recipe" doesn't need to update in real-time.
