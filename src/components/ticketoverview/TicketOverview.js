import React from "react";
import {TicketHistoryTable} from "./TicketHistoryTable";
import {TicketCommentsTable} from "./TicketCommentsTable";
import st from './StyleTicketOverview.module.css'

export class TicketOverview extends React.Component {
    state = {
        showingHistory: true,
        showingComments: false,
        ticketHistory: [
            {
            date: "Jan 18, 2017 12:16:57",
            userName: "Stephen King",
            action: "Ticked is created",
            description: "Ticked is created"
        },
            {
                date: "Mar 1, 2021 11:11:57",
                userName: "Stephen King",
                action: "Ticked is edited",
                description: "Ticked is edited"
            }
        ],
        ticketComments: [
            {
                date: "Jan 18, 2017 12:16:57",
                userName: "Stephen King",
                comment: "Comment 1"
            },
            {
                date: "Feb 20, 2018 12:00:57",
                userName: "Stephen King",
                comment: "Comment 2"
            }]
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
                            <p>Ticket (2) - Task2</p>
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
                                <tr>11/17/2017</tr>
                                <tr>Done</tr>
                                <tr>High</tr>
                                <tr>11/17/2017</tr>
                                <tr>Stephen King</tr>
                                <tr>Manager 1</tr>
                                <tr>Admin 2</tr>
                                <tr>""</tr>
                                <tr>""</tr>
                            </td>
                            </tbody>

                        </table>
                    </div>

                    <div className={st.category}>
                        <p>Category: <span>Hardware upgrade</span></p>
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
                        {this.state.showingHistory ? <TicketHistoryTable ticketHistory={this.state.ticketHistory} /> : null}
                        {this.state.showingComments ? <TicketCommentsTable ticketComments={this.state.ticketComments}/> : null}
                    </div>

                </div>
            </div>
        );
    }
}