import { SafeAreaView, StyleSheet } from "react-native";
import AddTaskPage from "./src/pages/AddTaskPage";
import { SPACES } from "./src/constants/sizes";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AddTaskPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACES.SM,
    flexDirection: "column",
  },
});
