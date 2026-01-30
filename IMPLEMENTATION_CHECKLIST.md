# Implementation Checklist - Assets Page

## Pre-Implementation Setup

### Dependencies to Install
```bash
npm install @carbon/react @carbon/charts-react @carbon/styles @carbon/icons-react d3 sass --save
npm install @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom identity-obj-proxy --save-dev
```

### File Structure to Create
```
src/
├── pages/
│   └── Assets.js                    [CREATE]
├── components/
│   └── assets/
│       ├── index.js                 [CREATE]
│       ├── AssetKPIDashboard.js     [CREATE]
│       ├── AssetTreemapChart.js     [CREATE]
│       ├── AssetDonutChart.js       [CREATE]
│       ├── AssetStackedBarChart.js  [CREATE]
│       ├── AssetDataTable.js        [CREATE]
│       └── AssetExpandedRow.js      [CREATE]
├── services/
│   ├── assets.js                    [CREATE/UPDATE]
│   └── assets.mock.js               [CREATE/UPDATE]
├── css/
│   └── assets.css                   [CREATE/UPDATE]
├── __tests__/
│   └── components/
│       └── assets/
│           ├── AssetKPIDashboard.test.js  [CREATE]
│           └── AssetDataTable.test.js     [CREATE]
└── constants/
    └── assetTokens.js               [CREATE]
```

---

## Implementation Steps

### Phase 1: Foundation (Priority: Critical)

- [ ] **Step 1.1:** Create `src/constants/assetTokens.js`
  - Window options array
  - Asset type colors mapping
  - Efficiency thresholds
  - Table headers configuration

- [ ] **Step 1.2:** Update `src/services/assets.js`
  - Add aggregation support
  - Add filter parsing
  - Improve error handling
  - Add retry logic

- [ ] **Step 1.3:** Update `src/services/assets.mock.js`
  - Add more realistic data
  - Include all asset types
  - Add dailyData for time series
  - Include varied efficiency values

- [ ] **Step 1.4:** Create `src/css/assets.css`
  - KPI tile styles
  - Chart container styles
  - Expanded row styles
  - Responsive breakpoints
  - Animation transitions

### Phase 2: Components (Priority: High)

- [ ] **Step 2.1:** Create `src/components/assets/AssetKPIDashboard.js`
  - 4 KPI tiles with icons
  - Trend indicators
  - Click handlers for filtering
  - Responsive grid layout

- [ ] **Step 2.2:** Create `src/components/assets/AssetTreemapChart.js`
  - Cost distribution visualization
  - Color-coded by asset type
  - Custom tooltips
  - Legend configuration

- [ ] **Step 2.3:** Create `src/components/assets/AssetDonutChart.js`
  - Category breakdown
  - Center total display
  - Percentage labels
  - Interactive legend

- [ ] **Step 2.4:** Create `src/components/assets/AssetStackedBarChart.js`
  - Time series visualization
  - Stacked by asset type
  - Date axis formatting
  - Currency formatting on Y-axis

- [ ] **Step 2.5:** Create `src/components/assets/AssetExpandedRow.js`
  - GaugeChart for efficiency
  - Cost breakdown section
  - Resource breakdown with progress bars
  - Labels display with tags

- [ ] **Step 2.6:** Create `src/components/assets/AssetDataTable.js`
  - Carbon DataTable setup
  - Expandable rows
  - Search functionality
  - Pagination
  - Sorting
  - Type tags with colors
  - Efficiency bars

- [ ] **Step 2.7:** Create `src/components/assets/index.js`
  - Barrel exports for all components

### Phase 3: Page Integration (Priority: High)

- [ ] **Step 3.1:** Create `src/pages/Assets.js`
  - Import all components
  - State management (window, currency, loading, error)
  - Data fetching with useEffect
  - Tab state for filtering
  - URL parameter handling
  - Error and loading states

- [ ] **Step 3.2:** Update `src/route.js`
  - Add `/assets` route
  - Import Assets page

- [ ] **Step 3.3:** Update `src/components/Nav/SidebarNav.js`
  - Add Assets navigation item
  - Use appropriate icon

### Phase 4: Testing (Priority: Medium)

- [ ] **Step 4.1:** Create `src/setupTests.js`
  - Import testing-library/jest-dom
  - Configure mocks for CSS modules

- [ ] **Step 4.2:** Create component tests
  - AssetKPIDashboard.test.js
  - AssetDataTable.test.js
  - Test rendering
  - Test interactions
  - Test edge cases

- [ ] **Step 4.3:** Create service tests
  - assets.test.js
  - Test API calls
  - Test mock fallback
  - Test error handling

- [ ] **Step 4.4:** Update package.json
  - Add jest configuration
  - Add test scripts

### Phase 5: Polish (Priority: Medium)

- [ ] **Step 5.1:** Add loading skeletons
  - KPI tile skeletons
  - Chart skeletons
  - Table skeletons

- [ ] **Step 5.2:** Add empty states
  - No data message
  - Retry button

- [ ] **Step 5.3:** Add accessibility
  - ARIA labels
  - Keyboard navigation
  - Focus management

- [ ] **Step 5.4:** Performance optimization
  - Memoize expensive calculations
  - Lazy load charts
  - Virtualize table if needed

### Phase 6: Documentation (Priority: Low)

- [ ] **Step 6.1:** Add inline code comments
  - Document complex logic
  - Explain design decisions

- [ ] **Step 6.2:** Prepare cover letter
  - Design choices explanation
  - Challenges encountered
  - Skills learned

---

## Verification Checklist

### Functionality
- [ ] Assets page loads without errors
- [ ] KPI tiles display correct values
- [ ] Treemap chart renders with data
- [ ] Donut chart shows category breakdown
- [ ] Stacked bar chart shows time series
- [ ] DataTable displays all assets
- [ ] Expandable rows work correctly
- [ ] Search filters assets
- [ ] Tab filtering works
- [ ] Pagination works
- [ ] Time window selector works
- [ ] Currency selector works
- [ ] Refresh button works
- [ ] Mock data fallback works

### Visual
- [ ] Consistent Carbon styling
- [ ] Proper color coding
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Loading states display
- [ ] Error states display
- [ ] Empty states display
- [ ] Hover effects work
- [ ] Focus states visible

### Code Quality
- [ ] No console errors
- [ ] No console warnings
- [ ] Build passes
- [ ] Tests pass
- [ ] No unused imports
- [ ] Consistent formatting

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] ARIA labels present

---

## Common Issues & Solutions

### Issue: Carbon CSS conflicts with existing MUI styles
**Solution:** Import Carbon styles ONLY in the Assets page, not globally:
```javascript
// In Assets.js
import '@carbon/styles/css/styles.css';
import '@carbon/charts/dist/styles.css';
```

### Issue: Charts not rendering
**Solution:** Ensure d3 is installed and chart options include height:
```javascript
const options = {
  height: '400px',  // REQUIRED
  theme: 'white',
  // ...
};
```

### Issue: DataTable expansion not working
**Solution:** Include all required expansion components:
```javascript
import {
  DataTable,
  TableExpandHeader,    // Required for header
  TableExpandRow,       // Required for expandable rows
  TableExpandedRow,     // Required for expanded content
} from '@carbon/react';
```

### Issue: Icons not showing
**Solution:** Use correct import path:
```javascript
// Correct
import { Renew } from '@carbon/react/icons';

// Incorrect
import { Renew } from '@carbon/icons-react';  // Different package
```

### Issue: Theme toggle not persisting
**Solution:** Use localStorage and useEffect:
```javascript
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'white';
});

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

## Final Steps Before Submission

1. [ ] Run full build: `npm run build`
2. [ ] Run all tests: `npm test`
3. [ ] Check Netlify preview
4. [ ] Review all code for cleanup
5. [ ] Write cover letter
6. [ ] Create single commit (squash if needed)
7. [ ] Push to fork
8. [ ] Create PR with detailed description
9. [ ] Do NOT reference issue number in commit message
10. [ ] Submit via LFX Portal

---

## Success Metrics

Your implementation should achieve:

| Metric | Target | Status |
|--------|--------|--------|
| Carbon components used | 15+ | [ ] |
| Chart types | 4+ | [ ] |
| Unit tests | 10+ | [ ] |
| Test coverage | >70% | [ ] |
| Lighthouse accessibility | >90 | [ ] |
| Build size increase | <2MB | [ ] |
| Load time | <3s | [ ] |
