import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { SendForgotMailPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotMailPasswordMailController';

const passwordRoutes = Router();

const sendForgotMailPasswordMailController = new SendForgotMailPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendForgotMailPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
