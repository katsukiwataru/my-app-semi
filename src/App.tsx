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
        <div>
          <h1>コツを掴むコツを掴む</h1>
          <p>人はコツを掴むと意外と簡単にできないことができるようになります</p>
          <p>
            コツを掴んだ時はいつなのか、コツとは何か、<b>僕もまだ、分かりません</b>
          </p>
          <p>でも誰かの実体験や、できないと分かっていることが誰かのコツを掴むのに繋がる気がします</p>
          <p>だから、あなたもコツを掴むコツを投稿しよう</p>
        </div>
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
