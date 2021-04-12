import React from "react";
import s from './Login.module.css'
import axios from "axios";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            status: '',
            display: 'none'
        };

    }

    createHeader() {
        let authValue = btoa(this.state.login + ':' + this.state.password);
        return {headers: {'Authorisation': 'Basic ' + authValue}}
    }

    getHeaderValue() {
        return 'Basic ' + btoa(this.state.login + ':' + this.state.password);
    }

    signIn(e) {
        e.preventDefault();
        axios.get('http://localhost:8080/finalproject/users/current', this.createHeader()).then((responce) => {
            localStorage.setItem('AuthHeader', JSON.stringify(this.createHeader()));
            localStorage.setItem('User', JSON.stringify(responce.data))
            // history.push('tickets');
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
            <div>
                {/*{localStorage.getItem('AuthHeader') ? <Redirect to={'tickets'}/> :*/}
                    <form className={s.form} onSubmit={this.signIn}>
                        <div>
                            <p>Login to the Help Desk</p>
                        </div>

                        <div className={s.containerLoginForm}>

                            <div className={s.inputLabel}>
                                <label htmlFor="uname">User Name</label>
                                <input type="email"
                                       placeholder="Enter Username"
                                       name="uname"
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
                                       pattern={passRegEx}
                                />
                            </div>

                        </div>

                        <button type="submit" onClick={() => {
                            alert('hi')
                        }}>Enter
                        </button>
                        <span className="error-login" style={{display: this.state.display}}>Please make sure you are using a valid email or password</span>
                    </form>
                // }
            </div>
        );
    }
}



