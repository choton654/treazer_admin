import React from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import Main from "./src/Main";

window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  // console.log(serviceWorkerRegistration);
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: "36674458-c456-44a3-823b-616088fa88e1",
    serviceWorkerRegistration: serviceWorkerRegistration,
  });
  beamsClient
    .start()
    .then((beamsClient2) => beamsClient2.getDeviceId())
    .then((deviceId) =>
      console.log("Successfully registered with Beams. Device ID:", deviceId)
    )
    .then(() => beamsClient.addDeviceInterest("order"))
    .then(() => beamsClient.addDeviceInterest("admin"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log("Current interests:", interests))
    .catch((err) => {
      console.log(err);
    });
});
export default function App() {
  return (
    <Main />
  );
}
