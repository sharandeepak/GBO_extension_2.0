function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}


var arr = ["17:43","17:44"];
var found = arr.find(function (element) {
  return element === "17:42";
});


try {
  for (var i = 0; i < 5; i++) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    console.log(time.toString());
    if(found==1)
      console.log("im in 1");
    if(found==0)
      console.log("im in 0");
    else
      console.log(found);
    sleep(30000);
  }
} catch (e) {
  console.error(e);
}
