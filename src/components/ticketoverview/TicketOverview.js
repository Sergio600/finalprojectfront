import React from "react";
import Style from './Style.css'


export class TicketOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            hide: 'hide'
        }
    }



    render() {
        return (
            <div class="container">

                <div class="head">

                    <div class='link'>
                        <a href="/all-tickets">Ticket List</a>
                    </div>

                    <div class="description">
                        <div className="ticket-name">
                            <p>Ticket (2) - Task2</p>
                        </div>

                        <table>
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
                            <tr>
                                <td>11/17/2017</td>
                                <td>Done</td>
                                <td>High</td>
                                <td>11/17/2017</td>
                                <td>Stephen King</td>
                                <td>Manager 1</td>
                                <td>Admin 2</td>
                            </tr>
                        </table>
                    </div>

                    <div class="category">
                        <p>Category: <span>Hardware upgrade</span></p>
                    </div>


                    <div class="btns">
                        <div class='link'>
                            <a href="/ticket-edit">Edit</a>
                        </div>
                        <div class='link'>
                            <a href="/all-tickets">Leave Feedback</a>
                        </div>
                    </div>

                </div>

                <div class="btnsChoose">
                    <div class='link'>
                        <a href="/ticket-overview">History</a>
                    </div>
                    <div class='link'>
                        <a href="/ticket-comments">Comments</a>
                    </div>
                </div>


                <div class="table-history-container">
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Description</th>
                        </tr>

                        <tr>
                            <td>Jan 18, 2017 12:16:57</td>
                            <td>Stephen King</td>
                            <td>Ticked is created</td>
                            <td>Ticked is created</td>
                        </tr>

                        <tr>
                            <td>Jan 19, 2017 15:13:57</td>
                            <td>Stephen King</td>
                            <td>Ticked is edited</td>
                            <td>Ticked is edited</td>
                        </tr>


                    </table>


                    <div class="hide">
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>User</th>
                                <th>Comment</th>
                            </tr>

                            <tr>
                                <td>Jan 18, 2017 12:16:57</td>
                                <td>Stephen King</td>
                                <td>Comment 1</td>
                            </tr>

                            <tr>
                                <td>Jan 19, 2017 15:13:57</td>
                                <td>Manager 1</td>
                                <td>Comment 2</td>
                            </tr>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}