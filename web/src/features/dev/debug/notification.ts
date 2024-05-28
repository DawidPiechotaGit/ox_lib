import { NotificationProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugCustomNotification = () => {
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Error',
        description: 'Notification description',
        type: 'error',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Warn',
        description: 'Notification description',
        type: 'warning',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        description: 'Notification description',
        type: 'success',
        icon: 'microchip',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Custom icon success',
        description: 'Notification description',
        type: 'inform',
        icon: 'microchip',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        // title: 'Custom icon success',
        description: 'You recieved keys to the vehicle to the to the',
        type: '',
        icon: 'microchip',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        // title: 'Custom icon success',
        description: 'Seatblet On',
        type: 'success',
        icon: 'microchip',
        duration: 200000,
      },
    },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        // title: 'Custom icon success',
        description: 'You are overweight, drop something',
        type: 'error',
        icon: 'microchip',
        duration: 200000,
        showDuration: false,
      },
    },
  ]);
};
