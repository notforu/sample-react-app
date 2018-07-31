import classnames from "classnames";
import styles from "./ListItem.module.scss";

const ListItem = ({ children, className }) => <div className={classnames(styles.container, className)}>{ children }</div>;

ListItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

export default ListItem;
