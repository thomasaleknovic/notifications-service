import { Content } from './../../src/applications/entities/content';
import {
  Notification,
  NotificationProps,
} from './../../src/applications/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova notificação!'),
    recipientId: 'recipient-1',
    ...override,
  });
}
