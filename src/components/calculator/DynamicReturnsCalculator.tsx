import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  styled,
  alpha,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(45deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(
    theme.palette.background.paper,
    0.7
  )})`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  position: 'relative',
}));

const GlowEffect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.4),
    borderRadius: theme.spacing(1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.6),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const ResultBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
    theme.palette.secondary.main,
    0.1
  )})`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
    zIndex: 0,
  },
}));

export const DynamicReturnsCalculator = () => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 10);
  
  const [calculatorData, setCalculatorData] = useState({
    startDate: today,
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    initialInvestment: 10000,
    monthlyGrowth: 5,
  });

  const [projectedValue, setProjectedValue] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateAndCalculate = () => {
    const startDate = new Date(calculatorData.startDate);
    const endDate = new Date(calculatorData.endDate);
    
    if (startDate >= endDate) {
      setError('End date must be after start date');
      return;
    }

    if (calculatorData.initialInvestment <= 0) {
      setError('Initial investment must be greater than 0');
      return;
    }

    if (calculatorData.monthlyGrowth < -100 || calculatorData.monthlyGrowth > 100) {
      setError('Monthly growth must be between -100% and 100%');
      return;
    }

    setError(null);
    
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
    
    const monthlyRate = calculatorData.monthlyGrowth / 100;
    let finalValue = calculatorData.initialInvestment;
    
    for (let i = 0; i < monthsDiff; i++) {
      finalValue *= (1 + monthlyRate);
    }

    setProjectedValue(Math.round(finalValue * 100) / 100);
  };

  useEffect(() => {
    validateAndCalculate();
  }, [calculatorData]);

  return (
    <StyledCard>
      <GlowEffect />
      <Box sx={{ p: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TrendingUp color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4">
                Dynamic Returns Calculator
              </Typography>
              <Typography color="text.secondary">
                Simulate your investment growth with precision
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Start Date"
                type="date"
                value={calculatorData.startDate}
                onChange={(e) => setCalculatorData(prev => ({
                  ...prev,
                  startDate: e.target.value
                }))}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  min: today,
                  max: calculatorData.endDate,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="End Date"
                type="date"
                value={calculatorData.endDate}
                onChange={(e) => setCalculatorData(prev => ({
                  ...prev,
                  endDate: e.target.value
                }))}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  min: calculatorData.startDate,
                  max: maxDate.toISOString().split('T')[0],
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Initial Investment"
                type="number"
                value={calculatorData.initialInvestment}
                onChange={(e) => setCalculatorData(prev => ({
                  ...prev,
                  initialInvestment: Number(e.target.value)
                }))}
                InputProps={{
                  startAdornment: <AttachMoney color="primary" />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Monthly Growth (%)"
                type="number"
                value={calculatorData.monthlyGrowth}
                onChange={(e) => setCalculatorData(prev => ({
                  ...prev,
                  monthlyGrowth: Number(e.target.value)
                }))}
                InputProps={{
                  endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
                }}
              />
            </Grid>
          </Grid>

          <ResultBox sx={{ mt: 4 }}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Projected Value
                </Typography>
                <Typography variant="h3" color="primary" sx={{ 
                  background: 'linear-gradient(45deg, #2196f3, #ff4081)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  ${projectedValue.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" align="right">
                  Total Growth: {((projectedValue / calculatorData.initialInvestment - 1) * 100).toFixed(2)}%
                </Typography>
                <Typography variant="body2" color="text.secondary" align="right">
                  Time Period: {new Date(calculatorData.endDate).getMonth() - new Date(calculatorData.startDate).getMonth()} months
                </Typography>
              </Grid>
            </Grid>
          </ResultBox>
        </motion.div>
      </Box>
    </StyledCard>
  );
};