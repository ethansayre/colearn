import React from 'react';

class Submissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    handleChanges(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() {
        return (
            <div class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Submissions</p>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <form onSubmit={this.handleSubmit}>
                                <div class="field">
                                    <label class="label">Name</label>
                                        <div class="control">
                                            <input required onChange={this.handleChanges} name="name" class="input" type="text" placeholder="e.g John Smith" />
                                        </div>
                                </div>

                                <div class="field">
                                    <label class="label">Grade</label>
                                    <div class="control">
                                        <div class="select">
                                            <select required onChange={this.handleChanges} name="grade">
                                                <option value="">Choose grade</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">How can politics effect people in our community? Why is political awareness important?</label>
                                        <div class="control">
                                        <textarea required onChange={this.handleChanges} name="politicsimportant" class="textarea" placeholder="Politics are important because..."></textarea>
                                        </div>
                                </div>

                                <div class="field">
                                    <label class="label">Briefly explain why you are fit for the role.</label>
                                        <div class="control">
                                        <textarea required onChange={this.handleChanges} name="fitforrole" class="textarea" placeholder="I am well-suited for this position because I..."></textarea>
                                        </div>
                                </div>

                                <div class="field">
                                    <label class="label">(Optional) What are your ideas for Unipolitics? What are some projects that you believe could help extend political awareness and neutrality in our community?</label>
                                        <div class="control">
                                        <textarea onChange={this.handleChanges} name="ideas" class="textarea" placeholder="A great project would be..."></textarea>
                                        </div>
                                </div>

                                <div class="control">
                                    <button type="submit" class="button is-primary">Save</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Submissions;