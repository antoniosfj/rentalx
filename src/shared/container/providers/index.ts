import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { NodeMailerMailProvider } from './MailProvider/implementations/NodeMailerMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  'NodeMailerMailProvider',
  new NodeMailerMailProvider(),
  // Cause constructors doesnt support await,
  // we need to have "client" defined before we call "sendMail"
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

const storage = process.env.disk !== undefined
  ? (diskStorage as any)[process.env.disk] : diskStorage.local;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage,
);
