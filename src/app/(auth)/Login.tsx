import { View, Text } from 'react-native'
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    return (
        <View>
            <Text>Login</Text>
            <Button
                title="Reset App"
                onPress={async () => {
                    await AsyncStorage.clear();
                    console.log("Storage cleared");
                }}
            />
        </View>
    )
}

export default Login