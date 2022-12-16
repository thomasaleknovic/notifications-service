import { UnreadNotification } from './unread-notification';
import { makeNotification } from './../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notifications';
import { ReadNotification } from './read-notification';

describe('Unread Notification', () => {
  it('should unread a notification.', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);

    const unreadNotification = new UnreadNotification(notificationsRepository);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not unread a notification when it does not exist.', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
