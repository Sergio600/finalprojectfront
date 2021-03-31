import './App.css';
import {Login} from "./components/login/Login";
import Alltickets from "./components/alltickets/Alltickets";
import MyTickets from "./components/mytickets/MyTickets";
import {BrowserRouter, Route} from "react-router-dom";
import CreateTicket from "./components/createticket/CreateTicket";

function App(props) {



    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Route path="/login" component={Login}/>
                <Route path="/all-tickets" component={Alltickets}/>
                <Route path="/my-tickets" component={MyTickets}/>
                <Route path="/create-ticket" component={CreateTicket}/>
            </div>
        </BrowserRouter>
    )
}

export default App;



