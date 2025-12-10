/**
 * Interface representing the raw City data structure from the IBGE API.
 * The field names correspond directly to the API response.
 */
export interface City {
  "municipio-id": number;
  "municipio-nome": string;
  "microrregiao-id": number;
  "microrregiao-nome": string;
  "mesorregiao-id": number;
  "mesorregiao-nome": string;
  "regiao-imediata-id": number;
  "regiao-imediata-nome": string;
  "regiao-intermediaria-id": number;
  "regiao-intermediaria-nome": string;
  "UF-id": number;
  "UF-sigla": string;
  "UF-nome": string;
  "regiao-id": number;
  "regiao-sigla": string;
  "regiao-nome": string;
}

/**
 * Interface representing a processed and standardized search result for a city.
 */
export interface CitySearchResult {
  /** Unique identifier for the city. */
  id: number;
  /** Name of the city. */
  nome: string;
  /** Name of the state (UF). */
  estado: string;
  /** Abbreviation of the state (UF). */
  sigla: string;
  /** Formatted display name (e.g., "City Name, UF"). */
  displayName: string;
}

const IBGE_BASE_URL = "https://servicodados.ibge.gov.br/api/v1";

/**
 * Service class for interacting with the IBGE API to fetch city data.
 * Includes caching mechanisms to optimize performance.
 */
export class CitiesAPI {
  private static cache = new Map<string, CitySearchResult[]>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static readonly CACHE_TIMESTAMPS = new Map<string, number>();

  /**
   * Search for Brazilian cities by name.
   *
   * @param {string} query - The name or partial name of the city to search for.
   * @returns {Promise<CitySearchResult[]>} A promise resolving to an array of matching cities.
   */
  static async searchCities(query: string): Promise<CitySearchResult[]> {
    if (!query || query.length < 2) {
      return [];
    }

    const cacheKey = query.toLowerCase().trim();
    const now = Date.now();

    if (this.cache.has(cacheKey)) {
      const timestamp = this.CACHE_TIMESTAMPS.get(cacheKey);
      if (timestamp && now - timestamp < this.CACHE_DURATION) {
        return this.cache.get(cacheKey)!;
      }
    }

    try {
      const response = await fetch(
        `${IBGE_BASE_URL}/localidades/municipios?view=nivelado&orderBy=nome&q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cities: City[] = await response.json();

      const results: CitySearchResult[] = cities.map((city) => ({
        id: city["municipio-id"],
        nome: city["municipio-nome"],
        estado: city["UF-nome"],
        sigla: city["UF-sigla"],
        displayName: `${city["municipio-nome"]}, ${city["UF-sigla"]}`,
      }));

      this.cache.set(cacheKey, results);
      this.CACHE_TIMESTAMPS.set(cacheKey, now);

      return results;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }

  /**
   * Get all cities for a specific state.
   *
   * @param {string} stateCode - The 2-letter state code (UF) or state ID.
   * @returns {Promise<CitySearchResult[]>} A promise resolving to the list of cities in the state.
   */
  static async getCitiesByState(
    stateCode: string,
  ): Promise<CitySearchResult[]> {
    const cacheKey = `state_${stateCode}`;
    const now = Date.now();

    if (this.cache.has(cacheKey)) {
      const timestamp = this.CACHE_TIMESTAMPS.get(cacheKey);
      if (timestamp && now - timestamp < this.CACHE_DURATION) {
        return this.cache.get(cacheKey)!;
      }
    }

    try {
      const response = await fetch(
        `${IBGE_BASE_URL}/localidades/estados/${stateCode}/municipios?view=nivelado&orderBy=nome`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cities: City[] = await response.json();

      const results: CitySearchResult[] = cities.map((city) => ({
        id: city["municipio-id"],
        nome: city["municipio-nome"],
        estado: city["UF-nome"],
        sigla: city["UF-sigla"],
        displayName: `${city["municipio-nome"]}, ${city["UF-sigla"]}`,
      }));

      this.cache.set(cacheKey, results);
      this.CACHE_TIMESTAMPS.set(cacheKey, now);

      return results;
    } catch (error) {
      console.error("Error fetching cities by state:", error);
      return [];
    }
  }

  /**
   * Clears the internal city cache and timestamps.
   */
  static clearCache(): void {
    this.cache.clear();
    this.CACHE_TIMESTAMPS.clear();
  }
}
