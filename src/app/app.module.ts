import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { IPFS, initIPFS } from './ipfs';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initIPFS,
    multi: true,
    deps: [IPFS]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
