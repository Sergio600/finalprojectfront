import React from 'react';
import Style from './StyleFeedbackView.module.css'
import HoverRating from "./StarsFeedbackView";


export class FeedbackView extends React.Component {
    render() {
        return (
            <div className={Style.container}>

                <div>
                    <div className={Style.link}>
                        <a href="/all-tickets">Back</a>
                    </div>
                </div>

                <div className={Style.content}>

                    <div className={Style.ticketName}>
                        <p>Ticket (2) - Task2</p>
                    </div>

                    <div className={Style.formFeedback}>
                        <div>Please, rate your satisfaction with the solution:</div>

                        <div className={Style.start}>
                            <HoverRating/>
                        </div>

                        <div className={Style.feedbackText}>
                            <p>Some comment! </p>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}