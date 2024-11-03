import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Timer = () => {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const [timeRemaining, setTimeRemaining] = useState(workTime);
  const [isWorking, setWorking] = useState(true);
  const [isRunning, setRunning] = useState(false);

  const [time, setTime] = useState(0);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setWorking((prev) => !prev);
      setTimeRemaining(isWorking ? breakTime : workTime);
    }

    return () => clearInterval(timer);
  }, [timeRemaining, isRunning, isWorking]);

  const handleStartPause = () => {
    setRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeRemaining(workTime);
    setRunning(false);
  };

  const handleKeyDown = () => {
    setTimeRemaining(time);
    setRunning(false);
    clearInput();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  const handleChange = (value: string) => {
    setTime(Number(value) * 60);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>{isWorking ? "Work Time" : "Break Time"}</Text>
        <Text style={styles.timeText}>
          {Math.floor(timeRemaining / 60).toString().padStart(2, "0")}:
          {(timeRemaining % 60).toString().padStart(2, "0")}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleStartPause}
            title={isRunning ? "Pause" : "Start"}
            color="#841584"
          />
          <Button onPress={handleReset} title="Reset" color="#841584" />
        </View>

        <View>
          <Text style={styles.baseText}>Enter a custom Time (minutes):</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleChange}
            onSubmitEditing={handleKeyDown}
            placeholder="Enter minutes"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontFamily: "Cochin",
    fontSize: 16,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 48,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    width: "60%",
    textAlign: "center",
    borderRadius: 5,
  },
});

export default Timer;
