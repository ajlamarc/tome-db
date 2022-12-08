import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Store } from './index';

export class Stash extends Store {
  protected stash: string;
  protected stash_perm: Perm;

  public constructor(api: Urbit, desk: string, stash: string, store_perm: Perm, stash_perm: Perm) {
    super(api, desk, store_perm, true);
    this.stash = stash;
    this.stash_perm = stash_perm;

    this.initStash();
  }

  // %set-stash
  public async set(key: string, value: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'store-action',
      json: { 'set-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key, val: value } }
    });
  }

  // %remove-stash
  public async remove(key: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'store-action',
      json: { 'remove-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key } }
    });
  }

  // %clear-stash
  public async clear() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'store-action',
      json: { 'clear-stash': { desk: this.desk, src: this.src, sta: this.stash } }
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
      mark: 'store-action',
      json: { 'init-stash': { desk: this.desk, src: this.src, sta: this.stash, perm: this.stash_perm } }
    });
  }
}