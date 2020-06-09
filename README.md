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
Such file will be provided inside the same folder in the repository.

## Use on cloud
Alternately it's possible to find the application at the following url, hosted by Heroku: <br></br>

https://asw-frontend.herokuapp.com    <br></br>

Note: the app may load slowly the first time through this method, as Heroku needs to restart it's dynos from the idle state.

## Some recommendations

In order to use the application to the full extent it's advised to grant notification permission and send the PWA to the home screen.
