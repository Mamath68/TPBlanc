import {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {QuizzScreenStyles as styles} from "@/theme/QuizzScreenStyles";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {CustomButton as Button} from "@/components/Button";

// Importez votre fichier JSON
/*
import magicQuizz from '@/assets/data/magic.json';
*/
import quizData from '@/assets/data/data.json';
import {useLocalSearchParams, useRouter} from "expo-router";

export default function QuizzScreen() {
    const {userName} = useLocalSearchParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const [score, setScore] = useState(0);

    const question = quizData[currentQuestion];
    const router = useRouter();
    const radioButtons: RadioButtonProps[] = question.answers.map(answer => ({
        id: answer.id.toString(),
        label: answer.label,
        value: answer.value
    }));

    const handleValidation = () => {
        // Vérifier si la réponse est correcte
        const isCorrect = selectedId === question.correctAnswer.toString();

        if (isCorrect) {
            setScore(score + 1);
            alert("Bonne réponse !");
        } else {
            alert("Mauvaise réponse!");
        }

        if (currentQuestion < quizData.length - 1) {
            // Question suivante
            setCurrentQuestion(currentQuestion + 1);
            setSelectedId(undefined);
        } else {
            // Calcul du score final
            const finalScore = isCorrect ? score + 1 : score;

            Alert.alert(
                "Quiz terminé !",
                `${userName}, votre score : ${finalScore}/${quizData.length}`,
                [
                    {
                        text: "Voir le score",
                        onPress: () => {
                            router.push({
                                pathname: "/ScoreScreen",
                                params: {
                                    userName: String(userName),
                                    score: String(finalScore),
                                    totalQuestions: String(quizData.length)
                                }
                            });
                        }
                    }
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Ajout du header avec numéro de question et score */}
            <View style={styles.header}>
                <View style={styles.questionCounter}>
                    <Text style={styles.headerText}>
                        Question {currentQuestion + 1}/{quizData.length}
                    </Text>
                </View>
                <View style={styles.scoreCounter}>
                    <Text style={styles.headerText}>
                        Score: {score} {score <= 1 ? 'point' : 'points'}
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>{question.question}</Text>
            <View style={styles.radioContainer}>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    containerStyle={styles.radioGroup}
                />
            </View>
            {selectedId && (
                <Text style={styles.selectedText}>
                    Vous avez sélectionné : {radioButtons.find(r => r.id === selectedId)?.label}
                </Text>
            )}
            <Button
                title="Valider"
                onPress={handleValidation}
                disabled={!selectedId}
                textStyle={{fontWeight: "bold"}}
            />
        </View>
    );
}
