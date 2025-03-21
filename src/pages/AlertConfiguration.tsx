import {
    Box,
    Grid,
    Card,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    MenuItem,
    Divider,
  } from '@mui/material';
  import {
    Delete,
    Add,
    NotificationsActive,
  } from '@mui/icons-material';
  
  export const AlertConfiguration = () => {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{color:"white"}}>
          Alert Configuration
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Create New Alert
              </Typography>
  
              <TextField
                fullWidth
                select
                label="Alert Type"
                margin="normal"
              >
                <MenuItem value="price">Price Alert</MenuItem>
                <MenuItem value="technical">Technical Indicator</MenuItem>
                <MenuItem value="news">News Alert</MenuItem>
                <MenuItem value="volume">Volume Alert</MenuItem>
              </TextField>
  
              <TextField
                fullWidth
                label="Symbol"
                margin="normal"
              />
  
              <TextField
                fullWidth
                select
                label="Condition"
                margin="normal"
              >
                <MenuItem value="above">Crosses Above</MenuItem>
                <MenuItem value="below">Crosses Below</MenuItem>
                <MenuItem value="equals">Equals</MenuItem>
              </TextField>
  
              <TextField
                fullWidth
                label="Value"
                type="number"
                margin="normal"
              />
  
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Notification Methods
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Push Notification"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="SMS"
                />
              </Box>
  
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                sx={{ mt: 3 }}
              >
                Create Alert
              </Button>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Active Alerts
              </Typography>
  
              <List>
                {[
                  { symbol: 'AAPL', condition: 'Above $150', type: 'Price Alert' },
                  { symbol: 'BTC/USD', condition: 'Below $30,000', type: 'Price Alert' },
                  { symbol: 'TSLA', condition: 'RSI > 70', type: 'Technical' },
                ].map((alert, index) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NotificationsActive sx={{ mr: 1 }} color="primary" />
                            {alert.symbol}
                          </Box>
                        }
                        secondary={`${alert.type} - ${alert.condition}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" color="error">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };