import React from 'react';
import { Tile, ClickableTile } from '@carbon/react';
import {
  DataBase,
  BareMetalServer,
  CloudMonitoring,
  CostTotal,
  ArrowUp,
  ArrowDown,
} from '@carbon/react/icons';
import { toCurrency, bytesToString } from '../../util';

const formatPercentChange = (change) => {
  if (change === 0) return null;
  const isPositive = change > 0;
  const Icon = isPositive ? ArrowUp : ArrowDown;
  const color = isPositive ? '#da1e28' : '#24a148'; // Red for cost increase, green for decrease

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      color,
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    }}>
      <Icon size={12} style={{ marginRight: '0.25rem' }} />
      {Math.abs(change).toFixed(1)}% vs last period
    </span>
  );
};

const KPITile = ({ title, value, subtitle, icon: Icon, onClick, trend, accentColor = '#0f62fe' }) => (
  <div
    onClick={onClick}
    style={{
      flex: '1 1 220px',
      minWidth: '200px',
      maxWidth: '280px',
      cursor: onClick ? 'pointer' : 'default',
    }}
  >
    <Tile
      style={{
        height: '100%',
        padding: '1.25rem',
        borderLeft: `4px solid ${accentColor}`,
        transition: 'box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out',
        backgroundColor: '#ffffff',
      }}
      className="asset-kpi-tile"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{
            fontSize: '0.875rem',
            color: '#525252',
            marginBottom: '0.5rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {title}
          </p>
          <p style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#161616',
            lineHeight: 1.2,
            marginBottom: '0.25rem'
          }}>
            {value}
          </p>
          {subtitle && (
            <p style={{
              fontSize: '0.875rem',
              color: '#6f6f6f',
              marginTop: '0.25rem'
            }}>
              {subtitle}
            </p>
          )}
          {trend !== undefined && formatPercentChange(trend)}
        </div>
        <div style={{
          padding: '0.75rem',
          backgroundColor: `${accentColor}10`,
          borderRadius: '8px',
        }}>
          <Icon size={24} style={{ color: accentColor }} />
        </div>
      </div>
    </Tile>
  </div>
);

const AssetKPITiles = ({ assets = [], currency = 'USD', onTileClick }) => {
  // Calculate KPI metrics from assets data
  const assetsList = Object.values(assets);

  const totalCost = assetsList.reduce((sum, asset) => sum + (asset.totalCost || 0), 0);

  const nodeAssets = assetsList.filter(a => a.type === 'Node');
  const diskAssets = assetsList.filter(a => a.type === 'Disk');
  const lbAssets = assetsList.filter(a => a.type === 'LoadBalancer');
  const mgmtAssets = assetsList.filter(a => a.type === 'ClusterManagement');

  const nodeCost = nodeAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0);
  const diskCost = diskAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0);

  // Calculate total storage capacity and usage
  const totalStorage = diskAssets.reduce((sum, a) => sum + (a.bytes || 0), 0);
  const usedStorage = diskAssets.reduce((sum, a) => sum + (a.bytesUsed || 0), 0);

  // Calculate average efficiency across all assets
  const assetsWithEfficiency = assetsList.filter(a => typeof a.efficiency === 'number');
  const avgEfficiency = assetsWithEfficiency.length > 0
    ? assetsWithEfficiency.reduce((sum, a) => sum + a.efficiency, 0) / assetsWithEfficiency.length
    : 0;

  // Calculate cost breakdown percentages
  const costBreakdown = {
    compute: nodeCost,
    storage: diskCost,
    network: lbAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0),
    management: mgmtAssets.reduce((sum, a) => sum + (a.totalCost || 0), 0),
  };

  // Simulated trend data (in a real app, this would compare to previous period)
  const trends = {
    totalCost: 5.2,
    nodes: -2.1,
    storage: 8.4,
    efficiency: 3.0,
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1.5rem',
    }}>
      <KPITile
        title="Total Asset Cost"
        value={toCurrency(totalCost, currency)}
        subtitle={`Across ${assetsList.length} assets`}
        icon={CostTotal}
        trend={trends.totalCost}
        accentColor="#0f62fe"
        onClick={() => onTileClick?.('all')}
      />
      <KPITile
        title="Compute (Nodes)"
        value={toCurrency(nodeCost, currency)}
        subtitle={`${nodeAssets.length} nodes active`}
        icon={BareMetalServer}
        trend={trends.nodes}
        accentColor="#6929c4"
        onClick={() => onTileClick?.('Node')}
      />
      <KPITile
        title="Storage"
        value={bytesToString(usedStorage)}
        subtitle={`${toCurrency(diskCost, currency)} • ${diskAssets.length} volumes`}
        icon={DataBase}
        trend={trends.storage}
        accentColor="#009d9a"
        onClick={() => onTileClick?.('Disk')}
      />
      <KPITile
        title="Efficiency"
        value={`${(avgEfficiency * 100).toFixed(0)}%`}
        subtitle="Average utilization"
        icon={CloudMonitoring}
        trend={trends.efficiency}
        accentColor={avgEfficiency >= 0.7 ? '#24a148' : avgEfficiency >= 0.5 ? '#f1c21b' : '#da1e28'}
        onClick={() => onTileClick?.('efficiency')}
      />
    </div>
  );
};

export default AssetKPITiles;
