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
        this.convertToDate = this.convertToDate.bind(this);

    }

    componentDidMount() {
        this.setComments();
    }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
    }


    setComments(){
        axios.get('http://localhost:8080/finalproject/tickets/'+ this.props.id + '/comments',
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {

                this.setState({
                    comments: response.data,
                })

                console.log(response.data);
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
                            <td>{this.convertToDate(comment.date)}</td>
                            <td>{comment.user.email}</td>
                            <td>{comment.text}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        );
    }
}