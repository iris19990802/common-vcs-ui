import React from 'react';
import * as ReactDOM from 'react-dom';
import Progress from './progress.jsx';

const genContainer = () => {
    let contextContainerNode = document.getElementById('progress');

    if (!contextContainerNode) {
        const bodyNode = document.body;
        const div = document.createElement('div');
        div.id = 'progress';
        contextContainerNode = bodyNode.appendChild(div);
    }

    return contextContainerNode;
};

const container = genContainer();
const GRWA_PERCENT = 98.5;
let timer = null;
let percent = 10;
let showSpiner = false;

function startTimer() {
    const time = Math.random() * 600 + 20 * percent + 200;
    timer = setTimeout(() => {
        percent += (100 - percent) * (Math.random() * 0.1);
        if (percent > GRWA_PERCENT) {
            percent = GRWA_PERCENT;
        }
        ReactDOM.render(<Progress percent={percent} showSpiner={showSpiner} />, container);
        startTimer();
    }, time);
}

const start = (spiner = false) => {
    showSpiner = spiner;
    if (timer) {
        clearTimeout(timer);
    }

    ReactDOM.render(<Progress percent={percent} showSpiner />, container);
    startTimer();
};

const inc = () => {
    percent += 8;
    if (percent > GRWA_PERCENT) {
        percent = GRWA_PERCENT;
    }
    ReactDOM.render(<Progress percent={percent} showSpiner={showSpiner} />, container);
};

const set = (num) => {
    percent = num > GRWA_PERCENT ? GRWA_PERCENT : num;
    ReactDOM.render(<Progress percent={percent} showSpiner={showSpiner} />, container);
};

const done = () => {
    if (timer) {
        clearTimeout(timer);
    }
    percent = 10;
    ReactDOM.render(<Progress percent={100} showSpiner={showSpiner} />, container);
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(container);
    }, 300);
};

export default {
    start,
    done,
    set,
    inc
};
