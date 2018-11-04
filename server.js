"use strict";

let fetch = require('node-fetch');

let data = {"UserName":"frwtest123@gmail.com","Password":"P@ssw0rd", "KeepMeSignedIn":"False"};
fetch('https://digitalcustomerqa.dolgen.net/Omni/api/user/login/v3',{
	method: "POST",
	cache: "no-cache",
	headers: {
		"Content-Type" : "application/json; charset=utf-8",
		"X-DG-AppToken" : "sjxk29eq4pt46r2kepgq9g4flh3elzht",
		"X-DG-DeviceUniqueID" : "7420C1B4-2B39-4834-B9C4-ADA21450C554",
		"User-Agent" : "RandallRocks",
	},
	body: JSON.stringify(data),	
}).then(res => res.json()).then(response => console.log('Success:', JSON.stringify(response.body)));