import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';


@Injectable()
export class SocketService {
  constructor() {}

  public connect() {
    const socket = io('http://localhost:3000');
    socket.on("connect", () => {
      console.log('socket id: ', socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }
}
