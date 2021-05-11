import React from "react";
import moment from "moment";
import s from './Tickettable.module.css';
import history from "../../history";

export class Tickettable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.toOverview = this.toOverview.bind(this);
    }

    toOverview(id) {
        var path = '/ticket-overview/' + id;
        history.push(
            {
                pathname: path,
                state: {ticketId: id}
            }
        )
    }

    render() {
        return (
            <table className={s.tableticket}>
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
                        <td value={ticket.id} onClick={() => {this.toOverview(ticket.id)}}>{ticket.name}</td>
                        <td>{moment(ticket.desiredResolutionDate).format("LL")}</td>
                        <td>{ticket.urgency}</td>
                        <td>{ticket.state}</td>
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