import { io } from 'socket.io-client';

const host = process.env.REACT_APP_SOCKET_SERVER;
const socket = io(host);

export default socket;
