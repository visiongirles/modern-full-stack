import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';
import { serverInfo } from './ServerInfo';
import * as IMAP from './IMAP';
import * as SMTP from './SMTP';
import * as Contracts from './Contracts';
import { IContact } from './Contracts';

const app: Express = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.use(function (
  inRequest: Request,
  inReponse: Response,
  inNext: NextFunction
) {
  inReponse.header('Access-Control-Allow-Origin', '*');
  inReponse.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  inReponse.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Conteent-Type,Accept'
  );
  inNext();
});

// GET a list of mailboxes
app.get('/mailboxes', async (inRequest: Request, inReponse: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
    inReponse.json(mailboxes);
  } catch (inError) {
    inReponse.send('error');
  }
});

// GET a list of messages of a specific mailbox
// ':mailbox' is a token
app.get(
  '/mailboxes/:mailbox',
  async (inRequest: Request, inReponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messages: IMAP.IMessage[] = await imapWorker.listMessages({
        mailbox: inRequest.params.mailbox,
      });
      inReponse.json(messages);
    } catch (inError) {
      inReponse.send('error');
    }
  }
);

// GET a message of a specific mailbox
// :'mailbox' and ':id 'are tokens
app.get(
  '/messages/:mailbox/:id',
  async (inRequest: Request, inReponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const messageBody: string = await imapWorker.getMessageBody({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      });
      inReponse.send(messageBody);
    } catch (inError) {
      inReponse.send('error');
    }
  }
);

// DELETE a message of a specific mailbox
// :'mailbox' and ':id 'are tokens
app.delete(
  '/messages/:mailbox/:id',
  async (inRequest: Request, inReponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      await imapWorker.deleteMessage({
        mailbox: inRequest.params.mailbox,
        id: parseInt(inRequest.params.id, 10),
      });
      inReponse.send('ok');
    } catch (inError) {
      inReponse.send('error');
    }
  }
);

// POST (SEND) a message to a specific mailbox
// :'mailbox' and ':id 'are tokens
app.post('/messages', async (inRequest: Request, inReponse: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(inRequest.body);
    inReponse.send('ok');
  } catch (inError) {
    inReponse.send('error');
  }
});

// GET a list of contacts
app.get('/contacts', async (inRequest: Request, inReponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    inReponse.json(contacts);
  } catch (inError) {
    inReponse.send('error');
  }
});

// POST (ADD) a contact to a list of contacts
// :'mailbox' and ':id 'are tokens
app.post('/contacts', async (inRequest: Request, inReponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(inRequest.body);
    inReponse.json(contact);
  } catch (inError) {
    inReponse.send('error');
  }
});

// DELETE a contact from a list of contacts
// ':id 'is a token
app.delete('/contacts/:id', async (inRequest: Request, inReponse: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    await contactsWorker.deleteContact(inRequest.params.id);
    inReponse.send('ok');
  } catch (inError) {
    inReponse.send('error');
  }
});
