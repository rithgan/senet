import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dash from "./pages/Dash";
import Business from "./pages/Business";
import Downline from "./pages/Downline";
import Income from "./pages/Income";
import Profile from "./pages/Profile";
import Request from "./pages/Request";
import Support from "./pages/Support";
import Wallet from "./pages/Wallet";


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  // const handleLogin = (username, password) => {
  //   // Simulate a login request
  //   if (username === 'admin' && password === 'password') {
  //     setIsLoggedIn(true);
  //     history.push('/dash');
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   history.push('/');
  // };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {/* <Login onLogin={handleLogin} /> */}
          <Login />
        </Route>
        <Route path="/register"><Register /></Route>
        <Route path="/dash"><Dash /></Route>
        <Route path="/business"><Business /></Route>
        <Route path="/downline"><Downline /></Route>
        <Route path="/income"><Income /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/request"><Request /></Route>
        <Route path="/wallet"><Wallet /></Route>
        <Route path="/support"><Support /></Route>
        <Route path="*">
          <h1>404 Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
