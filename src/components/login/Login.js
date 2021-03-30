import React from "react";
import s from './Login.module.css'

const Login = () => {
    return (

        <div>
            <form className={s.loginForm} action="/all-tickets">
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

                <button type="submit">Enter</button>

            </form>
        </div>
    )
}

export default Login;