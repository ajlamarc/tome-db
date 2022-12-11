import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Store } from './index';

export class Tome {
  protected src: string;
  protected mars: boolean;  // whether or not we're on Urbit

  /**
 * Constructs a new Tome.
 *
 * @param api The optional Urbit connection to be used for requests.  If not
 * provided, Tome will attempt to use localStorage.
 * @param desk The desk to connect to.  Can specify a foreign desk to read/write
 * to other applications.
 */
  public constructor(public api?: Urbit, public desk?: string) {
    this.mars = typeof api !== 'undefined';
    if (this.mars) {
      this.api = api;
      this.src = api.desk;
      this.desk = desk ? desk : this.src;
    }
  }

  /**
 * Create a store for the current desk.  A store can hold many stashes,
 * and each stash holds many key-value pairs.
 * @param permissions  The global permissions for the store.  Defaults to
 * `{ read: 'our', write: 'our' }`
 */
  public store(permissions: Perm = { read: 'our', write: 'our' }): Store {
    if (this.mars === true) {
      return new Store(this.api, this.desk, permissions);
    } else {
      return new Store();
    }

  }
}