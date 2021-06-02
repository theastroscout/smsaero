/*

npm test email=YOUR_EMAIL --key=YOUR_API_KEY

*/
let conf = {
	sign: "SMS Aero",
	email: "YOUR_EMAIL",
	key: "YOUR_API_KEY",
	host: "gate.smsaero.ru",
	ver: "v2",
	respondType: "json"
};
for(let p of process.argv){
	let r = p.split("=");
	if(r[0] === "email"){
		conf.email = r[1];
	} else if(r[0] === "key") {
		conf.key = r[1];
	}
}

const smsaero = require("../src/app")(conf);

let app = {
	go: async () => {

		// Auth App
		let authResult = await smsaero.auth();
		console.log("Auth Result", authResult);
		
		if(smsaero.isAuth === true){
			console.log("// Your App is Auth Now");
		}

		// Send a Message
		let postMessage = {
			number: "79990000000",
			text: "Test Msg",
			shortLink: 1
		};
		let sendMessageResult = await smsaero.send(postMessage, true); // @ {} Options, (bool) Test Mode
		console.log("\nMessage Send Result", sendMessageResult);

		// Retrieve Message Status
		if(sendMessageResult.success === true){
			setTimeout(async () => {
				let messageStatus = await smsaero.status(sendMessageResult.data.id, true); // @ Message ID, (bool) Test Mode
				console.log("\nMessage Status", messageStatus);
			}, 1000);
		}

		// Send Messages
		let postMessages = {
			number: ["79990000000","79990000001"],
			text: "Test Msg",
			shortLink: 1
		};
		let sendMessagesResult = await smsaero.send(postMessages, true); // @ {} Options, (bool) Test Mode
		console.log("\nMessages Send Result", sendMessagesResult);
	}
};

app.go();