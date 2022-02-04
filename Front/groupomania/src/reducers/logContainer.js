import { connect } from 'react-redux'
import SignUpForm from '../components/log/SignUpForm'
import SignInForm from '../components/log/SignInForm'
import { changeIndex, decrement } from '../actions/log.action';

const mapStateToProps = (state) => {
   //console.log(state)
   return {
      counter: state
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      increment: () => {dispatch(changeIndex())},
      decrement: ()=>{dispatch(decrement())},
   };
};

const mySpecialContainerCreator = connect(mapStateToProps, mapDispatchToProps);

export const SignIn = mySpecialContainerCreator(SignInForm);
export const SignUp = mySpecialContainerCreator(SignUpForm);