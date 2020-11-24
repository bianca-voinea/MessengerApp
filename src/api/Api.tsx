
import database from "@react-native-firebase/database";

export function saveUsername(username: string) {
	database()
		.ref('/users/')
		.push(username)
		.then((res) => console.log("Username saved"));

}

export function sendMessage(message: string, userName: string) {
	database()
		.ref('/messages/')
		.push({ message, userName })
		.then((res) => console.log("Message send"));
}
