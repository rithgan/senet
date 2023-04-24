import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  let isLoggedIn = false
  const loginData = JSON.parse(sessionStorage.getItem('loginData'));
  if(loginData && loginData.auth.length > 0){
    isLoggedIn = true
  }
  console.log(isLoggedIn)
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
