import useCountdown from "@/app/hooks/useCountdown";
import CircleTimer from "@/components/CircleTimer"; // Sesuaikan path jika perlu
import TimePicker from "@/components/TimePicker"; // Komponen baru
import { Pause, Play, StepForward } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CountdownProps = {
  onRunningChange: (isRunning: boolean) => void;
  onHasValueChange: (hasValue: boolean) => void;
};

// Warna yang digunakan di Index.tsx
const activeColor = "#F65558";
const inactiveColor = "#000000";

export default function Countdown({
  onRunningChange,
  onHasValueChange,
}: CountdownProps) {
  // Gunakan custom hook untuk logika countdown
  const {
    seconds,
    hours,
    minutes,
    sec,
    running,
    setTotalSeconds,
    start,
    pause,
    cancel,
    isCompleted,
  } = useCountdown(0); // Mulai dari 0

  const [initialSeconds, setInitialSeconds] = useState(0);
  const [isTimePicking, setIsTimePicking] = useState(true); // Status untuk menampilkan TimePicker

  // Efek untuk mengganti ke TimePicker saat selesai
  useEffect(() => {
    if (isCompleted) {
      setIsTimePicking(true);
      // Opsional: berikan feedback seperti getar atau suara saat selesai
    }
  }, [isCompleted]);

  useEffect(() => {
    onRunningChange(running);
  }, [running]);

  useEffect(() => {
    onHasValueChange(seconds > 0);
  }, [seconds]);

  // Handle saat TimePicker selesai (ditekan OK)
  const handleTimeSet = (totalSeconds: number) => {
    setInitialSeconds(totalSeconds);
    setTotalSeconds(totalSeconds);
    setIsTimePicking(false);
  };

  // Handle untuk reset
  const handleCancel = () => {
    cancel();
    setInitialSeconds(0);
    setIsTimePicking(true);
  };

  // Tampilkan TimePicker jika belum diatur atau sudah selesai
  if (isTimePicking) {
    return <TimePicker onTimeSet={handleTimeSet} />;
  }

  // --- UI Countdown ---

  return (
    <View style={styles.container}>
      {/* Tampilan waktu */}
      <TouchableOpacity
        onPress={() => {
          if (!running) {
            // Hanya izinkan mengedit jika tidak berjalan
            setIsTimePicking(true);
          }
        }}
        disabled={running} // Disable saat berjalan
      >
        <CircleTimer hours={hours} minutes={minutes} seconds={sec} />
      </TouchableOpacity>

      {/* Kontrol Tombol */}
      {/* Play/Start Button */}
      {!running && initialSeconds > 0 && seconds === initialSeconds && (
        <TouchableOpacity style={styles.buttonPlay} onPress={start}>
          <Play color={"white"} fill="white" />
        </TouchableOpacity>
      )}

      {/* Pause/Cancel saat running */}
      {running && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buttonRunning} onPress={pause}>
            <Pause fill="#FFDDDE" color={activeColor} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancelContainer}
            onPress={handleCancel}
          >
            <Text style={styles.buttonCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Resume/Cancel setelah pause */}
      {!running && seconds > 0 && seconds < initialSeconds && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buttonRunning} onPress={start}>
            <StepForward fill="#FFDDDE" color={activeColor} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancelContainer}
            onPress={handleCancel}
          >
            <Text style={styles.buttonCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Komponen Pembantu untuk tombol preset
type PresetButtonProps = {
  duration: number; // Durasi dalam detik
  label: string;
  setTime: (time: number) => void;
  setTotalSeconds: (time: number) => void;
  setIsTimePicking: (isPicking: boolean) => void;
};

const PresetButton = ({
  duration,
  label,
  setTime,
  setTotalSeconds,
  setIsTimePicking,
}: PresetButtonProps) => {
  const handlePress = () => {
    setTime(duration);
    setTotalSeconds(duration);
    setIsTimePicking(false); // Langsung pindah ke mode countdown
  };

  return (
    <TouchableOpacity style={presetStyles.button} onPress={handlePress}>
      <Text style={presetStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const presetStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFDDDE",
  },
  text: {
    color: activeColor,
    fontSize: 14,
    fontWeight: "600",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  presetButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 40,
  },
  placeholder: {
    marginTop: 40,
  },
  buttonPlay: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: activeColor,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Agar di tengah
  },
  actionButtons: {
    flexDirection: "column",
    maxWidth: "80%", // Sesuaikan lebar
    gap: 8,
    width: "100%",
    display: "flex",
    // Agar tombol beraksi berada di bawah preset dan timer
  },
  buttonRunning: {
    backgroundColor: activeColor,
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    padding: 10,
  },
  buttonCancelContainer: {
    backgroundColor: "#FFDDDE",
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    padding: 10,
  },
  buttonCancel: {
    color: activeColor,
    fontSize: 16,
  },
});
