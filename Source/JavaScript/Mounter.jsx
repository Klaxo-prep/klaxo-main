import "../SCSS/base.scss";

import React from 'react';
import { render } from 'react-dom';
import AppEntryPoint from "./AppEntryPoint";

render((
    <AppEntryPoint />
), document.querySelector('#app-mount'));