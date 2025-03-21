import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Card,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface SimulationData {
  startDate: Date | null;
  endDate: Date | null;
  initialCapital: number | '';
  maxPositions: number | '';
  positionSize: number | '';
  rebalancingFrequency: string;
  positionSizingMethod: string;
}

interface SimulationStepProps {
  data: SimulationData;
  onChange: (updatedData: Partial<SimulationData>) => void;
}

export const SimulationStep : React.FC<SimulationStepProps> = ({ data, onChange }) => {

  const handleChange = (newData:any) => {
    onChange({
      ...data,
      ...newData,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Simulation Parameters
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Time Period
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <DatePicker
                  label="Start Date"
                  value={data?.startDate ? new Date(data.startDate) : null} 
                  onChange={(date) =>
                    handleChange({
                      startDate: date,
                      endDate: date ? new Date(date.getTime() + 86400000) : null, 
                    })
                  }
                  minDate={new Date()} 
                />
                </Grid>
                <Grid item xs={12}>
                <DatePicker
                  label="End Date"
                  value={data?.endDate ? new Date(data.endDate) : null} 
                  onChange={(date) => handleChange({ endDate: date })}
                  minDate={data?.startDate ? new Date(new Date(data.startDate).getTime() + 86400000) : new Date()} 
                />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Capital & Position Sizing
            </Typography>

            <TextField
              fullWidth
              label="Initial Capital"
              type="number"
              margin="normal"
              value={data?.initialCapital || ''}
              onChange={(e) => handleChange({ initialCapital: e.target.value })}
            />

            <TextField
              fullWidth
              label="Maximum Positions"
              type="number"
              margin="normal"
              value={data?.maxPositions || ''}
              onChange={(e) => handleChange({ maxPositions: e.target.value })}
            />

            <TextField
              fullWidth
              label="Position Size (%)"
              type="number"
              margin="normal"
              value={data?.positionSize || ''}
              onChange={(e) => handleChange({ positionSize: e.target.value })}
            />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Advanced Settings
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Rebalancing Frequency</InputLabel>
                  <Select
                    value={data?.rebalancingFrequency || ''}
                     label="Rebalancing Frequency"  
                    onChange={(e) => handleChange({ rebalancingFrequency: e.target.value })}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Position Sizing Method</InputLabel>
                  <Select
                    value={data?.positionSizingMethod || ''}
                    label="Position Sizing Method"
                    onChange={(e) => handleChange({ positionSizingMethod: e.target.value })}
                  >
                    <MenuItem value="equal">Equal Weight</MenuItem>
                    <MenuItem value="volatility">Volatility Adjusted</MenuItem>
                    <MenuItem value="custom">Custom Weights</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
