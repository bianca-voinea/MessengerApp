import * as React from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import { NavigationScreenProp } from "react-navigation";
import database from "@react-native-firebase/database";

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';

import { sendMessage } from "../api/Api"


interface Props {
    navigation: NavigationScreenProp<any>;
}

export default function Chat(props: Props) {
    let dispatch = useDispatch();

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const userName: string = useSelector((state: any) => state.reducer.userName);

    // Read messages
    useEffect(() => {
        const onValueChange = database()
            .ref(`/messages/`)
            .on('value', snapshot => {
                setMessageList(Object.values(snapshot.val()))
            });

        // Stop listening for updates when no longer required
        return () =>
            database()
                .ref(`/messages/`)
                .off('value', onValueChange);
    }, []);


    function handleSendButton() {
        // Check if the message is valid
        if (message.trim() !== "") {
            setMessage("")
            sendMessage(message, userName);
        }
    }

    const renderMessage = ({ item }) => (
        <View style={{ margin: 10 }}>
            { item.userName === userName
                ? // Outgoing message
                <View>
                    <View style={{ backgroundColor: "#9fbece", borderBottomRightRadius: 0, borderRadius: 10, padding: 10, maxWidth: 250, alignSelf: "flex-end" }}>
                        <Text style={{ fontSize: 16 }}>{item.message}</Text>
                    </View>
                </View>
                : // Incoming message
                <View>
                    <Text style={{ fontSize: 10 }}>{item.userName}</Text>
                    <View style={{ backgroundColor: "#6597b1", borderTopLeftRadius: 0, borderRadius: 10, padding: 10, maxWidth: 250, alignSelf: "flex-start" }}>
                        <Text style={{ fontSize: 16 }}>{item.message}</Text>
                    </View>
                </View>
            }

        </View>
    );

    return (
        <View style={{
            flex: 1, justifyContent: "space-between", alignItems: "center",
            backgroundColor: "#e6ecf4"
        }}>
            {/* Header */}
            <View style={{ width: "100%", backgroundColor: "#a6bbd9", borderBottomWidth: 2 }}>
                <Text style={{ paddingVertical: 10, textAlign: "center", fontWeight: "bold", fontSize: 26, }}>Chat Room</Text>
            </View>

            {/* List of messages */}
            {messageList === [] || messageList.length === 0
                ? <ActivityIndicator color="black" size="large" />
                :
                <FlatList
                    inverted
                    style={{ width: "100%" }}
                    data={messageList}
                    renderItem={renderMessage}
                    keyExtractor={item => item.userName + item.message}
                />
            }
            {/* Writing bar */}
            <View style={{ alignItems: "center", flexDirection: "row", width: "100%", backgroundColor: "#a6bbd9", borderTopWidth: 2 }}>
                <View style={{
                    height: 50, width: "100%", margin: 10, flex: 1, justifyContent: "space-between",
                    backgroundColor: "white", borderRadius: 5, alignItems: "center", flexDirection: "row",
                    borderColor: 'gray', borderWidth: 1, marginLeft: 5
                }}>
                    <TextInput
                        style={{ width: "85%", marginLeft: 5 }}
                        onChangeText={text => setMessage(text)}
                        value={message}
                        placeholder={"Type a message ..."}
                        maxLength={250}
                    />
                    <TouchableOpacity
                        style={{ alignSelf: "center", marginLeft: 5, width: "15%" }}
                        onPress={() => handleSendButton()}
                    >
                        <Image
                            source={require('../res/icons/send.png')}
                            style={{ tintColor: "#37547e", width: 30, height: 30 }} >
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
