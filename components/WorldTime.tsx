import { CircleMinus, EllipsisVertical, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LocationItem {
  city: string;
  country: string;
  time: string;
}

export default function WorldTime() {
  const [locations, setLocations] = useState<LocationItem[]>([
    { city: "Jakarta", country: "Indonesia", time: "2:40" },
    { city: "Riyadh", country: "Saudi Arabia", time: "9:12" },
  ]);

  const [clock, setClock] = useState({
    hour: 0,
    minute: 0,
    suffix: "AM",
  });

  // Index dropdown menu yang terbuka
  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  // Update jam berjalan otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hour = now.getHours();
      const minute = now.getMinutes();
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour === 0 ? 12 : hour;

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

      <Text style={styles.sectionTitle}>Locations</Text>

      {/* OVERLAY UNTUK MENUTUP DROPDOWN */}
      {menuIndex !== null && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuIndex(null)}
          activeOpacity={1}
        />
      )}

      {/* LIST LOCATIONS */}
      <View style={styles.locationList}>
        {locations.map((loc, index) => (
          <View key={index} style={styles.locationCard}>
            {/* ROW WAKTU + ⋮ */}
            <View style={styles.cardHeader}>
              <Text style={styles.locationTime}>{loc.time}</Text>

              {/* TITIK TIGA */}
              <TouchableOpacity
                onPress={() => setMenuIndex(menuIndex === index ? null : index)}
              >
                <EllipsisVertical size={20} />
              </TouchableOpacity>
            </View>

            <Text style={styles.locationSubtitle}>
              {loc.city} • {loc.country}
            </Text>

            {/* DROPDOWN REMOVE */}
            {menuIndex === index && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  onPress={() => {
                    setLocations(locations.filter((_, i) => i !== index));
                    setMenuIndex(null);
                  }}
                  style={styles.dropdownContent}
                >
                  <CircleMinus size={18} color="#F65558" />
                  <Text style={styles.dropdownText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* ADD LOCATION BUTTON */}
      <TouchableOpacity style={styles.addButton}>
        <Plus size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  /* BIG CLOCK */
  bigClockRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 26,
    marginTop: 10,
  },
  bigClockHour: {
    fontSize: 70,
    fontWeight: "700",
    color: "#000",
  },
  bigClockSeparator: {
    fontSize: 70,
    fontWeight: "700",
    color: "#000",
    marginHorizontal: 2,
  },
  bigClockMinute: {
    fontSize: 70,
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

  sectionTitle: {
    width: "100%",
    fontSize: 18,
    marginBottom: 14,
    fontWeight: "400",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },

  locationList: {
    width: "100%",
    gap: 14,
  },
  locationCard: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: "#fb5d5dff",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 2,
  },

  /* HEADER CARD */
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  locationTime: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 14,
    color: "#555",
  },

  /* DROPDOWN */
  dropdown: {
    position: "absolute",
    top: 55,
    right: 18,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dropdownText: {
    fontSize: 15,
    color: "#797979",
    fontWeight: "400",
  },

  /* ADD BUTTON */
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
    width: 62,
    height: 62,
    backgroundColor: "#F65558",
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
});
