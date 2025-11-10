const { contextBridge } = require('electron');
const robotjs = require('@jitsi/robotjs');

contextBridge.exposeInMainWorld('robot', {
    mouseClick: robotjs.mouseClick,
    mouseToggle: robotjs.mouseToggle,
    moveMouse: robotjs.moveMouse,
    moveMouseSmooth: robotjs.moveMouseSmooth,
    dragMouse: robotjs.dragMouse,
    keyTap: robotjs.keyTap,
    keyToggle: robotjs.keyToggle,
    typeString: robotjs.typeString,
    getMousePos: robotjs.getMousePos,
    getPixelColor: robotjs.getPixelColor,
});