import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {ScoreScreenStyles as styles} from "@/theme/ScoreScreenStyles";
import {CustomButton as Button} from "@/components/Button";
import {ScoreDatabase} from "@/db";

export default function ScoreScreen() {
    const {userName, score, totalQuestions} = useLocalSearchParams();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(true);
    const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null);

    useEffect(() => {
        const saveScore = async () => {
            try {
                const db = new ScoreDatabase();

                const scoreData = {
                    userName: String(userName),
                    score: Number(score),
                    date: new Date().toISOString()
                };

                await db.addScore(scoreData);
                setSaveStatus("success");
            } catch (error) {
                console.error("Erreur lors de l'enregistrement du score:", error);
                setSaveStatus("error");
            } finally {
                setIsSaving(false);
            }
        };

        saveScore();
    }, []);

    const goToLeaderboard = () => {
        router.push('/LeaderboardScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Résultat final</Text>
            <Text style={styles.text}>Joueur: {userName}</Text>
            <Text style={styles.text}>
                Score: {score}/{totalQuestions}
            </Text>

            {isSaving ? (
                <View style={styles.statusContainer}>
                    <ActivityIndicator size="small" color="#0000ff"/>
                    <Text>Enregistrement du score...</Text>
                </View>
            ) : saveStatus === "success" ? (
                <Text style={styles.successText}>Score enregistré avec succès!</Text>
            ) : saveStatus === "error" ? (
                <Text style={styles.errorText}>Erreur lors de l'enregistrement du score</Text>
            ) : null}

            <View style={styles.buttonContainer}>
                <Button
                    title="Voir le classement"
                    onPress={goToLeaderboard}
                    disabled={isSaving}
                />
                <Button
                    title="Retourner à l'accueil"
                    onPress={() => router.push("/")}
                />
            </View>
        </View>
    );
}
