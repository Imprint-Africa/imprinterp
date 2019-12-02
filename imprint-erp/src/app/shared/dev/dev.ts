import * as io from 'socket.io-client';

// export const dev = {
//     connect: 'http://localhost:3000/',
//     connectToSocket: io('http://127.0.0.1:3000/')
// };

export const dev = {
    connect: 'http://18.185.62.101:4201/',
       connectToSocket: io('http://18.185.62.101:4201/', {
    secure: true,
    rejectUnauthorized: false,
})
};
