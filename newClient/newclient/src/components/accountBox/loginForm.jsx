import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton
} from './common';
import { AccountContext } from './accountContext';
import { Auth } from './auth';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
      </FormContainer>
      <SubmitButton type='submit' onClick={Auth()}>
        Login
      </SubmitButton>
      <MutedLink href='#'>
        Don't have an account?{' '}
        <BoldLink href='#' onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
      <MutedLink href='#'>Forget your password?</MutedLink>
    </BoxContainer>
  );
}
