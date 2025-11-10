import { ChangeEvent, Fragment } from 'react';
import { readFromClipboard } from '@utils';
import { IScriptsCommands } from '@redux/types/scripts';
import { RobotjsEvents, RobotjsPixelEvents } from '@electron/robotjs/types';
import Options1 from '@components/options/Style1';
import Options2 from '@components/options/Style2';
import Flex from '@components/flex/Style1';
import Input from '@components/inputs/Style1';
import { MdContentPaste } from 'react-icons/md';

interface Props {
    values: IScriptsCommands;
    onSetValue:  (v: Partial<IScriptsCommands>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
};

export const Constant = ({values, onSetValue, onChange}:Props) => {

    const onPaste = async () => {
        const value:any = await readFromClipboard();
        if(values.event === "getPixelColor") return onSetValue({pixel_x: value.x, pixel_y: value.y, pixel_color: `#${value.color}`});
        if(value.x || value.y) onSetValue({x: value.x, y: value.y, pixel_color: `#${value.color}`});
    };

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Name"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                />
                <Options2 
                    label1="Event"
                    label2={<button type="button" onClick={onPaste}><MdContentPaste/></button>} 
                    options={RobotjsEvents.map(el => ({name: el.robot, des: el.description}))} 
                    onClick={(name) => onSetValue({event: name, pixel_event: name==="getPixelColor"?"mouseClick":undefined})}
                    value={values.event} 
                />
            </Flex>
            <Flex>
                <Input  
                    label1="Seconds"
                    type="number"
                    name="seconds"
                    value={values.seconds || ""}
                    onChange={onChange}
                    step="0.1"
                    min={0}
                />
                <Input  
                    label1="Delay"
                    placeholder='At Loop'
                    type="number"
                    name="delay_at_loop"
                    value={values.delay_at_loop || ""}
                    onChange={onChange}
                    min={0}
                />
                <Input  
                    label1="Color"
                    type="color"
                    name="color"
                    value={values.color || ""}
                    onChange={onChange}                    
                />
            </Flex>
        </Fragment>
    )
}

export const MouseClick = ({values, onSetValue}: Props) => {
    return (
        <Fragment>
            <Options1
                label1="Click" 
                options={["left", "middle", "right"]} 
                onClick={(side: string) => onSetValue({click: side})}
            />
        </Fragment>
    );
};

export const MouseToggle = ({values, onSetValue}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Options1
                    label1="Toggle" 
                    options={["down", "up"]} 
                    onClick={(side) => onSetValue({toggle: side})}
                />
                <Options1
                    label1="Click" 
                    options={["left", "middle", "right"]} 
                    onClick={(side) => onSetValue({click: side})}
                />
            </Flex>
        </Fragment>
    );
};

export const MoveMouse = ({values, onChange}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="X"
                    type="number"
                    name="x"
                    value={values.x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Y"
                    type="number"
                    name="y"
                    value={values.y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
            </Flex>
        </Fragment>
    );
};

export const KeyTap = ({values, onChange}: Props) => {
    return (
        <Fragment>
            <Input  
                label1="Tap a keyboard key"
                name="keyboard"
                value={values.keyboard ? values.keyboard.slice(0, 1) : ""}
                onChange={onChange}
            />
        </Fragment>
    );
};

export const KeyToggle = ({values, onChange, onSetValue}: Props) => {
    return (
        <Fragment>
            <Flex>
                <Options1
                    label1="Toggle" 
                    options={["down", "up"]} 
                    onClick={(side) => onSetValue({toggle: side})}
                />
                <Input  
                    label1="Tap a keyboard key"
                    name="keyboard"
                    value={values.keyboard?.slice(0, 1) || ""}
                    onChange={onChange}
                />
            </Flex>
        </Fragment>
    );
};

export const TypeString = ({values, onChange}: Props) => {
    return (
        <Fragment>
            <Input  
                label1="Type your sentence"
                name="type"
                value={values.type || ""}
                onChange={onChange}
            />
        </Fragment>
    );
};

export const GetPixelColor = ({values, onChange, onSetValue}: Props) => {

    return (
        <Fragment>
            <Flex>
                <Input  
                    label1="Pixel X"
                    type="number"
                    name="pixel_x"
                    value={values.pixel_x || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Input  
                    label1="Pixel Y"
                    type="number"
                    name="pixel_y"
                    value={values.pixel_y || ""}
                    onChange={onChange}
                    min={0}
                    step="0.1"
                />
                <Options2 
                    label1="Is Color Event"
                    options={RobotjsPixelEvents.map(el => ({name: el.robot, des: el.description}))} 
                    onClick={(name) => onSetValue({pixel_event: name})}
                />
                <Input  
                    label1="Is Pixel Color"
                    type="color"
                    name="pixel_color"
                    value={values.pixel_color || ""}
                    onChange={onChange}
                />
            </Flex>
        </Fragment>
    )
}

    