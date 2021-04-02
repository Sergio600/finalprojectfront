import React from "react";
import Style from './Style.css'
import {TicketHistoryTable} from "./TicketHistoryTable";
import {TicketCommentsTable} from "./TicketCommentsTable";


export class TicketOverview extends React.Component {
    state = {
        showingHistory: true,
        showingComments: false
    }


    render() {

        const {showing} = this.state;

        return (
            <div className="container">

                <div className="head">

                    <div className='link'>
                        <a href="/all-tickets">Ticket List</a>
                    </div>

                    <div className="description">
                        <div className="ticket-name">
                            <p>Ticket (2) - Task2</p>
                        </div>

                        <table>
                            <thead>
                            <tr>
                                <th>Created on:</th>
                                <th>Status:</th>
                                <th>Urgency:</th>
                                <th>Desired resolution date:</th>
                                <th>Owner:</th>
                                <th>Approver:</th>
                                <th>Assignee:</th>
                                <th>Attachments:</th>
                                <th>Description:</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>11/17/2017</td>
                                <td>Done</td>
                                <td>High</td>
                                <td>11/17/2017</td>
                                <td>Stephen King</td>
                                <td>Manager 1</td>
                                <td>Admin 2</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="category">
                        <p>Category: <span>Hardware upgrade</span></p>
                    </div>


                    <div className="btns">
                        <div className='link'>
                            <a href="/ticket-edit">Edit</a>
                        </div>
                        <div className='link'>
                            <a href="/all-tickets">Leave Feedback</a>
                        </div>
                    </div>

                </div>

                <div className="history-comments">

                    <div className='link'>
                        <button onClick={() => this.setState({
                            showingHistory: true,
                            showingComments: false
                        })}> History
                        </button>
                    </div>

                    <div className='link'>
                        <button onClick={() => this.setState({
                            showingHistory: false,
                            showingComments: true
                        })}> Comments
                        </button>
                    </div>

                    <div className="tables">
                        {this.state.showingHistory ? <TicketHistoryTable/> : null}
                        {this.state.showingComments ? <TicketCommentsTable/> : null}
                    </div>
                </div>
            </div>

        );
    }
}