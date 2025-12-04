import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TimePickerProps = {
  onTimeSet: (totalSeconds: number) => void;
};

// Konstanta
const activeColor = "#F65558";
const inactiveColor = "#000000";

// Komponen angka dengan tombol +/-
const TimeUnit = ({ label, value, onValueChange }: { label: string; value: number; onValueChange: (newValue: number) => void }) => {
  const max = label === 'HH' ? 23 : 59;
  
  const increment = () => {
    const newValue = (value + 1) % (max + 1);
    onValueChange(newValue);
  };
  
  const decrement = () => {
    const newValue = (value - 1 + (max + 1)) % (max + 1);
    onValueChange(newValue);
  };

  return (
    <View style={unitStyles.container}>
      <TouchableOpacity onPress={increment} style={unitStyles.button}>
        <Text style={unitStyles.buttonText}>+</Text>
      </TouchableOpacity>
      
      <Text style={unitStyles.valueText}>{String(value).padStart(2, '0')}</Text>
      <Text style={unitStyles.labelText}>{label}</Text>

      <TouchableOpacity onPress={decrement} style={unitStyles.button}>
        <Text style={unitStyles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function TimePicker({ onTimeSet }: TimePickerProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSet = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onTimeSet(totalSeconds);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <TimeUnit label="HH" value={hours} onValueChange={setHours} />
        <Text style={styles.separator}>:</Text>
        <TimeUnit label="MM" value={minutes} onValueChange={setMinutes} />
        <Text style={styles.separator}>:</Text>
        <TimeUnit label="SS" value={seconds} onValueChange={setSeconds} />
      </View>

      <TouchableOpacity
        style={[styles.setButton, (hours + minutes + seconds) === 0 && styles.disabledButton]}
        onPress={handleSet}
        disabled={(hours + minutes + seconds) === 0}
      >
        <Text style={styles.setButtonText}>Set Time</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '100%',
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  separator: {
    fontSize: 50,
    fontWeight: "300",
    color: inactiveColor,
    marginHorizontal: 5,
  },
  setButton: {
    backgroundColor: activeColor,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#FFDDDE',
  },
  setButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

const unitStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 30,
    color: activeColor,
  },
  valueText: {
    fontSize: 60,
    fontWeight: '300',
    color: inactiveColor,
  },
  labelText: {
    fontSize: 16,
    color: activeColor,
    marginBottom: 10,
  },
});