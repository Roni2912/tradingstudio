import { useEffect, useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Card, 
  Button, 
  Typography,
  Container,
  TextField,
  styled
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStrategies } from '../../hooks/useStrategies';
import { ScannerStep } from './ScannerStep';
import { BuyTriggerStep } from './BuyTriggerStep';
import { SellTriggerStep } from './SellTriggerStep';
import { SimulationStep } from './SimulationStep';
import Strategy from "../../types/strategy"

const steps = ['Scanner Rules', 'Buy Triggers', 'Sell Triggers', 'Simulation Settings'];

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

export const StrategyCreation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { saveStrategy, getStrategy } = useStrategies();
  const [activeStep, setActiveStep] = useState(0);
  const [strategyData, setStrategyData] = useState({
    name: '',
    description: '',
    configuration: {
      scanner: {},
      buyTrigger: {},
      sellTrigger: {},
      simulation: {}
    },

    status: 'draft',
    type: 'custom',
  });

   const searchParams = new URLSearchParams(location.search);
   const editStrategyId = searchParams.get('edit');


   useEffect(() => {
    if (editStrategyId) {
      const existingStrategy: Strategy = getStrategy(editStrategyId);
      if (existingStrategy) {
        setStrategyData(existingStrategy);
      }
    }
  }, [editStrategyId, getStrategy]);


  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStrategyDataChange = (field: string, value: any) => {
    setStrategyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateStrategy = () => {
    const newStrategy = {
      ...strategyData,
      type: 'custom',
      status: 'active'
    };

    const saved = saveStrategy(newStrategy);
    navigate('/');
  };

  const handleSaveStrategy = () => {
    const savedStrategy = saveStrategy(strategyData);
    navigate('/');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ScannerStep 
          data={strategyData.configuration.scanner}
          onChange={(data) => setStrategyData(prev => ({
            ...prev,
            configuration: { ...prev.configuration, scanner: data }
          }))}
        />;
      case 1:
        return <BuyTriggerStep 
          data={strategyData.configuration.buyTrigger}
          onChange={(data) => setStrategyData(prev => ({
            ...prev,
            configuration: { ...prev.configuration, buyTrigger: data }
          }))}
        />;
      case 2:
        return <SellTriggerStep 
          data={strategyData.configuration.sellTrigger}
          onChange={(data) => setStrategyData(prev => ({
            ...prev,
            configuration: { ...prev.configuration, sellTrigger: data }
          }))}
        />;
      case 3:
        return <SimulationStep 
          data={strategyData.configuration.simulation}
          onChange={(data) => setStrategyData(prev => ({
            ...prev,
            configuration: { ...prev.configuration, simulation: data }
          }))}
        />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">

      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        {editStrategyId ? 'Edit Strategy' : 'Create New Strategy'}
      </Typography>

      
      <StyledCard>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Strategy Name"
            value={strategyData.name}
            onChange={(e) => handleStrategyDataChange('name', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={strategyData.description}
            onChange={(e) => handleStrategyDataChange('description', e.target.value)}
            margin="normal"
            multiline
            rows={2}
          />
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Box>
              <Button
                onClick={() => navigate('/')}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              {/* <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleCreateStrategy : handleNext}
                disabled={!strategyData.name} // Disable if no name is provided
              >
                {activeStep === steps.length - 1 ? 'Create Strategy' : 'Next'}
              </Button> */}

              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSaveStrategy : handleNext}
                disabled={!strategyData.name}
              >
                {activeStep === steps.length - 1 
                  ? (editStrategyId ? 'Save Changes' : 'Create Strategy') 
                  : 'Next'
                }
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledCard>
    </Container>
  );
};