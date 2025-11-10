import styles from './Terminal.module.scss';
import { useContext, useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { Context } from '../Context';
import { IScriptsCommands } from '@redux/types/scripts';
import { generateid, secondsToMinutes } from '@utils';
import Cover from '@components/covers/Style1';
import Button from '@components/buttons/Style1';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2'
import Range from '@components/ranges/Style1';
import Colorblock from '@components/colorblock/Style1';
import Progress from '@components/progress/Style1';
import { MdKeyboardArrowRight, MdDone, MdOutlineClose, MdExitToApp } from 'react-icons/md';

type TScriptsCommandsWithTime = IScriptsCommands & {
  logTimestamp: number;
  at_loop: number,
  is_pixel_color: boolean,
};

function keyBy<T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  key: K
): Record<T[K], T> {
  return arr.reduce((acc, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {} as Record<T[K], T>);
};

const Terminal = () => {

  const {setIsTerminal, isTerminal, script} = useContext(Context);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [looped, setLooped] = useState<number>(1);
  const [logs, setLogs] = useState<TScriptsCommandsWithTime[] | []>([]);

  const onStart = useCallback(() => {
    setLogs([]);
    const robot = window.robot;
    if (!script || !script.commands.length) return;
    const commands = keyBy(script.commands, "seconds");
    const max_seconds = script.commands.slice(-1)[0].seconds;

    let timeoutId: ReturnType<typeof setTimeout>;
    let [second_counter, loop_counter] = [seconds, 1];

    if(second_counter > 0){
      const mapLogs: any = script.commands.filter(el => el.seconds < seconds).map(el => ({...el, logTimestamp: Date.now(), pixel_color: false, at_loop: 1}));
      setLogs(mapLogs);
    };

    const reset = () => {
      second_counter = 0; 
      loop_counter++; 
      setLooped((state) => state + 1); 
      setLogs([]); 
    };

    const update = (cmd: TScriptsCommandsWithTime) => {
      setLogs(state => [cmd, ...state]);
    };
    
    const handlers: Record<string, (cmd: IScriptsCommands) => void> = {
      mouseClick: (cmd) => robot.mouseClick(cmd.click as string),
      mouseToggle: (cmd) => robot.mouseToggle(cmd.toggle as string, cmd.click as string),
      moveMouse: (cmd) => robot.moveMouse(cmd.x as number, cmd.y as number),
      moveMouseSmooth: (cmd) => robot.moveMouseSmooth(cmd.x as number, cmd.y as number),
      dragMouse: (cmd) => robot.dragMouse(cmd.x as number, cmd.y as number), 
      keyTap: (cmd) => robot.keyTap(cmd.keyboard as string),
      keyToggle: (cmd) => robot.keyToggle(cmd.toggle as string, cmd.keyboard as string),
      typeString: (cmd) => robot.typeString(cmd.type as string),
      restart: (cmd) => reset(),
      getPixelColor: (cmd) => {
        const isPixelColor = cmd.pixel_color === `#${robot.getPixelColor(Number(cmd.pixel_x), Number(cmd.pixel_y))}`;
        const updatedCMD = { ...cmd, logTimestamp: Date.now(), at_loop: loop_counter, is_pixel_color: isPixelColor };
        update(updatedCMD);
        if(!isPixelColor) return;
        if(cmd.pixel_event === "mouseClick"){
          return robot.mouseClick(cmd.click as string);
        };
        if(cmd.pixel_event === "mouseToggle"){
          return robot.mouseToggle(cmd.toggle as string, cmd.click as string);
        };
        if(cmd.pixel_event === "moveMouse"){
          return robot.moveMouse(cmd.x as number, cmd.y as number);
        };
        if(cmd.pixel_event === "moveMouseSmooth" || cmd.pixel_event === "dragMouse"){
          return robot.moveMouseSmooth(cmd.x as number, cmd.y as number);
        };
        if(cmd.pixel_event === "dragMouse"){
          return robot.dragMouse(cmd.x as number, cmd.y as number);
        };
        if(cmd.pixel_event === "keyTap"){
          return robot.keyTap(cmd.keyboard as string);
        };
        if(cmd.pixel_event === "keyToggle"){
         return robot.keyToggle(cmd.toggle as string, cmd.keyboard as string);
        };
        if(cmd.pixel_event === "typeString"){
          return robot.typeString(cmd.type as string);
        };
        if(cmd.pixel_event === "restart"){
          return reset();
        };
      }
    };

    const loop = () => {
      
      const isMaxLoops = loop_counter >= script.max_loop;
      if (isMaxLoops) {
        return clearTimeout(timeoutId);
      };

      second_counter = Math.round((second_counter + 0.1) * 100) / 100;

      const isLoopedFinish = second_counter > max_seconds;
      if (isLoopedFinish) {
        reset();
      };

      const cmd = commands[second_counter] as TScriptsCommandsWithTime;
      if (cmd && typeof cmd.event === "string" && handlers[cmd.event]) {
        // For getPixelColor commands, logging (with is_pixel_color) is handled inside handler
        if (cmd.event === "getPixelColor") {
          handlers[cmd.event](cmd);
        } else {
          const updatedCMD = { ...cmd, logTimestamp: Date.now(), at_loop: loop_counter };
          if (cmd.delay_at_loop > 0 && loop_counter % cmd.delay_at_loop === 0) {
            update(updatedCMD);
          } else {
            update(updatedCMD);
            handlers[cmd.event](cmd);
          }
        }
      };

      setSeconds(second_counter);
      timeoutId = setTimeout(loop, 100);
      setIntervalId(timeoutId);
    };

    loop();
  }, [script, seconds]);

  const onReset = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setSeconds(0);
    setLooped(0);
  }, [intervalId]);

  const onStop = useCallback((): void => {
    onReset();
  }, [onReset]);

  const onExitTerminal = (): void => {
    setIsTerminal(false);
    onStop();
  };

  useEffect(() => {
    function handleSpacebar(event: any) {
      if (event.code === 'Space' || event.key === ' ' || event.key === 'Spacebar') {
        if(intervalId) return onStop();
        onStart();
      }
    };
    window.addEventListener('keydown', handleSpacebar);
    return () => {
      window.removeEventListener('keydown', handleSpacebar);
    };
  }, [intervalId, onStop, onStart]);

  const variables = useMemo(() => {
    if(!script || !script.commands.length) return {max: 0, minutes: 9};

    return {
      max: script?.commands.slice(-1)[0].seconds,
      minutes: secondsToMinutes(script?.commands.slice(-1)[0].seconds * script.max_loop)
    };
  }, [script]);

  return ( !isTerminal ? <div></div> :
    <Cover onClose={() => {}}>
      
      <div className={styles.container}>

        <div className={styles.header}>
          <FlexBetween>
            <Hover message="Space bar">{!intervalId ? <button onClick={onStart}>Start</button> : <button onClick={onStop}>Stop</button>}</Hover>
            <Hover message={`Looped / Max / ${variables.minutes}`}>{looped} / {script?.max_loop}</Hover>
            <Hover message={`Seconds / Max`}>{seconds.toFixed(2)} / {variables.max.toFixed(2)}</Hover>
          </FlexBetween>

          {script && logs.length < script.commands.length && (
            intervalId ?
            <div className={styles.progress}>
              <Progress value={seconds} max={script.commands[logs.length].seconds} />
              <FlexBetween>
                <Hover message={"Next Command"}>
                  {script.commands[logs.length].name.toUpperCase()} - {logs.length+1} / {script.commands.length}
                </Hover>
                <Hover message={"Seconds"}>
                  {script.commands[logs.length].seconds}
                </Hover>
              </FlexBetween>
            </div>
            :
            <Range type="range" min="0" step="0.1" max={variables.max} value={seconds} onChange={(e: any) => setSeconds(Number(e.target.value))} />
          )}
        </div>

        <div className={styles.logs}>
          {logs.map((el, index) => 
            <div key={generateid(2)} className={styles.element} style={{borderColor: el.color}}>
              <FlexBetween>
                <Flex>
                  <Hover message={"Cmd / Total"}>[ {logs.length - index}, {script?.commands.length || 0} ]</Hover>
                  <Hover message={"Name"}>{el.name.toUpperCase()}</Hover>
                </Flex>
                <Flex>
                  {el.delay_at_loop > 0 && <Hover message={`Delayed at x loop`}> <Flex> {el.delay_at_loop} {el.at_loop % el.delay_at_loop === 0 ? <MdDone className={styles.doneIcon}/> : <MdOutlineClose className={styles.closeIcon}/>}</Flex></Hover> } 
                  <Hover message={"Time"}>{new Date(el.logTimestamp).toISOString().substring(11, 19)}</Hover>
                </Flex>
              </FlexBetween>
              <Flex>
                  <Hover message={"Seconds"}>{el.seconds}<small>s</small></Hover> <MdKeyboardArrowRight/>
                  <Hover message={"Event"}>{el.event}</Hover> <MdKeyboardArrowRight/>
                  {el.event === "mouseClick" &&
                      <Fragment>
                          <Hover message={"Click"}>{el.click}</Hover>
                      </Fragment>
                  }
                  {el.event === "mouseToggle" &&
                      <Fragment>
                          <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                          <Hover message={"Click"}>{el.click}</Hover>
                      </Fragment>
                  }
                  {(el.event === "moveMouse" || el.event === "moveMouseSmooth" || el.event === "dragMouse") &&
                      <Fragment>
                          <Hover message={"Position"}>{`{ x: ${el.x}, y: ${el.y} }`}</Hover>
                      </Fragment>
                  }
                  {el.event === "keyTap" &&
                      <Fragment>
                          <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                      </Fragment>
                  }
                  {el.event === "keyToggle" &&
                      <Fragment>
                          <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                          <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                      </Fragment>
                  }
                  {el.event === "typeString" &&
                      <Fragment>
                          <Hover message={el.type || "sentence"}>{el.type?.slice(0, 9)}...</Hover>
                      </Fragment>
                  }
                  {el.event === "restart" &&
                      <Fragment>
                          <Hover message={"Script will restart"}>END LOOP</Hover>
                      </Fragment>
                  }
                  {el.event === "getPixelColor" &&
                    <Fragment>
                        <Hover message={el.pixel_color || ""}><Colorblock color={el.pixel_color}/></Hover><MdKeyboardArrowRight/>
                        <Hover message={"Pixel X Y Color"}>{`{ x: ${el.pixel_x}, y: ${el.pixel_y} }`} </Hover> <MdKeyboardArrowRight/>
                        <Hover message={"Did pixel x y color match?"}>{el.is_pixel_color ? <MdDone className={styles.doneIcon}/> : <MdOutlineClose className={styles.closeIcon}/>}</Hover> <MdKeyboardArrowRight/>
                        <Hover message={"Pixel Event"}>{el.pixel_event}</Hover> <MdKeyboardArrowRight/>
                        {el.pixel_event === "mouseClick" &&
                            <Fragment>
                                <Hover message={"Click"}>{el.click}s</Hover>
                            </Fragment>
                        }
                        {el.pixel_event === "mouseToggle" &&
                            <Fragment>
                                <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                <Hover message={"Click"}>{el.click}</Hover>
                            </Fragment>
                        }
                        {(el.pixel_event === "moveMouse" || el.pixel_event === "moveMouseSmooth" || el.pixel_event === "dragMouse") &&
                            <Fragment>
                                <Hover message={"Position"}>{`{ x: ${el.x}, y: ${el.y} }`}</Hover>
                            </Fragment>
                        }
                        {el.pixel_event === "keyTap" &&
                            <Fragment>
                                <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                            </Fragment>
                        }
                        {el.pixel_event === "keyToggle" &&
                            <Fragment>
                                <Hover message={"Toggle"}>{el.toggle}</Hover> <MdKeyboardArrowRight/>
                                <Hover message={"Keyboard"}>{el.keyboard}</Hover>
                            </Fragment>
                        }
                        {el.pixel_event === "typeString" &&
                            <Fragment>
                                <Hover message={el.type || "sentence"}>{el.type?.slice(0, 9)}...</Hover>
                            </Fragment>
                        }
                        {el.pixel_event === "restart" &&
                            <Fragment>
                                <Hover message={"Script will restart"}>END LOOP</Hover>
                            </Fragment>
                        }
                    </Fragment>
                  }
              </Flex>
            </div>
          )}
        </div>
          
        <div className={styles.exitBtn}>
          <Button onClick={onExitTerminal} label1={`EXIT [ ${script?.name} ]`} label2={<MdExitToApp/>} color="dark"/>
        </div>

      </div>
    </Cover>
  )
}

export default Terminal;