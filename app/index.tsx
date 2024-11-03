import { Text, View } from "react-native";
import Timer from "@/components/timer";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Timer />
    </View>
  );
}
