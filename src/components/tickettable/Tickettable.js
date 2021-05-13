import React from "react";
import moment from "moment";
import s from './Tickettable.module.css';
import history from "../../history";
import axios from "axios";

export class Tickettable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            searchContent: [],
            bol: false
        }

        this.compareId = this.compareId.bind(this);
        this.compareName = this.compareName.bind(this);
        this.compareDate = this.compareDate.bind(this);
        this.compareStatus = this.compareStatus.bind(this);

        this.sortById = this.sortById.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByDate = this.sortByDate.bind(this);
        this.sortByUrgency = this.sortByUrgency.bind(this);
        this.sortByStatus = this.sortByStatus.bind(this);

        this.toOverview = this.toOverview.bind(this);

        this.setBolState = this.setBolState.bind(this);

        this.allTickets = this.allTickets.bind(this);
    }

    toOverview(id) {
        var path = '/ticket-overview/' + id;
        history.push(
            {
                pathname: path,
                state: {ticketId: id}
            }
        )
    }

    componentDidMount() {
        this.setDate();
    }

    setDate() {
        axios.get('http://localhost:8080/finalproject/tickets', JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    content: response.data,
                    searchContent: response.data
                })
                this.sortByDate();
                this.sortByUrgency();
            }).catch(error => {})
    }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
    }

    allTickets() {
        var content = this.state.content;
        this.setState({
            searchContent: content
        })
    }

    setBolState() {
        this.setState({
            bol: !this.state.bol
        });
    }

    compareId(a, b) {
        if (this.state.bol) {
            return b.id - a.id;
        } else {
            return a.id - b.id;
        }
    }

    compareDate(a, b) {
        if (this.state.bol) {
            return b.desiredResolutionDate - a.desiredResolutionDate;
        } else {
            return a.desiredResolutionDate - b.desiredResolutionDate;
        }
    }

    compareName(a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();

        if (this.state.bol) {
            if (x > y) {
                return 1;
            } else if (x < y) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (y > x) {
                return 1;
            } else if (y < x) {
                return -1
            } else {
                return 0
            }
        }
    }

    compareStatus(a, b) {
        var x = a.status.toString();
        var y = b.status.toString();

        if (this.state.bol) {
            if (x > y) {
                return 1;
            } else if (x < y) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (y > x) {
                return 1;
            } else if (y < x) {
                return -1
            } else {
                return 0
            }
        }
    }


    sortById() {
        this.setBolState();
        let arraySotedById = this.state.searchContent.sort(this.compareId);
        this.setState({
            searchContent: arraySotedById,
            content: arraySotedById
        });
    }

    sortByName() {
        this.setBolState();
        let arraySortedByName = this.state.searchContent.sort(this.compareName);
        this.setState({
            searchContent: arraySortedByName,
            content: arraySortedByName
        })
    }

    sortByStatus() {
        this.setBolState();
        let arraySortedByStatus = this.state.searchContent.sort(this.compareStatus);
        this.setState(
            {
                searchContent: arraySortedByStatus
            }
        )
    }

    sortByDate() {
        let sortedArrayByDate = this.state.searchContent.sort(this.compareDate);
        this.setState({
            searchContent: sortedArrayByDate,
        });
        this.setBolState();
    }

    sortByUrgency() {
        let arrayCriticalUrgency = [];
        let arrayHighUrgency = [];
        let arrayMediumUrgency = [];
        let arrayLowUrgency = [];

        let search = this.state.searchContent;

        if (!this.state.bol) {
            this.sortByDate();
            search = this.state.searchContent.reverse();
        }

        for (const ticket of search) {
            if (ticket.urgency === 'CRITICAL') {
                arrayCriticalUrgency.push(ticket);
            } else if (ticket.urgency === 'HIGH') {
                arrayHighUrgency.push(ticket);
            } else if (ticket.urgency === 'MEDIUM') {
                arrayMediumUrgency.push(ticket)
            } else if (ticket.urgency === 'LOW') {
                arrayLowUrgency.push(ticket)
            }
        }

        search = [];

        let arr = search.concat(arrayCriticalUrgency, arrayHighUrgency, arrayMediumUrgency, arrayLowUrgency);
        if (!this.state.bol) {
            arr.concat(arrayLowUrgency, arrayMediumUrgency, arrayHighUrgency, arrayCriticalUrgency);
        }

        this.setState({
            searchContent: arr,
            content: arr
        });
        this.setBolState();
    }


    render() {
        return (
            <table className={s.tableticket}>
                <thead>
                <tr>
                    <th onClick={this.sortById}>ID</th>
                    <th onClick={this.sortByName}>Name</th>
                    <th onClick={this.sortByDate}>Desire Date</th>
                    <th onClick={this.sortByUrgency}>Urgency</th>
                    <th onClick={this.sortByStatus}>Status</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>

                {this.state.searchContent.map((ticket, i) => (
                    <tr key={i}>
                        <td>{ticket.id}</td>
                        <td value={ticket.id} onClick={() => {
                            this.toOverview(ticket.id)
                        }}>{ticket.name}</td>
                        <td>{this.convertToDate(ticket.desiredResolutionDate)}</td>
                        <td>{ticket.urgency}</td>
                        <td>{ticket.state}</td>
                        <td>
                            <select name="actionTicket" id="actionTicket">
                                {this.props.actionMenu.map((action, i) => (<option key={i}> {action} </option>))}
                            </select>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

        )
    }
}