
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
} from '@mui/material';

interface SellTriggerData {
  stopLoss?: number | "";
  targetPrice?: number | "";
  trailingStopLoss?: number | "";
  [key: string]: any;
}

interface SellTriggerStepProps {
  data: SellTriggerData;
  onChange: (newData: Partial<SellTriggerData>) => void;
}

export const SellTriggerStep:React.FC<SellTriggerStepProps> = ({ data, onChange }) => {
  const handleChange = (newData: Partial<SellTriggerData>) => {
    onChange({
      ...data,
      ...newData,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sell Trigger Configuration
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Stop Loss Settings
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data?.stopLossEnabled || false}
                  onChange={(e) => handleChange({ stopLossEnabled: e.target.checked })}
                />
              }
              label="Enable Stop Loss"
            />

            {data?.stopLossEnabled && (
              <Box>
                <Typography gutterBottom>Stop Loss (%)</Typography>
                <Slider
                  value={data?.stopLoss || 5}
                  onChange={(_, value) => handleChange({ stopLoss: value })}
                  valueLabelDisplay="on"
                  step={0.5}
                  min={0.5}
                  max={30}
                />
              </Box>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={data?.trailingStopLossEnabled || false}
                  onChange={(e) => handleChange({ trailingStopLossEnabled: e.target.checked })}
                />
              }
              label="Enable Trailing Stop Loss"
              sx={{ mt: 2 }}
            />

            {data?.trailingStopLossEnabled && (
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Trailing Stop Loss Distance (%)</Typography>
                <Slider
                  value={data?.trailingStopLoss || 3}
                  onChange={(_, value) => handleChange({ trailingStopLoss: value })}
                  valueLabelDisplay="on"
                  step={0.5}
                  min={0.5}
                  max={10}
                />
              </Box>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Take Profit Settings
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data?.takeProfitEnabled || false}
                  onChange={(e) => handleChange({ takeProfitEnabled: e.target.checked })}
                />
              }
              label="Enable Take Profit"
            />

            {data?.takeProfitEnabled && (
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Take Profit Target (%)</Typography>
                <Slider
                  value={data?.takeProfit || 15}
                  onChange={(_, value) => handleChange({ takeProfit: value })}
                  valueLabelDisplay="on"
                  step={1}
                  min={5}
                  max={50}
                />
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" gutterBottom>Time-Based Exit</Typography>
            <TextField
              fullWidth
              type="number"
              label="Maximum Hold Period (Days)"
              value={data?.maxHoldPeriod || 30}
              onChange={(e) => handleChange({ maxHoldPeriod: parseInt(e.target.value, 10) })}
              margin="normal"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
