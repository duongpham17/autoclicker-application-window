export const commands = [
  {
    event: "Seconds",
    text: `Intervals or ticks are 0.1 second, make sure the seconds you set are incremntally greater than the previous. 
    Example if you set 1st command as 5s and 2nd command as 7 seconds, 1st will execute after 5s and 2nd will execute 2s after.
    Always ensure the commands are going from lowest seconds to highest seconds`
  },
  {
    event: "OverLapping Seconds",
    text: "This will break your script and it might cause weird events to happen in weird orders. So do not have repeating seconds"
  }
];

export const mouseEvents = [
  {
    event: "mouseClick",
    text: "Clicks the left, middle, or right mouse button."
  },
  {
    event: "mouseToggle",
    text: 'Toggles the mouse button state. Use "down" to hold down the left, middle, or right button, and "up" to release it.'
  },
  {
    event: "moveMouse",
    text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Use the mouse data at the bottom of the screen to determine the coordinates."
  },
  {
    event: "moveMouseSmooth",
    text: "Moves the mouse pointer smoothly across the screen to the specified coordinates."
  },
  {
    event: "dragMouse",
    text: 'Drags the mouse to the specified x and y coordinates. Must be used with mouseToggle "down" at the start and "up" after dragging is complete.'
  },
  {
    event: "getPixelColor",
    text: "Enter the x and y coordinates to read the screen color at that point. If the color matches, you can trigger additional mouse events."
  },
  {
    event: "keyTap",
    text: "Simulates tapping a single key on the keyboard."
  },
  {
    event: "keyToggle",
    text: 'Holds down a specific key ("down") or releases it ("up").'
  },
  {
    event: "typeString",
    text: "Types out a sentence or string of text."
  },
  {
    event: "restart",
    text: "Ends the current loop. Useful when used with a delay on a specific loop count."
  }
];

export const inputFields = [
  {
    field: "Name",
    description: "Helps you identify what each mouse event does. If left empty, a unique ID will be generated automatically."
  },
  {
    field: "Seconds",
    description: "Mouse events execute in 0.1s intervals. This value determines when the event will trigger. Avoid overlapping times—overlapping events may cause errors."
  },
  {
    field: "Delay",
    description: "Determines when events trigger within a loop, using the modulo operator (%) which returns the remainder after dividing one number by another. Example: If the loop is at 17 and delay is 5, 17 % 5 = 2 (no delay). If the loop is at 10 and delay is 5, 10 % 5 = 0 (the event triggers)."
  },
  {
    field: "Color",
    description: "Changes the border color for improved UI clarity."
  }
];