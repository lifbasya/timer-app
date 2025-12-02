import { useEffect, useState } from "react";
import CircleTimer from "@/components/CircleTimer";
import { Bookmark, ChevronDown, Play, Pause, X } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleCancel = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.titletext}>Stopwatch</Text>
          <ChevronDown color={"#F65558"} />
        </View>

        <CircleTimer hours={hours} minutes={minutes} seconds={sec} />

        {/* BUTTONS */}
        {!running && seconds === 0 && (
          /* PLAY saat awal */
          <TouchableOpacity style={styles.buttonplay} onPress={handleStart}>
            <Play color={"white"} fill="white" />
          </TouchableOpacity>
        )}

        {running && (
          /* PAUSE + CANCEL saat timer berjalan */
          <View style={styles.activebutton}>
            <TouchableOpacity style={styles.buttoncontainercancel} onPress={handleCancel}>
              <Text style={styles.buttoncancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttoncontainerpause} onPress={handlePause}>
              <Text style={styles.buttonpause}>Pause</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FFDDDE", padding: 10, borderRadius: 8 }}>
              <Bookmark color="#F65558" />
            </View>
          </View>
        )}

        {!running && seconds > 0 && (
          /* PLAY + CANCEL saat timer berhenti */
          <View style={styles.activebutton}>
            <TouchableOpacity style={styles.buttoncontainercancel} onPress={handleCancel}>
              <Text style={styles.buttoncancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttoncontainerpause} onPress={handleStart}>
              <Text style={styles.buttonpause}>continue</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FFDDDE", padding: 10, borderRadius: 8 }}>
              <Bookmark color="#F65558" />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 104,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 52,
  },
  titletext: {
    fontSize: 22,
    fontWeight: "500",
    color: "#F65558",
  },
  buttonplay: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F65558",
    alignItems: "center",
    justifyContent: "center",
  },
  activebutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    gap: 6,
  },
  buttoncontainer: {
    flexDirection: "row",
    width: 180,
    flex: 1,
    justifyContent: "space-between",
    gap: 6,
  },
  buttoncontainercancel: {
    backgroundColor: "#FFDDDE",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  buttoncontainerpause: {
    backgroundColor: "#F65558",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  buttoncancel: {
    color: "#F65558",
    fontSize: 16,
  },
  buttonpause: {
    color: "#FFDDDE",
    fontSize: 16,
  },
});
