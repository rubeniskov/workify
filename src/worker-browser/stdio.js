import { Duplex } from 'readable-stream';
import Stdin from './stdin';
import Stdout from './stdout';
import Stderr from './stderr';
import Ipc from './ipc';

export default class Stdio {
    constructor(){
        this.ipc = new Ipc();
        this.stdin = new Stdin();
        this.stdout = new Stdout();
        this.stderr = new Stderr();
    }
}
