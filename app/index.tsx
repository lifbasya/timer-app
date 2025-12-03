import CircleTimer from "@/components/CircleTimer";
import {
  Bookmark,
  EllipsisVertical,
  Hourglass,
  Pause,
  Play,
  StepForward,
  Timer,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Definisikan tipe untuk mode yang aktif
type TimerMode = "stopwatch" | "countdown";

export default function Index() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // Tambahkan state untuk mode timer, defaultnya adalah "stopwatch"
  const [mode, setMode] = useState<TimerMode>("stopwatch");

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

  // Fungsi untuk mengganti mode
  const handleModeChange = (newMode: TimerMode) => {
    // Reset timer saat mode berganti (opsional, tapi disarankan untuk kejelasan)
    if (newMode !== mode) {
      handleCancel();
      setMode(newMode);
    }
  };

  const activeColor = "#F65558"; // Warna merah untuk indikator aktif
  const inactiveColor = "#000000"; // Warna untuk teks tidak aktif

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titlescontainer}>
            {/* Stopwatch Title */}
            <TouchableOpacity
              style={[
                styles.title,
                mode === "stopwatch" && styles.activeTitleContainer, // Style untuk border bawah
              ]}
              onPress={() => handleModeChange("stopwatch")}
            >
              <Timer
                size={21}
                color={mode === "stopwatch" ? activeColor : inactiveColor}
              />
              <Text
                style={[
                  styles.titletext,
                  {
                    color: mode === "stopwatch" ? activeColor : inactiveColor,
                  },
                ]}
              >
                Stopwatch
              </Text>
            </TouchableOpacity>

            {/* Countdown Title */}
            <TouchableOpacity
              style={[
                styles.title,
                mode === "countdown" && styles.activeTitleContainer, // Style untuk border bawah
              ]}
              onPress={() => handleModeChange("countdown")}
            >
              <Hourglass
                size={21}
                color={mode === "countdown" ? activeColor : inactiveColor}
              />
              <Text
                style={[
                  styles.titletext,
                  {
                    color: mode === "countdown" ? activeColor : inactiveColor,
                  },
                ]}
              >
                Countdown
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* Overlay agar menu tertutup saat klik luar */}
            {showMenu && (
              <TouchableOpacity
                style={StyleSheet.absoluteFillObject}
                onPress={() => setShowMenu(false)}
              />
            )}

            {/* OPTIONS */}
            <View style={styles.options}>
              <TouchableOpacity onPress={() => setShowMenu((prev) => !prev)}>
                <EllipsisVertical color="#5A585C" size={22} />
              </TouchableOpacity>

              {/* POPUP MENU */}
              {showMenu && (
                <View style={styles.dropdown}>
                  <TouchableOpacity style={styles.dropdownItem}>
                    <Bookmark color="#F65558" size={24} />
                    <Text style={styles.dropdownText}>Saved</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Hanya tampilkan CircleTimer jika mode adalah stopwatch */}
        {mode === "stopwatch" && (
          <CircleTimer hours={hours} minutes={minutes} seconds={sec} />
        )}

        {/* Tampilkan konten yang berbeda untuk Countdown jika diperlukan, contohnya di sini hanya menampilkan teks untuk membedakan */}
        {mode === "countdown" && (
          <View style={styles.countdownPlaceholder}>
            <Text style={{ fontSize: 24 }}>Countdown UI Here</Text>
          </View>
        )}

        {/* BUTTONS (Hanya untuk Stopwatch) */}
        {mode === "stopwatch" && (
          <>
            {!running && seconds === 0 && (
              <TouchableOpacity style={styles.buttonplay} onPress={handleStart}>
                <Play color={"white"} fill="white" />
              </TouchableOpacity>
            )}

            {running && (
              <View style={styles.activebutton}>
                <TouchableOpacity
                  style={styles.buttoncontainerpause}
                  onPress={handlePause}
                >
                  <Pause fill="#FFDDDE" color="#F65558" size={24} />
                </TouchableOpacity>
                <View style={{flexDirection: "row", gap: 6}}>
                  <TouchableOpacity
                    style={styles.buttoncontainercancel}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttoncancel}>Cancel</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#FFDDDE",
                      padding: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Bookmark color="#F65558" />
                  </View>
                </View>
              </View>
            )}

            {!running && seconds > 0 && (
              <View style={styles.activebutton}>
                <TouchableOpacity
                  style={styles.buttoncontainerpause}
                  onPress={handleStart}
                >
                  <StepForward fill="#FFDDDE" color="#F65558" size={24} />
                </TouchableOpacity>
                <View style={{flexDirection: "row", gap: 6}}>
                  <TouchableOpacity
                    style={styles.buttoncontainercancel}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttoncancel}>Cancel</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#FFDDDE",
                      padding: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Bookmark color="#F65558" />
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // Ubah marginBottom menjadi lebih kecil, karena kita menambahkan margin bottom di activeTitleContainer
    marginBottom: 80,
    justifyContent: "space-between",
    width: "82%",
  },
  titlescontainer: {
    flexDirection: "row",
    gap: 30,
  },
  options: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10, // Pastikan dropdown berada di atas elemen lain
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dropdownText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 5, // Tambahkan padding bawah untuk jarak dengan garis aktif
  },
  // Style baru untuk indikator aktif
  activeTitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#F65558",
  },
  titletext: {
    fontSize: 18,
    fontWeight: "500",
    // Hapus warna default di sini, gunakan inline style
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
    flexDirection: "column",
    width: "80%",
    gap: 6,
  },
  buttoncontainercancel: {
    backgroundColor: "#FFDDDE",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttoncontainerpause: {
    backgroundColor: "#F65558",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  buttoncancel: {
    color: "#F65558",
    fontSize: 16,
  },
  countdownPlaceholder: {},
});
