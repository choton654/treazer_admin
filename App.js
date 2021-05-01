import React from "react";
import Rootnavigation from "./src/rootnavigation";
import { OrderContextProvider } from "./src/orderContext";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  console.log(serviceWorkerRegistration);
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
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log("Current interests:", interests))
    .catch((err) => {
      console.log(err);
    });
});
export default function App() {
  return (
    <OrderContextProvider>
      <Rootnavigation />
    </OrderContextProvider>
  );
}
