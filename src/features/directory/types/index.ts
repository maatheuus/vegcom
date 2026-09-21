export type PlaceStatus =
  | "pending"
  | "rejected"
  | "active"
  | "closed"
  | "moved"
  | "no_longer_vegan";

export type DirectoryEventStatus = "pending" | "active" | "rejected";

export type PlaceVerification = "verified" | "needs_review" | "unverified";
export type PlaceCategory =
  | "restaurant"
  | "market"
  | "bakery"
  | "cafe"
  | "entrepreneur"
  | "other";

export type PriceRange = 1 | 2 | 3;

export type Tab = "map" | "events";

export type ReportType = "closed" | "moved" | "no_longer_vegan" | "wrong_info";

export interface PlaceDetails {
  address?: string;
  phone?: string;
  instagram?: string;
  website?: string;
  description?: string;
  schedule?: string;
  priceRange?: PriceRange;
  tags?: string[];
}

export interface Place {
  id: number;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  status: PlaceStatus;
  verification: PlaceVerification;
  movedToPlaceId?: number;
  details: PlaceDetails;
  rejectionReason?: string;
  rejectedAt?: number;
  createdAt: number;
  updatedAt: number;
}

export interface DirectoryEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  street?: string;
  city?: string;
  lat?: number;
  lng?: number;
  description?: string;
  link?: string;
  status: DirectoryEventStatus;
  rejectionReason?: string;
  rejectedAt?: number;
  userId: number | null;
  createdAt: number;
}

export interface DirectoryEventsPage {
  data: DirectoryEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
  priceRange?: PriceRange;
  tags?: string[];
}

export interface CreatePlaceReportPayload {
  placeId: number;
  type: ReportType;
  description?: string;
  latitude?: number;
  longitude?: number;
  turnstileToken?: string;
}

export interface PlaceReportReceipt {
  received: true;
  followUpToken: string;
}

export interface CreatePlaceReportFollowUpPayload {
  followUpToken: string;
  email?: string;
}

export interface CreateDirectoryEventPayload {
  title: string;
  date: string;
  location: string;
  street: string;
  city: string;
  lat: number;
  lng: number;
  description?: string;
  link?: string;
}

export type UpdateDirectoryEventPayload = Partial<CreateDirectoryEventPayload>;
