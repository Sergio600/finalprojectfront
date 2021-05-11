import './App.css';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import { Router } from 'react-router';
import {Login} from "./components/login/Login";
import {AllTicketsPage} from "./components/alltTicketsPage/AllTicketsPage";
import {MyTickets} from "./components/myTickets/MyTickets";
import {CreateTicketPage} from "./components/createTicketPage/CreateTicketPage";
import {TicketOverview} from "./components/ticketoverview/TicketOverview";
import {EditTicket} from "./components/editTicket/EditTicket";
import {Feedback} from "./components/feedback/Feedback";
import {FeedbackView} from "./components/feedbackView/FeedbackView";
import history from "./history";
// import { createBrowserHistory } from 'history';




class App extends Component {

    render() {
        // const history = createBrowserHistory();
        return (
            <div className="app-wrapper">
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route exact path="/all-tickets" component={AllTicketsPage}/>
                        <Route path="/my-tickets" component={MyTickets}/>
                        <Route path="/ticket-create" component={CreateTicketPage}/>
                        <Route path="/ticket-edit" component={EditTicket}/>
                        <Route path="/ticket-history" component={TicketOverview}/>
                        <Route exact path="/ticket-overview/:id" component={TicketOverview}/>
                        <Route path="/feedback" component={Feedback}/>
                        <Route path="/feedback-view" component={FeedbackView}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

