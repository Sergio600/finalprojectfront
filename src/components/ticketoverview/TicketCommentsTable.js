import React from 'react';

export class TicketCommentsTable extends React.Component {
    render() {
        return (
            <div className="table-comments">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Comment</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.ticketComments.map((ticket, i) => (
                        <tr key={i}>
                            <td>{ticket.date}</td>
                            <td>{ticket.userName}</td>
                            <td>{ticket.comment}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        );
    }
}