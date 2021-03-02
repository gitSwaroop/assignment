import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import ListingPage from './Container/ListingPage';
import DetailsPage from './Container/DetailsPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={ListingPage} />
        <Route path="/details/:id" component={DetailsPage} />
        
      </Router>
        {/*<ListingPage/> <Route path="/person/:personId" component={PersonPage} />*/}
    </div>
  );
}

export default App;
