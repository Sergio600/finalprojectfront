import React from "react";
import s from './AllTicketsPage.module.css'
import {Tickettable} from "../tickettable/Tickettable";
import axios from "axios";


export class AllTicketsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            actionMenu: ["Submit", "Approve", "Decline", "Cancel"]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/finalproject/tickets', JSON.parse(localStorage.getItem('AuthHeader')))
            .then(response => this.setState({tickets: response.data}))
    }

    myTickets (){
        var user = JSON.parse(localStorage.getItem('User'));
        var myTicketsArray = [];


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
                    <form action="/all-tickets">
                        <button type="submit" className={s.btnAllTickets}>All Tickets</button>
                    </form>
                    <form action="/my-tickets">
                        <button type="submit">My Tickets</button>
                    </form>
                </div>

                <Tickettable tickets={this.state.tickets} actionMenu={this.state.actionMenu}/>

            </div>
        );
    }
}
