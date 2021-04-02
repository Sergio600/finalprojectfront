import React from "react";
import s from './Tickettable.module.css'

export class Tickettable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        console.log(this.props.id + " HI ");
        return (
            <tr>
                <td>{this.props.id} <a href="/ticket-overview">Ticket</a></td>
                <td>{this.props.name}</td>
                <td>{this.props.desireddate}</td>
                <td>{this.props.urgency}</td>
                <td>{this.props.status}</td>
                <td>
                    <select name="actionTicket" id="actionTicket">
                        <option value="submit">Submit</option>
                        <option value="approve">Approve</option>
                        <option value="decline">Decline</option>
                        <option value="cancel">Cancel</option>
                    </select>
                </td>
            </tr>
        )

    }
}