importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCK08PeoVv-ii67bXbEq90PMlIVdhZtyDI",
    authDomain: "ads-training-2362b.firebaseapp.com",
    databaseURL: "https://ads-training-2362b.firebaseio.com",
    projectId: "ads-training-2362b",
    storageBucket: "ads-training-2362b.appspot.com",
    messagingSenderId: "4207914346",
    appId: "1:4207914346:web:48fa14670e11b3fd42c913"
});
const messaging = firebase.messaging();
