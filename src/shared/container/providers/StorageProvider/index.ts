import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

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
