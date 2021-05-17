import React from 'react';
import axios from "axios";

export class TicketHistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            histories: [],
        }
        this.setHistories = this.setHistories.bind(this);
        this.convertToDate = this.convertToDate.bind(this);

    }

    componentDidMount() {
        this.setHistories();
    }


    setHistories() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.props.id + '/history',
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    histories: response.data,
                })
            }).catch(error => {
            console.log(error)
        })
    }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
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
                            <td>{this.convertToDate(history.date)}</td>
                            <td>Owner</td>
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