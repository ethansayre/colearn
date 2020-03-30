import React from 'react';

class Policy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            grade: "",
            policy: "",
            solution: "",
        };
        
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var parent = this;
        this.props.firebase.database().ref('submissions/policy/' + this.props.firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            parent.setState(snapshot.val());
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true }, () => {
            this.props.firebase.database().ref('submissions/policy/' + this.props.firebase.auth().currentUser.uid).set(this.state);
            console.log(this.state);
        });
    }

    handleChanges(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.props.firebase.database().ref('submissions/policy/' + this.props.firebase.auth().currentUser.uid).set(this.state);
            console.log(this.state);
        });
    }
    
    render() {
        return (
            <div className="section">
                <div className="card">
                    <div className="card-header">
                        <p className="card-header-title">Policy Solution Entry</p>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="field">
                                    <label className="label">Name</label>
                                        <div className="control">
                                            <input value={this.state.name} required onChange={this.handleChanges} name="name" className="input" type="text" placeholder="e.g John Smith" />
                                        </div>
                                </div>

                                <div className="field">
                                    <label className="label">Grade</label>
                                    <div className="control">
                                        <div className="select">
                                            <select value={this.state.grade} required onChange={this.handleChanges} name="grade">
                                                <option value="">Choose grade</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Policy</label>
                                        <div className="control">
                                            <input value={this.state.policy} required onChange={this.handleChanges} name="policy" className="input" type="text" placeholder="Ex. Healthcare" />
                                        </div>
                                </div>
                                
                                <div className="field">
                                    <label className="label">Solution</label>
                                        <div className="control">
                                        <textarea value={this.state.solution} required onChange={this.handleChanges} name="solution" className="textarea" placeholder="Write your proposed solution here. Ex. Provide basic healthcare to people with incomes less than $15,000 per year..."></textarea>
                                        </div>
                                </div>

                                <article className={this.state.submitted ? "message is-success" : "message is-success is-hidden"}>
                                    <div className="message-body">
                                        Your entry has been submitted! Feel free to come back to this page at any time and edit your entry (your progress is stored in the cloud)!
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

export default Policy;