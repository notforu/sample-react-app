import { Loader } from "shared/components";
import Repo from "./Repo";
import styles from "./Repos.module.scss";

const Repos = ({ username, repos, isLoading }) => <div className={styles.container}>
	<h1>Repos </h1>
	<h3>This is <b>{ username ? username + "'s" : "your" }</b> repos.</h3>
	<hr />
	{ isLoading && <Loader className={styles.loader} /> }
	{ repos.map(repo => <Repo key={repo.id} repo={repo} />) }
	{ !isLoading && repos.length === 0 && <div className={styles.noDataText}><i>This user does not have any repos...</i></div> }
</div>;

Repos.propTypes = {
	username: PropTypes.string,
	repos: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
};

export default Repos;
