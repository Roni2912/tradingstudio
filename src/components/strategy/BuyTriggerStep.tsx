
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Card,
  Switch,
  FormControlLabel,
} from '@mui/material';

type BuyTriggerData = {
  useMovingAverage: boolean;
  maPeriod: number | "";
  maType: string;
  checkVolume: boolean;
  minVolume: number | "";
  volumeChange: number | "";
};

type BuyTriggerStepProps = {
  data: BuyTriggerData;
  onChange: (newData: Partial<BuyTriggerData>) => void;
};

export const BuyTriggerStep:React.FC<BuyTriggerStepProps> = ({ data, onChange }) => {
  const handleChange = (newData: Partial<BuyTriggerData>) => {
    onChange({
      ...data,
      ...newData
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Buy Trigger Rules
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Price Conditions
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data?.useMovingAverage || false}
                  onChange={(e) => handleChange({ useMovingAverage: e.target.checked })}
                />
              }
              label="Use Moving Average"
            />

            <Box sx={{ display: data?.useMovingAverage ? 'block' : 'none' }}>
              <TextField 
                fullWidth 
                label="MA Period" 
                type="number" 
                margin="normal"
                value={data?.maPeriod || ''}
                onChange={(e) => handleChange({ maPeriod: e.target.value ?  Number(e.target.value) : ""  })}
              />
              <TextField 
                fullWidth 
                select 
                label="MA Type" 
                value={data?.maType || 'SMA'}
                onChange={(e) => handleChange({ maType: e.target.value })}
                margin="normal"
              >
                <MenuItem value="SMA">Simple MA</MenuItem>
                <MenuItem value="EMA">Exponential MA</MenuItem>
                <MenuItem value="WMA">Weighted MA</MenuItem>
              </TextField>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Volume Conditions
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={data?.checkVolume || false}
                  onChange={(e) => handleChange({ checkVolume: e.target.checked })}
                />
              }
              label="Check Volume"
            />

            <Box sx={{ display: data?.checkVolume ? 'block' : 'none' }}>
              <TextField 
                fullWidth 
                label="Minimum Volume" 
                type="number" 
                margin="normal"
                value={data?.minVolume || ''}
                onChange={(e) => handleChange({ minVolume: e.target.value ? Number(e.target.value) : ""  })}
              />
              <TextField 
                fullWidth 
                label="Volume % Change" 
                type="number" 
                margin="normal"
                value={data?.volumeChange || ''}
                onChange={(e) => handleChange({ volumeChange: e.target.value ? Number(e.target.value) : "" })}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
