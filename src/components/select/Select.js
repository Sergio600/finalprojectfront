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
    }

    componentDidMount() {
        this.setActions();
    }

    setActions() {

        // console.log(this.props.ticket.id);
        //
        // console.log(this.props.ticket.userOwner.role);
        // console.log(this.props.currentUser.role);
        // console.log(this.props.ticket.userOwner.role === this.props.currentUser.role);
        //
        // console.log(this.props.ticket.userOwner);
        // console.log(this.props.currentUser);
        // console.log(this.props.ticket.userOwner.email === this.props.currentUser.email);
        //
        //
        // console.log(this.props.ticket.userOwner.role === 'MANAGER');
        // console.log("is it draft: " + (this.props.ticket.state === 'DRAFT').toString());


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

        if (e.target.value === 'Approve') {
            ticketState ='APPROVED';
        }

        if (e.target.value === 'Decline') {
            ticketState ='DECLINED';
        }

        if (e.target.value === 'Cancel') {
            ticketState ='CANCELLED';
        }

        if (e.target.value === 'Assign to me') {
            ticketState ='IN PROGRESS';
        }

        if (e.target.value === 'Done') {
            ticketState ='DONE';
        }

        if (e.target.value === 'Submit') {
            ticketState ='NEW';
        }



        this.updateTicket(ticketState);
    }

    updateTicket(ticketState) {
        let ticketDto = this.props.ticket;
        ticketDto.state = ticketState;

        console.log(ticketDto);
        console.log(ticketState);

        axios.put('http://localhost:8080/finalproject/tickets/'+ this.props.ticket.id,
            ticketDto,
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