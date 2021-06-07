import React from "react";
import {TicketHistoryTable} from "./TicketHistoryTable";
import {TicketCommentsTable} from "./TicketCommentsTable";
import st from './StyleTicketOverview.module.css'
import axios from "axios";
import moment from "moment";
import history from "../../history";


export class TicketOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingHistory: true,
            showingComments: false,
            ticket: {},
            userOwner: {},
            userApprover: {},
            userAssignee: {},
            showHistoryAndComments: true,
            visibilityFeedback: 'block',
            currentUser: {}

        }

        this.setData = this.setData.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.setShowHistoryAndComments = this.setShowHistoryAndComments.bind(this);
        this.toAllTicketsPage = this.toAllTicketsPage.bind(this);
        this.toEditPage = this.toEditPage.bind(this);
        this.checkVisibilityFeedback = this.checkVisibilityFeedback.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
        this.setData();
        this.checkVisibilityFeedback();
    }

    setData() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.props.match.params.id, JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    ticket: response.data,
                    userOwner: response.data.userOwner,
                    userApprover: response.data.userApprover,
                    userAssignee: response.data.userAssignee,
                })
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                history.push("/all-tickets");
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

    checkVisibilityFeedback() {
        console.log(this.state.currentUser);
        if (this.state.currentUser.role === 'ENGINEER') {
            this.setState({
                visibilityFeedback: 'none'
            })
        }
    }

    // getCurrentUser() {
    //     axios.get('http://localhost:8080/finalproject/users/current', JSON.parse(localStorage.getItem('AuthHeader')))
    //         .then((response) => {
    //             this.setState({
    //                 currentUser: response.data,
    //             });
    //         }).catch(error => {
    //         console.log(error)
    //     })
    // }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
    }

    setShowHistoryAndComments() {
        this.setState({
            showHistoryAndComments: !this.state.showHistoryAndComments,
        })
    }

    toAllTicketsPage() {
        history.push('/all-tickets');
    }

    toEditPage(id) {
        var path = '/ticket-edit/' + id;
        history.push(
            {
                pathname: path,
                state: {ticketId: id}
            }
        )
    }

    toFeedbackPage(id) {
        var path = '/feedback/' + id;
        history.push(
            {
                pathname: path,
                state: {ticketId: id},
            }
        )
    }

    render() {


        return (
            <div className={st.container}>

                <div className={st.head}>
                    <div>
                        <button onClick={this.toAllTicketsPage}>To Ticket list</button>
                    </div>

                    <div className={st.description}>

                        <div className={st.ticketName}>
                            <p>TicketID {this.state.ticket.id} - {this.state.ticket.name}</p>
                        </div>

                        <div className={st.ticketInfoTable}>
                            <div className={st.ticketInfoHeaders}>
                                <p>Created on:</p>
                                <p>Status:</p>
                                <p>Urgency:</p>
                                <p>Desired resolution date:</p>
                                <p>Owner:</p>
                                <p>Approver:</p>
                                <p>Assignee:</p>
                                <p>Attachments:</p>
                                <p>Description:</p>
                            </div>

                            <div className={st.ticketInfo}>
                                <p>{moment(this.state.ticket.createdOn).format("LL")}</p>
                                <p>{this.state.ticket.state}</p>
                                <p>{this.state.ticket.urgency}</p>
                                <p>{this.convertToDate(this.state.ticket.desiredResolutionDate)}</p>
                                <p>{this.state.userOwner.email}</p>
                                <p>{this.state.userApprover != null ? this.state.userApprover.email : "n/a"}</p>
                                <p>{this.state.userAssignee != null ? this.state.userAssignee.email : "n/a"}</p>
                                {/*<p>Approver</p>*/}
                                {/*<p>Assignee</p>*/}
                                <p>Attachment</p>
                                <p>{this.state.ticket.description}</p>
                            </div>
                        </div>
                    </div>


                    <div className={st.category}>
                        <p>Category: <span>{this.state.ticket?.category?.name}</span></p>
                    </div>


                    <div className={st.btns}>
                        <div className={st.link}>
                            <button onClick={() => (this.toEditPage(this.state.ticket.id))}>Edit</button>
                        </div>
                        <div className={st.link}>

                            <button onClick={() => (this.toFeedbackPage(this.state.ticket.id))}
                                    style={{display: this.state.visibilityFeedback}}
                            >Feedback
                            </button>

                        </div>
                        {/*<div className={st.link}>*/}
                        {/*    <a href="/feedback">Leave Feedback</a>*/}
                        {/*</div>*/}
                    </div>

                </div>

                <div className={st.historyComments}>

                    <div className={st.historyCommentsButtons}>
                        <button onClick={this.setShowHistoryAndComments}> History
                        </button>

                        <button onClick={this.setShowHistoryAndComments}> Comments
                        </button>
                    </div>

                    <div className={st.tables}>
                        {this.state.showHistoryAndComments ?
                            <TicketHistoryTable id={this.state.ticket.id}/> :
                            <TicketCommentsTable id={this.state.ticket.id}/>}
                    </div>

                </div>
            </div>
        );
    }
}