import Urbit from '@urbit/http-api';
import { Perm } from '../index';
import { Store } from './index';

export class Stash extends Store {
  protected stash: string;
  protected stash_perm: Perm;

  public constructor(stash: string, api?: Urbit, desk?: string, store_perm?: Perm, stash_perm?: Perm) {
    typeof api === 'undefined' ? super() : super(api, desk, store_perm, true);
    this.stash = stash;
    if (this.mars) {
      this.stash_perm = stash_perm;
      this.initStash();
    }
  } 
  
  /**
  * Set a key-value pair in the stash.
  */
  public async set(key: string, value: string): Promise<void> {
    try {
      if ((key == null) || (value == null))  {
        throw "missing key or value parameter"
      };

      if (!(typeof key === 'string') || !(typeof value === 'string'))  {
        throw "key or value not a string"
      };
      
      if (!this.mars) {
        localStorage.setItem(`${this.stash}/${key}`, value);
      } else {
        await this.api.poke({
          app: 'tome-api',
          mark: 'stash-action',
          json: { 'set-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key, val: value } }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  /**
  * Remove a specific key-value pair from the stash.
  */
  public async remove(key: string): Promise<void> {
    try {
      if ((key == null))  {
        throw "missing key parameter"
      };

      if (!(typeof key === 'string'))  {
        throw "key not a string"
      };
      
      if (!this.mars) {
        localStorage.removeItem(`${this.stash}/${key}`);
      } else {
        await this.api.poke({
          app: 'tome-api',
          mark: 'stash-action',
          json: { 'remove-stash': { desk: this.desk, src: this.src, sta: this.stash, key: key } }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Discard all values in the stash.
  */
  public async clear(): Promise<void> {
    try {
      if (!this.mars) {
        localStorage.clear();
      } else {
        await this.api.poke({
          app: 'tome-api',
          mark: 'stash-action',
          json: { 'clear-stash': { desk: this.desk, src: this.src, sta: this.stash } }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
  * Retrieve the value associated with a specific key in the stash. //fix  this
  */
  public async get(key: string): Promise<string> {
    try {
      if ((key == null))  {
        throw "missing key parameter"
      };

      if (!(typeof key === 'string'))  {
        throw "key not a string"
      };
      try{
          if (!this.mars) {
            return localStorage.getItem(`${this.stash}/${key}`);
          } else {
            return await this.api.scry({
              app: 'tome-api',
              path: `/${this.desk}/${this.src}/store/${this.stash}/${key}/json`,
            }).then((value: string) => value);
          }
        }
      catch (error) {
        console.error("value not found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  /**
  * Get all key-value pairs in the stash.
  */
  public async all(): Promise<JSON> {
    try {
      if (!this.mars) {
        const len = localStorage.length;
        let jon: Object = {};
        for (let i = 0; i < len; i++) {
          const key = localStorage.key(i);
          if (key.startsWith(`${this.stash}/`)) {
            const startIndex = `${this.stash}/`.length;
            const keyName = key.substring(startIndex); // get key without prefix
            jon[keyName] = localStorage.getItem(key);
          }
        }
        return JSON.parse(JSON.stringify(jon));
      } else {
        return await this.api.scry({
          app: 'tome-api',
          path: `/${this.desk}/${this.src}/store/${this.stash}/json`,
        }).then((value: JSON) => value);
      }
    } catch (error) {
      console.error(error);
    }
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