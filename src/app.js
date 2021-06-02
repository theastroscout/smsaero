(() => {
	const https = require("https");

	// Init
	var smsaero = function(conf){
		for(let p in conf){
			smsaero.conf[p] = conf[p];
		};
		smsaero.ready = true;
		return smsaero;
	};

	// Conf
	smsaero.conf = {
		sign: "SMS Aero",
		email: "YOUR_EMAIL",
		key: "YOUR_API_KEY",
		host: "gate.smsaero.ru",
		ver: "v2",
		respondType: "json" // JSON or XML
	};

	// Check Ready
	smsaero.check = (method=false) => {
		if(smsaero.ready === undefined){
			throw new Error("Need Configurate Connection");
		} else if(method !== "auth" && smsaero.isAuth === undefined){
			throw new Error("Need Auth Your Connection by E-mail and API Key: https://smsaero.ru/cabinet/settings/apikey/");
		}
	};

	// Auth
	smsaero.auth = async () => {
		let result = await smsaero.req({
			method: "auth"
		});

		if(result.success === true){
			smsaero.isAuth = true;
		}

		return result;
	};

	// Send Message
	smsaero.send = async (params, test=false) => {
		params.sign = params.sign || smsaero.conf.sign;
		if(typeof params.number === "object"){
			params.numbers = params.number;
			delete params.number;
		}
		
		console.log(params);

		let post = {
			method: test===true?"sms/testsend":"sms/send",
			params: params
		};
		let result = await smsaero.req(post);
		return result;
	};

	// Message Status
	smsaero.status = async (messageID, test=false) => {
		let post = {
			method: test===true?"sms/teststatus":"sms/status",
			params: {id:messageID}
		};
		let result = await smsaero.req(post);
		return result;
	};

	// API Request
	smsaero.req = (options) => {
		smsaero.check(options.method);

		return new Promise((resolve) => {
			let postData = JSON.stringify(options.params || {});

			let post = {
				hostname: options.host || smsaero.conf.host,
				port: 443,
				path: `/${smsaero.conf.ver}/${options.method}`,
				method: "POST",
				headers: {
					"Authorization": "Basic " + Buffer.from(smsaero.conf.email + ":" + smsaero.conf.key).toString("base64"),
					"Content-Type": "application/json",
					"Content-Length": postData.length
				}
			};

			const req = https.request(post, res => {
				
				let data = "";
				let statusCode = res.statusCode;

				res.on("data", d => {
					data += d;
				});

				res.on("end", () => {
					try {
						data = JSON.parse(data);
					} catch (e){
						data = {
							success: false,
							message: `Can't parse JSON from "${data}"`
						};
					}
					data.statusCode = statusCode;
					resolve(data);
				});

			});

			req.on("error", error => {
				resolve({
					success: false,
					message: `Error: "${error}"`
				});
			});

			req.write(postData);
			req.end();
		});
	};

	module.exports = smsaero;
})();