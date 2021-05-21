import React from "react";
import axios from "axios";
import history from "../../history";


export class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionMenu: ["hi"],
            ticket: {},
            currentUser: {},
            userOwner: {},
            role: '',
            ticketState: ''
        }

        this.setActions = this.setActions.bind(this);
        this.setStateToTicket = this.setStateToTicket.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
        this.updateTicketHistory = this.updateTicketHistory.bind(this);
    }

    componentDidMount() {
        this.setActions();
    }

    setActions() {

        if (this.props.currentUser.role === 'MANAGER') {

            if ((this.props.ticket.userOwner.email === this.props.currentUser.email) &&
                (this.props.ticket.state === 'DRAFT' || this.props.ticket.state === 'DECLINED')) {
                this.setState({
                    actionMenu: ["Choose action", "Submit", "Cancel"],
                })
            } else if (this.props.ticket.state === "NEW" && this.props.ticket.userOwner.role === 'EMPLOYEE') {
                this.setState({
                    actionMenu: ["Choose action", "Approve", "Decline", "Cancel"],
                })
                return;
            } else {
                this.setState({
                    actionMenu: ["Manager n/a"]
                })
            }
            return;
        }

        //Employee
        if (this.props.currentUser.role === 'EMPLOYEE') {
            if (this.props.ticket.state === 'DRAFT' || this.props.ticket.state === 'DECLINED') {

                this.setState({
                    actionMenu: ["Choose action", "Submit", "Cancel"]
                })
            } else {
                this.setState({
                    actionMenu: ["Employee n/a"]
                })
            }
        }

        //Engineer
        if (this.props.currentUser.role === 'ENGINEER') {
            if (this.props.ticket.state === 'APPROVED') {
                this.setState({
                    actionMenu: ["Choose action", "Assign to Me", "Cancel"],
                })
            } else if (this.props.ticket.state === 'IN PROGRESS') {
                this.setState({
                    actionMenu: ["Choose action", "DONE"],
                })
            } else {
                this.setState({
                    actionMenu: ["n/a", "Done"]
                })
            }
        }
    }


    setStateToTicket(e) {
        var ticketState = '';
        var historyDescription='';

        if (e.target.value === 'Approve') {
            ticketState ='APPROVED';
            historyDescription= "Ticket status is changed from " + this.props.ticket.state + " to APPROVED";
        }

        if (e.target.value === 'Decline') {
            ticketState ='DECLINED';
            historyDescription ="Ticket status is changed from " + this.props.ticket.state + " to DECLINED";

        }

        if (e.target.value === 'Cancel') {
            ticketState ='CANCELLED';
            historyDescription="Ticket status is changed from " + this.props.ticket.state + " to CANCELLED";

        }

        if (e.target.value === 'Assign to me') {
            ticketState ='IN PROGRESS';
            historyDescription ="Ticket status is changed from " + this.props.ticket.state + " to IN PROGRESS";

        }

        if (e.target.value === 'Done') {
            ticketState ='DONE';
            historyDescription="Ticket status is changed from " + this.props.ticket.state + " to DONE";

        }

        if (e.target.value === 'Submit') {
            ticketState ='NEW';
            historyDescription = "Ticket status is changed from " + this.props.ticket.state + " to NEW";

        }

        this.updateTicketHistory(historyDescription);
        this.updateTicket(ticketState);

    }

    updateTicket(ticketState) {
        let ticketDto = this.props.ticket;
        ticketDto.state = ticketState;

        console.log(ticketState);

        axios.put('http://localhost:8080/finalproject/tickets/'+ this.props.ticket.id,
            ticketDto,
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                history.push('/all-tickets');
            }).catch(error => {
            console.log(error);
        })
        console.log(ticketDto);
    }

    updateTicketHistory(historyDescription){
        let historyDto = {
            date: new Date().getTime(),
            description: historyDescription,
        };

        console.log(historyDto);


        axios.post('http://localhost:8080/finalproject/tickets/'+ this.props.ticket.id+"/history",
            historyDto,
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                history.push('/all-tickets');
            }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <select name="actionTicket" onChange={this.setStateToTicket}>
                    {this.state.actionMenu.map((action, i) => (
                        <option key={i} > {action} </option>
                    ))}
                </select>
            </div>
        )
    }
}