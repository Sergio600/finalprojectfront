import React from "react";
import sc from "../createTicketPage/CreateTicketPage.module.css";
import {CreateEditTicketForm} from "../createEditTicketForm/CreateEditTicketForm";

export class EditTicket extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={sc.formCreateTicket}>
                <div>
                    <div className={sc.link}>
                        <a href="/all-tickets">Ticket List</a>
                    </div>
                </div>

                <div>
                    <p>Edit Ticket</p>
                </div>

                <CreateEditTicketForm />

            </div>
        )
    }
}