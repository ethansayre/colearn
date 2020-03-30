import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class State extends React.Component {
    constructor(props) {
        super(props);
        //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
        this.state = {
        };
    }

    componentDidMount = () => {
        firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
            this.setState(snapshot.val());
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.setState({ submitted: true }, () => {
        //     //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
        //     firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).set(this.state);
        //     console.log(this.state);
        // });
    }

    handleChanges(e) {
        // this.setState({ [e.target.name]: e.target.value }, () => {
        //     //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
        //     firebase.database().ref('submissions/director/' + firebase.auth().currentUser.uid).set(this.state);
        //     console.log(this.state);
        // });
    }
    
    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">State/National Director Application</p>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <form onSubmit={this.handleSubmit}>
                                <article className={"message is-info"}>
                                    <div className="message-body">
                                        <Link to="/status">View your status update here.</Link><br />
                                        Applications are closed at this time. You may continue to view or archive your application until 2 weeks after results are released. Please click the link above to access your status update, and email <a href="mailto:help@unipolitics.org">help@unipolitics.org</a> for technical problems.
                                    </div>
                                </article>

                                <div className="field">
                                    <label className="label">Name</label>
                                        <div className="control">
                                            <input value={this.state.name} required onChange={this.handleChanges} name="name" className="input" type="text" placeholder="e.g. John Smith" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                        <div className="control">
                                            <input value={this.state.email} required onChange={this.handleChanges} name="email" className="input" type="text" placeholder="e.g. john@example.com" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Phone Number</label>
                                        <div className="control">
                                            <input value={this.state.phone} onChange={this.handleChanges} name="phone" className="input" type="text" placeholder="(Optional) e.g. 225-800-1024" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">School</label>
                                        <div className="control">
                                            <input value={this.state.school} required onChange={this.handleChanges} name="school" className="input" type="text" placeholder="e.g. Mainville High School or University of Mainville" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Location (City + State or Nation)</label>
                                        <div className="control">
                                            <input value={this.state.location} required onChange={this.handleChanges} name="location" className="input" type="text" placeholder="e.g. Washington, DC or Manilla, Philippines" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Type of Campus</label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.campustype} required onChange={this.handleChanges} name="campustype" disabled>
                                                <option value="hs">High School</option>
                                                <option value="c/u">College/University</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Graduation Year</label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.grade} required onChange={this.handleChanges} name="grade" disabled>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">What sets you apart from other candidates? Describe, if any, prior organizing experience.</label>
                                        <div className="control">
                                        <textarea value={this.state.different} required onChange={this.handleChanges} name="different" className="textarea" placeholder="There are no character or word limits on this answer." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Briefly explain why you are fit for the role. What have you done in the past in terms of community involvement, volunteering, and/or leadership?</label>
                                        <div className="control">
                                        <textarea value={this.state.fitforrole} required onChange={this.handleChanges} name="fitforrole" className="textarea" placeholder="There are no character or word limits on this answer." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Why are you interested in becoming a State/National Director?</label>
                                        <div className="control">
                                        <textarea value={this.state.why} required onChange={this.handleChanges} name="why" className="textarea" placeholder="There are no character or word limits on this answer." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">(Optional) What are your ideas for Unipolitics? What are some projects that you believe could help extend political awareness and neutrality in our communities worldwide?</label>
                                        <div className="control">
                                        <textarea value={this.state.ideas} onChange={this.handleChanges} name="ideas" className="textarea" placeholder="(Optional) Almost done! There are no character or word limits on this answer." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">(Optional) Anything else you'd like us to know?</label>
                                        <div className="control">
                                        <textarea value={this.state.anything} onChange={this.handleChanges} name="anything" className="textarea" placeholder="(Optional) Last step! There are no character or word limits on this answer." disabled></textarea>
                                        </div>
                                </div>

                                {/* <article className={this.state.submitted ? "message is-success" : "message is-success is-hidden"}>
                                    <div className="message-body">
                                        Your application has been submitted! Feel free to come back to this page at any time and edit your application (your progress is stored in the cloud)!
                                    </div>
                                </article> */}

                                <div className="control">
                                    <button type="submit" className="button is-primary">Submit</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default State;