import {
    Box,
    Grid,
    Card,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    MenuItem,
    FormControlLabel,
    Switch,
  } from '@mui/material';
  import {
    Search,
    Refresh,
    StarBorder,
    TrendingUp,
    TrendingDown,
  } from '@mui/icons-material';
  
  export const MarketScanner = () => {
    return (
      <Box>
        <Typography variant="h4" sx={{ color: 'white' }} gutterBottom>
          Market Scanner
        </Typography>
  
        <Grid container spacing={3}>
          {/* Scanner Filters */}
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Market"
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Markets</MenuItem>
                    <MenuItem value="stocks">Stocks</MenuItem>
                    <MenuItem value="crypto">Crypto</MenuItem>
                    <MenuItem value="forex">Forex</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Scan Type"
                    defaultValue="technical"
                  >
                    <MenuItem value="technical">Technical</MenuItem>
                    <MenuItem value="fundamental">Fundamental</MenuItem>
                    <MenuItem value="sentiment">Sentiment</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Timeframe"
                    defaultValue="daily"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button 
                    variant="contained" 
                    startIcon={<Search />}
                    fullWidth
                    sx={{ height: '56px' }}
                  >
                    Scan Markets
                  </Button>
                </Grid>
              </Grid>
  
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Advanced Filters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Show Only Trending"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={<Switch />}
                      label="High Volume Only"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Include Pre-market"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
  
          {/* Scan Results */}
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Scan Results
                </Typography>
                <IconButton>
                  <Refresh />
                </IconButton>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Change</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Signal</TableCell>
                    <TableCell>Strength</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { symbol: 'AAPL', price: 150.25, change: '+2.5%', volume: '12.5M', signal: 'Buy', strength: 'Strong' },
                    { symbol: 'TSLA', price: 280.00, change: '-1.2%', volume: '8.2M', signal: 'Sell', strength: 'Moderate' },
                    { symbol: 'MSFT', price: 290.75, change: '+1.8%', volume: '10.1M', signal: 'Buy', strength: 'Moderate' },
                  ].map((row) => (
                    <TableRow key={row.symbol}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton size="small">
                            <StarBorder />
                          </IconButton>
                          {row.symbol}
                        </Box>
                      </TableCell>
                      <TableCell>${row.price}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {row.change.startsWith('+') ? 
                            <TrendingUp color="success" /> : 
                            <TrendingDown color="error" />
                          }
                          <Typography
                            color={row.change.startsWith('+') ? 'success.main' : 'error.main'}
                            sx={{ ml: 1 }}
                          >
                            {row.change}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.volume}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.signal} 
                          color={row.signal === 'Buy' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.strength}
                          color={row.strength === 'Strong' ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };