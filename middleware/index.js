import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export default applyMiddleware(
    thunk,
    logger
);