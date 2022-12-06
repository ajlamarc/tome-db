import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Store } from './index';

export class Tome {
  protected src: string;  // the desk requests are coming from. always the desk of the JS app

  /**
 * Constructs a new Tome connection.
 *
 * @param api The Urbit connection to be used for requests.
 * @param desk The desk to connect to.  Can specify a foreign desk to read/write
 * to other applications.
 */
  public constructor(public api: Urbit, public desk: string = api.desk, _initialized: boolean = false) {
    this.api = api;
    this.desk = desk;
    this.src = api.desk;

    if (!_initialized) {
      this.initTome().then().catch((e) => { console.error(e) });
    }
  }

  /**
 * Create a store for the current desk.  A store can hold many stashes,
 * and each stash holds many key-value pairs.
 * @param permissions  The global permissions for the store.  Defaults to
 * `{ read: 'our', write: 'our' }`
 */
  public store(permissions: Perm = { read: 'our', write: 'our' }) {
    return new Store(this.api, this.desk, permissions);
  }

  // %init-tome
  private async initTome() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'init-tome': { desk: this.desk, src: this.src } }
    });
  }
}