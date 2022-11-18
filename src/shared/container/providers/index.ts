import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { NodeMailerMailProvider } from './MailProvider/implementations/NodeMailerMailProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerSingleton<IMailProvider>(
  'NodeMailerMailProvider',
  NodeMailerMailProvider,
);
