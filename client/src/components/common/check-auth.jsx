import { Navigate, useLocation } from "react-router-dom";

// isAuthenticated->means wheteher the user is Authenticated or not
// user-> Info of user
// Children-> Component that we want to render
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation(); //it will gave us the params or url

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" /  >;
      }
    }
  }
  // CASE-1 :if user in not authenticated and user is trying to access , some pages other than login or register he will be back to login page

  if (
    !isAuthenticated && 
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // CASE-2 :if user is Authenticatefd and user is in login or register page , then user will be  directed to admin or shopping page according to his role

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // CASE-3: if user is authenticated and user is normal user and is trying to acess admin page then he is navigate to unauthorised page

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // CASE 4: if user is authenticated and user is adminuser and he is trying to access some shopping pase then he will br back to admin dashbpard
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
export default CheckAuth;