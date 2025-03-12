// Dans ScoreScreenStyles.ts, ajoutez ces styles
import {StyleSheet} from "react-native";

export const ScoreScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        gap: 10,
    },
    successText: {
        color: 'green',
        marginVertical: 15,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginVertical: 15,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 30,
        width: '100%',
        gap: 15,
    },
});
