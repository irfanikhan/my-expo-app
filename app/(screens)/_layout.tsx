import { Stack } from "expo-router";


export default function Screens() {
    return (
        <Stack>
            <Stack.Screen name="frames" options={{ title: 'Frames', headerBackButtonMenuEnabled: true }}  />
            <Stack.Screen name="frame" options={{ title: 'Frame', headerBackButtonMenuEnabled: true }}  />
        </Stack>
    )
}