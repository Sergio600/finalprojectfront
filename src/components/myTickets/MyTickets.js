import React from "react";
import s from './MyTickets.module.css'
import {Tickettable} from "../tickettable/Tickettable";

export class MyTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [
                {
                    id: 1,
                    name: "Task 1",
                    desiredDate: '11/11/2017',
                    urgency: 'High',
                    status: "Draft"
                },
                {
                    id: 2,
                    name: "Task 2",
                    desiredDate: '04/12/2007',
                    urgency: 'Low',
                    status: "In Progres"
                },
                {
                    id: 3,
                    name: "Task 3",
                    desiredDate: '01/01/2020',
                    urgency: 'High',
                    status: "Draft"
                },

            ],

            actionMenu: ["Submit", "Approve", "Decline", "Cancel", "Leave Feedback", "View Feedback"]

        }
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