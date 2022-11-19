import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotMailPasswordMailUseCase } from './SendForgotMailPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotMailPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotMailPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProviderInMemory,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '599426',
      email: 'huoda@zegoki.bb',
      name: 'Ada Bishop',
      password: '288582453',
    });

    await sendForgotPasswordMailUseCase.execute('huoda@zegoki.bb');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('blyat@zegoki.bb'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an user token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '599426',
      email: 'huoda@zegoki.bb',
      name: 'Ada Bishop',
      password: '288582453',
    });

    await sendForgotPasswordMailUseCase.execute('huoda@zegoki.bb');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
