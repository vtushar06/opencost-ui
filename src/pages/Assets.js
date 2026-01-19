import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  Loading,
  InlineNotification,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Dropdown,
  Button,
  Grid,
  Column,
} from '@carbon/react';
import { Renew } from '@carbon/react/icons';

// Carbon styles
import '@carbon/styles/css/styles.css';
import '@carbon/charts/dist/styles.css';

// Custom assets styles
import '../css/assets.css';

// Page components
import Page from '../components/Page';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Assets components
import AssetKPITiles from '../components/assets/AssetKPITiles';
import AssetTreemapChart from '../components/assets/AssetTreemapChart';
import AssetDonutChart from '../components/assets/AssetDonutChart';
import AssetStackedBarChart from '../components/assets/AssetStackedBarChart';
import AssetDataTable from '../components/assets/AssetDataTable';

// Services
import AssetsService from '../services/assets';

// Constants
import { currencyCodes } from '../constants/currencyCodes';

const windowOptions = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '24h', label: 'Last 24h' },
  { id: '48h', label: 'Last 48h' },
  { id: 'week', label: 'Week-to-date' },
  { id: 'lastweek', label: 'Last week' },
  { id: '7d', label: 'Last 7 days' },
  { id: '14d', label: 'Last 14 days' },
  { id: '30d', label: 'Last 30 days' },
];

const AssetsPage = () => {
  // Data state
  const [assetsData, setAssetsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [selectedTab, setSelectedTab] = useState(0);

  // URL state
  const routerLocation = useLocation();
  const searchParams = new URLSearchParams(routerLocation.search);
  const navigate = useNavigate();

  const window = searchParams.get('window') || '7d';
  const currency = searchParams.get('currency') || 'USD';

  // Fetch data on mount and when parameters change
  useEffect(() => {
    fetchData();
  }, [window]);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const resp = await AssetsService.fetchAssets(window, {
        accumulate: true,
      });

      if (resp.data && resp.data.length > 0) {
        // Assets API returns data as array with a single object containing all assets
        setAssetsData(resp.data[0] || {});
      } else {
        setAssetsData({});
        if (resp.message) {
          setError({
            title: 'Data unavailable',
            subtitle: resp.message,
          });
        }
      }
    } catch (err) {
      console.error('Error fetching assets:', err);
      setError({
        title: 'Failed to load assets data',
        subtitle: err.message || 'Please check your connection and try again.',
      });
      setAssetsData({});
    }

    setLoading(false);
  }

  // Filter assets by type for tabs
  const assetsByType = useMemo(() => {
    const types = {
      all: assetsData,
      Node: {},
      Disk: {},
      LoadBalancer: {},
      ClusterManagement: {},
    };

    Object.entries(assetsData).forEach(([key, asset]) => {
      const type = asset.type || 'Other';
      if (types[type]) {
        types[type][key] = asset;
      }
    });

    return types;
  }, [assetsData]);

  // Get current filter type based on selected tab
  const getFilterType = () => {
    const tabTypes = ['all', 'Node', 'Disk', 'LoadBalancer', 'ClusterManagement'];
    return tabTypes[selectedTab] || 'all';
  };

  const handleWindowChange = ({ selectedItem }) => {
    const newSearchParams = new URLSearchParams(routerLocation.search);
    newSearchParams.set('window', selectedItem.id);
    navigate({ search: `?${newSearchParams.toString()}` });
  };

  const handleCurrencyChange = ({ selectedItem }) => {
    const newSearchParams = new URLSearchParams(routerLocation.search);
    newSearchParams.set('currency', selectedItem.code);
    navigate({ search: `?${newSearchParams.toString()}` });
  };

  const handleTileClick = (type) => {
    const tabMap = {
      'all': 0,
      'Node': 1,
      'Disk': 2,
      'LoadBalancer': 3,
      'ClusterManagement': 4,
      'efficiency': 0, // Show all for efficiency
    };
    setSelectedTab(tabMap[type] || 0);
  };

  const selectedWindow = windowOptions.find(w => w.id === window) || windowOptions[6];
  const selectedCurrency = currencyCodes.find(c => c.code === currency) || currencyCodes[0];

  return (
    <Page active="/assets">
      <Header headerTitle="Infrastructure Assets">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Dropdown
            id="window-dropdown"
            titleText=""
            label="Time Window"
            items={windowOptions}
            itemToString={(item) => item?.label || ''}
            selectedItem={selectedWindow}
            onChange={handleWindowChange}
            size="sm"
            style={{ minWidth: '140px' }}
          />
          <Dropdown
            id="currency-dropdown"
            titleText=""
            label="Currency"
            items={currencyCodes}
            itemToString={(item) => item?.code || ''}
            selectedItem={selectedCurrency}
            onChange={handleCurrencyChange}
            size="sm"
            style={{ minWidth: '100px' }}
          />
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Renew}
            iconDescription="Refresh"
            hasIconOnly
            onClick={() => fetchData()}
          />
        </div>
      </Header>

      {/* Error notification */}
      {error && (
        <div style={{ marginBottom: '1rem' }}>
          <InlineNotification
            kind="error"
            title={error.title}
            subtitle={error.subtitle}
            hideCloseButton={false}
            onCloseButtonClick={() => setError(null)}
          />
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}>
          <Loading description="Loading assets data..." withOverlay={false} />
        </div>
      )}

      {/* Main content */}
      {!loading && (
        <>
          {/* KPI Tiles */}
          <AssetKPITiles
            assets={assetsData}
            currency={currency}
            onTileClick={handleTileClick}
          />

          {/* Charts Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <AssetTreemapChart assets={assetsData} currency={currency} />
            </div>
            <div style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <AssetDonutChart assets={assetsData} currency={currency} />
            </div>
          </div>

          {/* Time Series Chart */}
          <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}>
            <AssetStackedBarChart assets={assetsData} currency={currency} />
          </div>

          {/* Tabbed Data Table */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
          }}>
            <Tabs selectedIndex={selectedTab} onChange={({ selectedIndex }) => setSelectedTab(selectedIndex)}>
              <TabList aria-label="Asset type tabs" contained>
                <Tab>All Assets ({Object.keys(assetsByType.all).length})</Tab>
                <Tab>Nodes ({Object.keys(assetsByType.Node).length})</Tab>
                <Tab>Storage ({Object.keys(assetsByType.Disk).length})</Tab>
                <Tab>Load Balancers ({Object.keys(assetsByType.LoadBalancer).length})</Tab>
                <Tab>Management ({Object.keys(assetsByType.ClusterManagement).length})</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AssetDataTable assets={assetsData} currency={currency} filterType="all" />
                </TabPanel>
                <TabPanel>
                  <AssetDataTable assets={assetsData} currency={currency} filterType="Node" />
                </TabPanel>
                <TabPanel>
                  <AssetDataTable assets={assetsData} currency={currency} filterType="Disk" />
                </TabPanel>
                <TabPanel>
                  <AssetDataTable assets={assetsData} currency={currency} filterType="LoadBalancer" />
                </TabPanel>
                <TabPanel>
                  <AssetDataTable assets={assetsData} currency={currency} filterType="ClusterManagement" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </>
      )}

      <Footer />
    </Page>
  );
};

export default AssetsPage;
