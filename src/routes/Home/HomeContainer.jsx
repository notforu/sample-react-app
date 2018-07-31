import { connect } from "react-redux";
import Home from "./Home";

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps)(Home);
