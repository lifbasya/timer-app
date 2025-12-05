import CircleTimer from "@/components/CircleTimer";
import CountdownTimer from "@/components/CountDown";
import WorldTime from "@/components/WorldTime";
import {
  Globe,
  Hourglass,
  Pause,
  Play,
  StepForward,
  Timer,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "@/components/SplashScreen";

// Tambahkan mode worldtime
type TimerMode = "stopwatch" | "countdown" | "worldtime";

export default function Index() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("stopwatch");
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (running && mode === "stopwatch") {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, mode]);

  useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Tampilkan selama 2000 ms (2 detik)
        return () => clearTimeout(timer);
    }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const handleStart = () => setRunning(true);
  const handlePause = () => setRunning(false);
  const handleCancel = () => {
    setRunning(false);
    setSeconds(0);
  };

  const handleModeChange = (newMode: TimerMode) => {
    if (newMode !== mode) {
      handleCancel();
      setMode(newMode);
    }
  };

  const activeColor = "#F65558";
  const inactiveColor = "#000000";

  if (isLoading) {
        return <SplashScreen />;
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* Stopwatch */}
          <TouchableOpacity
            style={[styles.menuTab, mode === "stopwatch" && styles.activeTab]}
            onPress={() => handleModeChange("stopwatch")}
          >
            <Timer
              size={22}
              color={mode === "stopwatch" ? activeColor : inactiveColor}
            />
            {mode === "stopwatch" && (
              <Text style={[styles.menuText, { color: activeColor }]}>
                Stopwatch
              </Text>
            )}
          </TouchableOpacity>

          {/* Countdown */}
          <TouchableOpacity
            style={[styles.menuTab, mode === "countdown" && styles.activeTab]}
            onPress={() => handleModeChange("countdown")}
          >
            <Hourglass
              size={22}
              color={mode === "countdown" ? activeColor : inactiveColor}
            />
            {mode === "countdown" && (
              <Text style={[styles.menuText, { color: activeColor }]}>
                Countdown
              </Text>
            )}
          </TouchableOpacity>

          {/* World Time */}
          <TouchableOpacity
            style={[styles.menuTab, mode === "worldtime" && styles.activeTab]}
            onPress={() => handleModeChange("worldtime")}
          >
            <Globe
              size={22}
              color={mode === "worldtime" ? activeColor : inactiveColor}
            />
            {mode === "worldtime" && (
              <Text style={[styles.menuText, { color: activeColor }]}>
                World Time
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* STOPWATCH UI */}
        {mode === "stopwatch" && (
          <CircleTimer hours={hours} minutes={minutes} seconds={sec} />
        )}

        {/* COUNTDOWN UI SEMENTARA */}
        {mode === "countdown" && <CountdownTimer />}

        {/* WORLD TIME UI SEMENTARA */}
        {mode === "worldtime" && (
          <WorldTime />
        )}

        {/* STOPWATCH BUTTONS */}
        {mode === "stopwatch" && (
          <>
            {!running && seconds === 0 && (
              <TouchableOpacity style={styles.buttonPlay} onPress={handleStart}>
                <Play color={"white"} fill="white" />
              </TouchableOpacity>
            )}

            {running && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.buttonRunning}
                  onPress={handlePause}
                >
                  <Pause fill="#FFDDDE" color="#F65558" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonCancelContainer}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {!running && seconds > 0 && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.buttonRunning}
                  onPress={handleStart}
                >
                  <StepForward fill="#FFDDDE" color="#F65558" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonCancelContainer}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonCancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fef8f8ff" },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  header: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  menuTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingBottom: 6,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#F65558",
  },
  menuText: {
    fontSize: 18,
    fontWeight: "500",
  },

  placeholder: {
    marginTop: 40,
  },

  buttonPlay: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F65558",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: {
    flexDirection: "column",
    width: "80%",
    gap: 8,
  },
  buttonRunning: {
    backgroundColor: "#F65558",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  buttonCancelContainer: {
    backgroundColor: "#FFDDDE",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  buttonCancel: {
    color: "#F65558",
    fontSize: 16,
  },
});
