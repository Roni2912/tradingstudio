import { Box } from '@mui/material';
import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10, 
          pb: 4,
          px: 3, 
          backgroundColor: 'inherit',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};