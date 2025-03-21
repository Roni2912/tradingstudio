import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  MoreVert,
  Add,
  TrendingUp,
  Edit,
  Delete,
  PlayArrow,
  ShowChart,
  Assessment,
  AccountBalance,
  Notifications,
  Speed,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStrategies } from '../hooks/useStrategies';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DynamicReturnsCalculator } from '../components/calculator/DynamicReturnsCalculator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#00e676',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
    success: {
      main: '#00e676',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.9), rgba(10, 25, 41, 0.9))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        },
      },
    },
  },
});

const performanceData = [
  { date: '2023-01', value: 1000, profit: 100 },
  { date: '2023-02', value: 1200, profit: 200 },
  { date: '2023-03', value: 1100, profit: 150 },
  { date: '2023-04', value: 1400, profit: 250 },
  { date: '2023-05', value: 1300, profit: 200 },
  { date: '2023-06', value: 1600, profit: 300 },
];


const StatCard = ({ title, value, trend, icon: Icon, color = 'primary' }: any) => {
  const theme = useTheme();
  return (
    <Card sx={{
      height: '100%',
      p: 2,
      background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 2,
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {Icon && <Icon sx={{ mr: 1, color: theme.palette[color].main }} />}
          <Typography color="textSecondary">{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {value}
          </Typography>
          {trend && (
            <Chip
              label={trend}
              color={trend.startsWith('+') ? 'success' : 'error'}
              size="small"
              sx={{ 
                fontWeight: 'bold',
                background: trend.startsWith('+') ? 
                  'linear-gradient(45deg, #00e676, #00c853)' : 
                  'linear-gradient(45deg, #ff1744, #d50000)',
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { strategies, deleteStrategy } = useStrategies();
  const [menuAnchor, setMenuAnchor] = useState<null | { el: HTMLElement; id: string }>(null);
  const theme = useTheme();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor({ el: event.currentTarget, id });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        p: 3, 
        minHeight: '100vh',
        background: theme.palette.background.default,
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 4,
          alignItems: 'center' 
        }}>
          <Typography variant="h4" sx={{ 
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <ShowChart sx={{ color: theme.palette.primary.main }} />
            Trading Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="primary">
              <Notifications />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/create-strategy')}
              sx={{ 
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              }}
            >
              New Strategy
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              height: '100%',
              p: 2,
              background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.9), rgba(10, 25, 41, 0.9))',
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                }}>
                  <ShowChart sx={{ mr: 1 }} />
                  Portfolio Performance
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip 
                        contentStyle={{ 
                          background: theme.palette.background.paper,
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={theme.palette.primary.main}
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StatCard 
                  title="Total Portfolio Value"
                  value="$16,540"
                  trend="+16.5%"
                  icon={AccountBalance}
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard 
                  title="Active Strategies"
                  value={strategies.length || 0}
                  icon={Speed}
                />
              </Grid>
              <Grid item xs={12}>
                <StatCard 
                  title="Monthly Profit"
                  value="$2,450"
                  trend="+8.3%"
                  icon={TrendingUp}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DynamicReturnsCalculator />
        </Grid>

        <Box sx={{ mb: 3, mt:4 }}>
          <Typography variant="h6" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.main,
          }}>
            <Assessment sx={{ mr: 1 }} />
            Your Strategies
          </Typography>
          
          {strategies.length === 0 ? (
            <Card sx={{ 
              p: 4, 
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.9), rgba(10, 25, 41, 0.9))',
            }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Strategies Yet
              </Typography>
              <Typography color="text.secondary" paragraph>
                Create your first trading strategy to get started
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/create-strategy')}
              >
                Create Strategy
              </Button>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {strategies.map((strategy) => (
                <Grid item xs={12} sm={6} md={4} key={strategy.id}>
                  <Card sx={{ 
                    p: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{strategy.name}</Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, strategy.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={strategy.status}
                        color={
                          strategy.status === 'active' ? 'success' :
                          strategy.status === 'draft' ? 'warning' : 'default'
                        }
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={strategy.type}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Last modified: {new Date(strategy.lastModified).toLocaleDateString()}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PlayArrow />}
                        onClick={() => navigate(`/strategy-results/${strategy.id}`)}
                        fullWidth
                      >
                        View Results
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => navigate(`/create-strategy?edit=${strategy.id}`)}
                        fullWidth
                      >
                        Edit
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Menu
          anchorEl={menuAnchor?.el}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            if (menuAnchor?.id) deleteStrategy(menuAnchor.id);
            handleMenuClose();
          }}>
            <Delete sx={{ mr: 1 }} color="error" />
            Delete Strategy
          </MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
};