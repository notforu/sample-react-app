import { fetchReposRequest } from "entities/repos";
import { connect } from "react-redux";
import Repos from "./Repos";

class ReposContainer extends React.PureComponent {
	static propTypes = {
		fetchReposRequest: PropTypes.func.isRequired,
		username: PropTypes.string
	};

	componentWillMount() {
		const { fetchReposRequest: fetchReposRequestDispatch, username } = this.props;
		fetchReposRequestDispatch(username);
	}

	render() {
		return <Repos {...this.props} />;
	}
}

const mapStateToProps = (state, ownProps) => ({
	repos: state.repos.items,
	username: ownProps.match.params.username,
	isLoading: state.repos.isLoading
});
const mapDispatchToProps = dispatch => ({ fetchReposRequest: username => dispatch(fetchReposRequest(username)) });

export default connect(mapStateToProps, mapDispatchToProps)(ReposContainer);
