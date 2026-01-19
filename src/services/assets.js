import client from "./api_client";
import { getMockAssetsData } from "./assets.mock";

// Flag to enable mock data - must be explicitly set via environment variable
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === "true";

class AssetsService {
  /**
   * Fetch assets data from the OpenCost API
   * @param {string} window - Time window (e.g., "7d", "today", "lastweek")
   * @param {object} options - Additional query options
   * @param {string} options.aggregate - Aggregation dimension (type, cluster, provider, etc.)
   * @param {boolean} options.accumulate - Whether to accumulate results
   * @param {string} options.filter - Filter expression
   * @returns {Promise<object>} Assets data response
   */
  async fetchAssets(window, options = {}) {
    const { aggregate, accumulate, filter } = options;

    const params = {
      window: window,
    };

    if (aggregate) {
      params.aggregate = aggregate;
    }

    if (typeof accumulate === "boolean") {
      params.accumulate = accumulate;
    }

    if (filter) {
      params.filter = filter;
    }

    try {
      const result = await client.get("/model/assets", {
        params,
      });
      return result.data;
    } catch (error) {
      // Use mock data if explicitly enabled and backend is unavailable
      if (
        USE_MOCK_DATA &&
        error.message &&
        (error.message.includes("Network Error") ||
          error.message.includes("ECONNREFUSED") ||
          error.message.includes("404"))
      ) {
        console.warn(
          "Assets API not available, using mock data (REACT_APP_USE_MOCK_DATA is enabled)"
        );
        return getMockAssetsData(window, aggregate, filter);
      }
      throw error;
    }
  }

  /**
   * Fetch assets totals (summary) from the API
   * @param {string} window - Time window
   * @param {string} filter - Optional filter
   * @returns {Promise<object>} Assets totals response
   */
  async fetchAssetsTotals(window, filter = "") {
    const params = { window };

    if (filter) {
      params.filter = filter;
    }

    try {
      const result = await client.get("/model/assets/totals", {
        params,
      });
      return result.data;
    } catch (error) {
      if (
        USE_MOCK_DATA &&
        error.message &&
        (error.message.includes("Network Error") ||
          error.message.includes("ECONNREFUSED") ||
          error.message.includes("404"))
      ) {
        // Return mock totals
        const mockData = getMockAssetsData(window, "", filter);
        const assets = Object.values(mockData.data?.[0] || {});
        const totalCost = assets.reduce((sum, a) => sum + (a.totalCost || 0), 0);
        return {
          code: 200,
          status: "success",
          data: { totalCost },
        };
      }
      throw error;
    }
  }
}

export default new AssetsService();
