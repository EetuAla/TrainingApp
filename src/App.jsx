import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './App.css';
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
       <AppBar position="fixed">
        <Tabs value={value} 
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        >
          <Tab label="Trainings" component={Link} to="/" />
          <Tab label="Customers" component={Link} to="/customers" />
        </Tabs>
      </AppBar>
      <Outlet />
    </Container>
  );
}


export default App
