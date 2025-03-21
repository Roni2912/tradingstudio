import {
    Box,
    Container,
    Typography,
    Card,
    Button,
    Stack,
    Chip,
    styled,
  } from '@mui/material';
  import { Check } from '@mui/icons-material';
  import { useNavigate } from 'react-router-dom';
  
  const PricingCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[10],
    },
  }));
  
  const FeatureItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.secondary,
    '& svg': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },
  }));
  
  const PopularBadge = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }));
  
  export const Pricing = () => {
    const navigate = useNavigate();
  
    const plans = [
      {
        name: 'Basic',
        price: '$0',
        period: '/month',
        description: 'Perfect for getting started',
        features: [
          'Up to 3 strategies',
          'Basic technical indicators',
          'Standard backtesting',
          'Community support',
        ],
        buttonText: 'Get Started',
        buttonVariant: 'outlined' as const,
      },
      {
        name: 'Pro',
        price: '$29',
        period: '/month',
        description: 'For serious traders',
        popular: true,
        features: [
          'Unlimited strategies',
          'Advanced indicators',
          'Real-time alerts',
          'Priority support',
          'Custom backtesting',
        ],
        buttonText: 'Start Free Trial',
        buttonVariant: 'contained' as const,
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For professional trading teams',
        features: [
          'Custom solutions',
          'Dedicated support',
          'API access',
          'Advanced security',
          'Custom integrations',
          'Team collaboration',
        ],
        buttonText: 'Contact Sales',
        buttonVariant: 'outlined' as const,
      },
    ];
  
    return (
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" component="h1" sx={{color:'white'}} gutterBottom>
            Simple, transparent pricing
          </Typography>
          <Typography variant="h6"  color="text.secondary">
            Choose the perfect plan for your trading needs
          </Typography>
        </Box>
  
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {plans.map((plan) => (
            <PricingCard key={plan.name}>
              {plan.popular && <PopularBadge label="Most Popular" size="small" />}
              
              <Stack spacing={2}>
                <Typography variant="h5" component="h2">
                  {plan.name}
                </Typography>
                
                <Box>
                  <Typography variant="h3" component="span">
                    {plan.price}
                  </Typography>
                  <Typography variant="subtitle1" component="span" color="text.secondary">
                    {plan.period}
                  </Typography>
                </Box>
                
                <Typography variant="subtitle1" color="text.secondary">
                  {plan.description}
                </Typography>
  
                <Box sx={{ flexGrow: 1, my: 3 }}>
                  {plan.features.map((feature) => (
                    <FeatureItem key={feature}>
                      <Check fontSize="small" />
                      <Typography variant="body2">{feature}</Typography>
                    </FeatureItem>
                  ))}
                </Box>
  
                <Button
                  variant={plan.buttonVariant}
                  fullWidth
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    mt: 'auto',
                    py: 1.5,
                    ...(plan.popular && {
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }),
                  }}
                >
                  {plan.buttonText}
                </Button>
              </Stack>
            </PricingCard>
          ))}
        </Box>
  
        <Box textAlign="center" mt={8}>
          <Typography variant="body1" color="text.secondary">
            Have questions? Check our{' '}
            <Button color="primary" onClick={() => navigate('/faq')}>
              FAQ
            </Button>
          </Typography>
        </Box>
      </Container>
    );
  };