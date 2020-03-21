import PushNotification from 'react-native-push-notification'

export default class NotifService {

  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification)

    this.lastId = 0
  }

  configure(onRegister, onNotification, gcm = '') {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: gcm,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /*
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
      requestPermissions: true
    })
  }

  notificationContent = {
    largeIcon: 'ic_launcher',
    /* iOS and Android properties */
    title: 'Remote Work',
    message: 'Found new jobs for you!'
  }

  localNotif() {
    this.lastId++,
    PushNotification.localNotification(this.notificationContent)
  }

  scheduleNotif(date) {
    this.lastId++
    PushNotification.localNotificationSchedule({
      date,
      notificationContent
    })
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk)
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId})
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications()
  }
}
