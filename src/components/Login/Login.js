import React, { useReducer,useState,useEffect} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const emailReducer = (state,action) =>{
  if(action.type === 'USER_INPUT')
  {
    return{value:action.val, isValid: action.val.includes('@')};
  }
  if( action.type === 'INPUT_BLUR')
  {
    return {value:state.value ,isValid: state.value.includes('@')};
  }
  return{value:'',isValid:false};
};


const passwordReducer = (state,action) =>{
  if(action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR')
  {
    return{value:state.value, isValid:state.value.trim().length > 6}
  }
  return{value:'',isValid:false};
}
const collegeReducer = (state,action) =>{
  if(action.type === 'USER_INPUT')
  {
    return {value: action.val,isValid:action.val.trim().length > 1}
  }
  if(action.type === 'INPUT_BLUR')
  {
    return{value:state.value, isValid:state.value.trim().length > 1}
  }
  return{value:'',isValid:false};
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege,setEnteredCollege] = useState('');
  // const [collegeisValid,setcollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  

  const [emailState,dispatchEmail] = useReducer(emailReducer,{
    value :' ',
     isValid: null,
    });

    const [passwordState,dispatchPassword] = useReducer(passwordReducer,{
      value: ' ',
      isValid: null,
    })

    const [collegeState,dispatchCollege] = useReducer(collegeReducer,{
      value: ' ',
      isValid: null,
    })

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;
    const {isValid: collegeIsValid} = collegeState;

  useEffect(()=>{
   const identifier = setTimeout(()=>{
      console.log("Checking form validity");
      setFormIsValid(
        emailIsValid && passwordIsValid && collegeIsValid
      );
    },500)
    
    return ()=>{
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [emailIsValid,passwordIsValid,collegeIsValid]);
  
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT' , val: event.target.value})

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    // );
    
  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({type: 'USER_INPUT',val:event.target.value})
    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6 && collegeState.value
    )
    
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
   dispatchPassword({type: 'INPUT_BLUR'})
  };
  const validCollegeHandler  =()=>{
    dispatchCollege({type: 'INPUT_BLUR'})
  }
const collegeChangeHandler = (event)=>{
  dispatchCollege({type: 'USER_INPUT',val:event.target.value})
  setFormIsValid(
    emailState.value.includes('@') && passwordState.value && event.target.value.trim().length > 1
  )

}
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${
          collegeState.isValid === false ? classes.invalid : ''
        }`}>
        <label htmlFor="email">College</label>
        <input 
        type="text"
        id="college"
        value={collegeState.value}
        onChange={collegeChangeHandler}
        onBlur={validCollegeHandler}
        />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
