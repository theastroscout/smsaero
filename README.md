# SMS Aero
SMS Aero API Integration through Node.js.
Full API Docs: https://smsaero.ru/description/api/

## Installation
```
npm install @hqdaemon/smsaero
```

## Usage
Retrieve your personal API key: https://smsaero.ru/cabinet/settings/apikey/

```js
const conf = {
  sign: "SMS Aero",
  email: "YOU_EMAIL",
  key: "API_KEY",
  host: "gate.smsaero.ru",
  ver: "v2",
  respondType: "json"
};
const smsaero = require("@hqdaemon/smsaero")(conf);
```

## Check Auth
```js
let authResult = await smsaero.auth();
console.log("Auth Result", authResult);

/*
JSON {
  success: true,
  data: null,
  message: 'Successful authorization.',
  statusCode: 200
}
*/
```

## Send Messages
```js
let post = {
  number: "79990000000", // Or Phone Numbers Array ["79990000000","79990000001"]
  text: "Test Msg",
  shortLink: 1
};
let sendMessageResult = await smsaero.send(post, true); // @ {} Options, (bool) Test Mode
console.log("\nMessage Send Result", sendMessageResult);

/*
JSON {
  success: true,
  data: {
    id: 686325,
    from: 'SMS Aero',
    number: '79990000000',
    text: 'Test Msg',
    status: 1,
    extendStatus: 'delivery',
    channel: 'FREE SIGN',
    cost: 2.99,
    dateCreate: 1622650986,
    dateSend: 1622650986
  },
  message: null,
  statusCode: 200
}

Multiple numbers

JSON {
  success: true,
  data: [
    {
        id: 686325,
        from: 'SMS Aero',
        number: '79990000000',
        text: 'Test Msg',
        status: 1,
        extendStatus: 'delivery',
        channel: 'FREE SIGN',
        cost: 2.99,
        dateCreate: 1622650986,
        dateSend: 1622650986
    },
    {...}
  ],
  message: null,
  statusCode: 200
}
*/
```

## Message Status
```js
let messageID = 1; // ID from sendMessageResult.data.id or sendMessageResult.data[0].id for multiple numbers
let messageStatus = await smsaero.status(messageID, true); // @ Message ID, (bool) Test Mode
console.log("\nMessage Status", messageStatus);

/*
JSON {
  success: true,
  data: {
    id: 686325,
    from: 'SMS Aero',
    number: 79990000000,
    text: 'Test Msg',
    status: 1,
    extendStatus: 'delivery',
    channel: 'FREE SIGN',
    cost: 2.99,
    dateCreate: 1622650986,
    dateSend: 1622650986
  },
  message: null,
  statusCode: 200
}
*/
```

<br />
<br />
<br />
<br />

## MIT License

Copyright (c) HQ • [hqmode.com](https://hqmode.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.