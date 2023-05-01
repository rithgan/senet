import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { MobileSidebarContext } from '../context/MobileSidebarContext';

function PrivateRoute({ component: Component, ipAddress }) {
  let isLoggedIn = false
  const loginData = JSON.parse(localStorage.getItem('loginData'));
  const [mobileOpen, setMobileOpen] = useContext(MobileSidebarContext)

  if (loginData && loginData.auth.length > 0) {
    isLoggedIn = true
  }
  console.log("isloggedin",isLoggedIn)
  isLoggedIn = true

  let bgDisplay ={
  }
    if (mobileOpen){
      bgDisplay ={
        display:'block'
      }
    }
  return (
    <div className="layout-wrapper layout-content-navbar">
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
    <div className="layout-overlay layout-menu-toggle" style={bgDisplay} onClick={()=>setMobileOpen(false)}></div>
    <div className="drag-target"></div>
  </div>
  );
}

export default PrivateRoute;
