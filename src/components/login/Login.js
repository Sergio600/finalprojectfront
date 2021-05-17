import React from "react";
import s from './Login.module.css'
import axios from "axios";
import history from "../../history";
import {Redirect} from "react-router-dom";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            status: '',
            display: 'none'
        };


        this.signIn = this.signIn.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    createHeader() {
        let authValue = btoa(this.state.login + ':' + this.state.password);
        return {headers: {'Authorization': 'Basic ' + authValue}}
    }

    getHeaderValue() {
        return 'Basic ' + btoa(this.state.login + ':' + this.state.password);
    }

    signIn(e) {
        e.preventDefault();
        axios.get('http://localhost:8080/finalproject/users/current', this.createHeader()).then((responce) => {
            localStorage.setItem('AuthHeader', JSON.stringify(this.createHeader()));
            localStorage.setItem('User', JSON.stringify(responce.data))
            history.push('/all-tickets');
        }).catch(error => {
            this.setState({
                display: 'block',
            });
        });
    }

    updateLogin(e) {
        this.setState({
            login: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    render() {
        let passRegEx = "()"
        return (
            <React.Fragment>
                {
                    localStorage.getItem('AuthHeader') ? <Redirect to={'/all-tickets'}/> :

                        <div className={s.containerLoginForm}>
                            <form className={s.form} onSubmit={this.signIn}>
                                <p>Login to the Help Desk</p>

                                <div className={s.inputLabel}>
                                    <label htmlFor="email">User Name</label>
                                    <input type="email"
                                           placeholder="Enter E-MAIL"
                                           name="email"
                                           value={this.state.login}
                                           onChange={this.updateLogin}
                                           required
                                    />
                                </div>

                                <div className={s.inputLabel}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                           placeholder="Enter Password"
                                           name="password"
                                           value={this.state.password}
                                           onChange={this.updatePassword}
                                           required
                                        // pattern={passRegEx}
                                    />
                                </div>

                                <button type="submit">Enter</button>
                                <span className="error-login" style={{display: this.state.display}}>Please make sure you are using a valid email or password</span>
                            </form>
                        </div>


                }
            </React.Fragment>
        );
    }
}



