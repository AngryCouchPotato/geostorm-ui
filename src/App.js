import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GeoNamesList from './components/GeoNamesList';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
          Geo Storm
          </Typography>
        </Toolbar>
      </AppBar>
      <GeoNamesList />
    </div>
  );
}

export default App;
