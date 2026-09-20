import "leaflet";

declare module "leaflet" {
  interface MarkerCluster extends Layer {
    getChildCount(): number;
    getAllChildMarkers(): Marker[];
    spiderfy(): void;
    unspiderfy(): void;
  }

  interface MarkerClusterGroupOptions extends LayerOptions {
    chunkedLoading?: boolean;
    chunkProgress?: (processed: number, total: number, elapsed: number) => void;
    polygonOptions?: PolylineOptions;
    singleMarkerMode?: boolean;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    spiderfyDistanceMultiplier?: number;
    maxClusterRadius?: number | ((zoom: number) => number);
    disableClusteringAtZoom?: number;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    animateAddingMarkers?: boolean;
    iconCreateFunction?: (cluster: MarkerCluster) => DivIcon | Icon;
    spiderLegPolylineOptions?: PolylineOptions;
    spiderfyShapePositions?: (
      count: number,
      centerPoint: Point,
    ) => Point[];
    clusterPane?: string;
  }

  class MarkerClusterGroup extends LayerGroup {
    constructor(options?: MarkerClusterGroupOptions);
    zoomToBounds(
      bounds: LatLngBoundsExpression,
      options?: FitBoundsOptions,
    ): this;
  }
}
