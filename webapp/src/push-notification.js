import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyCK08PeoVv-ii67bXbEq90PMlIVdhZtyDI",
        authDomain: "ads-training-2362b.firebaseapp.com",
        databaseURL: "https://ads-training-2362b.firebaseio.com",
        projectId: "ads-training-2362b",
        storageBucket: "ads-training-2362b.appspot.com",
        messagingSenderId: "4207914346",
        appId: "1:4207914346:web:48fa14670e11b3fd42c913"
    });
}

export const askForPermissionToReceiveNotifications = async () => {
    try {

        const messaging = firebase.messaging();

        await messaging.requestPermission();
        const token = await messaging.getToken();
        sessionStorage.firebase_token = token;
        console.log(token);

        messaging.onMessage(function(payload) {
            console.log("Message received. ", payload);
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: payload.notification.icon,
            };

            if (!("Notification" in window)) {
                console.log("This browser does not support system notifications");
            }
            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification(notificationTitle,notificationOptions);
                notification.onclick = function(event) {
                    event.preventDefault(); // prevent the browser from focusing the Notification's tab
                    window.open(payload.notification.click_action , '_blank');
                    notification.close();
                }
            }
        });

        return token;
    } catch (error) {
        console.error(error);
    }
}


