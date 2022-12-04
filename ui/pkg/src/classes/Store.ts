import Urbit from '@urbit/http-api';
import { StorePerm, StashPerm } from '../index';
import { Tome, Stash } from './index';

export class Store extends Tome {
  protected perm: StorePerm;

  public constructor(api: Urbit, desk: string, perm: StorePerm, _initialized: boolean = false) {
    super(api, desk, true);
    this.perm = perm;

    if (!_initialized) {
      this.initStore().then().catch((e) => { console.error(e) });
    }
  }

  public create(stash: string, permissions: StashPerm = { read: 'unset', write: 'unset' }) {
    return new Stash(this.api, this.desk, stash, this.perm, permissions);
  }

  // %init-store
  private async initStore() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'init-store': { desk: this.desk, src: this.src, perm: this.perm } }
    });
  }
}