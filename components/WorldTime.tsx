import { X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = "d38c6d9dd8624b3b9181ac1f5acb8b5e";
const BASE_URL = "https://api.ipgeolocation.io/timezone";

export default function WorldTime() {
  const [clock, setClock] = useState({ hour: 0, minute: 0 });
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [locations, setLocations] = useState<any[]>([]);
  const locationsRef = useRef<any[]>([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const formattedDate = `${today.getDate()} ${
    months[today.getMonth()]
  } ${today.getFullYear()}`;

  // MAIN CLOCK 24h
  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setClock({
        hour: now.getHours(),
        minute: now.getMinutes(),
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  // SEARCH CITY
  const performSearch = async () => {
    setErrorMsg("");
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `${BASE_URL}?apiKey=${API_KEY}&location=${encodeURIComponent(query)}`
      );
      const json = await res.json();

      if (!json.time_24) return setErrorMsg("City not found.");

      const city = json.geo?.city;
      if (!city) return setErrorMsg("Please enter a valid city name.");

      if (
        locationsRef.current.some(
          (l) => l.city.toLowerCase() === city.toLowerCase()
        )
      )
        return setErrorMsg("This city is already in the list.");

      const newItem = {
        id: `${city}-${Date.now()}`,
        city,
        country: json.geo?.country || "",
        time: json.time_24.slice(0, 5), // ⬅ remove seconds
        timezone: json.timezone,
      };

      const updated = [...locationsRef.current, newItem];
      locationsRef.current = updated;
      setLocations(updated);
      setQuery("");
    } catch {
      setErrorMsg("Network error.");
    }
  };

  // AUTO UPDATE EVERY 5 SEC
  useEffect(() => {
    const t = setInterval(async () => {
      if (!locationsRef.current.length) return;

      const updated = await Promise.all(
        locationsRef.current.map(async (loc) => {
          const data = await fetchWorldTime(loc.timezone);
          if (!data) return loc;

          const dt = new Date(data.datetime);
          const hh = dt.getHours().toString().padStart(2, "0");
          const mm = dt.getMinutes().toString().padStart(2, "0");

          return { ...loc, time: `${hh}:${mm}` }; // ⬅ no seconds
        })
      );

      locationsRef.current = updated;
      setLocations(updated);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <View style={styles.container}>
        {/* CLOCK */}
        <View style={styles.bigClockRow}>
          <Text style={styles.bigClockHour}>
            {clock.hour.toString().padStart(2, "0")}
          </Text>
          <Text style={styles.bigClockSeparator}>:</Text>
          <Text style={styles.bigClockMinute}>
            {clock.minute.toString().padStart(2, "0")}
          </Text>
        </View>

        <Text style={styles.dateText}>{formattedDate}</Text>

        {/* SEARCH INPUT */}
        <TextInput
          placeholder="Search for a city"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={performSearch}
          style={styles.searchInput}
        />

        {errorMsg !== "" && <Text style={styles.errorMsg}>{errorMsg}</Text>}

        {locations.length === 0 && (
          <Text style={styles.emptyText}>Search time from various cities</Text>
        )}

        <View style={{ width: "100%", marginTop: 30 }}>
          {locations.map((item) => (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  const updated = locationsRef.current.filter(
                    (x) => x.id !== item.id
                  );
                  locationsRef.current = updated;
                  setLocations(updated);
                }}
              >
                <X size={20} color="#000" />
              </TouchableOpacity>

              <Text style={styles.cardTime}>{item.time}</Text>
              <Text style={styles.cardCity}>
                {item.city}, {item.country}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

async function fetchWorldTime(tz: string) {
  try {
    const res = await fetch(
      `${BASE_URL}?apiKey=${API_KEY}&location=${encodeURIComponent(tz)}`
    );
    const json = await res.json();
    if (!json.time_24) return null;
    return { datetime: `${json.date} ${json.time_24}` };
  } catch {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -10,
    width: "100%",
    alignItems: "center",
  },

  dateText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },

  bigClockRow: { flexDirection: "row", alignItems: "flex-end" },
  bigClockHour: { fontSize: 80, fontWeight: "700" },
  bigClockSeparator: { fontSize: 80, fontWeight: "700" },
  bigClockMinute: { fontSize: 80, fontWeight: "700", color: "#F65558" },

  searchInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    fontSize: 17,
    marginTop: 50,
  },

  errorMsg: {
    width: "100%",
    marginTop: 8,
    color: "#000",
    fontSize: 15,
  },

  emptyText: {
    marginTop: 170,
    color: "#777",
    fontSize: 16,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 6,
    elevation: 3,
    marginBottom: 14,
  },

  removeBtn: { position: "absolute", right: 10, top: 10 },

  cardTime: { fontSize: 32 },
  cardCity: { marginTop: 6, fontSize: 16, color: "#555" },
});