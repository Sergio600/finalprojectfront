import React from 'react';
import Style from './StyleFeedback.css'


export class Feedback extends React.Component{
    render() {
        return (
            <div className={Style.container}>

                <div>
                    <div className={Style.link}>
                        <a href="/ticket-overview">Back</a>
                    </div>
                </div>

                <div className="content">

                    <div className="ticket-name">
                        <p>Ticket (2) - Task2</p>
                    </div>

                    <div className="form-feedback">
                        <div>Please, rate your satisfaction with the solution:</div>
                        <div className="stars"></div>
                        <div>
                            <input type="textarea"/>
                        </div>
                    </div>



                </div>

                <div>
                    <div className='link'>
                        <a href="/all-tickets">Submit</a>
                    </div>
                </div>
            </div>
        );
    }
}