import React from 'react';
import "./MainPage.css";

class MainPage extends React.Component {
    state = {
        active: "Home"
    };

    render() {
        return(
            <div id="app">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <nav class="nav has-shadow">
                    <div class="container">
                        <div class="nav-left">
                            <a class="nav-item">
                                Unipolitics
                            </a>
                        </div>
                        <label for="menu-toggle" class="nav-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                        <input type="checkbox" id="menu-toggle" class="is-hidden" />
                        <div class="nav-right nav-menu">
                            <a class="nav-item is-tab is-hidden-tablet">
                                <span class="icon"><i class="fa fa-home"></i></span> Home
                            </a>
                            <a class="nav-item is-tab is-hidden-tablet">
                                <span class="icon"><i class="fa fa-table"></i></span> Links
                            </a>
                            <a class="nav-item is-tab is-hidden-tablet">
                                <span class="icon"><i class="fa fa-info"></i></span> About
                            </a>

                            <a class="nav-item is-tab is-active">
                                <span class="icon"><i class="fa fa-user"></i></span>
                            </a>
                            <a onClick={this.props.logOutHandler} class="nav-item is-tab">
                                <span class="icon"><i class="fa fa-sign-out"></i></span>
                            </a>
                        </div>
                    </div>
                </nav>

            <section class="main-content columns is-fullheight">

                <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                    <p class="menu-label is-hidden-touch">Navigation</p>
                    <ul class="menu-list">
                        <li>
                            <a onClick={() => this.setState({active: "Home"})} class={this.state.active == "Home" ? "is-active" : ""}>
                                <span class="icon"><i class="fa fa-home"></i></span> Home
                            </a>
                        </li>
                        <li>
                            <a onClick={() => this.setState({active: "Links"})} class={this.state.active == "Links" ? "is-active" : ""}>
                                <span class="icon"><i class="fa fa-table"></i></span> Links
                            </a>

                            <ul>
                                <li>
                                    <a onClick={() => this.setState({active: "Link1"})} class={this.state.active == "Link1" ? "is-active" : ""}>
                                        <span class="icon is-small"><i class="fa fa-link"></i></span> Link1
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => this.setState({active: "Link2"})} class={this.state.active == "Link2" ? "is-active" : ""}>
                                        <span class="icon is-small"><i class="fa fa-link"></i></span> Link2
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a onClick={() => this.setState({active: "About"})} class={this.state.active == "About" ? "is-active" : ""}>
                                <span class="icon"><i class="fa fa-info"></i></span> About
                            </a>
                        </li>
                    </ul>
                </aside>

                <div class="container column is-10">
                    <div class="section">

                        <div class="card">
                            <div class="card-header">
                                <p class="card-header-title">Header</p>
                            </div>
                            <div class="card-content">
                                <div class="content">Content</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                <footer class="footer is-hidden1">
                    <div class="container">
                        <div class="content has-text-centered">
                            <p>Hello</p>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
};

export default MainPage;