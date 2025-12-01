import { EllipsisVertical } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <EllipsisVertical />
        <Text>Welcome to Expo Router!</Text>
      </View>
    </SafeAreaView>
  );
}
