import { connect } from "react-redux";
import { AuthRoute } from "react-router-auth";

export default connect(state => ({ authenticated: state.auth.authenticated, redirectTo: "/login" }))(AuthRoute);
