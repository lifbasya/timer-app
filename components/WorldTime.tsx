import { CircleMinus, EllipsisVertical, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LocationItem {
  city: string;
  country: string;
  time: string;
}

export default function WorldTime() {
  const [clock, setClock] = useState({
    hour: 0,
    minute: 0,
    suffix: "AM",
  });

  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // CLOCK
      let hour = now.getHours();
      const minute = now.getMinutes();
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;

      // DATE (dd/mm/yyyy)
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setDateString(`${day}/${month}/${year}`);

      setClock({
        hour,
        minute,
        suffix: ampm,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* BIG CLOCK */}
      <View style={styles.bigClockRow}>
        <Text style={styles.bigClockHour}>{clock.hour}</Text>
        <Text style={styles.bigClockSeparator}>:</Text>
        <Text style={styles.bigClockMinute}>
          {clock.minute < 10 ? `0${clock.minute}` : clock.minute}
        </Text>
        <Text style={styles.bigClockSuffix}> {clock.suffix}</Text>
      </View>

      {/* DATE UNDER CLOCK */}
      <Text style={styles.dateText}>{dateString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 80,
  },
  bigClockRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 6,
    marginTop: 10,
  },
  bigClockHour: {
    fontSize: 80,
    fontWeight: "700",
    color: "#000",
  },
  bigClockSeparator: {
    fontSize: 80,
    fontWeight: "700",
    color: "#000",
    marginHorizontal: 2,
  },
  bigClockMinute: {
    fontSize: 80,
    fontWeight: "700",
    color: "#F65558",
  },
  bigClockSuffix: {
    fontSize: 26,
    fontWeight: "500",
    color: "#000",
    marginLeft: 6,
    marginBottom: 6,
  },

  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6A6A6A",
    marginTop: 6,
  },
});
