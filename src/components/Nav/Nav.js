import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
// import NavLink from "./NavLink";

class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar has-shadow">
                        <div className="container">
                            <div class="navbar-brand">
                                <a class="navbar-item" href="">
                                    <img src="colearnmain.png" width="112" height="28" />
                                </a>
                                <label
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              htmlFor="nav-toggle-state"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </label>
            <input type="checkbox" id="nav-toggle-state" />

                                {/* <label htmlFor="menu-toggle" className="nav-toggle">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </label>
                                <input type="checkbox" id="menu-toggle" className="is-hidden" ref={ref => this.checkBox = ref} /> */}
                                {/* <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a> */}
                            </div>

                            <input type="checkbox" id="menu-toggle" className="is-hidden" ref={ref => this.checkBox = ref} />
                            <div className="nav-right navbar-menu">
                                <NavLink to="/" onClick={() => {this.checkBox.checked = false;}} className="nav-item is-tab is-hidden-tablet">
                                    <span className="icon"><i className="fa fa-home"></i></span> Home
                                </NavLink>
                                <NavLink to="/stream" onClick={() => {this.checkBox.checked = false;}} className="nav-item is-tab is-hidden-tablet">
                                    <span className="icon"><i className="fa fa-comment"></i></span> Join Stream
                                </NavLink>
                                {/* <a onClick={() => {this.setState({active: "Policy"}); this.checkBox.checked = false;}} className="nav-item is-tab is-hidden-tablet">
                                    <span className="icon"><i className="fa fa-comment-alt"></i></span> Policy Solutions
                                </a> */}
                                {/* <a onClick={() => {this.setState({active: "About"}); this.checkBox.checked = false;}} className="nav-item is-tab is-hidden-tablet">
                                    <span className="icon"><i className="fa fa-info"></i></span> About
                                </a> */}
                                
                                <div class="navbar-end">
                                    <div class="navbar-item">
                                        <a className="nav-item is-tab is-active">
                                            <span className="icon"><i className="fa fa-user"></i></span>{firebase.auth().currentUser.displayName}
                                        </a>
                                        <a onClick={() => firebase.auth().signOut()} className="nav-item is-tab" style={{marginLeft: 4}}>
                                            <span className="icon"><i className="fa fa-sign-out-alt"></i></span>
                                        </a>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </nav>

                <section className="main-content columns is-fullheight">

                    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                        <p className="menu-label is-hidden-touch">Navigation</p>
                        <ul className="menu-list">
                            <li>
                                <NavLink activeClassName='is-active' to="/" exact>
                                    <span className="icon"><i className="fa fa-home"></i></span> Home
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={(e) => {e.preventDefault()}}>
                                    <span className="icon"><i className="fa fa-table"></i></span> Applications
                                </a>

                                <ul>
                                    <li>
                                        <NavLink activeClassName='is-active' to="/stream">
                                            <span className="icon is-small"><i className="fa fa-comment"></i></span> Join Stream
                                        </NavLink>
                                        {/* <a onClick={() => this.setState({active: "National"})} className={this.state.active === "National" ? "is-active" : ""}>
                                            <span className="icon is-small"><i className="fa fa-comment-alt"></i></span> Policy Solutions
                                        </a> */}
                                    </li>
                                </ul>
                            </li>
                            {/* <li>
                                <a onClick={() => this.setState({active: "About"})} className={this.state.active === "About" ? "is-active" : ""}>
                                    <span className="icon"><i className="fa fa-info"></i></span> About
                                </a>
                            </li> */}
                        </ul>
                    </aside>
                    <div className="container column is-10">
                        {this.props.content}
                    </div>
                </section>
            </div>
        );
    }
}
export default Nav;