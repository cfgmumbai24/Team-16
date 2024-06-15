import React from 'react';
import { useState } from 'react';
import './LoginSignup.css';
import person from '../Assets/person.png';
import email from '../Assets/email.png';
import password from '../Assets/password.png';

const LoginSignup = () => {

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={email} alt="" />
                        <input type="email" placeholder='Email Id' />
                    </div>
                    <div className='input'>
                        <img src={password} alt="" />
                        <input type="password" placeholder='Password' />
                    </div>
                </div>
                <div className='forget-password'>Forget Password? <span>Click Here</span></div>

                <div className='submit-container'>
                    <div className="submit">Login</div>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;
