import React from 'react';
import ReactDOM from 'react-dom';
import {Editor} from './react-grapesjs';

ReactDOM.render(
    <React.StrictMode>
        <Editor>
            <div>Default editor contents here!</div>
        </Editor>
    </React.StrictMode>,
    document.getElementById('root'),
);
