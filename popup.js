// const fs = require("fs");
// var tcpPortUsed = require("tcp-port-used");
// const chrome = require("selenium-webdriver/chrome");
// const { Builder, By, Key, until } = require("selenium-webdriver");

// (async function example() {
//   var exec = require("child_process").exec,
//     child;
//   try {
//     if (fs.existsSync("c:\\Program Files\\Google\\Chrome\\Application")) {
//       console.log("x64 bit chrome");
//       child = exec(
//         'c: && cd c:\\Program Files\\Google\\Chrome\\Application && chrome.exe --remote-debugging-port=8989 --user-data-dir="C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\User Data"'
//       );
//     }
//     if (fs.existsSync("c:\\Program Files (x86)\\Google\\Chrome\\Application")) {
//       console.log("x86 bit chrome");
//       child = exec(
//         'c: && cd c:\\Program Files\\Google\\Chrome\\Application && chrome.exe --remote-debugging-port=8989 --user-data-dir="C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\User Data"'
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   try {
//     // Navigate to Url
//     var chromeOptions = new chrome.Options();
//     chromeOptions.addArguments("start-maximized");
//     chromeOptions.options_["debuggerAddress"] = "localhost:8989";

//     let driver = await new Builder()
//       .forBrowser("chrome")
//       .setChromeOptions(chromeOptions)
//       .build();
//     await driver.get("https://www.google.com");

//     //port in use
//     var net = require("net");

//     var portInUse = function (port, callback) {
//       var server = net.createServer(function (socket) {
//         socket.write("Echo server\r\n");
//         socket.pipe(socket);
//       });

//       server.on("error", function (e) {
//         callback(true);
//       });
//       server.on("listening", function (e) {
//         server.close();
//         callback(false);
//       });

//       server.listen(port, "127.0.0.1");
//     };

//     portInUse(8989, function (returnValue) {
//       console.log(returnValue);
//     });
//   } finally {
//     // driver.quit();
//   }
// })();
