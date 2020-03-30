import React from 'react';
import firebase from 'firebase';
import Construction from '../Construction/Construction';

class StatusUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        var parent = this;
        firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            parent.setState({"fetched": true, ...snapshot.val()});
        });
    }

    handleChanges = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).update(this.state);
            console.log(this.state);
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ confirmed: true }, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).update(this.state);
            console.log(this.state);
        });
    }

    render() {
        return(
            <div class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Status Update</p>
                    </div>
                    <div class="card-content" style={{fontFamily: "Tinos, serif", color: "black", display: (JSON.stringify(this.state).length <= 3 || this.state.name == undefined || this.state.position == undefined) ? "none" : "inherit"}}>
                        July 26th, 2019
                        <br />
                        <p>{this.state.name}
                        <br />
                        <br />
                        Congratulations, our team is proud to notify you that you have been appointed as {this.state.position}.
                        <br /><br />
                        Please click the button below to confirm your position and the commitments involved. We await your acceptance.
                        <br /><br />
                        We will reach out to you via SMS with further instructions as well as a download link to the Unipolitics app within one week. Please verify your phone number below:
                        <div className="field">
                                <div className="control">
                                    <input value={this.state.phone} onChange={this.handleChanges} name="phone" className="input overclass" type="text" placeholder="No phone number on file. Please add one at this time." />
                                </div>
                        </div>
                        <br />
                        Thank you for your interest in our organization and once again - congratulations; we are sincerely looking forward to working with you.
                        <br /><br />
                        Regards, <br />
                        The Unipolitics Team
                        <br />

                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="control">
                                <button type="submit" className="button is-primary overclass">{"Confirm my position as " + this.state.position}</button>
                            </div>
                        </form>
                        <br />

                        <article className={this.state.confirmed ? "message is-success" : "message is-warning"}>
                            <div className="message-body">
                                {this.state.confirmed ? "You have successfully confirmed your position!" : "Your position is currently unconfirmed. Please click the button above to confirm."}
                            </div>
                        </article>
                    </div>
                    <div class="card-content" style={{color: "black", display: (JSON.stringify(this.state).length <= 3 || this.state.name == undefined || this.state.position == undefined) && this.state.fetched ? "inherit" : "none"}}>
                        <article className={"message is-danger"}>
                            <div className="message-body">
                                Unfortunately, there are no status updates referencing your account at this time. Please contact help@unipolitics.org for more assistance.
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
};

export default StatusUpdate;