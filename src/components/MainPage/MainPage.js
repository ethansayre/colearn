import React from 'react';
import "./MainPage.css";
import Officer from '../Officer/Officer';
import Journalism from '../Journalism/Journalism';
import Policy from '../Policy/Policy';
import State from '../State/State';
import JoinStream from '../JoinStream/JoinStream';
import WriteStream from '../WriteStream/WriteStream';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from "../Nav/Nav";
import Construction from "../Construction/Construction";
import StatusUpdate from "../StatusUpdate/StatusUpdate";

const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
        <div>
            <Nav content={(<Component {...props}/>)}/>
        </div>
    )}/>
)

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Router>
                <Switch>
                    <NavRoute exact component={Construction} path="/" />
                    <NavRoute exact component={WriteStream} path="/stream" />
                    <NavRoute exact component={JoinStream} path="/watch" />
                    <NavRoute exact component={StatusUpdate} path="/status" />
                </Switch>
            </Router>
        )
    }
};

export default MainPage;