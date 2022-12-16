import { GetRecipientNotifications } from './get-recipient-notifications';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from './../../../test/factories/notification-factory';

describe('Get Recipient Notification', () => {
  it('should get all notifications from a recipient.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
