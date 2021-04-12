import React from 'react';
import axios from "axios";
import moment from "moment";

export class TicketHistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            histories: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/histories')
            .then(response => this.setState({histories: response.data}))
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

                    {this.state.histories.map((history, i) => (
                        <tr key={i}>
                            <td>{moment(history.date).format("LL")}</td>
                            <td>{history.ticket.userOwner.lastName}</td>
                            <td>{history.action}</td>
                            <td>{history.description}</td>
                        </tr>
                    ))}

                    </tbody>

                </table>
            </div>
        );
    }
}