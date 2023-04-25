import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ipAddress }) {
  let isLoggedIn = false
  const loginData = JSON.parse(sessionStorage.getItem('loginData'));

  if (loginData && loginData.auth.length > 0) {
    isLoggedIn = true
  }
  console.log(isLoggedIn)
  return (
    <Route
      // {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} ipAddress={ipAddress} loginData={loginData} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
