import {SQLiteProvider} from 'expo-sqlite';
import {Stack} from 'expo-router';
import {useEffect, useState} from "react";
import {ScoreDatabase} from "@/db";

export default function Layout() {
    const [db] = useState(new ScoreDatabase());

    useEffect(() => {
        db.DBInit();
    }, []);
    return (
        <SQLiteProvider databaseName="quiz.db">
            <Stack screenOptions={{
                headerTitle: "Mon Quizz",
                headerStyle: {
                    backgroundColor: "purple"
                },
                headerTintColor: "white"
            }}/>
        </SQLiteProvider>
    );
}
