import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { io } from 'socket.io-client';

if (environment.production) {
  enableProdMode();
}

// const socket = io('http://localhost:3000');
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });
console.log('hit')

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
