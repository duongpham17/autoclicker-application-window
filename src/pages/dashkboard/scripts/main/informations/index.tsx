import { useContext, useEffect } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import validation from './validation';
import useForm from '@hooks/useForm';
import Input from '@components/inputs/Style1';
import Button from '@components/buttons/Style1';
import Flex from '@components/flex/Style1';
import Line from '@components/line/Style1';

const Informations = ({script}: {script: IScriptsApi}) => {

  const {onUpdateScript} = useContext(Context);

  const {values, setValues, onChange, onSubmit, validationErrors, loading, edited} = useForm(script, callback, validation);

  async function callback(){
    await onUpdateScript(values);
  };

  useEffect(() => {
    setValues(script);
  }, [script, setValues]);

  return (
    <form onSubmit={onSubmit}>

      <Flex>

        <Input 
          label1="Name of the script"
          name="name"
          error={validationErrors.name}
          value={values.name}
          onChange={onChange}
        />

        <Input 
          label1="Max Loop"
          type="number"
          name="max_loop"
          error={validationErrors.max_loop}
          value={values.max_loop}
          onChange={onChange}
        />

      </Flex>

      {edited && 
        <Button 
          label1="Update" 
          type="submit"
          color="primary" 
          loading={loading}
        />
      }

      <Line />

    </form>
  );

};

export default Informations;