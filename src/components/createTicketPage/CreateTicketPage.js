import React from "react";
import sc from './CreateTicketPage.module.css';
import {CreateEditTicketForm} from './../createEditTicketForm/CreateEditTicketForm'


export class CreateTicketPage extends React.Component {
    render() {
        return (


            <div className={sc.formCreateTicket}>
                <div>
                    <div className={sc.link}>
                        <a href="/all-tickets">Ticket List</a>
                    </div>
                </div>

                <div>
                    <p>Create new Ticket</p>
                </div>


                <CreateEditTicketForm />

            </div>
        );
    }
}