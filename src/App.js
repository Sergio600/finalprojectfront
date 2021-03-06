import './App.css';
import React, {Component} from 'react';
import { Router } from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';

import {Login} from "./components/login/Login";
import {AllTicketsPage} from "./components/alltTicketsPage/AllTicketsPage";
import {TicketOverview} from "./components/ticketoverview/TicketOverview";
import {Feedback} from "./components/feedback/Feedback";
import history from "./history";
import {TicketHistoryTable} from "./components/ticketoverview/TicketHistoryTable";
import {CreateEditTicketForm} from "./components/createEditTicketForm/CreateEditTicketForm";
import {EditTicket} from "./components/editTicket/EditTicket";
import {Select} from "./components/select/Select";

class App extends Component {

    render() {
        return (
            // <div className="app-wrapper">
                <Router history={history} >
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route exact path="/all-tickets" component={AllTicketsPage}/>
                        <Route path="/ticket-create" component={CreateEditTicketForm}/>
                        <Route path="/ticket-edit/:id" component={EditTicket}/>
                        <Route path="/ticket-history" component={TicketHistoryTable}/>
                        <Route exact path="/ticket-overview/:id" component={TicketOverview}/>
                        <Route path="/feedback/:id" component={Feedback}/>
                        <Route path="/select-action" component={Select}/>

                    </Switch>
                </Router>
            // </div>
        );
    }
}

export default App;

