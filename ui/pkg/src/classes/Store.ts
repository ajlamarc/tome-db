import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Tome, Stash } from './index';

export class Store extends Tome {
  protected perm: Perm;

  public constructor(api?: Urbit, desk?: string, perm?: Perm, _initialized: boolean = false) {
    typeof api === 'undefined' ? super() : super(api, desk);
    if (this.mars) {
      this.perm = perm;

      if (!_initialized) {
        this.initStore().then().catch((e) => { console.error(e) });
      }
    }
  }

  /**
  * Create a new stash (a named bucket for key-value pairs).
  * @param stash  The name of the stash to create.
  * @param permissions  The permissions for the stash.  Defaults to
  * `{ read: 'our', write: 'desk' }`
  */
  public create(stash: string, permissions: Perm = { read: 'our', write: 'desk' }): Stash {
    if (this.mars) {
      return new Stash(stash, this.api, this.desk, this.perm, permissions);
    } else {
      return new Stash(stash);
    }
  }

  private async initStore() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'init-store': { desk: this.desk, src: this.src, perm: this.perm } }
    });
  }
}