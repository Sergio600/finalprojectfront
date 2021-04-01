import React from "react";
import s from './Login.module.css'


export class Login extends React.Component{
    constructor(props) {
        super(props);
        // this.state;
    }

    render() {
        return(
        <div>
            <form className={s.form} method action="/all-tickets">
                <div>
                    <p>Login to the Help Desk</p>
                </div>

                <div className={s.containerLoginForm}>

                    <div className={s.inputLabel}>
                        <label htmlFor="uname">User Name</label>
                        <input type="text" placeholder="Enter Username" name="uname"/>
                    </div>

                    <div className={s.inputLabel}>
                        <label htmlFor="psw">Password</label>
                        <input type="password" placeholder="Enter Password" name="psw"/>
                    </div>

                </div>

                <button type="submit" onClick={()=>{alert('hi')}}>Enter</button>
            </form>
        </div>
        );
    }
}



