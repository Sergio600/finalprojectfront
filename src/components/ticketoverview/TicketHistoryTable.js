import React from 'react';

export class TicketHistoryTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (


            <div className='table-history'>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Description</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.ticketHistory.map((ticket, i) => (
                        <tr key={i}>
                            <td>{ticket.date}</td>
                            <td>{ticket.userName}</td>
                            <td>{ticket.action}</td>
                            <td>{ticket.description}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        );
    }
}