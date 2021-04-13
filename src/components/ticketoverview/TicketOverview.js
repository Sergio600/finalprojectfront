import React from "react";
import {TicketHistoryTable} from "./TicketHistoryTable";
import {TicketCommentsTable} from "./TicketCommentsTable";
import st from './StyleTicketOverview.module.css'
import axios from "axios";
import moment from "moment";

export class TicketOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingHistory: true,
            showingComments: false,
            ticket: {},

        }
    }


    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.state.id)
            .then(response => this.setState({ticket: response.data}))
    }

    render() {


        return (
            <div className={st.container}>

                <div className={st.head}>
                    <div>
                        <div className={st.link}>
                            <a href="/all-tickets">Ticket List</a>
                        </div>
                    </div>

                    <div className={st.description}>

                        <div className={st.ticketName}>
                            <p>Ticket {this.state.id} - {this.state.ticket.name}</p>
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
                                <p>{moment(this.state.ticket.desiredResolutionDate).format("LL")}</p>
                                <p>""</p>
                                <p>""</p>
                                <p>""</p>
                                {/*<p>{this.state.ticket.userOwner.lastName}</p>*/}
                                {/*<p>{this.state.ticket.userApprover.lastName}</p>*/}
                                {/*<p>{this.state.ticket.userAssignee.lastName}</p>*/}
                                <p>Attachment</p>
                                <p>{this.state.ticket.description}</p>


                            </div>
                        </div>
                    </div>


                    <div className={st.category}>
                        {/*<p>Category: <span>{this.state.ticket.category.name}</span></p>*/}
                    </div>


                    <div className={st.btns}>
                        <div className={st.link}>
                            <a href="/ticket-edit">Edit</a>
                        </div>
                        <div className={st.link}>
                            <a href="/feedback">Leave Feedback</a>
                        </div>
                    </div>

                </div>

                <div className={st.historyComments}>

                    <div className={st.historyCommentsButtons}>
                        <button onClick={() => this.setState({
                            showingHistory: true,
                            showingComments: false
                        })}> History
                        </button>

                        <button onClick={() => this.setState({
                            showingHistory: false,
                            showingComments: true
                        })}> Comments
                        </button>
                    </div>


                    <div className={st.tables}>
                        {this.state.showingHistory ?
                            <TicketHistoryTable ticket={this.state.ticket}/> : null}
                        {this.state.showingComments ?
                            <TicketCommentsTable ticket={this.state.ticket}/> : null}
                    </div>

                </div>
            </div>
        );
    }
}