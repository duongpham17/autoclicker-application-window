import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Authentication from '@redux/actions/authentications';
import useForm from '@hooks/useForm';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Form from '@components/forms/Style1';
import Text from '@components/texts/Style1';

interface Validation {
  email?: string,
  password?: string,
  check_password?: string,
}

const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("email")){
        if(!values.email) {
          errors.email = "required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
          errors.email = "Invalid email address"
        }
    };
    if(check("password")){
      if(!values.password) {
        errors.password = "required";
      }
      else if(values.password.length < 8){
        errors.password = "Min 8 characters"
      }
    };
    return errors
};

const Signup = () => {
    
    const dispatch = useAppDispatch();

    const {errors} = useAppSelector(state => state.authentications);

    const initalState = { email: "", password: "", check_password: ""};

    const {values, onChange, onSubmit, loading, validationErrors} = useForm(initalState, callback, validation);

    async function callback(){
      const isPasswordCorrect = values.password === values.check_password;
      if(!isPasswordCorrect) return dispatch(Authentication.state_errors("signup", "Password does not match"));
      await dispatch(Authentication.signup(values));
    };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>


        <Input 
          label1="Email address" 
          label2={validationErrors.email}
          error={validationErrors.email} 
          placeholder="Enter your email address"
          name="email" 
          value={values.email} 
          onChange={onChange} 
        />

        <Input 
          label1="Password" 
          label2={validationErrors.password}
          error={validationErrors.password} 
          placeholder="Password" 
          name="password" 
          value={values.password} 
          onChange={onChange} 
        />

        <Input 
          label1="Check Password" 
          label2={validationErrors.check_password}
          error={validationErrors.check_password} 
          placeholder="Check Password" 
          name="check_password" 
          value={values.check_password} 
          onChange={onChange} 
        />

        {errors.signup && <><br/><Text message={errors.signup} color='red'/><br/></>}

        <Button 
          type="submit" 
          label1={"Create account"}
          loading={loading} 
          color="primary" 
        />

      </Form>
    </Fragment>
  )
}

export default Signup