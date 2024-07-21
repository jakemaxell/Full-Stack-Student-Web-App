import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomAppBar() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenPaths = ['/create-student', '/search-student'];
  const shouldHideButtons = hiddenPaths.includes(location.pathname);

  const createStudent = () => {
    navigate('/create-student');
  };

  const searchStudent = () => {
    navigate('/search-student')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            College Student Portal
          </Typography>

          {!shouldHideButtons && (
            <>
              <Button color="inherit" onClick={createStudent}>Add Student</Button>
              <Button color="inherit" onClick={searchStudent}>Search Student</Button>
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}
