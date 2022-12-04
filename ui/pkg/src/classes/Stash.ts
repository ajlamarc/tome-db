import Urbit from '@urbit/http-api';
import { StorePerm, StashPerm } from '../index';
import { Store } from './index';

export class Stash extends Store {
  protected stash: string;
  protected stash_perm: StashPerm;

  public constructor(api: Urbit, desk: string, stash: string, store_perm: StorePerm, stash_perm: StashPerm) {
    super(api, desk, store_perm);
    this.stash = stash;
    this.stash_perm = stash_perm;

    this.initStash();
  }

  // %init-stash
  private async initStash() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'init-stash': { desk: this.desk, src: this.src, stash: this.stash, perm: this.stash_perm } }
    });
  }
}