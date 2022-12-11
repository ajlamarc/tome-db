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

  /**
  * Set a key-value pair in the stash.
  */
  public async set(key: string, value: string): Promise<void> {
    await this.api.poke({
      app: 'tome-api',
      mark: 'stash-action',
      json: { 'set-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key, val: value } }
    });
  }

  /**
  * Remove a specific key-value pair from the stash.
  */
  public async remove(key: string): Promise<void> {
    await this.api.poke({
      app: 'tome-api',
      mark: 'stash-action',
      json: { 'remove-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key } }
    });
  }

  /**
  * Discard all values in the stash.
  */
  public async clear(): Promise<void> {
    await this.api.poke({
      app: 'tome-api',
      mark: 'stash-action',
      json: { 'clear-stash': { desk: this.desk, src: this.src, sta: this.stash } }
    });
  }

  /**
  * Retrieve the value associated with a specific key in the stash.
  */
  public async get(key: string): Promise<JSON> {
    return await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.stash}/${key}/json`,
    }).then((value: JSON) => value);
  }

  /**
  * Get all key-value pairs in the stash.
  */
  public async all(): Promise<JSON> {
    return await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.stash}/json`,
    }).then((value: JSON) => value);
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