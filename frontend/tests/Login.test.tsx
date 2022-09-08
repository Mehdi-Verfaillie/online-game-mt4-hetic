import { Login } from '../src/features/login/component/Login.component';
import { LoginService } from '../src/features/login/component/services/LoginService';
jest.mock('../src/features/login/component/services/LoginService');
import * as ReactDOM from 'react-dom';
import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

describe('Login component test', () => {
    let container: HTMLDivElement
    const loginServiceSpy = jest.spyOn(LoginService.prototype. 'login');

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Login />, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it('Renders correctly initial document', () => {
        const inputs = container.querySelectorAll('input');
        container.remove();
    })

    it('Renders correctly initial document', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].name).toBe('login');
        expect(inputs[1].value).toBe('Login');

        //a determiner le label sert a quoi
        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument();
    });

    it('Renders correctly initial document with data-test query', () => {
        expect(container.querySelector("[data-test='login-form']")).toBeInTheDocument();
        expect(container.querySelector("[data-test='login-input']")).getAttribute('name');.toBe('login');
    });
    it('Passes credentials correctly', () => {
        const inputs = container.querySelectorAll('input');
        const loginInput = inputs[0];
        const loginButton = inputs[1];
        fireEvent.change(loginInput, { target: { value: 'someUser' } });
        fireEvent.click(loginButton);
        expect(loginServiceSpy).toBeCalledWith('someUser', 'somePass');
    });
    it('Renders correctly status label - valid login', async () => {
        loginServiceSpy.mockResolvedValueOnce(true);
        const inputs = container.querySelectorAll('input');
        const loginButton = inputs[1];
        fireEvent.click(loginButton);
        const statusLabel = await waitForElement(() =>
            container.querySelector('label')
        );
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login successful');
    });



})
