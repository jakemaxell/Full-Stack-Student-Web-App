import React, { useState } from 'react';
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate(); 
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorElement, setAnchorElement] = useState(null);
  const [error, setError] = useState(null);

  const hiddenPaths = ["/create-student"];
  const shouldHideButtons = hiddenPaths.includes(location.pathname);

  const goHome = () => {
    navigate('/');
  };

  const createStudent = () => {
    navigate("/create-student");
  };

  const handleMenuClick = (event) => {
     setAnchorElement(event.currentTarget);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      
      try {
        const response =  await fetch("http://localhost:8080/api/getStudentByEmail/" + searchQuery, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const text = await response.text()
        const data = text ? JSON.parse(text) : {};

        if(response.ok){
          navigate('/search-student', {state: {data}});
        } 

        if(response.status == 404){
          alert("Invalid search value. . .");
          setSearchQuery("");
          return;
        }

    } catch (error) {
        setError(error.message);
        console.error("Error: ", error);
    }

    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Home</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/create-student'); }}>Add Student</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            College Student Web Application
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          </Search> 

        </Toolbar>
      </AppBar>
    </Box>
  );
}