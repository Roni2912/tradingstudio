import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import  { Dashboard }  from './pages/Dashboard';
import { theme } from './theme/theme';
import { StrategyCreation } from './components/strategy/StrategyCreation';
import { StrategyResults } from './pages/StrategyResults';
import { PortfolioManagement } from './pages/PortfolioManagement';
import { AlertConfiguration } from './pages/AlertConfiguration';
import { StrategyComparison } from './pages/StrategyComparison';
import { MarketScanner } from './pages/MarketScanner';
import { Pricing } from './pages/Pricing';

import { SnackbarProvider } from 'notistack';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ThemeProvider theme={theme}>

    <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-strategy" element={<StrategyCreation />} />
            <Route path="/strategy-results/:id" element={<StrategyResults />} />
            <Route path="/portfolio" element={<PortfolioManagement />} />
            <Route path="/alerts" element={<AlertConfiguration />} />
            <Route path="/compare" element={<StrategyComparison />} />
            <Route path="/scanner" element={<MarketScanner />} />
            <Route path="/pricing" element={<Pricing />} />

              <Route path="/404" element={<NotFound />} />
              
              <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;