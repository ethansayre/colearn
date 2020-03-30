import React from 'react';

class Officer extends React.Component {
    constructor(props) {
        super(props);
        //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
        this.state = {
            name: "",
            grade: "",
            politicsimportant: "",
            fitforrole: "",
            ideas: ""
        };
        
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var parent = this;
        this.props.firebase.database().ref('submissions/officer/' + this.props.firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            parent.setState(snapshot.val());
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true }, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            this.props.firebase.database().ref('submissions/officer/' + this.props.firebase.auth().currentUser.uid).set(this.state);
            console.log(this.state);
        });
    }

    handleChanges(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            //this.props.firebase.database().ref('submissions/officer/').child(this.props.firebase.auth().currentUser.uid).set({...this.state});
            this.props.firebase.database().ref('submissions/officer/' + this.props.firebase.auth().currentUser.uid).set(this.state);
            console.log(this.state);
        });
    }
    
    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">Officer Application</p>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <form onSubmit={this.handleSubmit}>
                                <article className={"message is-success"}>
                                    <div className="message-body">
                                        Applications are closed at this time. You may continue to view or archive your application until 2 weeks after results are released. There are no status updates at this time; expect results to be released no later than Friday, July 26, 2019. Thank you for applying; we look forward to seeing your application!
                                    </div>
                                </article>

                                <div className="field">
                                    <label className="label">Name</label>
                                        <div className="control">
                                            <input value={this.state.name} required onChange={this.handleChanges} name="name" className="input" type="text" placeholder="e.g John Smith" disabled />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Grade</label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.grade} required onChange={this.handleChanges} name="grade" disabled>
                                                <option value="">Choose grade</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">How can politics affect people in our community? Why is political awareness important?</label>
                                        <div className="control">
                                        <textarea value={this.state.politicsimportant} required onChange={this.handleChanges} name="politicsimportant" className="textarea" placeholder="Politics are important because..." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Briefly explain why you are fit for the role. What have you done in the past in terms of community involvement, volunteering, and/or leadership?</label>
                                        <div className="control">
                                        <textarea value={this.state.fitforrole} required onChange={this.handleChanges} name="fitforrole" className="textarea" placeholder="I am well-suited for this position because I..." disabled></textarea>
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">(Optional) What are your ideas for Unipolitics? What are some projects that you believe could help extend political awareness and neutrality in our community?</label>
                                        <div className="control">
                                        <textarea value={this.state.ideas} onChange={this.handleChanges} name="ideas" className="textarea" placeholder="A great project would be... disabled"></textarea>
                                        </div>
                                </div>

                                <article className={this.state.submitted ? "message is-success" : "message is-success is-hidden"}>
                                    <div className="message-body">
                                        Your application has been submitted! Feel free to come back to this page at any time and edit your application (your progress is stored in the cloud)!
                                    </div>
                                </article>

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

export default Officer;