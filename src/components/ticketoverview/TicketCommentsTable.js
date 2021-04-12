import React from 'react';
import axios from "axios";
import moment from "moment";

export class TicketCommentsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/comments')
            .then(response => this.setState({comments: response.data}))
    }

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
                    {this.state.comments.map((comment, i) => (
                        <tr key={i}>
                            <td>{moment(comment.date).format("LL")}</td>
                            <td>{comment.ticket.userOwner.lastName}</td>
                            <td>{comment.text}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        );
    }
}