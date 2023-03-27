import * as path from 'path';
import { isGeneratorFunction } from 'util/types';
const Datastore = require('nedb');

export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

export class Worker {
  private database: Nedb;
  constructor() {
    this.database = new Datastore({
      filename: path.join(__dirname, 'contacts.db'),
      autoliad: true,
    });
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((inResolve, inReject) => {
      this.database.find({}, (inError: Error, inDocs: IContact[]) => {
        if (inError) {
          inReject(inError);
        } else {
          inResolve(inDocs);
        }
      });
    });
  }

  public addContact(inContact: IContact): Promise<IContact> {
    return new Promise((inResolve, inReject) => {
      this.database.insert(
        inContact,
        (inError: Error | null, inNewDoc: IContact) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve(inNewDoc);
          }
        }
      );
    });
  }

  public deleteContact(inId: string): Promise<string | void> {
    return new Promise((inResolve, inReject) => {
      this.database.remove(
        { _id: inId },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            inReject(inError);
          } else {
            inResolve();
          }
        }
      );
    });
  }
}
