import React, { useState } from 'react';
import styled from 'styled-components';
import { LoginForm } from './loginForm';
import { AccountContext } from './accountContext';
import { SignupForm } from './signupForm';
import img1 from './t2.jpg';
//genel kutu
const BoxContainer = styled.div`
  width: 600px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  font-weight: 500;
  font-size: 25px;
  z-index: 10;
  margin: 0;
`;

export function AccountBox(props) {
  const [active, setActive] = useState('signin');

  const switchToSignup = () => {
    setTimeout(() => {
      setActive('signup');
    }, 400);
  };

  const switchToSignin = () => {
    setTimeout(() => {
      setActive('signin');
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <HeaderContainer>
          <div>
            <img src={img1} alt='' width='30%' class='right' />
          </div>
          <HeaderText>Welcome</HeaderText>
          <SmallText>Please sign-in to continue!</SmallText>
        </HeaderContainer>
        {active === 'signin' && <LoginForm />}
        {active === 'signup' && <SignupForm />}
      </BoxContainer>
    </AccountContext.Provider>
  );
}
