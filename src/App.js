import './App.css';
import {Login} from "./components/login/Login";
import {AllTicketsPage} from "./components/alltTicketsPage/AllTicketsPage";
import MyTickets from "./components/myTickets/MyTickets";
import {BrowserRouter, Route} from "react-router-dom";
import {CreateTicketPage} from "./components/createTicketPage/CreateTicketPage";
import {TicketOverview} from "./components/ticketoverview/TicketOverview";
import {EditTicket} from "./components/editTicket/EditTicket";
import {Feedback} from "./components/feedback/Feedback";

function App(props) {



    return (
        <BrowserRouter>
            <div className="app-wrapper">

                <Route path="/login" component={Login}/>
                <Route path="/all-tickets" component={AllTicketsPage}/>
                <Route path="/my-tickets" component={MyTickets}/>
                <Route path="/ticket-create" component={CreateTicketPage}/>
                <Route path="/ticket-edit" component={EditTicket}/>
                <Route path="/ticket-history" component={TicketOverview}/>
                <Route path="/ticket-overview" component={TicketOverview}/>
                <Route path="/feedback" component={Feedback}/>




            </div>
        </BrowserRouter>
    )
}

export default App;



