import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  styled,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  Dashboard,
  Search,
  Notifications,
  AccountCircle,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: 'none',
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  '&.active': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.main,
  },
  '&:focus': {
    outline: 'none',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  '&:focus': {
    outline: 'none',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '12px',
    marginTop: '8px',
    minWidth: '200px',
    boxShadow: theme.shadows[3],
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '& .MuiMenu-list': {
      padding: '8px',
    },
    '& .MuiMenuItem-root': {
      borderRadius: '8px',
      padding: '10px 16px',
      gap: '8px',
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
  },
}));

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const handleStrategyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileAnchor(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <LogoContainer onClick={() => navigate('/')} sx={{ mr: 2 }}>
            <TrendingUp color="primary" />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trading Studio
            </Typography>
          </LogoContainer>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <NavButton
              className={isActive('/') ? 'active' : ''}
              startIcon={<Dashboard />}
              onClick={() => navigate('/')}
            >
              Dashboard
            </NavButton>

            <NavButton
              className={location.pathname.includes('/strategy') ? 'active' : ''}
              endIcon={<KeyboardArrowDown />}
              onClick={handleStrategyMenu}
            >
              Strategies
            </NavButton>

            <NavButton
              className={isActive('/scanner') ? 'active' : ''}
              startIcon={<Search />}
              onClick={() => navigate('/scanner')}
            >
              Scanner
            </NavButton>

            <NavButton
              className={isActive('/portfolio') ? 'active' : ''}
              onClick={() => navigate('/portfolio')}
            >
              Portfolio
            </NavButton>

            <Button
              color="inherit"
              onClick={() => navigate('/pricing')}
            >
              Pricing
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <StyledIconButton
                size="large"
                onClick={() => navigate('/alerts')}
              >
                <Notifications />
              </StyledIconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <StyledIconButton
                size="large"
                onClick={handleProfileMenu}
              >
                <AccountCircle />
              </StyledIconButton>
            </Tooltip>
          </Box>

          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => { navigate('/create-strategy'); handleClose(); }}>
              Create Strategy
            </MenuItem>
            <MenuItem onClick={() => { navigate('/compare'); handleClose(); }}>
              Compare Strategies
            </MenuItem>
            <MenuItem onClick={() => { navigate('/strategy-results/1'); handleClose(); }}>
              View Results
            </MenuItem>
          </StyledMenu>

          <StyledMenu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
              Logout
            </MenuItem>
          </StyledMenu>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};