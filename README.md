# ASW-Project
# Using the PWA

## Use with docker

### Build the image
Open a terminal inside the webapp folder and build the image from the provided Dockerfile.

```
docker build -t ads-training-webapp .
```

### Execute the container
Once the build is successful run the container.
It's important to specify the environment file, otherwise the container won't be able to reach the deployed services
or utilize the firebase APIs.
```
docker run --env-file .env -it -p 8080:80 --rm --name ads-training-webapp ads-training-webapp
```
Such file must contain the following variables: 
```
VUE_APP_USERS_SERVICE=https://asw-users-service.herokuapp.com
VUE_APP_FITNESS_SERVICE=https://asw-fitness-service.herokuapp.com
VUE_APP_TRAININGS_SERVICE=https://asw-training-sessions-service.herokuapp.com
VUE_APP_NOTIFICATIONS_SERVICE=https://asw-notification-token-service.herokuapp.com

VUE_APP_FIREBASE_API_KEY=AIzaSyCK08PeoVv-ii67bXbEq90PM1IVdhZtyDI
VUE_APP_FIREBASE_AUTH_DOMAIN=ads-training-2362b.firebaseapp.com
VUE_APP_FIREBASE_DB_URL=https://ads-training-2362b.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=ads-training-2362b
VUE_APP_FIREBASE_STORAGE_BUCKET=ads-training-2362b.appspot.com
VUE_APP_FIREBASE_SENDER_ID=4207914346
VUE_APP_FIREBASE_APP_ID=1:4207914346:web:48fa14670e11b3fd42c913
```
## Use on cloud
Alternately it's possible to find the application at the following url, hosted by Heroku: <br></br>

https://asw-frontend.herokuapp.com    <br></br>

Note: the app may be slower during computations through this method, as Heroku needs to restart it's dynos if they are idle, as soon as a request has been made the performance should return to normal values.

## Some recommendations

In order to use the application to the full extent it's advised to grant notification permission and send the PWA to the home screen.
