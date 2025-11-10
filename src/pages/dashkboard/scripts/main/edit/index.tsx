import { Fragment, useContext } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import validation from './validation';
import useForm from '@hooks/useForm';
import Cover from '@components/covers/Style2';
import Button from '@components/buttons/Style1';
import Line from '@components/line/Style1';
import Form from '@components/forms/Style1';

import {Constant, MouseClick, MouseToggle, MoveMouse, KeyTap, KeyToggle, TypeString, GetPixelColor} from './Logic';

const EditCommand = ({script, edit}: {script: IScriptsApi, edit: IScriptsCommands}) => {

    const {setEdit, onUpdateScript} = useContext(Context);

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(edit, callback, validation);

    async function callback(){
        const data = {...script};
        values.seconds = Number(values.seconds);
        values.delay_at_loop = Number(values.delay_at_loop);
        if(!values.toggle) delete values.toggle;
        if(!values.keyboard) delete values.keyboard;
        if(!values.type) delete values.type;
        if(!values.x) delete values.x;
        if(!values.y) delete values.y;
        if(!values.pixel_event) delete values.pixel_event;
        if(!values.pixel_color) delete values.pixel_color;
        data.commands = data.commands.map(el => el._id === values._id ? values : el);
        await onUpdateScript(data);
        setEdit(null);
        onClear();
    };

    const onDelete = async () => {
        const data = {...script};
        data.commands = data.commands.filter(el => el._id !== values._id);
        await onUpdateScript(data);
        setEdit(null);
    };

    return (
        <Cover open={edit ? true : false} onClose={() => setEdit(null)}>

            <Form onSubmit={onSubmit}>
                <Button  
                    label1="delete"
                    color="dark"
                    warning
                    onClick={onDelete}
                />
                <Line />

                <Constant onChange={onChange} values={values} onSetValue={onSetValue} />
    
                { values.event === "mouseClick" &&
                    <MouseClick onChange={onChange} values={values} onSetValue={onSetValue} />
                }
    
                { values.event === "mouseToggle" &&
                    <MouseToggle onChange={onChange} values={values} onSetValue={onSetValue} />
                }
                
                { (values.event === "moveMouse" || values.event === "moveMouseSmooth" || values.event === "dragMouse") &&
                    <MoveMouse onChange={onChange} values={values} onSetValue={onSetValue} />
                }
    
                { values.event === "keyTap" &&
                    <KeyTap onChange={onChange} values={values} onSetValue={onSetValue} />
                }
    
                { values.event === "keyToggle" &&
                    <KeyToggle onChange={onChange} values={values} onSetValue={onSetValue} />
                }
    
                { values.event === "typeString" &&
                    <TypeString onChange={onChange} values={values} onSetValue={onSetValue} />
                }
    
                { values.event === "getPixelColor" &&
                    <Fragment>
                        <GetPixelColor onChange={onChange} values={values} onSetValue={onSetValue} />
    
                        { values.pixel_event === "mouseClick" &&
                            <MouseClick onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                        { values.pixel_event === "mouseToggle" &&
                            <MouseToggle onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                        { (values.pixel_event === "moveMouse" || values.pixel_event === "moveMouseSmooth" || values.pixel_event === "dragMouse") &&
                            <MoveMouse onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                        { values.pixel_event === "keyTap" &&
                            <KeyTap onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                        { values.pixel_event === "keyToggle" &&
                            <KeyToggle onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                        { values.pixel_event === "typeString" &&
                            <TypeString onChange={onChange} values={values} onSetValue={onSetValue} />
                        }
                    </Fragment>
                }

                {edited && 
                    <Button 
                        label1="Update"
                        color='primary'
                        type="submit"
                    />
                }

                <Line />
            </Form>
        </Cover>
    );
};

const Edit = ({script}: {script: IScriptsApi}) => {

    const {edit} = useContext(Context);

    if(!edit) return <div></div>

    return (
        <div>
            <EditCommand script={script} edit={edit} />
        </div>
    )
}

export default Edit