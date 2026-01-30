/**
 * Asset Page Constants and Configuration
 * Used throughout the Assets page components
 */

// Time window options for the dropdown
export const windowOptions = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '24h', label: 'Last 24 hours' },
  { id: '48h', label: 'Last 48 hours' },
  { id: 'week', label: 'Week-to-date' },
  { id: 'lastweek', label: 'Last week' },
  { id: '7d', label: 'Last 7 days' },
  { id: '14d', label: 'Last 14 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: 'month', label: 'Month-to-date' },
  { id: 'lastmonth', label: 'Last month' },
];

// Asset type configurations
export const assetTypes = {
  Node: {
    label: 'Nodes',
    category: 'Compute',
    color: '#6929c4',       // Purple
    tagType: 'purple',
    icon: 'BareMetalServer',
    description: 'Kubernetes compute nodes',
  },
  Disk: {
    label: 'Storage',
    category: 'Storage',
    color: '#009d9a',       // Teal
    tagType: 'teal',
    icon: 'DataBase',
    description: 'Persistent volumes and disks',
  },
  LoadBalancer: {
    label: 'Load Balancers',
    category: 'Network',
    color: '#1192e8',       // Blue
    tagType: 'blue',
    icon: 'Network_1',
    description: 'Network load balancers',
  },
  ClusterManagement: {
    label: 'Management',
    category: 'Management',
    color: '#005d5d',       // Dark Teal
    tagType: 'cyan',
    icon: 'CloudMonitoring',
    description: 'Cluster management fees',
  },
};

// Category colors for charts
export const categoryColors = {
  Compute: '#6929c4',
  Storage: '#009d9a',
  Network: '#1192e8',
  Management: '#005d5d',
  Other: '#a8a8a8',
};

// Efficiency thresholds and colors
export const efficiencyConfig = {
  high: {
    threshold: 0.8,
    color: '#24a148',       // Green
    status: 'success',
    label: 'High',
  },
  medium: {
    threshold: 0.6,
    color: '#f1c21b',       // Yellow
    status: 'warning',
    label: 'Medium',
  },
  low: {
    threshold: 0,
    color: '#da1e28',       // Red
    status: 'danger',
    label: 'Low',
  },
};

// Get efficiency status based on value
export const getEfficiencyStatus = (efficiency) => {
  if (efficiency >= efficiencyConfig.high.threshold) return efficiencyConfig.high;
  if (efficiency >= efficiencyConfig.medium.threshold) return efficiencyConfig.medium;
  return efficiencyConfig.low;
};

// Trend configuration
export const trendConfig = {
  up: {
    icon: 'ArrowUp',
    color: '#da1e28',       // Red (cost increase is bad)
    label: 'Increased',
  },
  down: {
    icon: 'ArrowDown',
    color: '#24a148',       // Green (cost decrease is good)
    label: 'Decreased',
  },
  neutral: {
    icon: null,
    color: '#525252',
    label: 'Unchanged',
  },
};

// Table headers configuration
export const assetTableHeaders = [
  {
    key: 'name',
    header: 'Asset Name',
    sortable: true,
  },
  {
    key: 'type',
    header: 'Type',
    sortable: true,
  },
  {
    key: 'provider',
    header: 'Provider',
    sortable: true,
  },
  {
    key: 'cluster',
    header: 'Cluster',
    sortable: true,
  },
  {
    key: 'cost',
    header: 'Total Cost',
    sortable: true,
  },
  {
    key: 'efficiency',
    header: 'Efficiency',
    sortable: true,
  },
];

// Pagination options
export const paginationSizes = [10, 20, 30, 50, 100];
export const defaultPageSize = 10;

// Chart theme options
export const chartThemes = {
  light: 'white',
  dark: 'g100',
};

// KPI card configurations
export const kpiCards = [
  {
    id: 'totalCost',
    title: 'Total Asset Cost',
    icon: 'CostTotal',
    accentColor: '#0f62fe',
    filterValue: 'all',
    valueKey: 'totalCost',
  },
  {
    id: 'computeCost',
    title: 'Compute Cost',
    icon: 'BareMetalServer',
    accentColor: '#6929c4',
    filterValue: 'Node',
    valueKey: 'nodeCost',
    countKey: 'nodeCount',
    countLabel: 'nodes',
  },
  {
    id: 'storageCost',
    title: 'Storage Cost',
    icon: 'DataBase',
    accentColor: '#009d9a',
    filterValue: 'Disk',
    valueKey: 'diskCost',
    countKey: 'diskCount',
    countLabel: 'volumes',
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    icon: 'CloudMonitoring',
    isGauge: true,
    filterValue: 'efficiency',
    valueKey: 'avgEfficiency',
  },
];

// Aggregation options
export const aggregationOptions = [
  { id: 'type', label: 'Asset Type' },
  { id: 'cluster', label: 'Cluster' },
  { id: 'provider', label: 'Provider' },
  { id: 'category', label: 'Category' },
  { id: 'project', label: 'Project' },
];

// Tab configurations
export const assetTabs = [
  { id: 'all', label: 'All Assets', filter: null },
  { id: 'nodes', label: 'Nodes', filter: 'Node' },
  { id: 'storage', label: 'Storage', filter: 'Disk' },
  { id: 'network', label: 'Load Balancers', filter: 'LoadBalancer' },
  { id: 'management', label: 'Management', filter: 'ClusterManagement' },
];

// Export formats
export const exportFormats = [
  { id: 'csv', label: 'CSV', mimeType: 'text/csv' },
  { id: 'json', label: 'JSON', mimeType: 'application/json' },
];

// API endpoints
export const apiEndpoints = {
  assets: '/model/assets',
  assetsTotals: '/model/assets/totals',
};

// Default values
export const defaults = {
  window: '7d',
  currency: 'USD',
  pageSize: 10,
  theme: 'white',
};

// Breakdown fields for different asset types
export const breakdownFields = {
  Node: [
    { key: 'cpuCost', label: 'CPU Cost' },
    { key: 'ramCost', label: 'RAM Cost' },
    { key: 'gpuCost', label: 'GPU Cost', conditional: true },
  ],
  Disk: [
    { key: 'bytes', label: 'Capacity', formatter: 'bytes' },
    { key: 'bytesUsed', label: 'Used', formatter: 'bytes' },
    { key: 'storageClass', label: 'Storage Class' },
  ],
  LoadBalancer: [
    { key: 'totalCost', label: 'Total Cost' },
  ],
  ClusterManagement: [
    { key: 'totalCost', label: 'Management Cost' },
  ],
};

// Resource breakdown fields
export const resourceBreakdownFields = [
  { key: 'user', label: 'User', status: 'active' },
  { key: 'system', label: 'System', status: 'finished' },
  { key: 'idle', label: 'Idle', status: 'error' },
  { key: 'other', label: 'Other', status: 'finished' },
];

// Labels to exclude from display
export const excludedLabelPrefixes = [
  'beta_',
  'beta.',
  'kubernetes.io/',
  'node.kubernetes.io/',
  'failure-domain.',
];

// Maximum labels to show in expanded row
export const maxLabelsToShow = 8;

// Chart heights
export const chartHeights = {
  kpiGauge: '80px',
  expandedGauge: '120px',
  treemap: '400px',
  donut: '400px',
  stackedBar: '300px',
};

// Animation durations
export const animations = {
  tileHover: '0.15s',
  chartTransition: '0.3s',
  expandRow: '0.2s',
};

// Tooltip delay
export const tooltipDelay = 200;

export default {
  windowOptions,
  assetTypes,
  categoryColors,
  efficiencyConfig,
  getEfficiencyStatus,
  trendConfig,
  assetTableHeaders,
  paginationSizes,
  defaultPageSize,
  chartThemes,
  kpiCards,
  aggregationOptions,
  assetTabs,
  exportFormats,
  apiEndpoints,
  defaults,
  breakdownFields,
  resourceBreakdownFields,
  excludedLabelPrefixes,
  maxLabelsToShow,
  chartHeights,
  animations,
  tooltipDelay,
};
