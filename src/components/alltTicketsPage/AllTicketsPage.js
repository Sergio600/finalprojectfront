import React from "react";
import s from './AllTicketsPage.module.css'
import axios from "axios";
import history from "../../history";


export class AllTicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            searchContent: [],
            actionMenu: ["Submit", "Approve", "Decline", "Cancel"],
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

        this.filterArray = this.filterArray.bind(this);

        this.myTickets = this.myTickets.bind(this);
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

    myTickets() {
        var user = JSON.parse(localStorage.getItem('User'));
        var filteredArray = [];

        if (user.role === "MANAGER") {
            for (let i = 0; i < this.state.searchContent.length; i++) {
                if (this.state.searchContent[i].userOwner.id === user.id
                    || (this.state.searchContent[i].userApprover && this.state.searchContent[i].userApprover.id !== null
                        && this.state.searchContent[i].userApprover.id === user.id
                        && this.state.searchContent[i].state === 'APPROVED')) {
                    filteredArray[i] = this.state.searchContent[i];
                }
            }
        }

        if (user.role === "ENGINEER") {
            for (let i = 0; i < this.state.searchContent.length; i++) {
                if (this.state.searchContent[i].userAssignee && this.state.searchContent[i].userAssignee.id === user.id) {
                    filteredArray[i] = this.state.searchContent[i];
                }
            }
        }

        if (user.role === "EMPLOYEE") {
            filteredArray = this.state.searchContent;
        }

        this.setState({
            searchContent: filteredArray,
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

    filterArray(e) {
        let searchRegEx = "[a-zA-Z0-9~.\"().;:< >@\\[\\]!#$%&'*+-\\/=?^_`{|}]";
        const inpChar = e.target.value.toString().slice(-1);

        if ((!inpChar || inpChar.match(searchRegEx)) && this.state.searchContent.length <= 500) {
            document.getElementById('error-label').style.display = "none";
            let searchString = e.target.value.trim();
            let filteredList = this.state.content.filter(function (item) {
                return item.name.toLowerCase().search(searchString.toLowerCase()) !== -1;
            });
            this.setState({
                searchContent: filteredList
            });
        } else {
            document.getElementById('error-label').style.display = "inline";
        }
    }


    render() {
        return (

            <div className={s.form}>
                <div className={s.btnCreate}>
                    <form action="/ticket-create">
                        <button type="submit">Create New Ticket</button>
                    </form>
                </div>

                <div className={s.btnChoose}>

                        <button onClick={this.allTickets} className={s.btnAllTickets} >All Tickets</button>
                        <button onClick={this.myTickets} className={s.btnAllTickets} >My Tickets</button>
                </div>
                <input type="text"
                       onChange={this.filterArray}
                />
                <label id="error-label"
                       className={s.error}>Invalid name!</label>


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
                                    {this.state.actionMenu.map((action, i) => (<option key={i}> {action} </option>))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
