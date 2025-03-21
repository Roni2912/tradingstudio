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
    Button,
    MenuItem,
    TextField,
  } from '@mui/material';
  import {
    Download,
  } from '@mui/icons-material';
  import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
  } from 'recharts';
  
  const performanceData = [
    { date: '2023-01', strategy1: 100, strategy2: 100, strategy3: 100 },
    { date: '2023-02', strategy1: 110, strategy2: 105, strategy3: 108 },
    { date: '2023-03', strategy1: 115, strategy2: 112, strategy3: 105 },
    { date: '2023-04', strategy1: 125, strategy2: 118, strategy3: 112 },
    { date: '2023-05', strategy1: 135, strategy2: 125, strategy3: 120 },
  ];
  
  export const StrategyComparison = () => {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{color:'white'}}>Strategy Comparison</Typography>
          <Button
            variant="contained"
            startIcon={<Download />}
            color="primary"
          >
            Export Analysis
          </Button>
        </Box>
  
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Select Strategies to Compare
              </Typography>
              <Grid container spacing={2}>
                {[1, 2, 3].map((num) => (
                  <Grid item xs={12} md={4} key={num}>
                    <TextField
                      fullWidth
                      select
                      label={`Strategy ${num}`}
                      defaultValue=""
                    >
                      <MenuItem value="momentum">Momentum Strategy</MenuItem>
                      <MenuItem value="meanrev">Mean Reversion</MenuItem>
                      <MenuItem value="trend">Trend Following</MenuItem>
                    </TextField>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cumulative Performance
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="strategy1" 
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="strategy2" 
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="strategy3" 
                      stackId="3"
                      stroke="#ffc658"
                      fill="#ffc658"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Grid>
  
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Metrics
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Strategy 1</TableCell>
                    <TableCell align="right">Strategy 2</TableCell>
                    <TableCell align="right">Strategy 3</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { metric: 'Total Return', s1: '+35%', s2: '+25%', s3: '+20%' },
                    { metric: 'Sharpe Ratio', s1: '1.8', s2: '1.5', s3: '1.3' },
                    { metric: 'Max Drawdown', s1: '-12%', s2: '-15%', s3: '-10%' },
                    { metric: 'Win Rate', s1: '65%', s2: '60%', s3: '58%' },
                  ].map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell>{row.metric}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.s1} 
                          color={row.s1.startsWith('+') ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.s2} 
                          color={row.s2.startsWith('+') ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.s3} 
                          color={row.s3.startsWith('+') ? 'success' : 'default'}
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