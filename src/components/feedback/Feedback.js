import React from 'react';
import Style from './StyleFeedback.module.css'
import HoverRating from "./StarsFeedback";
import axios from "axios";
import history from "../../history";


export class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackText: '',
            rate: null,
            ticket: {},
            userOwner: {},
            currentUser: {}
        }

        this.updateFeedback = this.updateFeedback.bind(this);
        this.createFeedback = this.createFeedback.bind(this);
        this.toTicketOverview = this.toTicketOverview.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        this.setData();
    }

    updateFeedback(e) {
        console.log(this.state);
        this.setState({
            feedbackText: e.target.value,
        })
    }

    createFeedback() {
        var feedbackDto = {
            rate: this.state.rate,
            date: new Date().getTime(),
            text: this.state.feedbackText,
        };

        console.log(feedbackDto);

        axios.post('http://localhost:8080/finalproject/tickets/' + this.props.match.params.id + '/feedback',
            feedbackDto,
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                history.push('/ticket-overview/' + this.props.match.params.id);
            }).catch(error => {
            console.log(error);
        })
    }

    toTicketOverview() {
        console.log(this.props.match.params.id);
        history.push('/ticket-overview/' + this.props.match.params.id);
    }

    setData() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.props.match.params.id, JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    ticket: response.data,
                    userOwner: response.data.userOwner,
                });
                console.log(response.data);
            })
            .catch(error => {
                history.push("/all-tickets")
            });

        axios.get('http://localhost:8080/finalproject/users/current', JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    currentUser: response.data,
                });
                console.log(response.data);
            }).catch(error => {
            console.log(error);
            history.push("/all-tickets");
        })
    }




    render() {
        return (
            <div className={Style.container}>

                <div>
                    <button onClick={this.toTicketOverview}>To ticket overview</button>
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

                        <div>
                            <textarea name="textarea" rows="5"
                                      onChange={this.updateFeedback}/>
                        </div>
                    </div>

                </div>

                <div>
                    <div className={Style.link}>
                        <button onClick={this.createFeedback}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

