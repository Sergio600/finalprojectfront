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
        }

        this.setActions = this.setActions.bind(this);
    }

    componentDidMount() {
        this.setActions();
    }

    setActions() {

        console.log(this.props.ticket.id);

        console.log(this.props.ticket.userOwner.role);
        console.log(this.props.currentUser.role);
        console.log(this.props.ticket.userOwner.role === this.props.currentUser.role);

        console.log(this.props.ticket.userOwner);
        console.log(this.props.currentUser);
        console.log(this.props.ticket.userOwner.email === this.props.currentUser.email);


        console.log(this.props.ticket.userOwner.role === 'MANAGER');
        console.log("is it draft: " + (this.props.ticket.state === 'DRAFT').toString());


        if (this.props.currentUser.role === 'MANAGER') {

            if ((this.props.ticket.userOwner.email === this.props.currentUser.email) &&
                (this.props.ticket.state === 'DRAFT' || this.props.ticket.state === 'DECLINED')) {
                this.setState({
                    actionMenu: ["Submit", "Cancel"],
                })
            } else if (this.props.ticket.state === "NEW" && this.props.ticket.userOwner.role === 'EMPLOYEE') {
                this.setState({
                    actionMenu: ["Approve", "Decline", "Cancel"],
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
                    actionMenu: ["Submit", "Cancel"]
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
                    actionMenu: ["Assign to Me", "Cancel"],
                })
            } else if (this.props.ticket.state === 'IN PROGRESS') {
                this.setState({
                    actionMenu: ["DONE"],
                })
            } else {
                this.setState({
                    actionMenu: ["n/a", "Done"]
                })
            }
        }
    }


    setStateToTicket(action) {
        if (action === '') {}
    }


    render() {
        return (
            <div>
                <select name="actionTicket">
                    {this.state.actionMenu.map((action, i) => (
                        <option key={i}> {action} </option>
                    ))}
                </select>
            </div>
        )
    }
}