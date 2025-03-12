import {Stack} from 'expo-router';

export default function Layout() {

    return (
        <Stack screenOptions={{
            headerTitle: "Mon Quizz",
            headerStyle: {
                backgroundColor: "purple"
            },
            headerTintColor: "white"
        }}/>
    );
}
