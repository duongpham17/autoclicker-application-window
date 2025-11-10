import { Fragment, useContext, useState } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { generateid } from '@utils';
import validation from './validation';
import useForm from '@hooks/useForm';
import Button from '@components/buttons/Style1';
import Line from '@components/line/Style1';
import Text from '@components/texts/Style1';
import Center from '@components/center/Style1';
import { MdArrowDownward } from "react-icons/md";
import {Constant, MouseClick, MouseToggle, MoveMouse, KeyTap, KeyToggle, TypeString, GetPixelColor} from './Logic';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {onUpdateScript} = useContext(Context);

    const [maxCmd, setMaxCmd] = useState(false);

    const initialState: IScriptsCommands = {
        name: generateid(1),
        seconds: 0,
        delay_at_loop: 0,
        color: "#191919",
        event: "mouseClick",
        click: "left",
        toggle: "down",
        keyboard: undefined,
        type: undefined,
        x: undefined,
        y: undefined,
        pixel_event: undefined,
        pixel_color: undefined,
        pixel_x: undefined,
        pixel_y: undefined
    };

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(initialState, callback, validation);

    async function callback(){
        if(script.commands.length >= 100) return setMaxCmd(true)
        const data = {...script};
        values.seconds = Number(values.seconds);
        values.delay_at_loop = Number(values.delay_at_loop);
        ["toggle", "keyboard", "type", "x", "y", "pixel_event", "pixel_x", "pixel_y"].forEach((key) => {
            if (!values[key as keyof IScriptsCommands]) delete values[key as keyof IScriptsCommands];
        });
        data.commands = [...data.commands, values];
        await onUpdateScript(data);
        onClear(initialState);
        setMaxCmd(false);
    };

    return (
        <form onSubmit={onSubmit}>

            {maxCmd && 
                <Fragment>
                    <Text message="Max 100 commands per script." color="red"/>
                    <Line />
                </Fragment>
            }

            <Constant onChange={onChange} values={values} onSetValue={onSetValue} />

            <Center padding="0.5rem"><MdArrowDownward/></Center>

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

                    <Center padding="0.5rem"><MdArrowDownward/></Center>

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

            { edited && <Button label1="Create" color='primary' type="submit" /> }
            
            <Line />

        </form>
    );
};

export default Commands