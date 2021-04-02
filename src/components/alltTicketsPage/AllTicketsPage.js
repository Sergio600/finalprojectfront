import React from "react";
import s from './AllTicketsPage.module.css'
import {Tickettable} from "../tickettable/Tickettable";

export class AllTicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [
                {
                    id: 1,
                    name: "Task 1",
                    desireddate: '11/11/2017',
                    urgency: 'High',
                    status: "Draft"
                },
                {
                    id: 2,
                    name: "Task 2",
                    desireddate: '04/12/2007',
                    urgency: 'Low',
                    status: "In Progres"
                },
                {
                    id: 3,
                    name: "Task 3",
                    desireddate: '01/01/2020',
                    urgency: 'High',
                    status: "Draft"
                },

            ]
        }

    }

    render() {
        let ticketList;
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

                <table className='s.tableticket'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Desire Date</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                         ticketList = this.state.tickets.map(( (ticket, i) => {
                            console.log(ticket);
                            <Tickettable
                                key={i}
                                id={ticket.id}
                                name={ticket.name}
                                desireddate={ticket.desireddate}
                                urgency={ticket.urgency}
                                status={ticket.status}
                            />
                        }))
                    }
                    {ticketList}


                    {/*<Tickettable id='1' name='Task 1' desireddate='11/11/2017' urgency='High' status/>*/}
                    {/*<Tickettable id='2' name='Task 2' desireddate='01/12/2012' urgency='Low' status='In Progress'/>*/}
                    {/*<Tickettable id='3' name='Task 3' desireddate='11/01/2019' urgency='High' status='Draft'/>*/}
                    </tbody>
                </table>
            </div>
        );
    }
}