import { fetchContributorsRequest } from "entities/contributors";
import { connect } from "react-redux";
import Contributors from "./Contributors";

class ContributorsContainer extends React.PureComponent {
	static propTypes = {
		fetchContributorsRequest: PropTypes.func.isRequired,
		repoName: PropTypes.string,
		userName: PropTypes.string
	};

	componentWillMount() {
		const { fetchContributorsRequest: fetchContributorsRequestDispatch, userName, repoName } = this.props;
		fetchContributorsRequestDispatch(userName, repoName);
	}

	render() {
		return <Contributors {...this.props} />;
	}
}

const mapStateToProps = (state, ownProps) => {
	const { userName, repoName } = ownProps.match.params;
	return {
		contributors: state.contributors.items,
		isLoading: state.contributors.isLoading,
		userName,
		repoName
	};
};
const mapDispatchToProps = dispatch => ({ fetchContributorsRequest: (userName, repoName) => dispatch(fetchContributorsRequest(userName, repoName)) });

export default connect(mapStateToProps, mapDispatchToProps)(ContributorsContainer);
