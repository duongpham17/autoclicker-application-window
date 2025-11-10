import { Fragment, useContext } from 'react';
import { Context } from '../../Context';
import { useAppSelector } from '@redux/hooks/useRedux';
import { script_selected } from '@localstorage';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';

const Sidebar = () => {

  const {scripts, errors} = useAppSelector(state => state.scripts);

  const {onCreateScript, loading, setScript, script} = useContext(Context);

  const onSelect = (data: typeof script) => {
    if(!data) return;
    script_selected.set(data._id as string);
    setScript(data)
  };

  return (
    <Fragment>

      <Button 
        label1="Create" 
        onClick={onCreateScript} 
        color="light" 
        loading={loading} 
        margin
      />

      {errors.create && <Text message={errors.create} color="red" />}

      <Fragment>
        {scripts?.map((el) => 
          <Button 
            key={el._id} 
            label1={!el.name ? `new` : el.name.substring(0,12)} 
            onClick={() => onSelect(el)} 
            selected={script?._id === el._id} 
            margin
          />
        )}
      </Fragment>

    </Fragment>
  )
}

export default Sidebar