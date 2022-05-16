import { NotificationManager } from 'react-notifications';

export default function CreateNotification({ type, title, message }) {

    switch (type) {
        case 'info':
            NotificationManager.info(`${message}`, `${title}`, 5000);
            break;
        case 'success':
            NotificationManager.success(`${message}`, `${title}`, 3000);
            break;
        case 'warning':
            NotificationManager.warning(`${message}`, `${title}`, 5000);
            break;
        case 'error':
            NotificationManager.error(`${message}`, `${title}`, 5000);
            break;
    }
}