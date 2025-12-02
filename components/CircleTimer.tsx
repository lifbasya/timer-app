import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
};

const CircleTimer = ({ hours, minutes, seconds }: Props) => {
  return (
    <View style={styles.container}>
      <Svg height="230" width="230">
        <Circle
          cx="115"
          cy="115"
          r="113"
          stroke="#ffb3b3"
          strokeWidth="3"
          fill="none"
        />
      </Svg>

      <View style={styles.timer}>
        <Text style={styles.time}>{String(hours).padStart(2, "0")}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.time}>{String(minutes).padStart(2, "0")}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={[styles.time, styles.seconds]}>{String(seconds).padStart(2, "0")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 270,
    height: 270,
    borderRadius: 135,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    marginBottom: 55,
  },
  timer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 32,
    fontWeight: "500",
    color: "#303030",
  },
  separator: {
    fontSize: 32,
    fontWeight: "600",
    color: "#303030",
    marginHorizontal: 6,
  },
  seconds: {
    color: "red",
  },
});

export default CircleTimer;
