import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useRouter} from "expo-router";
import {HomeScreenStyles as styles} from "@/theme/HomeScreenStyles";
import {Input} from "@/components/Input";
import {CustomButton as Button} from "@/components/Button";

export default function HomeScreen() {

    const router = useRouter();
    const [nom, setNom] = useState("");

    const onChangeNom = (nom: string) => {
        setNom(nom);
    }

    const handleStartQuiz = () => {
        if (nom.trim()) {
            router.push({
                pathname: "/QuizzScreen",
                params: {userName: nom}
            });
        } else {
            alert("Veuillez entrer votre prénom avant de commencer.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur mon quizz.</Text>
            <Input
                inputMode="text"
                value={nom}
                placeholder="Entrez votre prénom"
                onChangeText={onChangeNom}
                accessibilityLabel="Champ pour entrer votre prénom"
            />
            <Button
                title="Commencer le Quiz"
                onPress={handleStartQuiz}
                disabled={!nom.trim()}
            />
        </View>
    );
}
