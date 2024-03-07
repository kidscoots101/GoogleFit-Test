import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import GoogleFit, { Scopes } from "react-native-google-fit";

// 190081350637-v1de0hn4v1qieaqvd7l6eptgr8cm38q8.apps.googleusercontent.com
// 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

export default Homes = ({ route }) => {
  // const param = route.params.house;
  // const selectedHouse = param.house;

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setQuote(result.content);
        setAuthor(result.author);
      });
  };
  useEffect(() => {
    getQuote();
  }, []);
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  let [stepCount, updateStepCount] = useState(0);
  const calories = stepCount / 25;
  const caloriesB = calories.toFixed(1);

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ_WRITE,
    ],
  };
  GoogleFit.authorize(options)
    .then((authResult) => {
      if (authResult?.success) {
        console.log("AUTH_SUCCESS");
        getStepCounts();
      } else {
        console.log("AUTH_DENIED", authResult?.message);
      }
    })
    .catch((err) => {
      console.log("AUTH_ERROR", err);
    });

  const getStepCounts = async () => {
    try {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      const opt = {
        startDate: date.toISOString(), // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
      };
      console.log("🚀 ~ readData ~ opts:", opt);
      const res = await GoogleFit.getDailyStepCountSamples(opt);

      console.log("🚀 ~ readData ~ rees:", res);
      updateStepCount(res?.[2]?.steps[0].value || 0);
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
  }, [GoogleFit?.isAuthorized]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => updateStepCount((state) => state + 1),
  //     100
  //   );
  //   return () => clearInterval(interval);
  // }, []);


  let points = stepCount / 1000;
  let finalPoints = Math.floor(points);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFF", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{fontSize: 30}}>{stepCount}</Text>
    </SafeAreaView>
  );
};
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ACCBE1",
    // backgroundColor: '#CEE5F2',
    //or can try use this as background colour: #7C98B3 or #ACCBE1 or #B1B695
  },
  largeTitle: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "#EFF1F5",
    // this is the weird blue color background (change ltr pls)
  },
  subTitle: {
    color: "#C1CAD6",
    marginTop: 4,
  },
  insights: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  insightView: {
    width: (windowWidth - 50) / 2,
    height: 220,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 0,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowColor: "#171717",
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginHorizontal: 20,
  },
  dailyQuotes: {
    width: (windowWidth - 45) / 2,
    height: 190,
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 10,
    top: -260,
    shadowColor: "black",
    shadowColor: "#171717",
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },
  middle: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  white: {
    width: 100,
    height: 10,
    backgroundColor: "black",
  },
  top: {
    marginTop: -3,
  },
  quotes: {
    marginTop: 53,
    paddingHorizontal: 5,
  },
  quote: {
    fontSize: 26.7,
    fontWeight: "bold",
    color: "#473144",
    marginTop: -40,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor: "#EFECE5",
    marginHorizontal: 10,
    marginTop: 20,
    borderColor: "black",
    borderWidth: 7,
  },
  moreInsights: {
    paddingTop: 170,
    paddingHorizontal: 30,
  },
  Click: {
    color: "#B7B5B3",
    textDecorationLine: "underline",
  },
  paddin: {
    paddingHorizontal: 25,
    marginTop: -3,
  },
});

