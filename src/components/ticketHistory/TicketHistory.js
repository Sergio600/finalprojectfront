import React from "react";

export class TicketHistory extends React.Component {
    constructor(props) {
        super(props);

    }

    createHistoryrow() {

    }

    render() {
        return (
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.user}</td>
                <td>{this.props.action}</td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
}