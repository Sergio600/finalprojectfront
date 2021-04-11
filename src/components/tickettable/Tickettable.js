import React from "react";
import s from './Tickettable.module.css'

export class Tickettable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (

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

                {this.props.tickets.map((ticket, i) => (
                    <tr key={i}>

                        <td>{ticket.id}</td>
                        <td><a href="/ticket-overview">{ticket.name}</a></td>
                        <td>{ticket.desireddate}</td>
                        <td>{ticket.urgency}</td>
                        <td>{ticket.status}</td>
                        <td>
                            <select name="actionTicket" id="actionTicket">

                                {this.props.actionMenu.map((action, i) => (<option key={i}> {action} </option>))}

                            </select>

                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        )
    }
}