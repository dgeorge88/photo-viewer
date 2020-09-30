import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './components/Header';
import  Photos  from "./pages/Photos"
import { AddPhoto } from "./pages/AddPhoto"
import { ContextProvider } from "./context/AppContext"

function App() {
  return (
      <ContextProvider>

      <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Photos />
        </Route>
        <Route path="/add">
          <AddPhoto />
        </Route>
      </Switch>
      </Router>

      </ContextProvider>

  );
}

export default App;
