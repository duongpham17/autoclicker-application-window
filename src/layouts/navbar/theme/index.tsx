import { useContext, Fragment } from 'react';
import { Context } from 'themes'; 
import Message from '@components/hover/Style1';

import { BsFillMoonFill } from 'react-icons/bs';
import { FaWater, FaCode } from 'react-icons/fa';
import { SiRetroarch } from "react-icons/si";

const Theme = () => {

    const {onSetTheme, theme} = useContext(Context);

    return (
        <Fragment>

            {theme.name === "night" &&
                <Message message='Dark'>
                    <button onClick={onSetTheme}><BsFillMoonFill/></button>
                </Message>
            }

            {theme.name === "matrix" &&
                <Message message='Matrix'>
                    <button onClick={onSetTheme}><FaCode/></button>
                </Message>
            }

            {theme.name === "ocean" &&
                <Message message='Ocean'>
                    <button onClick={onSetTheme}><FaWater/></button>
                </Message>
            }
            
            {theme.name === "retro" &&
                <Message message='Retro'>
                    <button onClick={onSetTheme}><SiRetroarch/></button>
                </Message>
            }
        </Fragment>
    )
}

export default Theme