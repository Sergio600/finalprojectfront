import React from 'react';
import Style from './Style.css'


export class Feedback extends React.Component{
    render() {
        return (
            <div className="container">

                <div>
                    <div className='link'>
                        <a href="/ticket-overview">Back</a>
                    </div>
                </div>

                <div className="content">

                    <div className="ticket-name">
                        <p>Ticket (2) - Task2</p>
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