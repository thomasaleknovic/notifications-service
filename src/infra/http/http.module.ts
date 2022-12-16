import { UnreadNotification } from './../../applications/use-cases/unread-notification';
import { ReadNotification } from './../../applications/use-cases/read-notification';
import { GetRecipientNotifications } from './../../applications/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../applications/use-cases/count-recipient-notifications';
import { CancelNotification } from './../../applications/use-cases/cancel-notifications';
import { DatabaseModule } from './../database/database.module';
import { SendNotification } from '@applications/use-cases/send-notification';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
