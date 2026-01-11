export interface Price {
  id: string;
  object: string;
  active: boolean;
  currency: string;
  unit_amount: number;
  unit_amount_decimal: string;
  recurring: {
    interval: string;
    interval_count: number;
    usage_type: string;
  } | null;
  product: string;
  metadata: Record<string, unknown>;
}

export interface Product {
  id: string;
  object: string;
  active: boolean;
  name: string;
  description: string | null;
  images: string[];
  default_price: Price;
  metadata: Record<string, unknown>;
  marketing_features: string[];
}

export interface CreateCheckoutSessionPayload {
  priceId: string;
}

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  url: string;
}

export interface CreatePortalSessionResponse {
  success: boolean;
  url: string;
}
