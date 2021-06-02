/*

npm test email=YOUR_EMAIL --key=YOUR_API_KEY

*/
let conf = {
	sign: "SMS Aero",
	email: "YOUR_EMAIL",
	key: "YOUR_API_KEY",
	url: "https://gate.smsaero.ru/v2/",
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
		let post = {
			number: "79990000000",
			text: "Test Msg",
			shortLink: 1
		};
		let sendResult = await smsaero.send(post, true); // @ {} Options, (bool) Test Mode
		console.log("\nMessage Send Result", sendResult);

		// Retrieve Message Status
		if(sendResult.success === true){
			setTimeout(async () => {
				let messageStatus = await smsaero.status(sendResult.data.id, true); // @ Message ID, (bool) Test Mode
				console.log("\nMessage Status", messageStatus);
			}, 1000);
		}
	}
};

app.go();