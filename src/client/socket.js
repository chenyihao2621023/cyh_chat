import socketClient from 'socket.io-client';
import socketWrap from './util/socketWrap';

export default socketWrap(socketClient('http://47.93.30.123:9200'));
