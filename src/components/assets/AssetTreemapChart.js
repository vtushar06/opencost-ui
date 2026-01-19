import React, { useMemo } from 'react';
import { TreemapChart } from '@carbon/charts-react';
import { toCurrency } from '../../util';

// Carbon color palette for consistency
const ASSET_COLORS = {
  Node: '#6929c4',      // Purple for compute
  Disk: '#009d9a',      // Teal for storage
  LoadBalancer: '#1192e8', // Blue for network
  ClusterManagement: '#005d5d', // Dark teal for management
};

const AssetTreemapChart = ({ assets = [], currency = 'USD', onAssetClick }) => {
  const chartData = useMemo(() => {
    const assetsList = Object.entries(assets);

    if (assetsList.length === 0) {
      return [];
    }

    // Group assets by type first, then individual assets
    return assetsList.map(([key, asset]) => ({
      name: asset.properties?.name || key.split('/').pop() || 'Unknown',
      group: asset.type || 'Other',
      value: asset.totalCost || 0,
      // Extra data for tooltips
      assetKey: key,
      provider: asset.properties?.provider || 'Unknown',
      cluster: asset.properties?.cluster || 'Unknown',
    }));
  }, [assets]);

  const chartOptions = useMemo(() => ({
    title: 'Cost Distribution by Asset',
    theme: 'white',
    height: '320px',
    color: {
      scale: ASSET_COLORS,
    },
    tooltip: {
      customHTML: (data) => {
        if (!data || !data[0]) return '';
        const item = data[0];
        return `
          <div style="padding: 8px 12px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <p style="margin: 0 0 4px 0; font-weight: 600; color: #161616;">${item.name}</p>
            <p style="margin: 0 0 2px 0; font-size: 12px; color: #525252;">Type: ${item.group}</p>
            <p style="margin: 0; font-size: 14px; font-weight: 500; color: #0f62fe;">${toCurrency(item.value, currency)}</p>
          </div>
        `;
      },
    },
    legend: {
      alignment: 'center',
      position: 'bottom',
      truncation: {
        type: 'mid_line',
        threshold: 20,
      },
    },
    data: {
      groupMapsTo: 'group',
    },
  }), [currency]);

  if (chartData.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '320px',
        backgroundColor: '#f4f4f4',
        borderRadius: '4px',
        color: '#6f6f6f',
      }}>
        No asset data available
      </div>
    );
  }

  return (
    <div className="asset-treemap-chart">
      <TreemapChart
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default AssetTreemapChart;
