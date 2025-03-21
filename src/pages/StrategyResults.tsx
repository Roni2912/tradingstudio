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
  } from '@mui/material';
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  const performanceData = [
    { date: '2023-01', strategy: 1100, benchmark: 1000 },
    { date: '2023-02', strategy: 1200, benchmark: 1050 },
    { date: '2023-03', strategy: 1150, benchmark: 1030 },
    { date: '2023-04', strategy: 1300, benchmark: 1080 },
    { date: '2023-05', strategy: 1400, benchmark: 1100 },
  ];
  
  export const StrategyResults = () => {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{color:'white'}}>
          Strategy Results
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Chart
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="strategy" 
                      stroke="#2196f3" 
                      name="Strategy"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#ff9800" 
                      name="Benchmark"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Key Metrics
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Total Return</TableCell>
                    <TableCell align="right">
                      <Chip label="+40%" color="success" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sharpe Ratio</TableCell>
                    <TableCell align="right">1.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Max Drawdown</TableCell>
                    <TableCell align="right">
                      <Chip label="-15%" color="error" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Win Rate</TableCell>
                    <TableCell align="right">65%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Trades
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { date: '2023-05-01', symbol: 'AAPL', type: 'BUY', price: 150.25, return: '+5.2%' },
                    { date: '2023-05-02', symbol: 'MSFT', type: 'SELL', price: 285.30, return: '+3.8%' },
                    { date: '2023-05-03', symbol: 'GOOGL', type: 'BUY', price: 2750.00, return: '-1.2%' },
                  ].map((trade) => (
                    <TableRow key={trade.date + trade.symbol}>
                      <TableCell>{trade.date}</TableCell>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>
                        <Chip 
                          label={trade.type} 
                          color={trade.type === 'BUY' ? 'success' : 'error'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell align="right">${trade.price}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={trade.return} 
                          color={trade.return.startsWith('+') ? 'success' : 'error'}
                          size="small"
                        />
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