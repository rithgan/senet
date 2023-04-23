import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
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
import PrivateRoute from './pages/PrivateRoute';
import { IpContext } from './context/IpContext';

function App() {
  const [ipAddress] = useContext(IpContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Login ipAddress={ipAddress} /></Route>
        <Route path="/register"><Register ipAddress={ipAddress} /></Route>
        <PrivateRoute exact path="/dash" component={Dash} />
        <PrivateRoute exact path="/business" component={Business} />
        <PrivateRoute exact path="/downline" component={Downline} />
        <PrivateRoute exact path="/income" component={Income} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/request" component={Request} />
        <PrivateRoute exact path="/wallet" component={Wallet} />
        <PrivateRoute exact path="/support" component={Support} />
        <Route path="*">
          <h1>404 Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
