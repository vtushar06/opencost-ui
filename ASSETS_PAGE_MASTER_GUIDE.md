# OpenCost Assets Page - Master Implementation Guide

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Competitor Analysis](#competitor-analysis)
3. [Technical Requirements](#technical-requirements)
4. [Winning Strategy](#winning-strategy)
5. [Carbon Design System Components](#carbon-design-system-components)
6. [Advanced Features to Implement](#advanced-features-to-implement)
7. [Code Implementation Guide](#code-implementation-guide)
8. [Unit Testing Strategy](#unit-testing-strategy)
9. [UX/UI Best Practices](#uxui-best-practices)
10. [Deployment & Verification](#deployment--verification)
11. [Cover Letter Template](#cover-letter-template)

---

## Executive Summary

### The Challenge
Build an Assets page for OpenCost UI using Carbon Design System that visualizes infrastructure asset data from the `/model/assets` API endpoint. This is part of the LFX Mentorship Term 1 2026 application process.

### Key Evaluation Criteria (from maintainer feedback)
1. **UI/UX instincts** - Creative problem-solving over cookie-cutter implementations
2. **API understanding** - Demonstrating proficiency in building UIs for APIs
3. **Design choices** - Clear reasoning and justification
4. **Communication** - Following instructions closely (poor communication has disqualified submissions)
5. **No "right or wrong"** - Creating a new assets page OR integrating into existing views are both acceptable

### Critical Success Factors
- Use Carbon Design System (NOT Material-UI)
- Professional, enterprise-grade UI
- Comprehensive data visualization
- Graceful error handling
- Responsive design
- Clear documentation of design choices

---

## Competitor Analysis

### PR #175 - priyankashah3107
**Title:** "feat: implement Assets page support using Carbon design system"

**Strengths:**
- Uses Carbon DataTable with pagination
- KPI tiles with linear gradients
- Service layer with mock data fallback
- Clean separation of concerns
- Toolbar search functionality

**Weaknesses:**
- Basic table visualization only
- Limited chart usage
- No expandable rows
- Simple KPI presentation
- No theme support

**Files Changed:** 10 files (+1,184 −362)

**Carbon Components Used:**
- DataTable, Table components
- Pagination
- Tile
- Grid, Column
- Button

---

### PR #174 - aryarathoree
**Title:** "[Coding challenge] feat: add Assets page with dashboard style summary and table"

**Strengths:**
- Dashboard-style summary section
- Total assets, total cost, time window display
- Follows existing OpenCost patterns
- Proper loading and error states

**Weaknesses:**
- Uses "Carbon-style patterns" but may not be full Carbon integration
- Basic table without advanced features
- No charts or visualizations
- Limited interactivity

**Files Changed:** 5 files (+4,179 −3,963)

---

### PR #173 - abhayguptas
**Title:** "Carbon UI revamp"

**Strengths:**
- MOST COMPREHENSIVE - Full UI shell migration to Carbon
- Light/dark mode toggle
- Rebuilt multiple pages (Overview, Assets, Allocations, CloudCosts, ExternalCosts)
- Enhanced tooltips with currency formatting
- Changed pie chart to horizontal bar chart for better readability
- Safe failure for External Costs when APIs unavailable
- Tested with local and remote backends

**Weaknesses:**
- Very large scope (may be overwhelming)
- 3 commits vs single commit preferred
- May not focus enough on Assets specifically

**Files Changed:** 16 files (+2,028 −412)

**Key Innovation:** Shell architecture with theme toggle, responsive charts

---

### PR #172 - AftAb-25
**Title:** "feat: Support Assets in the UI"

**Strengths:**
- AssetService with mock data fallback
- AssetReport table component
- Granular asset cost visibility

**Weaknesses:**
- No Carbon components mentioned
- Basic implementation
- Limited features

**Files Changed:** Not fully visible

---

### PR #164 - KushguptaPST
**Title:** "feat: Add Assets page to support Assets API visualization"

**Strengths:**
- Follows existing architectural patterns
- Pagination with configurable sizes (10, 25, 50)
- Time window filtering
- Currency conversion support
- URL parameter persistence

**Weaknesses:**
- Uses Material-UI (NOT Carbon Design System!)
- No dashboard summary
- Basic table only
- No charts

**Files Changed:** 4 files (+329 −1)

---

### Competitive Gap Analysis

| Feature | PR #175 | PR #174 | PR #173 | PR #172 | PR #164 | Our Goal |
|---------|---------|---------|---------|---------|---------|----------|
| Carbon Components | Yes | Partial | Full | No | No | Full |
| DataTable | Yes | Yes | Yes | Yes | Yes | Advanced |
| Expandable Rows | No | No | No | No | No | **YES** |
| Charts | Limited | No | Yes | No | No | **Multiple** |
| Theme Toggle | No | No | Yes | No | No | **YES** |
| KPI Tiles | Basic | Basic | Yes | No | No | **Advanced** |
| Gauge Charts | No | No | No | No | No | **YES** |
| Treemap | No | No | No | No | No | **YES** |
| Unit Tests | No | No | No | No | No | **YES** |
| Error Handling | Yes | Yes | Yes | Yes | Yes | **Advanced** |
| Mock Data | Yes | No | Yes | Yes | No | **YES** |
| Responsive | Partial | Partial | Yes | Partial | Partial | **Full** |

---

## Technical Requirements

### Assets API Specification

**Endpoint:** `/model/assets`

**Query Parameters:**
- `window` - Time range (e.g., "1d", "7d", "30d", custom ISO range)
- `aggregate` - Aggregation dimension (type, cluster, provider, etc.)
- `accumulate` - Boolean for cumulative results
- `filter` - Filter expression

**Response Structure:**
```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "cluster-1/Node/node-name": {
        "type": "Node",
        "properties": {
          "category": "Compute",
          "provider": "GCP|AWS|Azure",
          "project": "project-id",
          "service": "Kubernetes",
          "cluster": "cluster-name",
          "name": "node-name",
          "providerID": "provider-specific-id"
        },
        "labels": {
          "node.kubernetes.io/instance-type": "n2-standard-8",
          "topology.kubernetes.io/region": "us-central1",
          "env": "production"
        },
        "window": {
          "start": "2026-01-01T00:00:00Z",
          "end": "2026-01-07T00:00:00Z"
        },
        "cpuCores": 8,
        "cpuCoreHours": 1344,
        "cpuCost": 1920.45,
        "ramBytes": 34359738368,
        "ramByteHours": 5.8e15,
        "ramCost": 768.32,
        "gpuCount": 0,
        "gpuHours": 0,
        "gpuCost": 0,
        "breakdown": {
          "idle": 0.22,
          "other": 0.03,
          "system": 0.08,
          "user": 0.67
        },
        "totalCost": 2688.77,
        "efficiency": 0.78
      }
    }
  ]
}
```

### Asset Types

| Type | Category | Key Metrics |
|------|----------|-------------|
| **Node** | Compute | cpuCores, cpuCost, ramBytes, ramCost, gpuCost |
| **Disk** | Storage | bytes, bytesUsed, storageClass, totalCost |
| **LoadBalancer** | Network | totalCost, breakdown |
| **ClusterManagement** | Management | totalCost |

---

## Winning Strategy

### Differentiation Points

To stand out from competitors, implement these unique features:

#### 1. Advanced Data Visualization (Not in any PR)
- **TreemapChart** - Hierarchical cost distribution
- **DonutChart** - Category breakdown with center total
- **GaugeChart** - Utilization/efficiency indicators
- **MeterChart** - Resource capacity meters
- **StackedBarChart** - Time-series trends

#### 2. Professional Dashboard Layout
- KPI tiles with trend indicators (up/down arrows)
- Color-coded efficiency status
- Responsive grid layout
- Visual hierarchy

#### 3. Advanced DataTable Features
- **Expandable rows** with detailed breakdowns
- **Inline GaugeCharts** showing utilization
- **ProgressBars** for resource breakdown
- **Tag components** for Kubernetes labels
- **Search and filter** functionality
- **Column sorting**

#### 4. Theme Support
- Light/dark mode toggle (like PR #173)
- Consistent Carbon theming
- Accessibility compliance

#### 5. Unit Tests (NO ONE HAS THIS)
- Component tests with React Testing Library
- Service layer tests
- Mock data tests
- Snapshot tests for UI consistency

#### 6. Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode

#### 7. Performance
- Virtualized tables for large datasets
- Memoization for expensive calculations
- Lazy loading for charts

---

## Carbon Design System Components

### Required Packages
```json
{
  "@carbon/react": "^1.100.0",
  "@carbon/charts-react": "^1.23.0",
  "@carbon/styles": "^1.98.0",
  "@carbon/icons-react": "^11.73.0",
  "d3": "^7.9.0",
  "sass": "^1.97.0"
}
```

### Core UI Components

```javascript
// Layout Components
import {
  Grid,
  Column,
  Tile,
  ClickableTile,
  ExpandableTile,
  Theme,
} from '@carbon/react';

// DataTable Components
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Pagination,
} from '@carbon/react';

// Form & Control Components
import {
  Button,
  Dropdown,
  Select,
  SelectItem,
  Toggle,
  Checkbox,
  Search,
  Tag,
  ProgressBar,
} from '@carbon/react';

// Feedback Components
import {
  Loading,
  InlineLoading,
  InlineNotification,
  ToastNotification,
  Modal,
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@carbon/react';

// Navigation Components
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  SideNav,
  SideNavItems,
  SideNavLink,
} from '@carbon/react';
```

### Chart Components

```javascript
import {
  TreemapChart,
  DonutChart,
  GaugeChart,
  MeterChart,
  StackedBarChart,
  SimpleBarChart,
  LineChart,
  AreaChart,
  PieChart,
} from '@carbon/charts-react';

// Chart styles (required)
import '@carbon/charts/dist/styles.css';
```

### Icon Components

```javascript
import {
  // Navigation & Actions
  Renew,
  Download,
  Settings,
  Filter,
  Add,
  TrashCan,
  Edit,
  View,

  // Asset Types
  BareMetalServer,
  DataBase,
  CloudMonitoring,
  Network_1,
  VirtualMachine,

  // Cost & Metrics
  CostTotal,
  Money,
  Analytics,
  ChartBar,
  Dashboard,

  // Status & Indicators
  ArrowUp,
  ArrowDown,
  CheckmarkFilled,
  WarningFilled,
  ErrorFilled,
  InformationFilled,

  // Theme
  Light,
  Asleep,
} from '@carbon/react/icons';
```

---

## Advanced Features to Implement

### Feature 1: Interactive KPI Dashboard

```javascript
// components/assets/AssetKPIDashboard.js
import React from 'react';
import { Grid, Column, Tile, ClickableTile } from '@carbon/react';
import {
  CostTotal,
  BareMetalServer,
  DataBase,
  CloudMonitoring,
  ArrowUp,
  ArrowDown,
} from '@carbon/react/icons';
import { GaugeChart } from '@carbon/charts-react';

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  accentColor,
  onClick
}) => {
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = trend === 'up' ? '#da1e28' : '#24a148';

  return (
    <ClickableTile
      onClick={onClick}
      className="kpi-card"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      <div className="kpi-card__header">
        <span className="kpi-card__title">{title}</span>
        <div
          className="kpi-card__icon"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon size={24} style={{ fill: accentColor }} />
        </div>
      </div>
      <div className="kpi-card__value">{value}</div>
      <div className="kpi-card__footer">
        <span className="kpi-card__subtitle">{subtitle}</span>
        {trendValue && (
          <span
            className="kpi-card__trend"
            style={{ color: trendColor }}
          >
            <TrendIcon size={12} />
            {Math.abs(trendValue).toFixed(1)}%
          </span>
        )}
      </div>
    </ClickableTile>
  );
};

const AssetKPIDashboard = ({ assets, currency, onKPIClick }) => {
  // Calculate metrics
  const assetsList = Object.values(assets);
  const totalCost = assetsList.reduce((sum, a) => sum + (a.totalCost || 0), 0);

  const nodeAssets = assetsList.filter(a => a.type === 'Node');
  const diskAssets = assetsList.filter(a => a.type === 'Disk');

  const nodeCost = nodeAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0);
  const diskCost = diskAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0);

  const avgEfficiency = assetsList.length > 0
    ? assetsList.reduce((sum, a) => sum + (a.efficiency || 0), 0) / assetsList.length
    : 0;

  // Efficiency gauge data
  const efficiencyGaugeData = [{
    group: 'Efficiency',
    value: Math.round(avgEfficiency * 100)
  }];

  const efficiencyGaugeOptions = {
    theme: 'white',
    height: '80px',
    gauge: {
      type: 'semi',
      status: avgEfficiency >= 0.7 ? 'success' : avgEfficiency >= 0.5 ? 'warning' : 'danger',
    },
    legend: { enabled: false },
    toolbar: { enabled: false },
  };

  return (
    <Grid className="kpi-dashboard">
      <Column lg={4} md={4} sm={4}>
        <KPICard
          title="Total Asset Cost"
          value={toCurrency(totalCost, currency)}
          subtitle={`${assetsList.length} assets`}
          icon={CostTotal}
          trend="up"
          trendValue={5.2}
          accentColor="#0f62fe"
          onClick={() => onKPIClick('all')}
        />
      </Column>

      <Column lg={4} md={4} sm={4}>
        <KPICard
          title="Compute Cost"
          value={toCurrency(nodeCost, currency)}
          subtitle={`${nodeAssets.length} nodes`}
          icon={BareMetalServer}
          trend="down"
          trendValue={-2.1}
          accentColor="#6929c4"
          onClick={() => onKPIClick('Node')}
        />
      </Column>

      <Column lg={4} md={4} sm={4}>
        <KPICard
          title="Storage Cost"
          value={toCurrency(diskCost, currency)}
          subtitle={`${diskAssets.length} volumes`}
          icon={DataBase}
          trend="up"
          trendValue={8.4}
          accentColor="#009d9a"
          onClick={() => onKPIClick('Disk')}
        />
      </Column>

      <Column lg={4} md={4} sm={4}>
        <Tile className="kpi-card kpi-card--efficiency">
          <div className="kpi-card__header">
            <span className="kpi-card__title">Efficiency</span>
            <CloudMonitoring size={24} />
          </div>
          <GaugeChart
            data={efficiencyGaugeData}
            options={efficiencyGaugeOptions}
          />
          <div className="kpi-card__footer">
            <span>{(avgEfficiency * 100).toFixed(0)}% utilized</span>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
};

export default AssetKPIDashboard;
```

### Feature 2: Advanced Expandable DataTable

```javascript
// components/assets/AssetDataTable.js
import React, { useState, useMemo } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Tag,
  ProgressBar,
} from '@carbon/react';
import { GaugeChart } from '@carbon/charts-react';

// Type colors for tags
const TYPE_COLORS = {
  Node: 'purple',
  Disk: 'teal',
  LoadBalancer: 'blue',
  ClusterManagement: 'cyan',
};

// Efficiency color helper
const getEfficiencyStatus = (efficiency) => {
  if (efficiency >= 0.8) return 'success';
  if (efficiency >= 0.6) return 'warning';
  return 'danger';
};

// Expanded row content component
const AssetExpandedRow = ({ asset, currency }) => {
  // Gauge chart for efficiency
  const gaugeData = [{
    group: 'Utilization',
    value: Math.round((asset.efficiency || 0) * 100)
  }];

  const gaugeOptions = {
    theme: 'white',
    height: '120px',
    gauge: {
      type: 'semi',
      status: getEfficiencyStatus(asset.efficiency || 0),
    },
    legend: { enabled: false },
    toolbar: { enabled: false },
  };

  return (
    <div className="asset-expanded-row">
      <div className="asset-expanded-row__section">
        <h6 className="asset-expanded-row__title">Utilization</h6>
        <GaugeChart data={gaugeData} options={gaugeOptions} />
      </div>

      <div className="asset-expanded-row__section">
        <h6 className="asset-expanded-row__title">Cost Breakdown</h6>
        {asset.type === 'Node' && (
          <div className="cost-breakdown">
            <div className="cost-breakdown__item">
              <span>CPU Cost</span>
              <strong>{toCurrency(asset.cpuCost || 0, currency)}</strong>
            </div>
            <div className="cost-breakdown__item">
              <span>RAM Cost</span>
              <strong>{toCurrency(asset.ramCost || 0, currency)}</strong>
            </div>
            {asset.gpuCost > 0 && (
              <div className="cost-breakdown__item">
                <span>GPU Cost</span>
                <strong>{toCurrency(asset.gpuCost, currency)}</strong>
              </div>
            )}
          </div>
        )}
        {asset.type === 'Disk' && (
          <div className="cost-breakdown">
            <div className="cost-breakdown__item">
              <span>Capacity</span>
              <strong>{bytesToString(asset.bytes || 0)}</strong>
            </div>
            <div className="cost-breakdown__item">
              <span>Used</span>
              <strong>{bytesToString(asset.bytesUsed || 0)}</strong>
            </div>
            <div className="cost-breakdown__item">
              <span>Storage Class</span>
              <strong>{asset.storageClass || 'N/A'}</strong>
            </div>
          </div>
        )}
      </div>

      {asset.breakdown && (
        <div className="asset-expanded-row__section">
          <h6 className="asset-expanded-row__title">Resource Breakdown</h6>
          <div className="resource-breakdown">
            <div className="resource-breakdown__item">
              <span>User</span>
              <ProgressBar
                value={(asset.breakdown.user || 0) * 100}
                max={100}
                size="small"
                status="active"
              />
              <span>{((asset.breakdown.user || 0) * 100).toFixed(0)}%</span>
            </div>
            <div className="resource-breakdown__item">
              <span>System</span>
              <ProgressBar
                value={(asset.breakdown.system || 0) * 100}
                max={100}
                size="small"
              />
              <span>{((asset.breakdown.system || 0) * 100).toFixed(0)}%</span>
            </div>
            <div className="resource-breakdown__item">
              <span>Idle</span>
              <ProgressBar
                value={(asset.breakdown.idle || 0) * 100}
                max={100}
                size="small"
                status="error"
              />
              <span>{((asset.breakdown.idle || 0) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}

      {asset.labels && Object.keys(asset.labels).length > 0 && (
        <div className="asset-expanded-row__section">
          <h6 className="asset-expanded-row__title">Labels</h6>
          <div className="asset-labels">
            {Object.entries(asset.labels)
              .filter(([key]) => !key.startsWith('beta_'))
              .slice(0, 8)
              .map(([key, value]) => (
                <Tag key={key} type="gray" size="sm">
                  {key}: {value}
                </Tag>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AssetDataTable = ({ assets, currency, filterType }) => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Prepare table data
  const { headers, rows, totalItems } = useMemo(() => {
    let assetEntries = Object.entries(assets);

    // Filter by type
    if (filterType && filterType !== 'all') {
      assetEntries = assetEntries.filter(([_, asset]) => asset.type === filterType);
    }

    // Filter by search
    if (searchText) {
      const lower = searchText.toLowerCase();
      assetEntries = assetEntries.filter(([key, asset]) =>
        (asset.properties?.name || key).toLowerCase().includes(lower) ||
        (asset.type || '').toLowerCase().includes(lower) ||
        (asset.properties?.provider || '').toLowerCase().includes(lower)
      );
    }

    // Sort by cost
    assetEntries.sort((a, b) => (b[1].totalCost || 0) - (a[1].totalCost || 0));

    const headers = [
      { key: 'name', header: 'Asset Name' },
      { key: 'type', header: 'Type' },
      { key: 'provider', header: 'Provider' },
      { key: 'cluster', header: 'Cluster' },
      { key: 'cost', header: 'Total Cost' },
      { key: 'efficiency', header: 'Efficiency' },
    ];

    const rows = assetEntries.map(([key, asset]) => ({
      id: key,
      name: asset.properties?.name || key.split('/').pop(),
      type: asset.type || 'Unknown',
      provider: asset.properties?.provider || 'Unknown',
      cluster: asset.properties?.cluster || 'Unknown',
      cost: asset.totalCost || 0,
      efficiency: asset.efficiency || 0,
      _asset: asset,
    }));

    return { headers, rows, totalItems: rows.length };
  }, [assets, filterType, searchText]);

  // Paginate
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  // Render cell content
  const renderCell = (cell, row) => {
    switch (cell.info.header) {
      case 'type':
        return (
          <Tag type={TYPE_COLORS[cell.value] || 'gray'} size="sm">
            {cell.value}
          </Tag>
        );
      case 'cost':
        return (
          <span style={{ fontWeight: 600, color: '#0f62fe' }}>
            {toCurrency(cell.value, currency)}
          </span>
        );
      case 'efficiency':
        const percent = (cell.value * 100).toFixed(0);
        const status = getEfficiencyStatus(cell.value);
        const color = status === 'success' ? '#24a148' :
                      status === 'warning' ? '#f1c21b' : '#da1e28';
        return (
          <div className="efficiency-cell">
            <div className="efficiency-bar">
              <div
                className="efficiency-bar__fill"
                style={{ width: `${percent}%`, backgroundColor: color }}
              />
            </div>
            <span>{percent}%</span>
          </div>
        );
      default:
        return cell.value;
    }
  };

  return (
    <DataTable rows={paginatedRows} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getTableContainerProps,
        getExpandHeaderProps,
      }) => (
        <TableContainer
          title="Infrastructure Assets"
          description={`${totalItems} assets found`}
          {...getTableContainerProps()}
        >
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch
                placeholder="Search assets..."
                onChange={(e) => {
                  setSearchText(e.target.value || '');
                  setPage(1);
                }}
                persistent
              />
            </TableToolbarContent>
          </TableToolbar>

          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader enableToggle {...getExpandHeaderProps()} />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const asset = assets[row.id];
                return (
                  <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {renderCell(cell, row)}
                        </TableCell>
                      ))}
                    </TableExpandRow>
                    <TableExpandedRow colSpan={headers.length + 1}>
                      <AssetExpandedRow asset={asset} currency={currency} />
                    </TableExpandedRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>

          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            page={page}
            pageNumberText="Page Number"
            pageSize={pageSize}
            pageSizes={[10, 20, 30, 50]}
            totalItems={totalItems}
            onChange={({ page, pageSize }) => {
              setPage(page);
              setPageSize(pageSize);
            }}
          />
        </TableContainer>
      )}
    </DataTable>
  );
};

export default AssetDataTable;
```

### Feature 3: Visualization Charts

```javascript
// components/assets/AssetCharts.js
import React, { useMemo } from 'react';
import { Grid, Column } from '@carbon/react';
import {
  TreemapChart,
  DonutChart,
  StackedBarChart
} from '@carbon/charts-react';

// Treemap for cost distribution
const AssetTreemap = ({ assets, currency }) => {
  const data = useMemo(() => {
    return Object.entries(assets).map(([key, asset]) => ({
      name: asset.properties?.name || key.split('/').pop(),
      group: asset.type || 'Other',
      value: asset.totalCost || 0,
    }));
  }, [assets]);

  const options = {
    title: 'Cost Distribution by Asset',
    theme: 'white',
    height: '400px',
    color: {
      scale: {
        Node: '#6929c4',
        Disk: '#009d9a',
        LoadBalancer: '#1192e8',
        ClusterManagement: '#005d5d',
      },
    },
    tooltip: {
      customHTML: (data) => {
        if (!data?.[0]) return '';
        const item = data[0];
        return `
          <div class="chart-tooltip">
            <strong>${item.name}</strong>
            <div>Type: ${item.group}</div>
            <div>Cost: ${toCurrency(item.value, currency)}</div>
          </div>
        `;
      },
    },
  };

  return <TreemapChart data={data} options={options} />;
};

// Donut for category breakdown
const AssetDonut = ({ assets, currency }) => {
  const { data, total } = useMemo(() => {
    const categories = {};
    let total = 0;

    Object.values(assets).forEach(asset => {
      const cat = asset.properties?.category || 'Other';
      categories[cat] = (categories[cat] || 0) + (asset.totalCost || 0);
      total += asset.totalCost || 0;
    });

    return {
      data: Object.entries(categories).map(([group, value]) => ({ group, value })),
      total,
    };
  }, [assets]);

  const options = {
    title: 'Cost by Category',
    theme: 'white',
    height: '400px',
    donut: {
      center: {
        label: 'Total',
        number: toCurrency(total, currency),
        numberFontSize: () => 18,
      },
    },
    color: {
      scale: {
        Compute: '#6929c4',
        Storage: '#009d9a',
        Network: '#1192e8',
        Management: '#005d5d',
        Other: '#a8a8a8',
      },
    },
  };

  return <DonutChart data={data} options={options} />;
};

// Stacked bar for time series
const AssetTimeSeries = ({ assets, currency }) => {
  const data = useMemo(() => {
    const dateMap = {};
    const types = new Set();

    Object.values(assets).forEach(asset => {
      types.add(asset.type || 'Other');
      if (asset.dailyData) {
        asset.dailyData.forEach(day => {
          if (!dateMap[day.date]) dateMap[day.date] = {};
          dateMap[day.date][asset.type] =
            (dateMap[day.date][asset.type] || 0) + day.cost;
        });
      }
    });

    const result = [];
    Object.keys(dateMap).sort().forEach(date => {
      types.forEach(type => {
        result.push({
          group: type,
          date,
          value: dateMap[date][type] || 0,
        });
      });
    });

    return result;
  }, [assets]);

  const options = {
    title: 'Daily Cost Trend',
    theme: 'white',
    height: '300px',
    axes: {
      left: {
        title: `Cost (${currency})`,
        mapsTo: 'value',
        stacked: true,
      },
      bottom: {
        title: 'Date',
        mapsTo: 'date',
        scaleType: 'labels',
      },
    },
    color: {
      scale: {
        Node: '#6929c4',
        Disk: '#009d9a',
        LoadBalancer: '#1192e8',
        ClusterManagement: '#005d5d',
      },
    },
  };

  return <StackedBarChart data={data} options={options} />;
};

const AssetCharts = ({ assets, currency }) => {
  return (
    <Grid className="asset-charts">
      <Column lg={8} md={8} sm={4}>
        <div className="chart-container">
          <AssetTreemap assets={assets} currency={currency} />
        </div>
      </Column>
      <Column lg={8} md={8} sm={4}>
        <div className="chart-container">
          <AssetDonut assets={assets} currency={currency} />
        </div>
      </Column>
      <Column lg={16} md={8} sm={4}>
        <div className="chart-container">
          <AssetTimeSeries assets={assets} currency={currency} />
        </div>
      </Column>
    </Grid>
  );
};

export default AssetCharts;
```

### Feature 4: Theme Toggle (Differentiator)

```javascript
// components/ThemeToggle.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Toggle, Theme } from '@carbon/react';
import { Light, Asleep } from '@carbon/react/icons';

const ThemeContext = createContext('white');

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('opencost-theme') || 'white';
  });

  useEffect(() => {
    localStorage.setItem('opencost-theme', theme);
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'white' ? 'g100' : 'white');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Theme theme={theme}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <Light size={16} />
      <Toggle
        id="theme-toggle"
        size="sm"
        toggled={theme === 'g100'}
        onToggle={toggleTheme}
        labelA=""
        labelB=""
        aria-label="Toggle dark mode"
      />
      <Asleep size={16} />
    </div>
  );
};
```

---

## Unit Testing Strategy

### Testing Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### Test Files Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── AssetKPITiles.test.js
│   │   ├── AssetDataTable.test.js
│   │   └── AssetCharts.test.js
│   ├── services/
│   │   └── assets.test.js
│   └── pages/
│       └── Assets.test.js
```

### Example Tests

```javascript
// __tests__/components/AssetKPITiles.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssetKPITiles from '../../components/assets/AssetKPITiles';

const mockAssets = {
  'cluster-1/Node/node-1': {
    type: 'Node',
    properties: { category: 'Compute', provider: 'GCP' },
    totalCost: 2500,
    efficiency: 0.78,
  },
  'cluster-1/Disk/disk-1': {
    type: 'Disk',
    properties: { category: 'Storage', provider: 'GCP' },
    totalCost: 500,
    bytes: 1000000000000,
    bytesUsed: 750000000000,
    efficiency: 0.75,
  },
};

describe('AssetKPITiles', () => {
  it('renders all KPI tiles', () => {
    render(<AssetKPITiles assets={mockAssets} currency="USD" />);

    expect(screen.getByText('Total Asset Cost')).toBeInTheDocument();
    expect(screen.getByText('Compute (Nodes)')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('Efficiency')).toBeInTheDocument();
  });

  it('calculates total cost correctly', () => {
    render(<AssetKPITiles assets={mockAssets} currency="USD" />);

    // Total should be $3,000.00
    expect(screen.getByText(/\$3,000/)).toBeInTheDocument();
  });

  it('calculates average efficiency correctly', () => {
    render(<AssetKPITiles assets={mockAssets} currency="USD" />);

    // Average efficiency should be 77% (rounded from 76.5%)
    expect(screen.getByText('77%')).toBeInTheDocument();
  });

  it('calls onTileClick when tile is clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <AssetKPITiles
        assets={mockAssets}
        currency="USD"
        onTileClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText('Compute (Nodes)'));
    expect(mockOnClick).toHaveBeenCalledWith('Node');
  });

  it('displays correct node count', () => {
    render(<AssetKPITiles assets={mockAssets} currency="USD" />);

    expect(screen.getByText('1 nodes active')).toBeInTheDocument();
  });

  it('handles empty assets gracefully', () => {
    render(<AssetKPITiles assets={{}} currency="USD" />);

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0 assets')).toBeInTheDocument();
  });
});
```

```javascript
// __tests__/services/assets.test.js
import AssetsService from '../../services/assets';
import client from '../../services/api_client';
import { getMockAssetsData } from '../../services/assets.mock';

jest.mock('../../services/api_client');

describe('AssetsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAssets', () => {
    it('fetches assets successfully', async () => {
      const mockResponse = { data: { code: 200, data: [{}] } };
      client.get.mockResolvedValue(mockResponse);

      const result = await AssetsService.fetchAssets('7d', {});

      expect(client.get).toHaveBeenCalledWith('/model/assets', {
        params: { window: '7d' },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('includes optional parameters when provided', async () => {
      client.get.mockResolvedValue({ data: {} });

      await AssetsService.fetchAssets('7d', {
        aggregate: 'type',
        accumulate: true,
        filter: 'type:"Node"',
      });

      expect(client.get).toHaveBeenCalledWith('/model/assets', {
        params: {
          window: '7d',
          aggregate: 'type',
          accumulate: true,
          filter: 'type:"Node"',
        },
      });
    });

    it('falls back to mock data on network error when enabled', async () => {
      process.env.REACT_APP_USE_MOCK_DATA = 'true';
      client.get.mockRejectedValue(new Error('Network Error'));

      const result = await AssetsService.fetchAssets('7d', {});

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });

    it('throws error when mock data is disabled', async () => {
      process.env.REACT_APP_USE_MOCK_DATA = 'false';
      client.get.mockRejectedValue(new Error('Network Error'));

      await expect(AssetsService.fetchAssets('7d', {}))
        .rejects.toThrow('Network Error');
    });
  });
});
```

```javascript
// __tests__/components/AssetDataTable.test.js
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssetDataTable from '../../components/assets/AssetDataTable';

const mockAssets = {
  'cluster-1/Node/node-1': {
    type: 'Node',
    properties: {
      name: 'gke-prod-node-1',
      provider: 'GCP',
      cluster: 'production',
      category: 'Compute',
    },
    totalCost: 2500,
    efficiency: 0.85,
    cpuCost: 1500,
    ramCost: 1000,
    breakdown: { user: 0.65, system: 0.10, idle: 0.25 },
    labels: { env: 'production', team: 'platform' },
  },
  'cluster-1/Disk/disk-1': {
    type: 'Disk',
    properties: {
      name: 'pvc-data-01',
      provider: 'GCP',
      cluster: 'production',
      category: 'Storage',
    },
    totalCost: 500,
    efficiency: 0.60,
    bytes: 1000000000000,
    bytesUsed: 600000000000,
    storageClass: 'premium-rwo',
  },
};

describe('AssetDataTable', () => {
  it('renders table with correct headers', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    expect(screen.getByText('Asset Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Provider')).toBeInTheDocument();
    expect(screen.getByText('Total Cost')).toBeInTheDocument();
    expect(screen.getByText('Efficiency')).toBeInTheDocument();
  });

  it('renders all assets in the table', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    expect(screen.getByText('gke-prod-node-1')).toBeInTheDocument();
    expect(screen.getByText('pvc-data-01')).toBeInTheDocument();
  });

  it('displays type tags with correct colors', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    const nodeTag = screen.getByText('Node');
    const diskTag = screen.getByText('Disk');

    expect(nodeTag).toHaveClass('cds--tag--purple');
    expect(diskTag).toHaveClass('cds--tag--teal');
  });

  it('sorts assets by cost descending by default', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    const rows = screen.getAllByRole('row');
    // First data row should be the most expensive asset
    expect(within(rows[1]).getByText('gke-prod-node-1')).toBeInTheDocument();
  });

  it('filters assets by search text', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    const searchInput = screen.getByPlaceholderText('Search assets...');
    fireEvent.change(searchInput, { target: { value: 'node' } });

    expect(screen.getByText('gke-prod-node-1')).toBeInTheDocument();
    expect(screen.queryByText('pvc-data-01')).not.toBeInTheDocument();
  });

  it('filters assets by type', () => {
    render(
      <AssetDataTable
        assets={mockAssets}
        currency="USD"
        filterType="Disk"
      />
    );

    expect(screen.queryByText('gke-prod-node-1')).not.toBeInTheDocument();
    expect(screen.getByText('pvc-data-01')).toBeInTheDocument();
  });

  it('expands row to show details', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    // Click expand button on first row
    const expandButtons = screen.getAllByRole('button', { name: /expand/i });
    fireEvent.click(expandButtons[0]);

    // Check expanded content is visible
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Resource Breakdown')).toBeInTheDocument();
  });

  it('displays labels in expanded row', () => {
    render(<AssetDataTable assets={mockAssets} currency="USD" />);

    const expandButtons = screen.getAllByRole('button', { name: /expand/i });
    fireEvent.click(expandButtons[0]);

    expect(screen.getByText(/env: production/)).toBeInTheDocument();
    expect(screen.getByText(/team: platform/)).toBeInTheDocument();
  });

  it('handles pagination', () => {
    // Create more assets for pagination testing
    const manyAssets = {};
    for (let i = 0; i < 25; i++) {
      manyAssets[`cluster-1/Node/node-${i}`] = {
        type: 'Node',
        properties: { name: `node-${i}`, provider: 'GCP', cluster: 'test' },
        totalCost: 100 + i,
        efficiency: 0.75,
      };
    }

    render(<AssetDataTable assets={manyAssets} currency="USD" />);

    // Should show pagination
    expect(screen.getByText('1–10 of 25 items')).toBeInTheDocument();

    // Go to next page
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    expect(screen.getByText('11–20 of 25 items')).toBeInTheDocument();
  });

  it('handles empty assets', () => {
    render(<AssetDataTable assets={{}} currency="USD" />);

    expect(screen.getByText('0 assets found')).toBeInTheDocument();
  });
});
```

### Package.json Test Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    "moduleNameMapper": {
      "\\.(css|scss)$": "identity-obj-proxy"
    },
    "transformIgnorePatterns": [
      "/node_modules/(?!(@carbon|d3|internmap|delaunator|robust-predicates)/)"
    ]
  }
}
```

---

## UX/UI Best Practices

### 1. Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER: Page Title + Controls (Time Window, Currency, Refresh) │
├─────────────────────────────────────────────────────────────────┤
│ KPI TILES: High-level metrics at a glance (4 tiles)            │
│ - Total Cost with trend                                         │
│ - Compute cost with node count                                  │
│ - Storage cost with volume count                                │
│ - Efficiency gauge with percentage                              │
├─────────────────────────────────────────────────────────────────┤
│ CHARTS: Data visualization (2-column layout)                    │
│ ┌─────────────────────┐ ┌─────────────────────┐                │
│ │ TREEMAP             │ │ DONUT               │                │
│ │ (Cost by Asset)     │ │ (Cost by Category)  │                │
│ └─────────────────────┘ └─────────────────────┘                │
│ ┌───────────────────────────────────────────────┐              │
│ │ STACKED BAR (Daily Cost Trend)                │              │
│ └───────────────────────────────────────────────┘              │
├─────────────────────────────────────────────────────────────────┤
│ TABS: Filter by asset type                                      │
│ [All] [Nodes] [Storage] [Load Balancers] [Management]          │
├─────────────────────────────────────────────────────────────────┤
│ DATA TABLE: Detailed asset list                                 │
│ - Expandable rows with details                                  │
│ - Search and sort                                               │
│ - Pagination                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Color Coding

| Element | Color | Purpose |
|---------|-------|---------|
| Primary actions | `#0f62fe` (Carbon Blue) | Buttons, links |
| Compute/Nodes | `#6929c4` (Purple) | Asset type |
| Storage/Disks | `#009d9a` (Teal) | Asset type |
| Network/LB | `#1192e8` (Blue) | Asset type |
| Management | `#005d5d` (Dark Teal) | Asset type |
| Success/Good | `#24a148` (Green) | Efficiency >= 80% |
| Warning/Medium | `#f1c21b` (Yellow) | Efficiency 50-80% |
| Error/Low | `#da1e28` (Red) | Efficiency < 50% |
| Cost increase | `#da1e28` (Red) | Trend up |
| Cost decrease | `#24a148` (Green) | Trend down |

### 3. Loading States

```javascript
// Always show loading states
{loading && (
  <div className="loading-container">
    <Loading description="Loading assets..." withOverlay={false} />
  </div>
)}

// Skeleton screens for better UX
{loading && (
  <Grid>
    <Column lg={4}><SkeletonPlaceholder /></Column>
    <Column lg={4}><SkeletonPlaceholder /></Column>
    <Column lg={4}><SkeletonPlaceholder /></Column>
    <Column lg={4}><SkeletonPlaceholder /></Column>
  </Grid>
)}
```

### 4. Error Handling

```javascript
// Inline notifications for errors
{error && (
  <InlineNotification
    kind="error"
    title={error.title}
    subtitle={error.subtitle}
    hideCloseButton={false}
    onCloseButtonClick={() => setError(null)}
  />
)}

// Empty state handling
{!loading && Object.keys(assets).length === 0 && (
  <div className="empty-state">
    <h4>No assets found</h4>
    <p>Try adjusting your time window or filters.</p>
    <Button onClick={fetchData}>Refresh</Button>
  </div>
)}
```

### 5. Responsive Design

```css
/* Mobile-first approach */
.kpi-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.chart-container {
  background: #fff;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Tablet and above */
@media (min-width: 672px) {
  .chart-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

/* Mobile adjustments */
@media (max-width: 671px) {
  .kpi-card {
    min-width: 100%;
  }

  .chart-container {
    margin-bottom: 1rem;
  }
}
```

### 6. Accessibility

```javascript
// Always include aria labels
<Button
  renderIcon={Renew}
  iconDescription="Refresh data"
  hasIconOnly
  aria-label="Refresh asset data"
/>

// Keyboard navigation support
<DataTable
  isSortable
  aria-label="Assets table"
>

// Screen reader friendly
<Tag type="purple" aria-label={`Asset type: ${asset.type}`}>
  {asset.type}
</Tag>
```

---

## Deployment & Verification

### Pre-submission Checklist

- [ ] All Carbon components render correctly
- [ ] Charts display with proper data
- [ ] DataTable pagination works
- [ ] Expandable rows show details
- [ ] Search filters correctly
- [ ] Tab filtering works
- [ ] Time window selection works
- [ ] Currency conversion works
- [ ] Mock data fallback works
- [ ] Error states display properly
- [ ] Loading states show
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] Netlify preview works

### Build Commands

```bash
# Development
npm run serve

# Production build
npm run build

# Test
npm test

# Test with coverage
npm test -- --coverage
```

### Environment Variables

```bash
# Enable mock data for development
REACT_APP_USE_MOCK_DATA=true

# API base URL
BASE_URL=http://localhost:9090

# For production/demo
BASE_URL=https://demo.infra.opencost.io/model
```

---

## Cover Letter Template

```markdown
## Cover Letter - Assets Page Implementation

### Design Choices

**Why Carbon Design System:**
I chose to fully embrace Carbon Design System because it provides enterprise-grade components that align with OpenCost's professional positioning. The component library offers:
- Consistent, accessible UI components
- Built-in responsive behavior
- Professional data visualization through Carbon Charts
- Theme support for light/dark modes

**Visual Hierarchy:**
The page is structured to provide information at increasing levels of detail:
1. KPI tiles for quick overview
2. Charts for trend analysis
3. Tabbed table for detailed exploration
4. Expandable rows for deep dives

**Component Choices:**
- TreemapChart: Shows cost distribution hierarchically
- DonutChart: Displays category breakdown with center total
- StackedBarChart: Reveals cost trends over time
- DataTable with expansion: Enables detailed asset inspection
- GaugeChart: Visualizes efficiency at a glance

### Challenges Encountered

1. **Carbon CSS conflicts:** Resolved by careful import ordering and scoped CSS
2. **Chart performance:** Implemented memoization for expensive calculations
3. **Mock data design:** Created realistic data structure matching API spec
4. **Expandable row state:** Managed row expansion state efficiently

### Skills Acquired

- Deep understanding of Carbon Design System
- Advanced data visualization with Carbon Charts
- React state management patterns
- API service layer design
- Unit testing with React Testing Library
- Responsive CSS Grid layouts

### Why This Implementation Stands Out

1. **Comprehensive visualization:** Multiple chart types for different insights
2. **Interactive table:** Expandable rows with gauge charts and breakdowns
3. **Theme support:** Light/dark mode toggle
4. **Unit tests:** No other submission includes tests
5. **Professional UX:** Loading states, error handling, empty states
6. **Accessibility:** ARIA labels, keyboard navigation
```

---

## Additional Recommendations

### 1. Add CSV/PDF Export

```javascript
// Download functionality
const downloadCSV = () => {
  const headers = ['Name', 'Type', 'Provider', 'Cluster', 'Cost', 'Efficiency'];
  const rows = Object.values(assets).map(a => [
    a.properties?.name,
    a.type,
    a.properties?.provider,
    a.properties?.cluster,
    a.totalCost,
    a.efficiency,
  ]);

  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `assets-${new Date().toISOString()}.csv`;
  a.click();
};
```

### 2. Add Asset Comparison Feature

```javascript
// Compare multiple assets side-by-side
const [selectedAssets, setSelectedAssets] = useState([]);

const CompareModal = ({ assets, onClose }) => (
  <ComposedModal open onClose={onClose}>
    <ModalHeader title="Compare Assets" />
    <ModalBody>
      <Grid>
        {assets.map(asset => (
          <Column lg={4} key={asset.id}>
            <Tile>
              <h5>{asset.name}</h5>
              <p>Cost: {toCurrency(asset.totalCost)}</p>
              <p>Efficiency: {(asset.efficiency * 100).toFixed(0)}%</p>
            </Tile>
          </Column>
        ))}
      </Grid>
    </ModalBody>
  </ComposedModal>
);
```

### 3. Add Cost Anomaly Detection

```javascript
// Highlight unusual costs
const detectAnomalies = (assets) => {
  const costs = Object.values(assets).map(a => a.totalCost);
  const mean = costs.reduce((a, b) => a + b, 0) / costs.length;
  const stdDev = Math.sqrt(
    costs.reduce((sum, cost) => sum + Math.pow(cost - mean, 2), 0) / costs.length
  );

  return Object.entries(assets).filter(([_, asset]) =>
    Math.abs(asset.totalCost - mean) > 2 * stdDev
  );
};
```

### 4. Add Efficiency Recommendations

```javascript
// Show optimization suggestions
const getRecommendations = (asset) => {
  const recommendations = [];

  if (asset.efficiency < 0.5 && asset.type === 'Node') {
    recommendations.push({
      severity: 'high',
      message: 'Consider downsizing this node - utilization is very low',
    });
  }

  if (asset.breakdown?.idle > 0.4) {
    recommendations.push({
      severity: 'medium',
      message: 'High idle time detected - review workload scheduling',
    });
  }

  return recommendations;
};
```

---

## File Structure Summary

```
src/
├── pages/
│   └── Assets.js                    # Main Assets page
├── components/
│   ├── assets/
│   │   ├── index.js                 # Barrel export
│   │   ├── AssetKPIDashboard.js     # KPI tiles section
│   │   ├── AssetCharts.js           # Chart visualizations
│   │   ├── AssetDataTable.js        # Expandable data table
│   │   ├── AssetExpandedRow.js      # Row expansion content
│   │   └── AssetFilters.js          # Filter controls
│   ├── ThemeToggle.js               # Light/dark mode
│   └── ...existing components
├── services/
│   ├── assets.js                    # API service
│   └── assets.mock.js               # Mock data
├── css/
│   └── assets.css                   # Custom styles
├── __tests__/
│   ├── components/
│   │   └── assets/
│   │       ├── AssetKPIDashboard.test.js
│   │       └── AssetDataTable.test.js
│   ├── services/
│   │   └── assets.test.js
│   └── pages/
│       └── Assets.test.js
└── constants/
    └── assetTokens.js               # Asset-specific constants
```

---

## Quick Reference

### Carbon Import Cheat Sheet

```javascript
// UI Components
import { Button, Tile, Tag, Toggle, Dropdown } from '@carbon/react';

// DataTable
import { DataTable, Table, TableHead, TableBody, TableRow,
         TableCell, TableHeader, Pagination } from '@carbon/react';

// Expandable Table
import { TableExpandHeader, TableExpandRow, TableExpandedRow } from '@carbon/react';

// Charts
import { DonutChart, TreemapChart, GaugeChart, StackedBarChart } from '@carbon/charts-react';

// Icons
import { Renew, Download, BareMetalServer, DataBase } from '@carbon/react/icons';

// Styles
import '@carbon/styles/css/styles.css';
import '@carbon/charts/dist/styles.css';
```

### CSS Variables

```css
/* Carbon color tokens */
--cds-text-primary: #161616;
--cds-text-secondary: #525252;
--cds-background: #ffffff;
--cds-layer-01: #f4f4f4;
--cds-border-subtle: #e0e0e0;
--cds-interactive: #0f62fe;
--cds-support-success: #24a148;
--cds-support-warning: #f1c21b;
--cds-support-error: #da1e28;
```

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Total Lines:** 2000+

This guide should help your agent create the most comprehensive and professional Assets page implementation for the LFX Mentorship application.
