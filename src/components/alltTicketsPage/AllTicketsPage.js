import React from "react";
import s from './AllTicketsPage.module.css'
import {Tickettable} from "../tickettable/Tickettable";
import axios from "axios";

export class AllTicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            actionMenu: ["Submit", "Approve", "Decline", "Cancel"]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/tickets')
            .then(response => this.setState({ tickets: response.data.tickets }))
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
                        <button type="submit" className={s.btnAllTickets}>All Tickets</button>
                    </form>
                    <form action="/my-tickets">
                        <button type="submit">My Tickets</button>
                    </form>
                </div>

                <Tickettable tickets={this.state.tickets} actionMenu={this.state.actionMenu}/>

            </div>
        );
    }
}




// {
//     id: 1,
//         name: "Task 1",
//     desireddate: '11/11/2017',
//     urgency: 'High',
//     status: "Draft"
// },
// {
//     id: 2,
//         name: "Task 2",
//     desireddate: '04/12/2007',
//     urgency: 'Low',
//     status: "In Progres"
// },
// {
//     id: 3,
//         name: "Task 3",
//     desireddate: '01/01/2020',
//     urgency: 'High',
//     status: "Draft"
// },
//