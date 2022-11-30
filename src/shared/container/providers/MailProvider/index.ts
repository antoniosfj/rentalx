import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { GmailMailProvider } from './implementations/GmailMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  gmail: container.resolve(GmailMailProvider),
};

const provider = process.env.MAIL_PROVIDER !== undefined
  ? (mailProvider as any)[process.env.MAIL_PROVIDER] : mailProvider.ethereal;

container.registerInstance<IMailProvider>(
  'MailProvider',
  provider,
  // Cause constructors doesnt support await,
  // we need to have "client" defined before we call "sendMail"
);
