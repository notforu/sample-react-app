import { NavLink } from "react-router-dom";

const NotFound = () => <div>
	<h1>Page not found</h1>
	<div>The page, that you are looking for, is not found.</div>
	<NavLink to="/">Go Home</NavLink>
</div>;

export default NotFound;
