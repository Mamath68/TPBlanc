import {Button, Text, View} from 'react-native';
import {useRouter} from "expo-router";
import {QuizzScreenStyles as styles} from "@/theme/QuizzScreenStyles";

export default function QuizzScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>QuizzScreen</Text>
            <Button title="Le Score" onPress={() => router.push("/ScoreScreen")}/>
        </View>
    );
}
