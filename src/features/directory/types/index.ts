export type PlaceStatus = "active" | "closed" | "moved";
export type PlaceCategory =
  | "restaurant"
  | "market"
  | "bakery"
  | "cafe"
  | "entrepreneur"
  | "other";

export type ReportType =
  | "closed"
  | "moved"
  | "wrong_info"
  | "price_change"
  | "other";

export interface PlaceDetails {
  address?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  description?: string;
  schedule?: string;
  priceRange?: 1 | 2 | 3;
  tags?: string[];
}

export interface Place {
  id: number;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  status: PlaceStatus;
  details: PlaceDetails;
  createdAt: number;
  updatedAt: number;
}

export interface DirectoryEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
  link?: string;
  userId: number | null;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  status: "approved" | "pending" | "rejected";
}

export type FilterCategory = PlaceCategory | "all";

// ---------- API payloads ----------

export interface CreatePlacePayload {
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  instagram?: string;
  website?: string;
  description?: string;
  schedule?: string;
  priceRange?: 1 | 2 | 3;
  tags?: string[];
}

export interface CreatePlaceReportPayload {
  placeId: number;
  type: ReportType;
  description?: string;
}

export interface CreateDirectoryEventPayload {
  title: string;
  date: string;
  location: string;
  description?: string;
  link?: string;
}

export type UpdateDirectoryEventPayload = Partial<CreateDirectoryEventPayload>;
