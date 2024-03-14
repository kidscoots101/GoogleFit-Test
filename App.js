import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GoogleFit, { BucketUnit, Scopes } from "react-native-google-fit";

export default function App() {
  // states
  const [steps, setSteps] = useState(0);
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
    ],
  };
  GoogleFit.authorize(options)
    .then((authResult) => {
      console.log("🚀 ~ .then ~ authResult:", authResult);
      if (authResult.success) {
        console.log("🚀 ~ .then ~ AUTH_SUCCESS:");
        // Call getStepCounts initially
        getStepCounts();

        // Set interval to fetch steps every 5 seconds
        const intervalId = setInterval(getStepCounts, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      } else {
        console.log("🚀 ~ .then ~ AUTH_DENIED:");
      }
    })
    .catch((error) => {
      console.log("🚀 ~ Homes ~ error:", error);
      // dispatch("AUTH_ERROR");
    });
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const getStepCounts = async () => {
    try {
      const opt = {
        startDate: date.toISOString(), // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
      };
      console.log("🚀 ~ readData ~ opts:", opt);
      const res = await GoogleFit.getDailyStepCountSamples(opt);

      console.log("🚀 ~ readData ~ rees:", res);
      setSteps(res?.[2]?.steps[0].value || 0);
    } catch (error) {
      console.log("🚀 ~ readData ~ error:", error);
    }
  };

  useEffect(() => {
    if (GoogleFit?.isAuthorized) {
      getStepCounts();
      // const interval = setInterval(getStepCounts, 5000); // Call getStepCounts every 5 seconds
      // return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [GoogleFit]);

  return (
    <View style={styles.container}>
      <Text style={styles.stepCount}>Steps: {steps}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
