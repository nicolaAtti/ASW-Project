import * as firebase from "firebase";

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "4207914346"
    })
};

export const askForNotificationsPermission = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('token of user:', token);

        return token;
    } catch (error) {
        console.error(error);
    }
};
