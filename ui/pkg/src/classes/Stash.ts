import Urbit from '@urbit/http-api';
import { StorePerm, StashPerm } from '../index';
import { Store } from './index';

export class Stash extends Store {
  protected stash: string;
  protected stash_perm: StashPerm;

  public constructor(api: Urbit, desk: string, stash: string, store_perm: StorePerm, stash_perm: StashPerm) {
    super(api, desk, store_perm, true);
    this.stash = stash;
    this.stash_perm = stash_perm;

    this.initStash();
  }

  // %set-stash
  public async set(key: string, value: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'set-stash': { desk: this.desk, src: this.src, stash: this.stash, key: key, val: value } }
    });
  }

  // %remove-stash
  public async remove(key: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'remove-stash': { desk: this.desk, src: this.src, stash: this.stash, key: key } }
    });
  }

  // %clear-stash
  public async clear() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'remove-stash': { desk: this.desk, src: this.src, stash: this.stash } }
    });
  }

  // %get-stash
  public async get(key: string) {
    await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.stash}/${key}/json`,
    })
  }

  // %get-stash
  public async all() {
    await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.stash}/json`,
    })
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