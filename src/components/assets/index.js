/**
 * Assets Components Barrel Export
 *
 * This file exports all assets-related components for easy importing
 * Usage: import { AssetKPITiles, AssetDataTable } from '../components/assets';
 */

export { default as AssetKPITiles } from './AssetKPITiles';
export { default as AssetTreemapChart } from './AssetTreemapChart';
export { default as AssetDonutChart } from './AssetDonutChart';
export { default as AssetStackedBarChart } from './AssetStackedBarChart';
export { default as AssetDataTable } from './AssetDataTable';

// Re-export constants for convenience
export {
  assetTypes,
  categoryColors,
  efficiencyConfig,
  getEfficiencyStatus,
  assetTableHeaders,
  assetTabs,
  windowOptions,
  defaults,
} from '../../constants/assetTokens';
