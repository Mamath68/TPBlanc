import {Button, Text, View} from 'react-native';
import {useRouter} from "expo-router";
import {HomeScreenStyles as styles} from "@/theme/HomeScreenStyles";

export default function HomeScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeScreen</Text>
            <Text>Hello World</Text>
            <Button title="Commencer le Quizz" onPress={() => router.push("/QuizzScreen")}/>
        </View>
    );
}
