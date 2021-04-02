import React from "react";
import s from './MyTickets.module.css'
import Tickettable from "../tickettable/Tickettable";

const MyTickets = () => {
    return (

        <div className={s.form}>

            <div className={s.btnCreate}>
                <form action="/ticket-create">
                    <button type="submit">Create New Ticket</button>
                </form>
            </div>


            <div className={s.btnChoose}>
                <form action="/all-tickets">
                    <button type="submit">All Tickets</button>
                </form>
                <form action="/my-tickets">
                    <button type="submit" className={s.btnMyTickets}>My Tickets</button>
                </form>
            </div>

            <table className={s.tableticket}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Desire Date</th>
                    <th>Urgency</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                <Tickettable id='1' name='Task 1' desireddate='11/11/2017' urgency='High' status='Draft'/>
                <Tickettable id='2' name='Task 2' desireddate='01/12/2012' urgency='Low' status='In Progress'/>
                <Tickettable id='3' name='Task 3' desireddate='11/01/2019' urgency='High' status='Draft'/>

            </table>
        </div>
    );
}

export default MyTickets;