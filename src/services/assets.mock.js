// Mock data for Assets API - simulates /model/assets response
// This provides realistic data for development and demonstration

const generateMockAssets = (window = '7d') => {
  const now = new Date();
  const startDate = new Date(now);

  // Parse window to determine date range
  const windowDays = {
    'today': 1,
    'yesterday': 1,
    '24h': 1,
    '48h': 2,
    'week': 7,
    'lastweek': 7,
    '7d': 7,
    '14d': 14,
    '30d': 30,
  };

  const days = windowDays[window] || 7;
  startDate.setDate(startDate.getDate() - days);

  // Generate time series data for each day
  const generateDailyData = (baseCost, variance = 0.1) => {
    const data = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const randomVariance = 1 + (Math.random() - 0.5) * 2 * variance;
      data.push({
        date: date.toISOString().split('T')[0],
        cost: baseCost * randomVariance / days,
      });
    }
    return data;
  };

  return {
    code: 200,
    status: 'success',
    data: [
      {
        // Node assets - compute instances
        'cluster-1/Node/gke-prod-pool-1-node-01': {
          type: 'Node',
          properties: {
            category: 'Compute',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'gke-prod-pool-1-node-01',
            providerID: 'gce://opencost-production/us-central1-a/gke-prod-pool-1-node-01',
          },
          labels: {
            'cloud.google.com/gke-nodepool': 'prod-pool-1',
            'node.kubernetes.io/instance-type': 'n2-standard-8',
            'topology.kubernetes.io/region': 'us-central1',
            'topology.kubernetes.io/zone': 'us-central1-a',
            'env': 'production',
            'team': 'platform',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          cpuCores: 8,
          cpuCoreHours: 8 * days * 24,
          cpuCost: 1920.45,
          cpuCostAdjustment: 0,
          ramBytes: 32 * 1024 * 1024 * 1024, // 32 GB
          ramByteHours: 32 * 1024 * 1024 * 1024 * days * 24,
          ramCost: 768.32,
          ramCostAdjustment: 0,
          gpuCount: 0,
          gpuHours: 0,
          gpuCost: 0,
          gpuCostAdjustment: 0,
          breakdown: {
            idle: 0.22,
            other: 0.03,
            system: 0.08,
            user: 0.67,
          },
          adjustment: 0,
          totalCost: 2688.77,
          efficiency: 0.78,
          dailyData: generateDailyData(2688.77),
        },
        'cluster-1/Node/gke-prod-pool-1-node-02': {
          type: 'Node',
          properties: {
            category: 'Compute',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'gke-prod-pool-1-node-02',
            providerID: 'gce://opencost-production/us-central1-b/gke-prod-pool-1-node-02',
          },
          labels: {
            'cloud.google.com/gke-nodepool': 'prod-pool-1',
            'node.kubernetes.io/instance-type': 'n2-standard-8',
            'topology.kubernetes.io/region': 'us-central1',
            'topology.kubernetes.io/zone': 'us-central1-b',
            'env': 'production',
            'team': 'platform',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          cpuCores: 8,
          cpuCoreHours: 8 * days * 24,
          cpuCost: 1845.20,
          cpuCostAdjustment: 0,
          ramBytes: 32 * 1024 * 1024 * 1024,
          ramByteHours: 32 * 1024 * 1024 * 1024 * days * 24,
          ramCost: 720.15,
          ramCostAdjustment: 0,
          gpuCount: 0,
          gpuHours: 0,
          gpuCost: 0,
          gpuCostAdjustment: 0,
          breakdown: {
            idle: 0.18,
            other: 0.02,
            system: 0.10,
            user: 0.70,
          },
          adjustment: 0,
          totalCost: 2565.35,
          efficiency: 0.82,
          dailyData: generateDailyData(2565.35),
        },
        'cluster-1/Node/gke-prod-pool-2-node-01': {
          type: 'Node',
          properties: {
            category: 'Compute',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'gke-prod-pool-2-node-01',
            providerID: 'gce://opencost-production/us-central1-c/gke-prod-pool-2-node-01',
          },
          labels: {
            'cloud.google.com/gke-nodepool': 'prod-pool-2',
            'node.kubernetes.io/instance-type': 'n2-standard-4',
            'topology.kubernetes.io/region': 'us-central1',
            'topology.kubernetes.io/zone': 'us-central1-c',
            'env': 'production',
            'team': 'data',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          cpuCores: 4,
          cpuCoreHours: 4 * days * 24,
          cpuCost: 892.40,
          cpuCostAdjustment: 0,
          ramBytes: 16 * 1024 * 1024 * 1024,
          ramByteHours: 16 * 1024 * 1024 * 1024 * days * 24,
          ramCost: 356.80,
          ramCostAdjustment: 0,
          gpuCount: 0,
          gpuHours: 0,
          gpuCost: 0,
          gpuCostAdjustment: 0,
          breakdown: {
            idle: 0.35,
            other: 0.05,
            system: 0.12,
            user: 0.48,
          },
          adjustment: 0,
          totalCost: 1249.20,
          efficiency: 0.60,
          dailyData: generateDailyData(1249.20),
        },
        'cluster-1/Node/gke-staging-pool-node-01': {
          type: 'Node',
          properties: {
            category: 'Compute',
            provider: 'GCP',
            project: 'opencost-staging',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'gke-staging-pool-node-01',
            providerID: 'gce://opencost-staging/us-central1-a/gke-staging-pool-node-01',
          },
          labels: {
            'cloud.google.com/gke-nodepool': 'staging-pool',
            'node.kubernetes.io/instance-type': 'e2-standard-4',
            'topology.kubernetes.io/region': 'us-central1',
            'topology.kubernetes.io/zone': 'us-central1-a',
            'env': 'staging',
            'team': 'platform',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          cpuCores: 4,
          cpuCoreHours: 4 * days * 24,
          cpuCost: 445.60,
          cpuCostAdjustment: 0,
          ramBytes: 16 * 1024 * 1024 * 1024,
          ramByteHours: 16 * 1024 * 1024 * 1024 * days * 24,
          ramCost: 178.40,
          ramCostAdjustment: 0,
          gpuCount: 0,
          gpuHours: 0,
          gpuCost: 0,
          gpuCostAdjustment: 0,
          breakdown: {
            idle: 0.45,
            other: 0.10,
            system: 0.15,
            user: 0.30,
          },
          adjustment: 0,
          totalCost: 624.00,
          efficiency: 0.45,
          dailyData: generateDailyData(624.00),
        },

        // Disk assets - persistent volumes
        'cluster-1/Disk/pvc-production-db-data': {
          type: 'Disk',
          properties: {
            category: 'Storage',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'pvc-production-db-data',
            providerID: 'gce://opencost-production/us-central1-a/pvc-production-db-data',
          },
          labels: {
            'app': 'postgres',
            'env': 'production',
            'team': 'data',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          bytes: 500 * 1024 * 1024 * 1024, // 500 GB
          byteHours: 500 * 1024 * 1024 * 1024 * days * 24,
          bytesUsed: 385 * 1024 * 1024 * 1024, // 385 GB used
          byteUsageMax: 420 * 1024 * 1024 * 1024,
          breakdown: {
            idle: 0.23,
            other: 0.02,
            system: 0.05,
            user: 0.70,
          },
          storageClass: 'premium-rwo',
          volumeName: 'pvc-production-db-data',
          claimName: 'postgres-data',
          claimNamespace: 'database',
          adjustment: 0,
          totalCost: 875.50,
          efficiency: 0.77,
          dailyData: generateDailyData(875.50),
        },
        'cluster-1/Disk/pvc-production-redis-data': {
          type: 'Disk',
          properties: {
            category: 'Storage',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'pvc-production-redis-data',
            providerID: 'gce://opencost-production/us-central1-b/pvc-production-redis-data',
          },
          labels: {
            'app': 'redis',
            'env': 'production',
            'team': 'platform',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          bytes: 100 * 1024 * 1024 * 1024, // 100 GB
          byteHours: 100 * 1024 * 1024 * 1024 * days * 24,
          bytesUsed: 45 * 1024 * 1024 * 1024, // 45 GB used
          byteUsageMax: 60 * 1024 * 1024 * 1024,
          breakdown: {
            idle: 0.55,
            other: 0.05,
            system: 0.10,
            user: 0.30,
          },
          storageClass: 'standard-rwo',
          volumeName: 'pvc-production-redis-data',
          claimName: 'redis-data',
          claimNamespace: 'cache',
          adjustment: 0,
          totalCost: 175.20,
          efficiency: 0.45,
          dailyData: generateDailyData(175.20),
        },
        'cluster-1/Disk/pvc-logs-elasticsearch': {
          type: 'Disk',
          properties: {
            category: 'Storage',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'pvc-logs-elasticsearch',
            providerID: 'gce://opencost-production/us-central1-c/pvc-logs-elasticsearch',
          },
          labels: {
            'app': 'elasticsearch',
            'env': 'production',
            'team': 'observability',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          bytes: 2000 * 1024 * 1024 * 1024, // 2 TB
          byteHours: 2000 * 1024 * 1024 * 1024 * days * 24,
          bytesUsed: 1650 * 1024 * 1024 * 1024, // 1.65 TB used
          byteUsageMax: 1800 * 1024 * 1024 * 1024,
          breakdown: {
            idle: 0.18,
            other: 0.02,
            system: 0.05,
            user: 0.75,
          },
          storageClass: 'standard-rwo',
          volumeName: 'pvc-logs-elasticsearch',
          claimName: 'elasticsearch-data',
          claimNamespace: 'logging',
          adjustment: 0,
          totalCost: 1400.00,
          efficiency: 0.825,
          dailyData: generateDailyData(1400.00),
        },

        // Load Balancer assets
        'cluster-1/LoadBalancer/ingress-nginx-controller': {
          type: 'LoadBalancer',
          properties: {
            category: 'Network',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'ingress-nginx-controller',
            providerID: 'gce://opencost-production/us-central1/ingress-nginx-controller',
          },
          labels: {
            'app': 'nginx-ingress',
            'env': 'production',
            'team': 'platform',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          breakdown: {
            idle: 0.05,
            other: 0.00,
            system: 0.00,
            user: 0.95,
          },
          adjustment: 0,
          totalCost: 520.00,
          efficiency: 0.95,
          dailyData: generateDailyData(520.00),
        },
        'cluster-1/LoadBalancer/api-gateway-lb': {
          type: 'LoadBalancer',
          properties: {
            category: 'Network',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'api-gateway-lb',
            providerID: 'gce://opencost-production/us-central1/api-gateway-lb',
          },
          labels: {
            'app': 'api-gateway',
            'env': 'production',
            'team': 'api',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          breakdown: {
            idle: 0.15,
            other: 0.00,
            system: 0.00,
            user: 0.85,
          },
          adjustment: 0,
          totalCost: 380.00,
          efficiency: 0.85,
          dailyData: generateDailyData(380.00),
        },

        // Cluster Management
        'cluster-1/ClusterManagement/__clusterManagement__': {
          type: 'ClusterManagement',
          properties: {
            category: 'Management',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'GKE Cluster Management',
            providerID: 'gce://opencost-production/cluster-1/management',
          },
          labels: {
            'env': 'production',
            'managed': 'true',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          breakdown: {
            idle: 0.00,
            other: 0.00,
            system: 1.00,
            user: 0.00,
          },
          adjustment: 0,
          totalCost: 730.00,
          efficiency: 1.00,
          dailyData: generateDailyData(730.00),
        },

        // GPU Node for ML workloads
        'cluster-1/Node/gke-gpu-pool-node-01': {
          type: 'Node',
          properties: {
            category: 'Compute',
            provider: 'GCP',
            project: 'opencost-production',
            service: 'Kubernetes',
            cluster: 'cluster-1',
            name: 'gke-gpu-pool-node-01',
            providerID: 'gce://opencost-production/us-central1-a/gke-gpu-pool-node-01',
          },
          labels: {
            'cloud.google.com/gke-nodepool': 'gpu-pool',
            'node.kubernetes.io/instance-type': 'n1-standard-8',
            'cloud.google.com/gke-accelerator': 'nvidia-tesla-t4',
            'topology.kubernetes.io/region': 'us-central1',
            'topology.kubernetes.io/zone': 'us-central1-a',
            'env': 'production',
            'team': 'ml',
          },
          window: {
            start: startDate.toISOString(),
            end: now.toISOString(),
          },
          start: startDate.toISOString(),
          end: now.toISOString(),
          minutes: days * 24 * 60,
          cpuCores: 8,
          cpuCoreHours: 8 * days * 24,
          cpuCost: 672.00,
          cpuCostAdjustment: 0,
          ramBytes: 52 * 1024 * 1024 * 1024,
          ramByteHours: 52 * 1024 * 1024 * 1024 * days * 24,
          ramCost: 312.00,
          ramCostAdjustment: 0,
          gpuCount: 1,
          gpuHours: days * 24,
          gpuCost: 2520.00,
          gpuCostAdjustment: 0,
          breakdown: {
            idle: 0.40,
            other: 0.05,
            system: 0.05,
            user: 0.50,
          },
          adjustment: 0,
          totalCost: 3504.00,
          efficiency: 0.55,
          dailyData: generateDailyData(3504.00),
        },
      },
    ],
  };
};

export const getMockAssetsData = (window = '7d', aggregate = '', filter = '') => {
  return generateMockAssets(window);
};
