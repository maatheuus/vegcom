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

export interface CitySearchResult {
  id: number;
  nome: string;
  estado: string;
  sigla: string;
  displayName: string;
}

const IBGE_BASE_URL = "https://servicodados.ibge.gov.br/api/v1";

export class CitiesAPI {
  private static cache = new Map<string, CitySearchResult[]>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static readonly CACHE_TIMESTAMPS = new Map<string, number>();

  /**
   * Search for Brazilian cities by name
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
        `/api/cities?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        return [];
      }

      const cities: { id: number; nome: string; estado: string; sigla: string }[] = await response.json();

      const results: CitySearchResult[] = cities.map((city) => ({
        id: city.id,
        nome: city.nome,
        estado: city.estado,
        sigla: city.sigla,
        displayName: `${city.nome}, ${city.sigla}`,
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
   * Get all cities for a specific state
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
   * Clear cache and timestamps
   */
  static clearCache(): void {
    this.cache.clear();
    this.CACHE_TIMESTAMPS.clear();
  }
}
