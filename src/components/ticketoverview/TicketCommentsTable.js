import React from 'react';
import axios from "axios";
import moment from "moment";
import history from "../../history";

export class TicketCommentsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }

        this.setComments = this.setComments.bind(this);

    }

    componentDidMount() {
        this.setComments();
    }


    setComments(){
        axios.get('http://localhost:8080/finalproject/tickets/'+ this.props.id + '/comments',
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {

                this.setState({
                    comments: response.data,
                    user: response.data[0].user
                })
            }).catch(error => {console.log(error)})
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
                            <td>{this.state.user.lastName}</td>
                            <td>{comment.text}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        );
    }
}