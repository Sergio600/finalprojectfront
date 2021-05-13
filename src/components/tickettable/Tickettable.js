import React from "react";
import moment from "moment";
import s from './Tickettable.module.css';
import history from "../../history";

export class Tickettable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            searchContent: [],
            bol: false
        }

        this.toOverview = this.toOverview.bind(this);
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

    // componentDidMount() {
    //     this.setDate();
    // }

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

    compareNums(a, b) {
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
        if (this.state.bol) {
            return b.desiredResolutionDate - a.desiredResolutionDate;
        } else {
            return a.desiredResolutionDate - b.desiredResolutionDate;
        }
    }

    compareStatus(a,b){

    }



    sortById() {
        this.setBolState();
        let arraySotedById = this.state.searchContent.sort(this.compareNums);
        this.setState({
            searchContent: arraySotedById,
            content: arraySotedById
        });
    }

    sortByName() {
        this.setBolState();
        let arraySotedByName = this.state.searchContent.sort(this.compareName);
        this.setState({
            searchContent: arraySotedByName,
            content: arraySotedByName
        })
    }

    sortByStatus(){
        this.setBolState();
        let arraySotedByStatus = this.state.searchContent.sort(this.compareStatus);
        this.setState(
            {
                searchContent: arraySotedByStatus
            }
        )
    }


    sortByDate() {
        let sortedArrayByDate = this.state.searchContent.sort(this.compareDate);
        this.setState({
            searchContent: sortedArrayByDate,
        });
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
        if(!this.state.bol){
            arr.concat(arrayLowUrgency, arrayMediumUrgency,arrayHighUrgency, arrayCriticalUrgency);
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
                    <th onChange={this.sortByID}>ID</th>
                    <th onChange={this.sortByName}>Name</th>
                    <th onChange={this.sortByDate}>Desire Date</th>
                    <th onChange={this.sortByUrgency}>Urgency</th>
                    <th onChange={this.sortByStatus}>Status</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>

                {this.props.tickets.map((ticket, i) => (
                    <tr key={i}>
                        <td>{ticket.id}</td>
                        <td value={ticket.id} onClick={() => {
                            this.toOverview(ticket.id)
                        }}>{ticket.name}</td>
                        <td>{moment(ticket.desiredResolutionDate).format("LL")}</td>
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