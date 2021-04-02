import React from "react";
import s from './Tickettable.module.css'

const Tickettable = (prop) => {
    return (
                <tr>
                    <td>{prop.id} <a href="/ticket-overview">Ticket</a></td>
                    <td>{prop.name}</td>
                    <td>{prop.desireddate}</td>
                    <td>{prop.urgency}</td>
                    <td>{prop.status}</td>
                    <td>
                        <select name="actionTicket" id="actionTicket">
                            <option value="submit">Submit</option>
                            <option value="approve">Approve</option>
                            <option value="decline">Decline</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </td>
                </tr>
    );
}

export default Tickettable;