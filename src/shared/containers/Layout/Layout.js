import { NavLink } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => <div className={styles.container}>
	<header>
		<NavLink to="/">Go Home</NavLink>
	</header>
	<main>{ children }</main>
	<footer>
		<a href="mailto:aleksndr.muratov@gmail.com">aleksndr.muratov@gmail.com</a>
	</footer>
</div>;

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
