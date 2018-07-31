import { NavLink } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = ({ authenticated }) => <div className={styles.container}>
	<h1>Home Page</h1>
	<hr />
	<p>This is a simple app, which is supposed to demonstrate the way, how I develop React-driven apps.</p>
	<p>Here you can login into your github account, and look at the list of your own repositories.</p>
	<p>You can also look through contributors of any repo, and repos of any contributor.</p>
	<hr />
	<p>My tech stack:</p>
	<ul>
		<li>ES6</li>
		<li>react</li>
		<li>redux</li>
		<li>redux-saga</li>
		<li>react-router v4</li>
		<li>sass / css-grid / css-modules / post-css</li>
		<li>webpack v4</li>
		<li>eslint</li>
	</ul>
	<hr />
	<div>
		{ !authenticated && <div>
			<p>You are not authorized</p>
			<NavLink to="/login">Click here to login</NavLink>
		</div> }
		{ authenticated && <div>
			<p>You are authorized</p>
			<NavLink to="/repos">Click here to see your github repos</NavLink>
		</div> }
	</div>
</div>;

Home.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

export default Home;
