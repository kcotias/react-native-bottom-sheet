import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end"
  },
  background: {
    flex: 1,
    backgroundColor: "transparent"
  },
  container: {
    backgroundColor: "#F3F3F3",
    width: "100%",
    height: 0,
    overflow: "hidden",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  draggableContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  draggableIcon: {
    width: 40,
    height: 6,
    borderRadius: 3,
    margin: 10,
    marginBottom: 0
  }
});

export default styles;
