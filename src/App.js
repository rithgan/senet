import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
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
import NotFound from './pages/NotFound';
import Ticket from './pages/Ticket';
import Performance from './pages/earning/perform';
import Top from './pages/earning/top';
import Passive from './pages/earning/passive';
import Vip from './pages/earning/vip';
import Star from './pages/earning/start';
import Award from './pages/earning/award';
import PrivateRoute from './pages/PrivateRoute';
import Leverage from './pages/leverage';
import { IpContext } from './context/IpContext';
import { NetworkProvider } from './context/NetworkContext';
import { ConnectProvider } from "./context/ConnectContext";
import Stake from './pages/Stakes/Stake';

function App() {
  const [ipAddress] = useContext(IpContext);
  const [token, setToken] = useState('');
  const handleLogin = (token) => {
    setToken(token);
  };
  return (
    <BrowserRouter>
      <NetworkProvider>
        <ConnectProvider>
          <Switch>
            <Route exact path="/"><Login ipAddress={ipAddress} onLogin={handleLogin} /></Route>
            <Route path="/register"><Register ipAddress={ipAddress} /></Route>
            <PrivateRoute exact path="/dash" component={Dash} />
            <PrivateRoute exact path="/business" component={Business} />
            <PrivateRoute exact path="/downline" component={Downline} />
            <PrivateRoute exact path="/income" component={Income} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/request" component={Request} />
            <PrivateRoute exact path="/wallet" component={Wallet} />
            <PrivateRoute exact path="/support" component={Support} />
            <PrivateRoute exact path="/stake" component={Stake} />
            <PrivateRoute exact path="/ticket" component={Ticket}  />
            <PrivateRoute exact path="/perform" component={Performance}  />
            <PrivateRoute exact path="/top" component={Top}  />
            <PrivateRoute exact path="/passive" component={Passive}  />
            <PrivateRoute exact path="/vip" component={Vip}  />
            <PrivateRoute exact path="/star" component={Star}  />
            <PrivateRoute exact path="/award" component={Award}  />
            <PrivateRoute exact path="/refule" component={Leverage}  />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ConnectProvider>
      </NetworkProvider>
    </BrowserRouter>
  );
}

export default App;
