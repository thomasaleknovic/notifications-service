import { makeNotification } from './../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';

import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notifications';

describe('Cancel Notification', () => {
  it('should cancel a notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    const cancelNotification = new CancelNotification(notificationsRepository);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not cancel a notification when it does not exist.', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
