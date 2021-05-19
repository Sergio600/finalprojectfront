import React from "react";
import {TicketHistoryTable} from "./TicketHistoryTable";
import {TicketCommentsTable} from "./TicketCommentsTable";
import st from './StyleTicketOverview.module.css'
import axios from "axios";
import moment from "moment";
import history from "../../history";
import {createSvgIcon} from "@material-ui/core";


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
        }

        this.setData = this.setData.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.setShowHistoryAndComments = this.setShowHistoryAndComments.bind(this);
    }

    componentDidMount() {
        this.setData();
    }

    setData() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.props.match.params.id, JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    ticket: response.data,
                    userOwner: response.data.userOwner,
                })
                console.log(response.data.userOwner);
            })
            .catch(error => {
                history.push("/all-tickets")
            });
    }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
    }

    setShowHistoryAndComments(){
        this.setState({
            showHistoryAndComments: !this.state.showHistoryAndComments,
        })
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
                                <p>Approver</p>
                                <p>Assignee</p>
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
                            <a href="/ticket-edit">Edit</a>
                        </div>
                        <div className={st.link}>
                            <a href="/feedback">Leave Feedback</a>
                        </div>
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
                            <TicketHistoryTable id={this.state.ticket.id}/> : <TicketCommentsTable id={this.state.ticket.id}/>}
                    </div>

                </div>
            </div>
        );
    }
}