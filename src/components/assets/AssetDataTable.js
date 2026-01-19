import React, { useMemo, useState } from 'react';
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
  Tag,
  ProgressBar,
} from '@carbon/react';
import { GaugeChart } from '@carbon/charts-react';
import { toCurrency, bytesToString } from '../../util';

// Helper to get efficiency color
const getEfficiencyColor = (efficiency) => {
  if (efficiency >= 0.8) return '#24a148'; // Green
  if (efficiency >= 0.6) return '#f1c21b'; // Yellow
  if (efficiency >= 0.4) return '#ff832b'; // Orange
  return '#da1e28'; // Red
};

// Type badge colors
const TYPE_TAG_COLORS = {
  Node: 'purple',
  Disk: 'teal',
  LoadBalancer: 'blue',
  ClusterManagement: 'cyan',
};

// Expanded row content component
const ExpandedRowContent = ({ asset, currency }) => {
  const gaugeOptions = {
    theme: 'white',
    height: '120px',
    resizable: false,
    gauge: {
      type: 'semi',
      status: asset.efficiency >= 0.7 ? 'success' : asset.efficiency >= 0.5 ? 'warning' : 'danger',
    },
    color: {
      scale: {
        value: getEfficiencyColor(asset.efficiency || 0),
      },
    },
    legend: {
      enabled: false,
    },
    toolbar: {
      enabled: false,
    },
  };

  const gaugeData = [
    {
      group: 'value',
      value: Math.round((asset.efficiency || 0) * 100),
    },
  ];

  const labels = asset.labels || {};
  const labelEntries = Object.entries(labels).filter(([key]) =>
    !key.startsWith('beta_') && !key.includes('kubernetes.io')
  ).slice(0, 6);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      padding: '1rem',
      backgroundColor: '#f4f4f4',
    }}>
      {/* Efficiency Gauge */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h6 style={{ marginBottom: '0.5rem', color: '#525252', fontSize: '0.75rem', textTransform: 'uppercase' }}>
          Utilization
        </h6>
        <GaugeChart data={gaugeData} options={gaugeOptions} />
        <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', color: '#161616' }}>
          {((asset.efficiency || 0) * 100).toFixed(0)}% Utilized
        </p>
      </div>

      {/* Cost Breakdown */}
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h6 style={{ marginBottom: '0.75rem', color: '#525252', fontSize: '0.75rem', textTransform: 'uppercase' }}>
          Cost Breakdown
        </h6>
        {asset.type === 'Node' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#525252', fontSize: '0.875rem' }}>CPU Cost</span>
              <span style={{ fontWeight: 500 }}>{toCurrency(asset.cpuCost || 0, currency)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#525252', fontSize: '0.875rem' }}>RAM Cost</span>
              <span style={{ fontWeight: 500 }}>{toCurrency(asset.ramCost || 0, currency)}</span>
            </div>
            {asset.gpuCost > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#525252', fontSize: '0.875rem' }}>GPU Cost</span>
                <span style={{ fontWeight: 500 }}>{toCurrency(asset.gpuCost || 0, currency)}</span>
              </div>
            )}
          </div>
        )}
        {asset.type === 'Disk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#525252', fontSize: '0.875rem' }}>Capacity</span>
              <span style={{ fontWeight: 500 }}>{bytesToString(asset.bytes || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#525252', fontSize: '0.875rem' }}>Used</span>
              <span style={{ fontWeight: 500 }}>{bytesToString(asset.bytesUsed || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#525252', fontSize: '0.875rem' }}>Storage Class</span>
              <span style={{ fontWeight: 500 }}>{asset.storageClass || 'N/A'}</span>
            </div>
          </div>
        )}
        {(asset.type !== 'Node' && asset.type !== 'Disk') && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#525252', fontSize: '0.875rem' }}>Total Cost</span>
            <span style={{ fontWeight: 500 }}>{toCurrency(asset.totalCost || 0, currency)}</span>
          </div>
        )}
      </div>

      {/* Resource Breakdown */}
      {asset.breakdown && (
        <div style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h6 style={{ marginBottom: '0.75rem', color: '#525252', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Resource Breakdown
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#525252' }}>User</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{((asset.breakdown.user || 0) * 100).toFixed(0)}%</span>
              </div>
              <ProgressBar
                value={(asset.breakdown.user || 0) * 100}
                max={100}
                size="small"
                status="active"
                hideLabel
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#525252' }}>System</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{((asset.breakdown.system || 0) * 100).toFixed(0)}%</span>
              </div>
              <ProgressBar
                value={(asset.breakdown.system || 0) * 100}
                max={100}
                size="small"
                hideLabel
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#525252' }}>Idle</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{((asset.breakdown.idle || 0) * 100).toFixed(0)}%</span>
              </div>
              <ProgressBar
                value={(asset.breakdown.idle || 0) * 100}
                max={100}
                size="small"
                status="error"
                hideLabel
              />
            </div>
          </div>
        </div>
      )}

      {/* Labels */}
      {labelEntries.length > 0 && (
        <div style={{
          backgroundColor: '#fff',
          padding: '1rem',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h6 style={{ marginBottom: '0.75rem', color: '#525252', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Labels
          </h6>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {labelEntries.map(([key, value]) => (
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

const AssetDataTable = ({ assets = [], currency = 'USD', filterType = '' }) => {
  const [searchText, setSearchText] = useState('');

  const { headers, rows } = useMemo(() => {
    const assetEntries = Object.entries(assets);

    // Filter by type if specified
    let filteredAssets = assetEntries;
    if (filterType && filterType !== 'all') {
      filteredAssets = assetEntries.filter(([_, asset]) => asset.type === filterType);
    }

    // Filter by search text
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filteredAssets = filteredAssets.filter(([key, asset]) =>
        (asset.properties?.name || key).toLowerCase().includes(lowerSearch) ||
        (asset.type || '').toLowerCase().includes(lowerSearch) ||
        (asset.properties?.provider || '').toLowerCase().includes(lowerSearch) ||
        (asset.properties?.cluster || '').toLowerCase().includes(lowerSearch)
      );
    }

    // Sort by cost descending
    filteredAssets.sort((a, b) => (b[1].totalCost || 0) - (a[1].totalCost || 0));

    const headers = [
      { key: 'name', header: 'Asset Name' },
      { key: 'type', header: 'Type' },
      { key: 'provider', header: 'Provider' },
      { key: 'cluster', header: 'Cluster' },
      { key: 'cost', header: 'Total Cost' },
      { key: 'efficiency', header: 'Efficiency' },
    ];

    const rows = filteredAssets.map(([key, asset]) => ({
      id: key,
      name: asset.properties?.name || key.split('/').pop() || 'Unknown',
      type: asset.type || 'Unknown',
      provider: asset.properties?.provider || 'Unknown',
      cluster: asset.properties?.cluster || 'Unknown',
      cost: asset.totalCost || 0,
      efficiency: asset.efficiency || 0,
      // Keep the full asset for expanded row
      _asset: asset,
    }));

    return { headers, rows };
  }, [assets, filterType, searchText]);

  const renderCell = (cell, row) => {
    switch (cell.info.header) {
      case 'type':
        return (
          <Tag type={TYPE_TAG_COLORS[cell.value] || 'gray'} size="sm">
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
        const effPercent = (cell.value * 100).toFixed(0);
        const effColor = getEfficiencyColor(cell.value);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '60px',
              height: '8px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${effPercent}%`,
                height: '100%',
                backgroundColor: effColor,
                borderRadius: '4px',
              }} />
            </div>
            <span style={{ fontSize: '0.875rem', color: '#161616' }}>
              {effPercent}%
            </span>
          </div>
        );
      default:
        return cell.value;
    }
  };

  return (
    <DataTable rows={rows} headers={headers}>
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
          title="Assets"
          description={`${rows.length} assets found`}
          {...getTableContainerProps()}
        >
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch
                placeholder="Search assets..."
                onChange={(e) => setSearchText(e.target.value || '')}
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
                const assetData = assets[row.id];
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
                      <ExpandedRowContent asset={assetData} currency={currency} />
                    </TableExpandedRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default AssetDataTable;
