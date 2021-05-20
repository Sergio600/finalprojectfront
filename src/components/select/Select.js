import React from "react";
import axios from "axios";
import history from "../../history";


export class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionMenu: ["Submit", "Approve", "Decline", "Cancel", "Assign to Me", "Done"],
            ticket: {},
            currentUser: {},
            userOwner: {},
            role: '',
        }

        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.setActions = this.setActions.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser();
        this.setState({
            ticket: this.props.ticket,
            userOwner: this.props.ticket.userOwner,
        });
        this.setActions();
        console.log(this.props.ticket);
    }


    getCurrentUser() {
        axios.get('http://localhost:8080/finalproject/users/current', JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    currentUser: response.data,
                    role: response.data.role,
                });
                console.log(response.data);
            }).catch(error => {
            console.log(error)
        })

    }

    setActions() {
        console.log(this.state.currentUser.role);

        //Employee
        if (this.state.currentUser.role === 'EMPLOYEE' && (this.state.ticket.state === 'DRAFT' ||
            this.state.ticket.state === 'DECLINED')) {

            this.setState({
                actionMenu: ["Submit", "Cancel"]
            })
        }

        if (this.state.currentUser.role === 'EMPLOYEE' && (this.state.ticket.state === 'NEW' ||
            this.state.ticket.state === 'APPROVED' ||
            this.state.ticket.state === 'CANCELLED' ||
            this.state.ticket.state === 'IN PROGRESS' ||
            this.state.ticket.state === 'DONE')) {

            this.setState({
                actionMenu: [""]
            })
        }


        // Manager
        if (this.state.currentUser.role === 'MANAGER' &&
            (this.state.ticket.state === 'DRAFT' || this.state.ticket.state === 'DECLINED') &&
            this.state.ticket.userOwner === this.state.currentUser) {

            this.setState({
                actionMenu: ["Submit", "Cancel"],
            })
        } else {
            this.setState({
                actionMenu: [""]
            })
        }

        if (this.state.currentUser.role === 'MANAGER' && this.state.ticket.state === 'NEW' &&
            this.state.ticket.userOwner.role === 'EMPLOYEE') {
            this.setState({
                actionMenu: ["Approve", "Decline", "Cancel"],
            })
        } else {
            this.setState({
                actionMenu: [""]
            })
        }

        if (this.state.currentUser.role === 'MANAGER' && (this.state.ticket.state === 'APPROVED' ||
            this.state.ticket.state === 'CANCELLED' || this.state.ticket.state === 'IN PROGRESS' ||
            this.state.ticket.state === 'DONE')) {

            this.setState({
                actionMenu: [""]
            })
        }

        //Engineer
        if (this.state.currentUser.role === 'ENGINEER' && (this.state.ticket.state === 'DRAFT' ||
            this.state.ticket.state === 'NEW' || this.state.ticket.state === 'DECLINED' ||
            this.state.ticket.state === 'CANCELLED' || this.state.ticket.state === 'DONE')) {
            this.setState({
                actionMenu: [""]
            })
        }

        if (this.state.currentUser.role === 'ENGINEER' && this.state.ticket.state === 'APPROVED') {
            this.setState({
                actionMenu: ["Assign to Me", "Cancel"],
            })
        }

        if (this.state.currentUser.role === 'ENGINEER' && this.state.ticket.state === 'IN PROGRESS') {
            this.setState({
                actionMenu: ["DONE"],
            })
        }
    }


    setStateToTicket(action) {

        if (action === '') {

        }

    }


    render() {
        return (
            <div>
                <select name="actionTicket" id="actionTicket">
                    {this.state.actionMenu.map((action, i) => (
                        <option key={i} onClick={this.setStateToTicket(action)}> {action} </option>
                    ))}
                </select>
            </div>
        )
    }
}