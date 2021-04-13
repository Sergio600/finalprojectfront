import React from 'react';
import Style from './StyleFeedback.module.css'
import HoverRating from "./StarsFeedback";


export class Feedback extends React.Component{
    render() {
        return (
            <div className={Style.container}>

                <div>
                    <div className={Style.link}>
                        <a href="/ticket-overview">Back</a>
                    </div>
                </div>

                <div className={Style.content}>

                    <div className={Style.ticketName}>
                        <p>Ticket (2) - Task2</p>
                    </div>

                    <div className={Style.formFeedback}>
                        <div>Please, rate your satisfaction with the solution:</div>

                        <div className={Style.start}>
                            <HoverRating />
                        </div>

                        <div>
                            <textarea name="textarea" rows="5"/>
                        </div>
                    </div>

                </div>

                <div>
                    <div className={Style.link}>
                        <button onClick={()=> this.setState()} >Submit</button>
                        <a href="/all-tickets">Submit</a>
                    </div>
                </div>
            </div>
        );
    }
}