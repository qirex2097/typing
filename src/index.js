import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import QuestionProvider from './QuestionProvider';

ReactDOM.render(
    <QuestionProvider>
        <App />
    </QuestionProvider>,
    document.getElementById('root')
);