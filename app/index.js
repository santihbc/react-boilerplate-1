'use strict';

import './styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import routes from './routes';

const mountNode = document.getElementById('root');

ReactDOM.render(<Router routes={routes} />, mountNode);
