import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { NodeMailerMailProvider } from './MailProvider/implementations/NodeMailerMailProvider';

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
