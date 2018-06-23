import * as socket from 'socket.io';

import * as http from 'http';
import { MessageDao } from './models/Message';
import { Police } from './Police';

export function setupSockets(server: http.Server) {
  const io = socket(server);
  io.origins('*:*');
  let numUsers = 0;
  let numViewers = 0;

  io.on('connection', (socket: SocketIO.Socket & { username?: string }) => {
    let addedUser = false;
    let addedViewer = false;
    let chatroom: any;
    socket.on('add viewer', ({ room }: { room: string }) => {
      if (addedViewer) {
        return;
      }
      // we store the username in the socket session for this client
      socket.join(room);
      addedViewer = true;
      chatroom = room;
      numViewers++;
      socket.emit('view chat', {
        numUsers: numUsers,
        numViewers: numViewers,
      });
      socket.broadcast.to(room).emit('viewer joined', {
        numUsers: numUsers,
        numViewers: numViewers,
      });
    });

    socket.on(
      'add user',
      ({ username, room }: { username: string; room: string }) => {
        if (Police.frisk(socket.handshake.address, 3)) {
          socket.emit('WARN', {
            text:
              'You are joining channels too fast. Wait a moment and try again.',
          });
          return;
        }

        if (addedUser) {
          return;
        }

        // we store the username in the socket session for this client
        socket.username = username;
        socket.join(room);
        numUsers++;
        addedUser = true;
        socket.emit('login', {
          numUsers: numUsers,
          username: username,
        });
        socket.broadcast.to(room).emit('user joined', {
          username: username,
          numUsers: numUsers,
        });
      }
    );

    // when the client emits 'new message', this listens and executes
    socket.on('new message', async function({ content, room }) {
      // we tell the client to execute 'new message'
      if (socket.username && content && room) {
        content = content.replace(/^\s*\n|^\s+$|\n\s*$/g, '');
        content = content.replace(/\n{3,}/g, '\n\n');
        if (!content) {
          return;
        }
        const score = content.length / 83 / 4;

        if (Police.frisk(socket.handshake.address, score)) {
          socket.emit('WARN', {
            text: 'You are sending too much text. Wait a moment and try again.',
          });
          return;
        }
        Police.frisk(socket.handshake.address, 1);

        await MessageDao.create({
          content,
          url: room,
          username: socket.username as string,
        });
        socket.broadcast.to(room).emit('new message', {
          username: socket.username,
          content,
        });
      }
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
      if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.to(chatroom).emit('user left', {
          username: socket.username,
          numUsers,
        });
      }

      if (addedViewer) {
        --numViewers;
        // echo globally that this client has left
        socket.broadcast.to(chatroom).emit('viewer left', {
          numViewers,
        });
      }
    });
  });
}
