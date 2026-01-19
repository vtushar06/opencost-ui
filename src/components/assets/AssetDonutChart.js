import React, { useMemo } from 'react';
import { DonutChart } from '@carbon/charts-react';
import { toCurrency } from '../../util';

// Carbon color palette
const TYPE_COLORS = {
  'Compute': '#6929c4',      // Purple
  'Storage': '#009d9a',      // Teal
  'Network': '#1192e8',      // Blue
  'Management': '#005d5d',   // Dark teal
  'Other': '#a8a8a8',        // Gray
};

const AssetDonutChart = ({ assets = [], currency = 'USD', onTypeClick }) => {
  const { chartData, totalCost } = useMemo(() => {
    const assetsList = Object.values(assets);

    if (assetsList.length === 0) {
      return { chartData: [], totalCost: 0 };
    }

    // Group by category (from properties)
    const categoryTotals = {};
    let total = 0;

    assetsList.forEach(asset => {
      const category = asset.properties?.category || 'Other';
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += asset.totalCost || 0;
      total += asset.totalCost || 0;
    });

    // Convert to chart data format
    const data = Object.entries(categoryTotals)
      .map(([group, value]) => ({
        group,
        value,
      }))
      .sort((a, b) => b.value - a.value);

    return { chartData: data, totalCost: total };
  }, [assets]);

  const chartOptions = useMemo(() => ({
    title: 'Cost by Category',
    theme: 'white',
    height: '320px',
    resizable: true,
    donut: {
      center: {
        label: 'Total',
        number: toCurrency(totalCost, currency),
        numberFontSize: () => 18,
      },
      alignment: 'center',
    },
    pie: {
      labels: {
        formatter: ({ data }) => {
          const percent = ((data.value / totalCost) * 100).toFixed(1);
          return `${percent}%`;
        },
      },
    },
    color: {
      scale: TYPE_COLORS,
    },
    tooltip: {
      customHTML: (data) => {
        if (!data || !data[0]) return '';
        const item = data[0];
        const percent = ((item.value / totalCost) * 100).toFixed(1);
        return `
          <div style="padding: 8px 12px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <p style="margin: 0 0 4px 0; font-weight: 600; color: #161616;">${item.group}</p>
            <p style="margin: 0 0 2px 0; font-size: 14px; font-weight: 500; color: #0f62fe;">${toCurrency(item.value, currency)}</p>
            <p style="margin: 0; font-size: 12px; color: #525252;">${percent}% of total</p>
          </div>
        `;
      },
    },
    legend: {
      alignment: 'center',
      position: 'right',
      truncation: {
        type: 'mid_line',
        threshold: 15,
      },
    },
  }), [totalCost, currency]);

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
    <div className="asset-donut-chart">
      <DonutChart
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default AssetDonutChart;
