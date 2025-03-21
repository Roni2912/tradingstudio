import {
    Box,
    Grid,
    Card,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Button,
    LinearProgress,
  } from '@mui/material';
  import {
    Refresh,
    TrendingUp,
    TrendingDown,
    MoreVert,
    AddCircleOutline,
  } from '@mui/icons-material';
  import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
  } from 'recharts';
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const portfolioData = [
    { name: 'Stocks', value: 45 },
    { name: 'Crypto', value: 20 },
    { name: 'Forex', value: 15 },
    { name: 'Commodities', value: 10 },
    { name: 'Bonds', value: 10 },
  ];
  
  export const PortfolioManagement = () => {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{color: 'white'}}>Portfolio Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutline />}
            color="primary"
          >
            New Position
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography variant="h4">$125,430.00</Typography>
              <Chip 
                label="+5.2% Today" 
                color="success" 
                size="small" 
                sx={{ mt: 1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Open Positions
              </Typography>
              <Typography variant="h4">12</Typography>
              <Typography variant="body2" color="textSecondary">
                Across 8 Strategies
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Today's P/L
              </Typography>
              <Typography variant="h4" color="success.main">
                +$2,340.50
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                color="success" 
                sx={{ mt: 1 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Available Margin
              </Typography>
              <Typography variant="h4">$45,000.00</Typography>
              <LinearProgress 
                variant="determinate" 
                value={60} 
                sx={{ mt: 1 }}
              />
            </Card>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, height: '400px' }}>
              <Typography variant="h6" gutterBottom>
                Asset Allocation
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
  
          {/* Open Positions Table */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Open Positions
                </Typography>
                <IconButton>
                  <Refresh />
                </IconButton>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Entry Price</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">P/L</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { symbol: 'AAPL', type: 'LONG', entry: 150.25, current: 158.50, pl: '+5.5%' },
                    { symbol: 'TSLA', type: 'SHORT', entry: 280.00, current: 275.30, pl: '+1.7%' },
                    { symbol: 'MSFT', type: 'LONG', entry: 290.75, current: 288.20, pl: '-0.9%' },
                  ].map((position) => (
                    <TableRow key={position.symbol}>
                      <TableCell>{position.symbol}</TableCell>
                      <TableCell>
                        <Chip 
                          label={position.type} 
                          color={position.type === 'LONG' ? 'primary' : 'secondary'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">${position.entry}</TableCell>
                      <TableCell align="right">${position.current}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {position.pl.startsWith('+') ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                          <Typography
                            color={position.pl.startsWith('+') ? 'success.main' : 'error.main'}
                            sx={{ ml: 1 }}
                          >
                            {position.pl}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
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