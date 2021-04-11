import React from "react/cjs/react.development";
import { request } from "../controllers/post";
import useAsync from "../helpers/process";
import { Text, View } from "react-native";

import { Button } from "react-native-paper";

function SendEmail({ id }) {
  const [sendProcess, setSendProcess] = useAsync();
  function send() {
    setSendProcess(async () => {
      await request(id);
    });
  }

  return (
    <View
      style={{
        position: "relative",
        width: "30%",
        marginLeft: "5%",
        marginBottom: "5%",
      }}
    >
      <Button
        style={{
          backgroundColor: "#2867B2",
          color: "#ffffff",
          width: 160,
          paddingTop: 8,
        }}
        onTouchStart={() => {
          if (
            sendProcess.status !== "end" &&
            sendProcess.status !== "process"
          ) {
            send();
          }
        }}
      >
        <Text style={{ fontFamily: "sans-serif", color: "#fff" }}>
          {sendProcess.status == "unitialized" && `Send Email`}
          {sendProcess.status == "process" && `Loading...`}
          {sendProcess.status == "end" && `Ready!`}
        </Text>
      </Button>
    </View>
  );
}

export default SendEmail;
