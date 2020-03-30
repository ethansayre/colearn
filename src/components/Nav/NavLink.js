// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { withRouter } from "react-router";

// class NavLink extends React.Component {
//     static propTypes = {
//         match: PropTypes.object.isRequired,
//         location: PropTypes.object.isRequired,
//         history: PropTypes.object.isRequired
//     };

//     render() {
//         const { match, location, history } = this.props;
//         var isActive = location.pathname === this.props.to;
//         var className = isActive ? 'nav-item active' : 'nav-item';

//         return(
//                 <Link {...this.props}>{this.props.children}</Link>
//         );
//     }
// }

// export default withRouter(NavLink);