import {Module} from '@nestjs/common';
import {MailerController} from './mailer.controller';

@Module({
    imports: [],
    controllers: [MailerController],
    providers: [],
})
export class MailerModule {
}
