import { Component, Inject, OnInit } from '@angular/core';
import { IPFS } from './ipfs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-root',
  template: `
<input #file placeholder="Some text to store in IPFS" />
<button (click)="set('hello.txt', file.value)">Set</button>
<button (click)="get(hash)">Get</button>
<p>{{ hash }}</p>
  `
})
export class AppComponent implements OnInit {
  public hash: string;

  constructor(@Inject(IPFS) private ipfs) {}

  async ngOnInit() {
    const version = await this.ipfs.version();
    console.log({version});
  }

  public async set(path: string, value: string) {
    const content = Buffer.from(value);
    const filesAdded = await this.ipfs.files.add({path, content});
    this.hash = filesAdded[0].hash;
  }

  public async get(hash: string) {
    const fileBuffer = await this.ipfs.files.cat(hash);
    console.log(fileBuffer.toString());
  }
}
