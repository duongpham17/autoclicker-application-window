import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Authentication from '@redux/actions/authentications';
import useForm from '@hooks/useForm';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';
import Form from '@components/forms/Style1';

interface Validation {
  email?: string,
  password?: string,
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
    }
    return errors
}

const Signin = () => {
    
    const dispatch = useAppDispatch();

    const {errors} = useAppSelector(state => state.authentications);

    const initalState = { email: "", password: ""};

    const {values, onChange, onSubmit, loading, validationErrors} = useForm(initalState, callback, validation);

    async function callback(){
      await dispatch(Authentication.login(values));
    };

    return (
    <Fragment>

          <Form onSubmit={onSubmit}>

            <Input 
              label1="Email address" 
              error={validationErrors.email} 
              placeholder="..." 
              name="email" 
              value={values.email} 
              onChange={onChange} 
            />

            <Input 
              label1="Password" 
              type="password"
              error={validationErrors.password} 
              placeholder="..." 
              name="password" 
              value={values.password} 
              onChange={onChange} 
            />
            
            {errors.login && <><br/><Text message={errors.login} color='red'/><br/></>}
                     
            <Button type="submit" label1={"Confirm"} loading={loading} color="primary" />
          </Form>
        
    </Fragment>
  )
}

export default Signin