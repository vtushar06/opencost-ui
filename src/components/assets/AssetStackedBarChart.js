import React, { useMemo } from 'react';
import { StackedBarChart } from '@carbon/charts-react';
import { toCurrency } from '../../util';

// Carbon color palette
const TYPE_COLORS = {
  'Node': '#6929c4',           // Purple for compute
  'Disk': '#009d9a',           // Teal for storage
  'LoadBalancer': '#1192e8',   // Blue for network
  'ClusterManagement': '#005d5d', // Dark teal for management
};

const AssetStackedBarChart = ({ assets = [], currency = 'USD' }) => {
  const chartData = useMemo(() => {
    const assetsList = Object.values(assets);

    if (assetsList.length === 0) {
      return [];
    }

    // Collect all unique dates from all assets' daily data
    const dateMap = {};
    const assetTypes = new Set();

    assetsList.forEach(asset => {
      const type = asset.type || 'Other';
      assetTypes.add(type);

      if (asset.dailyData && Array.isArray(asset.dailyData)) {
        asset.dailyData.forEach(dayData => {
          const date = dayData.date;
          if (!dateMap[date]) {
            dateMap[date] = {};
          }
          if (!dateMap[date][type]) {
            dateMap[date][type] = 0;
          }
          dateMap[date][type] += dayData.cost || 0;
        });
      }
    });

    // Convert to chart data format
    const data = [];
    const sortedDates = Object.keys(dateMap).sort();

    sortedDates.forEach(date => {
      assetTypes.forEach(type => {
        data.push({
          group: type,
          date: date,
          value: dateMap[date][type] || 0,
        });
      });
    });

    return data;
  }, [assets]);

  const chartOptions = useMemo(() => ({
    title: 'Daily Cost Trend by Asset Type',
    theme: 'white',
    height: '300px',
    axes: {
      left: {
        title: `Cost (${currency})`,
        mapsTo: 'value',
        stacked: true,
        ticks: {
          formatter: (value) => toCurrency(value, currency, 0),
        },
      },
      bottom: {
        title: 'Date',
        mapsTo: 'date',
        scaleType: 'labels',
      },
    },
    color: {
      scale: TYPE_COLORS,
    },
    bars: {
      maxWidth: 40,
    },
    tooltip: {
      customHTML: (data) => {
        if (!data || !data[0]) return '';
        const item = data[0];
        return `
          <div style="padding: 8px 12px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <p style="margin: 0 0 4px 0; font-weight: 600; color: #161616;">${item.group}</p>
            <p style="margin: 0 0 2px 0; font-size: 12px; color: #525252;">${item.date}</p>
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
        threshold: 15,
      },
    },
  }), [currency]);

  if (chartData.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        backgroundColor: '#f4f4f4',
        borderRadius: '4px',
        color: '#6f6f6f',
      }}>
        No time-series data available
      </div>
    );
  }

  return (
    <div className="asset-stacked-bar-chart">
      <StackedBarChart
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default AssetStackedBarChart;
