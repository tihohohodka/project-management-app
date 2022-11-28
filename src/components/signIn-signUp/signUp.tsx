import React from 'react';
import { Link } from 'react-router-dom';
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  signUpRequest,
  useAppSelector,
  useAppDispatch,
} from '../../globalStore/globalStore';
import './signIn-signUp.css';



function SignUp() {
  const [nameInputVal, loginInputVal, passwordInputVal, lang] = useAppSelector((state) => [state.registrwindw.nameInputVal, state.registrwindw.loginInputVal, state.registrwindw.passwordInputVal, state.lang.lang])

  const dispatch = useAppDispatch();

  const [titleVal, titleChange] = React.useState('');
  const [nameInscriptionVal, nameInscriptionChange] = React.useState('');
  const [namePlaceholderVal, namePlaceholderChange] = React.useState('');
  const [loginInscriptionVal, loginInscriptionChange] = React.useState('');
  const [loginPlaceholderVal, loginPlaceholderChange] = React.useState('');
  const [passwordInscriptionVal, passowrdInscriptionChange] = React.useState('');
  const [passwordPlaceholderVal, passowrdPlaceholderChange] = React.useState('');
  const [signInscriptionButtonVal, signInscriptionButtonChange] = React.useState('');
  const [signInAskVal, signInAskChange] = React.useState('');
  const [buttonToSignInVal, buttonToSignInChange] = React.useState('');

  React.useEffect(() => {
    if(lang === "English"){
      titleChange('Sign Up');
      nameInscriptionChange('Enter name: ');
      namePlaceholderChange('Name');
      loginInscriptionChange('Enter login: ');
      loginPlaceholderChange('Login');
      passowrdInscriptionChange('Enter password: ');
      passowrdPlaceholderChange('Password');
      signInscriptionButtonChange('Sign Up');
      signInAskChange('Already registered?  ');
      buttonToSignInChange('Click here to go to Sign In page');
    } else {
      titleChange('Зарегестрироваться');
      nameInscriptionChange('');
      nameInscriptionChange('Введите имя: ');
      namePlaceholderChange('Имя');
      loginInscriptionChange('Введите логин: ');
      loginPlaceholderChange('Логин');
      passowrdInscriptionChange('Введите пароль: ');
      passowrdPlaceholderChange('Пароль');
      signInscriptionButtonChange('Зарегестрироваться');
      signInAskChange('Уже зарегестрированы?   ');
      buttonToSignInChange('Нажмите сюда что бы перейти на старницу входа');
    }
  }, [lang])

  return (
    <div className="authpage">
      <div className="modalsign">
        <h2>{titleVal}</h2>
        <form>
          <div className="nameInp">
            <label>{nameInscriptionVal}</label><input placeholder={namePlaceholderVal} type="text" autoComplete="username" value={nameInputVal} onChange={(e) => dispatch(nameInputValChange(e.target.value))}></input>
          </div>
          <div className="loginInp">
            <label>{loginInscriptionVal}</label><input placeholder={loginPlaceholderVal} type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className="passwordInp">
            <label>{passwordInscriptionVal}</label><input placeholder={passwordPlaceholderVal} type="password" autoComplete="new-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <button onClick={signUpRequest as unknown as React.MouseEventHandler<HTMLButtonElement>}>{signInscriptionButtonVal}</button>
          <div className="go-sign-up-tab"><span>{signInAskVal}</span>
            <Link to="/SignIn">
              <span className="href-sign-up">{buttonToSignInVal}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignUp;
