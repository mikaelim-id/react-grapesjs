import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Editor} from './app';

ReactDOM.render(
    <React.StrictMode>
        <Editor>
            <div>Default editor contents here!</div>
        </Editor>
    </React.StrictMode>,
    document.getElementById('root'),
);
