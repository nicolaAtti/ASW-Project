import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import org.apache.http.StatusLine;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;

import java.io.IOException;
import java.util.ArrayList;

public class Controller extends Application {
    @FXML private TextField timestamp;
    @FXML private TextField heartRate;
    @FXML private TextField steps;
    @FXML private TextField caloriesBurned;
    @FXML private TextField latitude;
    @FXML private TextField longitude;
    @FXML private TextField altitude;
    @FXML private TextField startTime;
    @FXML private TextField endTime;
    @FXML private TextField trainingSteps;
    @FXML private TextField trainingCaloriesBurned;
    @FXML private TextField kilometers;
    @FXML private TextField avgSpeed;
    @FXML private TextField maxSpeed;
    @FXML private TextField avgHeartRate;
    @FXML private TextField avgAltitude;
    private ArrayList<TextField> fitnessFields;
    private ArrayList<TextField> trainingFields;

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        primaryStage.setTitle("Hello World");
        primaryStage.setScene(new Scene(root, 390, 400));
        primaryStage.show();
    }

    public static void launchApplication(String[] args) {
        launch(args);
    }

    @FXML
    public void initialize() {
        fitnessFields = new ArrayList<>();
        fitnessFields.add(timestamp);
        fitnessFields.add(heartRate);
        fitnessFields.add(steps);
        fitnessFields.add(caloriesBurned);

        trainingFields = new ArrayList<>();
        trainingFields.add(startTime);
        trainingFields.add(endTime);
        trainingFields.add(trainingSteps);
        trainingFields.add(trainingCaloriesBurned);
        trainingFields.add(kilometers);
        trainingFields.add(avgSpeed);
        trainingFields.add(maxSpeed);
        trainingFields.add(avgHeartRate);
        trainingFields.add(avgAltitude);
    }

    @FXML
    private void sendFitnessData() {
        if(!timestamp.getText().isEmpty()) {
            JsonObject body = new JsonObject();
            fitnessFields.forEach(field -> {
                if(!field.getText().isEmpty()) {
                    body.addProperty(field.getId(), field.getText());
                }
            });
            if(!latitude.getText().isEmpty() && !longitude.getText().isEmpty() && !altitude.getText().isEmpty()) {
                JsonObject position = new JsonObject();
                position.addProperty(latitude.getId(), latitude.getText());
                position.addProperty(longitude.getId(), longitude.getText());
                position.addProperty(altitude.getId(), altitude.getText());
                body.add("position", position);
            }
            try {
                Response response = Request.Post("http://localhost:3001/users/" + "John" + "/fitness")
                        .addHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJpYXQiOjE1OTExMDc2NDB9.fzmCbGk603lcw4wJBfgoHDzuJ31C0Ng5BjpVlWxJQpA")
                        .bodyString(body.toString(), ContentType.APPLICATION_JSON)
                        .execute();
                StatusLine responseCode = response.returnResponse().getStatusLine();
                Alert alert;
                if(responseCode.getStatusCode() == 201) {
                    JsonObject responseContent = new Gson().fromJson(response.returnContent().asString(), JsonObject.class);
                    alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle("Information");
                    alert.setContentText(responseContent.get("message").getAsString());
                } else {
                    alert = new Alert(Alert.AlertType.ERROR);
                    alert.setTitle("Error");
                    alert.setContentText(responseCode.getReasonPhrase());
                }
                alert.setHeaderText(null);
                alert.showAndWait();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Error");
            alert.setHeaderText(null);
            alert.setContentText("Timestamp field cannot be empty!");
            alert.showAndWait();
        }
    }

    @FXML
    private void sendTrainingData() {
        if(!startTime.getText().isEmpty() && !endTime.getText().isEmpty()) {
            JsonObject body = new JsonObject();
            trainingFields.forEach(field -> {
                if(!field.getText().isEmpty()) {
                    body.addProperty(field.getId(), field.getText());
                }
            });
            try {
                Response response = Request.Post("http://localhost:3002/users/" + "John" + "/training_sessions")
                        .addHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJpYXQiOjE1OTExMDc2NDB9.fzmCbGk603lcw4wJBfgoHDzuJ31C0Ng5BjpVlWxJQpA")
                        .bodyString(body.toString(), ContentType.APPLICATION_JSON)
                        .execute();
                StatusLine responseCode = response.returnResponse().getStatusLine();
                Alert alert;
                if(responseCode.getStatusCode() == 201) {
                    JsonObject responseContent = new Gson().fromJson(response.returnContent().asString(), JsonObject.class);
                    alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle("Information");
                    alert.setContentText(responseContent.get("message").getAsString());
                } else {
                    alert = new Alert(Alert.AlertType.ERROR);
                    alert.setTitle("Error");
                    alert.setContentText(responseCode.getReasonPhrase());
                }
                alert.setHeaderText(null);
                alert.showAndWait();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Error");
            alert.setHeaderText("Empty field");
            alert.setContentText("Start time and End time fields cannot be empty!");
            alert.showAndWait();
        }
    }
}
