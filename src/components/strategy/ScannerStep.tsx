import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';

interface ScannerData {
  minVolume?: number | "";
  volumeChange?: number | "";
}

interface ScannerStepProps {
  data: ScannerData;
  onChange: (updatedData: ScannerData) => void;
}


export const ScannerStep =({ data, onChange }: ScannerStepProps) => {
  const handleChange = (newData: Partial<ScannerData>) => {
    onChange({
      ...data,
      ...newData
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Scanner Configuration
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Market"
            value={data?.market || 'NSE'}
            onChange={(e) => handleChange({...data, market: e.target.value })}
            margin="normal"
          >
            <MenuItem value="NSE">NSE</MenuItem>
            <MenuItem value="NYSE">NYSE</MenuItem>
            <MenuItem value="NASDAQ">NASDAQ</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Instrument Type"
            value={data?.instrumentType || 'EQUITY'}
            onChange={(e) => handleChange({ instrumentType: e.target.value })}
            margin="normal"
          >
            <MenuItem value="EQUITY">Equity</MenuItem>
            <MenuItem value="FUTURES">Futures</MenuItem>
            <MenuItem value="OPTIONS">Options</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};