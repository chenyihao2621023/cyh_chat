import socketClient from 'socket.io-client';
import socketWrap from './util/socketWrap';

console.log(process.env.NODE_ENV);
let url;
if (process.env.NODE_ENV = 'production') {
  url = 'http://47.93.30.123:9200'
}else {
  url = 'http://localhost:9200/'
}
export default socketWrap(socketClient('http://47.93.30.123:9200'));
