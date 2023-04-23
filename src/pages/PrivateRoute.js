import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  // const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  let isLoggedIn = false
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  if(loginData.auth.length > 0){
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
