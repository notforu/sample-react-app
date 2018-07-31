import { NavLink } from "react-router-dom";
import { Loader, ListItem } from "shared/components";
import styles from "./Contributors.module.scss";

const Contributors = ({
	repoName, userName, contributors, isLoading
}) => <div>
	<h1>Contributors</h1>
	<h3>This is <b>{ repoName }</b> contributors. Repo owner - <NavLink to={"/repos/" + userName}>{ userName }</NavLink>.</h3>
	<hr />
	{ isLoading && <Loader className={styles.loader} /> }
	{ contributors.map(one => <NavLink to={"/repos/" + one.login}>
		<ListItem><div key={one.login}>{ one.login }</div></ListItem>
	</NavLink>) }
	{ !isLoading && contributors.length === 0 && <div className={styles.noDataText}><i>There are no contributors for this repo...</i></div> }
</div>;

Contributors.propTypes = {
	userName: PropTypes.string.isRequired,
	repoName: PropTypes.string.isRequired,
	contributors: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired
};

export default Contributors;
