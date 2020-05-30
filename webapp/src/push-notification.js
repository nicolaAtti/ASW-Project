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
        console.log('user token: ', token);

        messaging.onMessage(function(payload) {
            console.log("Message received. ", payload);
            // ...
        });

        return token;
    } catch (error) {
        console.error(error);
    }
}


