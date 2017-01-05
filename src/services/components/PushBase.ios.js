import { AppState,
    PushNotificationIOS} from 'react-native';

var RNNotifications = PushNotificationIOS;
var Notifications = {
    handler: RNNotifications,
    onRegister: false,
    onError: false,
    onNotification: false,
    onRemoteFetch: false,
    isLoaded: false,
    hasPoppedInitialNotification: false,

    isPermissionsRequestPending: false,

    permissions: {
        alert: true,
        badge: true,
        sound: true
    }
};
Notifications.callNative = function(name, params) {
    if ( typeof this.handler[name] === 'function' ) {
        if ( typeof params !== 'array' &&
            typeof params !== 'object' ) {
            params = [];
        }

        return this.handler[name](...params);
    } else {
        return null;
    }
};

/**
 * Configure local and remote notifications
 * @param {Object}		options
 * @param {function}	options.onRegister - Fired when the user registers for remote notifications.
 * @param {function}	options.onNotification - Fired when a remote notification is received.
 * @param {function} 	options.onError - None
 * @param {Object}		options.permissions - Permissions list
 * @param {Boolean}		options.requestPermissions - Check permissions when register
 */
Notifications.configure = function(options) {
    if ( typeof options.onRegister !== 'undefined' ) {
        this.onRegister = options.onRegister;
    }

    if ( typeof options.onError !== 'undefined' ) {
        this.onError = options.onError;
    }

    if ( typeof options.onNotification !== 'undefined' ) {
        this.onNotification = options.onNotification;
    }

    if ( typeof options.permissions !== 'undefined' ) {
        this.permissions = options.permissions;
    }

    if ( typeof options.senderID !== 'undefined' ) {
        this.senderID = options.senderID;
    }

    if ( typeof options.onRemoteFetch !== 'undefined' ) {
        this.onRemoteFetch = options.onRemoteFetch;
    }

    if ( this.isLoaded === false ) {
        this._onRegister = this._onRegister.bind(this);
        this._onNotification = this._onNotification.bind(this);
        this._onRemoteFetch = this._onRemoteFetch.bind(this);
        this.callNative( 'addEventListener', [ 'register', this._onRegister ] );
        this.callNative( 'addEventListener', [ 'notification', this._onNotification ] );
        this.callNative( 'addEventListener', [ 'localNotification', this._onNotification ] );

        this.isLoaded = true;
    }

    if ( this.hasPoppedInitialNotification === false &&
        ( options.popInitialNotification === undefined || options.popInitialNotification === true ) ) {
        this.popInitialNotification(function(firstNotification) {
            if ( firstNotification !== null ) {
                this._onNotification(firstNotification, true);
            }
        }.bind(this));
        this.hasPoppedInitialNotification = true;
    }

    if ( options.requestPermissions !== false ) {
        this._requestPermissions();
    }

};

/* Unregister */
Notifications.unregister = function() {
    this.callNative( 'removeEventListener', [ 'register', this._onRegister ] )
    this.callNative( 'removeEventListener', [ 'notification', this._onNotification ] )
    this.callNative( 'removeEventListener', [ 'localNotification', this._onNotification ] )
    this.isLoaded = false;
};

/**
 * Local Notifications
 * @param {Object}		details
 * @param {String}		details.message - The message displayed in the notification alert.
 * @param {String}		details.title  -  ANDROID ONLY: The title displayed in the notification alert.
 * @param {String}		details.ticker -  ANDROID ONLY: The ticker displayed in the status bar.
 * @param {Object}		details.userInfo -  iOS ONLY: The userInfo used in the notification alert.
 */
Notifications.localNotification = function(details) {
    if ( Platform.OS === 'ios' ) {
        // https://developer.apple.com/reference/uikit/uilocalnotification

        let soundName = details.soundName ? details.soundName : 'default'; // play sound (and vibrate) as default behaviour

        if (details.hasOwnProperty('playSound') && !details.playSound) {
            soundName = ''; // empty string results in no sound (and no vibration)
        }

        // for valid fields see: https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/IPhoneOSClientImp.html
        // alertTitle only valid for apple watch: https://developer.apple.com/library/ios/documentation/iPhone/Reference/UILocalNotification_Class/#//apple_ref/occ/instp/UILocalNotification/alertTitle

        this.handler.presentLocalNotification({
            alertTitle: details.title,
            alertBody: details.message,
            alertAction: details.alertAction,
            category: details.category,
            soundName: soundName,
            applicationIconBadgeNumber: details.number,
            userInfo: details.userInfo
        });
    } else {
        this.handler.presentLocalNotification(details);
    }
};

/**
 * Local Notifications Schedule
 * @param {Object}		details (same as localNotification)
 * @param {Date}		details.date - The date and time when the system should deliver the notification
 */
Notifications.localNotificationSchedule = function(details) {
    if ( Platform.OS === 'ios' ) {
        this.handler.scheduleLocalNotification({
            fireDate: details.date.toISOString(),
            alertBody: details.message,
            userInfo: details.userInfo
        });
    } else {
        details.fireDate = details.date.getTime();
        delete details.date;
        this.handler.scheduleLocalNotification(details);
    }
};

/* Internal Functions */
Notifications._onRegister = function(token) {
    if ( this.onRegister !== false ) {
        this.onRegister({
            token: token,
            os: Platform.OS
        });
    }
};

Notifications._onRemoteFetch = function(notificationData) {
    if ( this.onRemoteFetch !== false ) {
        this.onRemoteFetch(notificationData)
    }
}

Notifications._onNotification = function(data, isFromBackground = null) {
    if ( isFromBackground === null ) {
        isFromBackground = (
            data.foreground === false ||
            AppState.currentState === 'background'
        );
    }

    if ( this.onNotification !== false ) {
            this.onNotification({
                foreground: ! isFromBackground,
                userInteraction: isFromBackground,
                message: data.getMessage(),
                data: data.getData(),
                badge: data.getBadgeCount(),
                alert: data.getAlert(),
                sound: data.getSound()
            });

    }
};

/* onResultPermissionResult */
Notifications._onPermissionResult = function() {
    this.isPermissionsRequestPending = false;
};

// Prevent requestPermissions called twice if ios result is pending
Notifications._requestPermissions = function() {
    if ( Platform.OS === 'ios' ) {
        if ( this.isPermissionsRequestPending === false ) {
            this.isPermissionsRequestPending = true;
            return this.callNative( 'requestPermissions', [ this.permissions ])
                .then(this._onPermissionResult.bind(this))
                .catch(this._onPermissionResult.bind(this));
        }
    } else if ( typeof this.senderID !== 'undefined' ) {
        return this.callNative( 'requestPermissions', [ this.senderID ]);
    }
};

// Stock requestPermissions function
Notifications.requestPermissions = function() {
    if ( Platform.OS === 'ios' ) {
        return this.callNative( 'requestPermissions', [ this.permissions ]);
    } else if ( typeof this.senderID !== 'undefined' ) {
        return this.callNative( 'requestPermissions', [ this.senderID ]);
    }
};

/* Fallback functions */
Notifications.presentLocalNotification = function() {
    return this.callNative('presentLocalNotification', arguments);
};

Notifications.scheduleLocalNotification = function() {
    return this.callNative('scheduleLocalNotification', arguments);
};

Notifications.cancelLocalNotifications = function() {
    return this.callNative('cancelLocalNotifications', arguments);
};

Notifications.cancelAllLocalNotifications = function() {
    return this.callNative('cancelAllLocalNotifications', arguments);
};

//在主屏幕上为应用程序的图标设置标记数量
Notifications.setApplicationIconBadgeNumber = function() {
    return this.callNative('setApplicationIconBadgeNumber', arguments);
};
//在主屏幕上为应用程序的图标获取当前的标记数量
Notifications.getApplicationIconBadgeNumber = function() {
    return this.callNative('getApplicationIconBadgeNumber', arguments);
};

Notifications.popInitialNotification = function(handler) {
    this.callNative('getInitialNotification').then(function(result){
        handler(result);
    });
};

Notifications.abandonPermissions = function() {
    return this.callNative('abandonPermissions', arguments);
};

Notifications.checkPermissions = function() {
    return this.callNative('checkPermissions', arguments);
};

Notifications.registerNotificationActions = function() {
    return this.callNative('registerNotificationActions', arguments)
}

Notifications.clearAllNotifications = function() {
    // Only available for Android
    return this.callNative('clearAllNotifications', arguments)
}

const cancelNotifacation = () => {

}


module.exports =  {
    cancelNotifacation: cancelNotifacation
}

