import React from 'react';

class Construction extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Colearn</p>
                    </div>
                    <div class="card-content">
                        <article class="message is-warning">
                            <div class="message-body">
                                Colearn!
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
};

export default Construction;