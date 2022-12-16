import { makeNotification } from './../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';

import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notifications';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should read a notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification();
    await notificationsRepository.create(notification);

    const readNotification = new ReadNotification(notificationsRepository);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not read a notification when it does not exist.', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
