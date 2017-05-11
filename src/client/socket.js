import socketClient from 'socket.io-client';
import socketWrap from './util/socketWrap';

console.log(process.env.NODE_ENV);
let url;
if (process.env.NODE_ENV === 'production') {
  console.log('1');
  url = 'http://47.93.30.123:9200'
}else {
  url = 'http://localhost:9200/'
}
console.log(url);
export default socketWrap(socketClient(url));
