import React from "react";
import s from './MyTickets.module.css'
import {Tickettable} from "../tickettable/Tickettable";
import axios from "axios";

export class MyTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],

            actionMenu: ["Submit", "Approve", "Decline", "Cancel", "Leave Feedback", "View Feedback"]

        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/tickets/all')
            .then(response => this.setState({tickets: response.data}))
    }

    render() {

        return (

            <div className={s.form}>

                <div className={s.btnCreate}>
                    <form action="/ticket-create">
                        <button type="submit">Create New Ticket</button>
                    </form>
                </div>


                <div className={s.btnChoose}>
                    <form action="/all-tickets">
                        <button type="submit">All Tickets</button>
                    </form>
                    <form action="/my-tickets">
                        <button type="submit" className={s.btnMyTickets}>My Tickets</button>
                    </form>
                </div>

                <Tickettable tickets={this.state.tickets} actionMenu={this.state.actionMenu}/>
            </div>
        );
    }
}