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
            id: 1,
        }
    }


    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/tickets/1')
            .then(response => this.setState({ticket: response.data}))
    }

    render() {

        const {showing} = this.state;


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

                        <table>
                            <thead>
                            <th>
                                <td>"</td>
                            </th>
                            </thead>
                            <tbody>

                            <td>
                                <tr>Created on:</tr>
                                <tr>Status:</tr>
                                <tr>Urgency:</tr>
                                <tr>Desired resolution date:</tr>
                                <tr>Owner:</tr>
                                <tr>Approver:</tr>
                                <tr>Assignee:</tr>
                                <tr>Attachments:</tr>
                                <tr>Description:</tr>
                            </td>
                            <td>
                                <tr>{moment(this.state.ticket.createdOn).format("LL")}</tr>
                                <tr>{this.state.ticket.state}</tr>
                                <tr>{this.state.ticket.urgency}</tr>
                                <tr>{moment(this.state.ticket.desiredResolutionDate).format("LL")}</tr>
                                {/*<tr>{this.state.ticket.userOwner.lastName}</tr>*/}
                                {/*<tr>{this.state.ticket.userApprover.lastName}</tr>*/}
                                {/*<tr>{this.state.ticket.userAssignee.lastName}</tr>*/}
                                <tr>" "</tr>
                                <tr>{this.state.ticket.description}</tr>
                            </td>
                            </tbody>

                        </table>
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
                            <TicketHistoryTable ticket={this.state.ticket} /> : null}
                        {this.state.showingComments ?
                            <TicketCommentsTable ticket={this.state.ticket}/> : null}
                    </div>

                </div>
            </div>
        );
    }
}