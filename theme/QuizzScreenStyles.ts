import {StyleSheet} from "react-native";

export const QuizzScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    questionCounter: {
        padding: 5,
    },
    scoreCounter: {
        padding: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    radioContainer: {
        width: "100%",
        alignItems: "center",
    },
    radioGroup: {
        width: "100%",
        alignItems: "stretch",
    },
    selectedText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "600",
    },

});
