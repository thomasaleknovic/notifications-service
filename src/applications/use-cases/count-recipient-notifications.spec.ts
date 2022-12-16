import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from './../../../test/factories/notification-factory';

describe('Count Recipient Notification', () => {
  it('should count all notifications from a recipient.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const countRecipientNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
