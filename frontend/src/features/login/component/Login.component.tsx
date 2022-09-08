import React from 'react'
import './login.css'
import { LoginService } from './services/LoginService';
import Img1 from '../../../assets/bomb1.png';


interface CredentialsState {
    userName : string,
    isLoggedIn : boolean,
    loginAttempted : boolean
}

interface CustomEvent {
    target : HTMLInputElement
}

export class Login extends React.Component<{}, CredentialsState> {
    
    state: CredentialsState = {
        userName:"",
        isLoggedIn: false,
        loginAttempted: false
    };

    private loginService: LoginService = new LoginService();

    private async handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log('Click!!!');
        const loginResponse = await this.loginService.login(
            this.state.userName
        );
        this.setState({
            loginAttempted: true,
            isLoggedIn: loginResponse
        });
    }

    private setUserName(event: CustomEvent) {
        this.setState({ userName: event.target.value});
    }


    render(): React.ReactNode {
        let loginLabel;
        if (this.state.loginAttempted) {
            if (this.state.isLoggedIn) {
                loginLabel = <label>Login successful</label>
            } else {
                loginLabel = <label>Login failed</label>
            }
        }

        return (
            <div className='login'>
                <form data-test="login-form" onSubmit={e => this.handleSubmit(e)}>
                <div className='inline'><img src={Img1} alt="bomb" /><h1>Bomb party</h1></div>

                <p>Entrez votre pseudo</p>
                    <input className='input-pseudo' data-test="login-input" name="login"  value={this.state.userName} onChange={e => this.setUserName(e)} /><br/>
                    <input className='button-play' data-test="submit button" type="submit" value="Créer une partie" /><br/>
                </form>
                {loginLabel}
            </div>
        )
    }
}