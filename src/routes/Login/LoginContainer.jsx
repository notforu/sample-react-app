import { connect } from "react-redux";
import { loginRequest } from "entities/auth";
import Login from "./Login";

class LoginContainer extends React.Component {
	static propTypes = {
		authenticated: PropTypes.bool,
		loginRequest: PropTypes.func.isRequired
	};

	componentDidMount() {
		const { authenticated, loginRequest: loginRequestDispatch } = this.props;
		if (!authenticated) {
			loginRequestDispatch();
		}
	}

	render() {
		return <Login />;
	}
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });
const mapDispatchToProps = dispatch => ({ loginRequest: () => dispatch(loginRequest()) });

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
