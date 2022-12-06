import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Store } from './index';

export class Stash extends Store {
  protected name: string;
  protected stash_perm: Perm;

  public constructor(api: Urbit, desk: string, name: string, store_perm: Perm, stash_perm: Perm) {
    super(api, desk, store_perm, true);
    this.name = name;
    this.stash_perm = stash_perm;

    this.initStash();
  }

  // %set-stash
  public async set(key: string, value: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'set-stash': { desk: this.desk, src: this.src, name: this.name, key: key, val: value } }
    });
  }

  // %remove-stash
  public async remove(key: string) {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'remove-stash': { desk: this.desk, src: this.src, name: this.name, key: key } }
    });
  }

  // %clear-stash
  public async clear() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'clear-stash': { desk: this.desk, src: this.src, name: this.name } }
    });
  }

  // %get-stash
  public async get(key: string) {
    await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.name}/${key}/json`,
    })
  }

  // %get-stash
  public async all() {
    await this.api.scry({
      app: 'tome-api',
      path: `/${this.desk}/${this.src}/store/${this.name}/json`,
    })
  }

  // %init-stash
  private async initStash() {
    await this.api.poke({
      app: 'tome-api',
      mark: 'tome-action',
      json: { 'init-stash': { desk: this.desk, src: this.src, name: this.name, perm: this.stash_perm } }
    });
  }
}