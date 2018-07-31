import { NavLink } from "react-router-dom";
import { ListItem } from "shared/components";
import styles from "./Repo.module.scss";

const Repo = ({ repo }) => <NavLink to={"/contributors/" + repo.full_name}>
	<ListItem className={styles.repo}>
		<div className={styles.name}>{ repo.name }</div>
		<div className={styles.description}>{ repo.description || "No description" }</div>
		<div className={styles.language}><b>{ repo.language || "Unknown language" }</b></div>
	</ListItem>
</NavLink>;

Repo.propTypes = {
	repo: PropTypes.shape({
		name: PropTypes.string.isRequired,
		language: PropTypes.string.isRequired,
		description: PropTypes.string
	})
};

export default Repo;
