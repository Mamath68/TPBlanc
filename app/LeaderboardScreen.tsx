import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {ScoreDatabase} from '@/db';
import {CustomButton as Button} from '@/components/Button';

interface Score {
    id?: number;
    userName: string;
    score: number;
    date: string;
}

export default function LeaderboardScreen() {
    const router = useRouter();
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadScores = async () => {
            try {
                const db = new ScoreDatabase();
                const allScores = await db.getScores();
                setScores(allScores);
            } catch (error) {
                console.error("Erreur lors du chargement des scores:", error);
            } finally {
                setLoading(false);
            }
        };

        loadScores();
    }, []);

    const renderScoreItem = ({item, index}: { item: Score, index: number }) => {
        // Formater la date
        const date = new Date(item.date);
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        return (
            <View style={styles.scoreItem}>
                <Text style={styles.rank}>{index + 1}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <Text style={styles.score}>{item.score}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Classement</Text>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Chargement des scores...</Text>
                </View>
            ) : scores.length > 0 ? (
                <FlatList
                    data={scores}
                    renderItem={renderScoreItem}
                    keyExtractor={(item) => (item.id?.toString() || item.date)}
                    style={styles.list}
                />
            ) : (
                <Text style={styles.emptyText}>Aucun score enregistré</Text>
            )}

            <Button title="Retour" onPress={() => router.push("/")} style={styles.button}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
    },
    scoreItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    rank: {
        fontWeight: 'bold',
        width: 30,
        fontSize: 16,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 50,
        textAlign: 'right',
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    },
    button: {
        marginTop: 20,
    },
});
