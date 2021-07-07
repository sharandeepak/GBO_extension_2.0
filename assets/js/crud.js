//Map of all subjects
var ArrayOfSubjects = [];

//Map of Timetable
var ArrayofTimetable = [];
//List of all the subject Names :)
var subjectName = [];
//List of all the respective links
var subjectLink = [];

var subjectList;

//makes updation and stuff easier
var subjectModelList;

var timingModelList;

//Timings
var sun = [];
var mon = [];
var tue = [];
var wed = [];
var thu = [];
var fri = [];
var sat = [];

window.onload = () => {
  if (JSON.parse(localStorage.getItem("sub-array")) != null)
    ArrayOfSubjects = JSON.parse(localStorage.getItem("sub-array"));
  //the list of subjects
  subjectList = document.getElementById("subject");

  //the list of timing
  timingList = document.getElementById("timing");

  updateSubject(ArrayOfSubjects);

  // //loading subjects at the start
  // eel.getSubject();

  getTiming(1);
};

//Function for storing the datas into the database
function addSubject(e) {
  e.preventDefault();

  if (
    document.getElementById("subject-name").value.trim() != "" &&
    document.getElementById("url").value.trim() != ""
  ) {
    var subMap = {};
    subMap["name"] = document.getElementById("subject-name").value.trim();
    subMap["url"] = document.getElementById("url").value.trim();
    console.log(subMap);

    ArrayOfSubjects.push(subMap);
    setSubjectStorage(ArrayOfSubjects);
  }
}

function updateSubject(subjects) {
  // console.log(subjects);
  subjectModelList = subjects;

  subjectList.innerHTML = "";

  for (s in subjects) {
    var li = document.createElement("li");
    li.className = "list-group-item";

    //link
    let link = document.createElement("a");
    link.setAttribute("href", String(subjects[s]["url"]));
    link.innerHTML = String(subjects[s]["url"]);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit edit-btn";
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick", "editSubject(event)");

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete del-btn";
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick", "removeSubject(event)");

    li.appendChild(document.createTextNode(subjects[s]["name"]));
    li.appendChild(link);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.setAttribute("id", s); //using index as id

    subjectList.appendChild(li);
  }
  updateSubjectInTiming();
}

function editSubject(e) {
  e.preventDefault();

  var li = e.target.parentNode;
  var index = li.id;

  li.innerHTML = "";

  var row = document.createElement("div");
  row.className = "row";

  var nameFieldContainer = document.createElement("div");
  nameFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";

  var nameField = document.createElement("input");
  nameField.setAttribute("id", "name");
  nameField.style.border = "1px solid #000";
  nameField.style.borderStyle = "solid";
  nameField.value = subjectModelList[index]["name"];
  nameFieldContainer.appendChild(nameField);

  var urlFieldContainer = document.createElement("div");
  urlFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";

  var urlField = document.createElement("input");
  urlField.setAttribute("id", "url");
  urlField.style.border = "1px solid #000";
  urlField.style.borderStyle = "solid";
  urlField.value = subjectModelList[index]["url"];
  urlFieldContainer.appendChild(urlField);

  var saveButton = document.createElement("button");
  saveButton.className = "btn-success btn btn-sm float-right edit edit-btn";
  saveButton.innerHTML = "Save";
  saveButton.setAttribute(
    "class",
    "generated_save_btn btn-success btn btn-sm float-right edit edit-btn"
  );
  saveButton.onclick = function (e) {
    e.preventDefault();
    var name = nameField.value;
    var url = urlField.value;
    if (
      name.trim() == "" ||
      name.trim() == null ||
      url.trim() == "" ||
      url.trim() == null
    ) {
    } else {
      subjectModelList[index]["name"] = name;
      subjectModelList[index]["url"] = url;
      setSubjectStorage(subjectModelList);
    }
  };

  var cancelButton = document.createElement("button");
  cancelButton.className = "btn-danger btn btn-sm float-right delete del-btn";
  cancelButton.innerHTML = "Cancel";
  cancelButton.setAttribute(
    "class",
    "generated_cancel_btn btn-danger btn btn-sm float-right delete del-btn"
  );
  cancelButton.onclick = function (e) {
    e.preventDefault();
    updateSubject(subjectModelList);
  };

  row.appendChild(nameFieldContainer);
  row.appendChild(document.createTextNode(" "));
  row.appendChild(urlFieldContainer);
  row.appendChild(saveButton);
  row.appendChild(cancelButton);

  li.appendChild(row);
}

function removeSubject(e) {
  e.preventDefault();

  var li = e.target.parentNode;
  var index = li.id;

  // eel.deleteSubject(subjectModelList[index])
  const delIndex = subjectModelList.indexOf(subjectModelList[index]);
  subjectModelList.splice(delIndex, 1);
  setSubjectStorage(subjectModelList);
  updateSubject(subjectModelList);
}

function updateSubjectInTiming() {
  var subjectSpinner = document.getElementById("subject-drop-down");
  subjectSpinner.innerHTML = "";
  for (x in subjectModelList) {
    var ele = document.createElement("option");
    ele.value = subjectModelList[x]["name"];
    ele.innerHTML = subjectModelList[x]["name"];
    subjectSpinner.appendChild(ele);
  }
}

function addTiming(e) {
  e.preventDefault();

  var day = 1;
  // IDK HOW TO GET DAY... SO DOING IT THE HARD WAY
  var timeTable = document.getElementById("days");
  for (i = 0; i < timeTable.children.length; i++) {
    console.log("x : " + i);
    if (timeTable.children[i].classList.contains("selected")) {
      day = i + 1;
    }
  }
  var startTime = document.getElementById("start-time").value;
  var endTime = document.getElementById("end-time").value;
  var spinner = document.getElementById("subject-drop-down");
  var subject = spinner.value;

  console.log(startTime, endTime, subject, day);

  if (
    startTime.trim() == "" ||
    startTime.trim() == null ||
    endTime.trim() == "" ||
    endTime.trim() == null
  ) {
    return;
  }

  // eel.addTiming({
  // 	'day':day,
  // 	'start_time':startTime,
  // 	'end_time':endTime,
  // 	'subject':subject
  // });
  var timetableMap = {};
  timetableMap["day"] = day;
  timetableMap["start_time"] = startTime;
  timetableMap["end_time"] = endTime;
  timetableMap["subject"] = subject;

  console.log(timetableMap);
  if (day == 1) {
    sun.push(timetableMap);
    localStorage.setItem("sun-tt-array", JSON.stringify(sun));
    updateTiming(sun);
  }
  if (day == 2) {
    mon.push(timetableMap);
    localStorage.setItem("mon-tt-array", JSON.stringify(mon));
    updateTiming(mon);
  } else if (day == 3) {
    tue.push(timetableMap);
    localStorage.setItem("tue-tt-array", JSON.stringify(tue));
    updateTiming(tue);
  } else if (day == 4) {
    wed.push(timetableMap);
    localStorage.setItem("wed-tt-array", JSON.stringify(wed));
    updateTiming(wed);
  } else if (day == 5) {
    thu.push(timetableMap);
    localStorage.setItem("thu-tt-array", JSON.stringify(thu));
    updateTiming(thu);
  } else if (day == 6) {
    fri.push(timetableMap);
    localStorage.setItem("fri-tt-array", JSON.stringify(fri));
    updateTiming(fri);
  } else if (day == 7) {
    sat.push(timetableMap);
    localStorage.setItem("sat-tt-array", JSON.stringify(sat));
    updateTiming(sat);
  }  
}

function removeTiming(e) {
  e.preventDefault();

  var li = e.target.parentNode;
  var index = li.id;

  // eel.deleteTiming(timingModelList[index])
}

function editTiming(e) {
  e.preventDefault();

  var li = e.target.parentNode;
  var index = li.id;

  li.innerHTML = "";

  var row = document.createElement("div");
  row.className = "row";

  var startTimeFieldContainer = document.createElement("div");
  startTimeFieldContainer.className = "col-lg-2 col-md-2 col-sm-2";

  var startTimeLabel = document.createElement("label");
  startTimeLabel.setAttribute("for", "start-time-edit");
  startTimeLabel.innerHTML = " Start time ";

  var startTimeField = document.createElement("input");
  startTimeField.setAttribute("id", "start-time-edit");
  startTimeField.setAttribute("type", "time");
  startTimeField.setAttribute("class", "form-control");
  startTimeField.value = timingModelList[index]["start_time"];

  startTimeFieldContainer.appendChild(startTimeLabel);
  startTimeFieldContainer.appendChild(startTimeField);

  var endTimeFieldContainer = document.createElement("div");
  endTimeFieldContainer.className = "col-lg-2 col-md-2 col-sm-2";

  var endTimeLabel = document.createElement("label");
  endTimeLabel.setAttribute("for", "end-time-edit");
  endTimeLabel.innerHTML = " End time ";

  var endTimeField = document.createElement("input");
  endTimeField.setAttribute("id", "end-time-edit");
  endTimeField.setAttribute("type", "time");
  endTimeField.setAttribute("class", "form-control");
  endTimeField.value = timingModelList[index]["end_time"];

  endTimeFieldContainer.appendChild(endTimeLabel);
  endTimeFieldContainer.appendChild(endTimeField);

  //COPY PASTE SPINNER CODE
  var spinner = document.getElementById("spinner");
  var spinnerCopy = document.createElement("div");

  spinnerCopy.className = spinner.className;
  spinnerCopy.innerHTML = spinner.innerHTML;
  var subjectIndex = -1;
  for (x in subjectModelList) {
    if (subjectModelList[x]["name"] == timingModelList[index]["subject"]) {
      subjectIndex = x;
    }
  }
  spinnerCopy.children[1].selectedIndex = subjectIndex.toString();

  //probably useless
  //spinner.firstChild.setAttribute('for', 'subject-drop-down-edit');
  //spinner.lastChild.setAttribute('id','subject-drop-down-edit');

  var saveButton = document.createElement("button");
  saveButton.className = "btn-success btn btn-sm float-right edit edit-btn";
  saveButton.innerHTML = "Save";
  saveButton.onclick = function (e) {
    e.preventDefault();
    var day = timingModelList[index]["day"];
    var startTime = startTimeField.value;
    var endTime = endTimeField.value;
    var subject = spinnerCopy.children[1].value;

    console.log(startTime, endTime, subject, day);

    if (
      startTime.trim() == "" ||
      startTime.trim() == null ||
      endTime.trim() == "" ||
      endTime.trim() == null
    ) {
    } else {
      // eel.updateTiming({
      // 	'day':day,
      // 	'start_time':startTime,
      // 	'end_time':endTime,
      // 	'subject':subject
      // }, timingModelList[index]);

      timingModelList[index]["day"] = day;
      timingModelList[index]["start_time"] = startTime;
      timingModelList[index]["end_time"] = endTime;
      timingModelList[index]["subject"] = subject;
      
	  if (day == 1) {
      localStorage.setItem("sun-tt-array", JSON.stringify(timingModelList));
	  getTiming(1);
    }
    else if (day == 2) {
      localStorage.setItem("mon-tt-array", JSON.stringify(timingModelList));
      getTiming(2);
    } else if (day == 3) {
      localStorage.setItem("tue-tt-array", JSON.stringify(timingModelList));
      getTiming(3);
    } else if (day == 4) {
      localStorage.setItem("wed-tt-array", JSON.stringify(timingModelList));
      getTiming(4);
    } else if (day == 5) {
      localStorage.setItem("thu-tt-array", JSON.stringify(timingModelList));
      getTiming(5);
    } else if (day == 6) {
      localStorage.setItem("fri-tt-array", JSON.stringify(timingModelList));
      getTiming(6);
    } else if (day == 7) {
      localStorage.setItem("sat-tt-array", JSON.stringify(timingModelList));
      getTiming(7);
    }
    }
  };

  var cancelButton = document.createElement("button");
  cancelButton.className = "btn-danger btn btn-sm float-right delete del-btn";
  cancelButton.innerHTML = "Cancel";
  cancelButton.onclick = function (e) {
    e.preventDefault();
    updateTiming(timingModelList);
  };

  row.appendChild(startTimeFieldContainer);
  row.appendChild(document.createTextNode(" "));
  row.appendChild(endTimeFieldContainer);
  row.appendChild(spinnerCopy);
  row.appendChild(saveButton);
  row.appendChild(cancelButton);

  li.appendChild(row);
}

function updateTiming(timings) {
  timingModelList = timings;

  timingList.innerHTML = "";

  for (s in timings) {
    var li = document.createElement("li");
    li.className = "list-group-item";

    //ALL 3 TEXT FIELD

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit edit-btn";
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick", "editTiming(event)");

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete del-btn";
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick", "removeTiming(event)");

    li.appendChild(
      document.createTextNode(
        timings[s]["start_time"] +
          "  " +
          timings[s]["end_time"] +
          "  " +
          timings[s]["subject"]
      )
    );
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.setAttribute("id", s); //using index as id

    timingList.appendChild(li);
  }
}

function eelGetTimings() {
  var day = 1;
  // IDK HOW TO GET DAY... SO DOING IT THE HARD WAY
  var timeTable = document.getElementById("days");
  for (i = 0; i < timeTable.children.length; i++) {
    if (timeTable.children[i].classList.contains("selected")) {
      day = i + 1;
    }
  }
  console.log("hello");
  getTiming(day);
}
var day2;
function getTiming(day2) {
  if (day2 == 1) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("sun-tt-array"));
  }
  if (day2 == 2) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("mon-tt-array"));
  } else if (day2 == 3) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("tue-tt-array"));
  } else if (day2 == 4) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("wed-tt-array"));
  } else if (day2 == 5) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("thu-tt-array"));
  } else if (day2 == 6) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("fri-tt-array"));
  } else if (day2 == 7) {
      ArrayofTimetable = JSON.parse(localStorage.getItem("sat-tt-array"));
  }
  if(localStorage.getItem("sun-tt-array")!=null)
  	sun=JSON.parse(localStorage.getItem("sun-tt-array"));
	   
  if (localStorage.getItem("mon-tt-array") != null)
  	mon = JSON.parse(localStorage.getItem("mon-tt-array"));
	  
  if (localStorage.getItem("tue-tt-array") != null)
    tue = JSON.parse(localStorage.getItem("tue-tt-array"));

  if (localStorage.getItem("wed-tt-array") != null)
    wed = JSON.parse(localStorage.getItem("wed-tt-array"));

  if (localStorage.getItem("thu-tt-array") != null)
    thu = JSON.parse(localStorage.getItem("thu-tt-array"));

  if (localStorage.getItem("fri-tt-array") != null)
    fri = JSON.parse(localStorage.getItem("fri-tt-array"));

  if (localStorage.getItem("sat-tt-array") != null)
    sat = JSON.parse(localStorage.getItem("sat-tt-array"));

  updateTiming(ArrayofTimetable);
}

function toggleButton(btnID) {
  document.getElementById(btnID).disabled = false;
}
var set_tt_array = [];
function setTimetableStorage(set_tt_array) {
  localStorage.setItem("tt-array", JSON.stringify(set_tt_array));
  updateTiming(set_tt_array);
}
var setArray = [];
function setSubjectStorage(setArray) {
  localStorage.setItem("sub-array", JSON.stringify(setArray));
  updateSubject(setArray);
}
