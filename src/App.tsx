import React from 'react';
import Login from './container/home';
import Post from './container/post';
import { Router, Route, Switch } from 'react-router-dom';
import history from './plugins/history';
import { UserProvider } from './context/userContext';
import Header from './components/header';

const App: React.FC = () => {
  return (
    <>
      <Router history={history}>
        <UserProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/post" component={Post} />
          </Switch>
        </UserProvider>
      </Router>
    </>
  );
};

export default App;
