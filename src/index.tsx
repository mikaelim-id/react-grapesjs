import React from 'react';
import ReactDOM from 'react-dom';
import {Editor} from './react-grapesjs';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Editor presetType={'webpage'}>
            <h1>Hello World Component!</h1>
        </Editor>
    </React.StrictMode>,
    document.getElementById('root'),
);
