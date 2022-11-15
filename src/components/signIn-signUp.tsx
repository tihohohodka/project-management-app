import React from 'react';
import './signIn-signUp.css';

function SignInSignUp() {
  const [titletextSign, titletextSignChange] = React.useState('Sign Up');
  const [askSign, changeAskSign] = React.useState('Already registered?  ');
  const [hrefSignUp, hrefSignUpChange] = React.useState('Click here to go to Sign In tab');
  const [buttonSignBtn, buttonSignBtnChange] = React.useState('Register');
  const [autoComp, autoCompChange] =  React.useState('');
  // const [switchTabsSign, switchTabsSignChange] = React.useState(signTabToggle);

  function signTabToggle() {
    if(titletextSign === 'Sign In'){
      titletextSignChange('Sign Up');
      changeAskSign('Already registered?  ');
      hrefSignUpChange('Click here to go to Sign In tab');
      autoCompChange('new-password');
      buttonSignBtnChange('Register');
    } else {
      titletextSignChange('Sign In');
      changeAskSign('Not registered?  ');
      hrefSignUpChange('Click here to go to Sign Up page');
      autoCompChange('current-password');
      buttonSignBtnChange('Sign In');
    }
    return undefined;
  }

  return (
    <div className="modalsign">
      <h2>{titletextSign}</h2>
      <form>
        <div className="login">
          <label>Enter login: </label><input placeholder="Login" type="text" autoComplete="username"></input>
        </div>
        <div className="password">
          <label>Enter password: </label><input placeholder="Password" type="password" autoComplete={autoComp}></input>
        </div>
        <button>{buttonSignBtn}</button>
        <div className="go-sign-up-tab"><span>{askSign}</span><span className="href-sign-up" onClick={signTabToggle}>{hrefSignUp}</span></div>
      </form>

    </div>
  );
}

export default SignInSignUp;
