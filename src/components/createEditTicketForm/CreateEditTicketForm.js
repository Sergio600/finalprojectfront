import React from "react";
import sc from "../createTicketPage/CreateTicketPage.module.css";

export class CreateEditTicketForm extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form className={sc.formCenter} action="/all-tickets">


                    <div className={sc.formGroup}>
                        <label htmlFor="category">Categoty</label>
                        <select name="category" id="category">
                            <option value="application">Application & Services</option>
                            <option value="benefits">Benefits & Paper Work</option>
                            <option value="hardware">Hardware & Software</option>
                            <option value="people">People Management</option>
                            <option value="security">Security $ Access</option>
                            <option value="workplaces">Workolaces & Facilities</option>
                        </select>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="ticketName">Name</label>
                        <input type="text" name="ticketName"/>
                    </div>


                    <div className={sc.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"></textarea>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="urgency">Urgency</label>
                        <select name="urgency" id="urgency">
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="average">Average</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="desiredDate">Desired resolution date</label>
                        <input type="date" name="desiredDate"/>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="attachments">Add atachments</label>
                        <input type="file" name="attachments"/>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="comment">Comment</label>
                        <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
                    </div>

                    <div>
                        <button type="submit">Enter</button>
                    </div>

                </form>
            </div>
        )
    }

}