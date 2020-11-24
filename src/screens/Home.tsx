import * as React from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';
import { NavigationScreenProp } from "react-navigation";

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';

import { storeUserName } from "../store/actions"
import { saveUsername } from "../api/Api"

interface Props {
    navigation: NavigationScreenProp<any>;
}

export default function Home(props: Props) {
    let dispatch = useDispatch();

    const [username, setUsername] = useState("")

    function goToChatScreen() {
        // Check if username is valid
        if (username.trim() !== "") {
            dispatch(storeUserName(username));
            saveUsername(username)
            props.navigation.replace("Chat")
        }
    }

    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems: "center",
            backgroundColor: "#a6bbd9"
        }}>
            {/* Intro message */}
            <Text style={{ fontWeight: "bold", fontSize: 26, marginBottom: 10 }}>Welcome to MessengerApp !</Text>
            <Image
                source={require('../res/icons/chat.jpg')}
                style={{ marginVertical: 25, width: 80, height: 80 }} >
            </Image>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter an username to access the chatroom</Text>


            {/* Username input */}
            <TextInput
                style={{
                    height: 40, width: "80%",
                    backgroundColor: "white", borderRadius: 5,
                    borderColor: 'gray', borderWidth: 1
                }}
                onChangeText={text => setUsername(text)}
                value={username}
                maxLength={50}
            />

            {/* Continue button */}
            <TouchableOpacity
                style={{
                    width: "50%", alignSelf: "center",
                    borderRadius: 10,
                    padding: 20, margin: 20, backgroundColor: "#37547e"
                }}
                onPress={() => goToChatScreen()}
            >
                <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
