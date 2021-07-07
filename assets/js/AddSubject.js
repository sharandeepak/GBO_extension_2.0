// var subjectList;

// var timingList;

// //makes updation and stuff easier
// var subjectModelList;

// var timingModelList;

// window.onload = () => {
// 	//the list of subjects
// 	subjectList = document.getElementById("subject");

// 	//the list of timing
// 	timingList = document.getElementById("timing");

// 	//loading subjects at the start
// 	eel.getSubject();

// 	eel.getTiming(1);
// };

// function addSubject(e) {
// 	e.preventDefault();

// 	var name = document.getElementById('subject-name').value;
// 	var url = document.getElementById('url').value;

// 	if(name.trim() == "" || name.trim() == null ||url.trim() == "" || url.trim() == null){
		
// 		return;
// 	}

// 	eel.addSubject({
// 		'name': name,
// 		'url': url
// 	});

// 	document.getElementById('subject-name').value = "";
// 	document.getElementById('url').value = "";
// }

// function removeSubject(e) {
// 	e.preventDefault()

// 	var li = e.target.parentNode;
// 	var index = li.id;

// 	eel.deleteSubject(subjectModelList[index])
// }

// function editSubject(e) {	
// 	e.preventDefault()

// 	var li = e.target.parentNode;
// 	var index = li.id;

// 	li.innerHTML = "";
	
// 	var row = document.createElement('div');
// 	row.className = "row";


// 	var nameFieldContainer = document.createElement('div');
// 	nameFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";


// 	var nameField = document.createElement('input');
// 	nameField.setAttribute('id','name');
// 	nameField.value = subjectModelList[index]['name'];
// 	nameFieldContainer.appendChild(nameField);


// 	var urlFieldContainer = document.createElement('div');
// 	urlFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";

// 	var urlField = document.createElement('input');
// 	urlField.setAttribute('id','url');
// 	urlField.value = subjectModelList[index]['url'];
// 	urlFieldContainer.appendChild(urlField);


// 	var saveButton = document.createElement("button");
// 	saveButton.className = "btn-success btn btn-sm float-right edit edit-btn";
// 	saveButton.innerHTML = 'Save';
// 	saveButton.setAttribute('class','generated_save_btn btn-success btn btn-sm float-right edit edit-btn')
// 	saveButton.onclick = function(e) {
// 		e.preventDefault();
// 		var name = nameField.value;
// 		var url = urlField.value;
// 		if(name.trim() == "" || name.trim() == null ||url.trim() == "" || url.trim() == null) {
			
// 		}
// 		else {
// 			eel.updateSubject({
// 				'name': name,
// 				'url': url
// 			} ,subjectModelList[index]);
// 		}
// 	};

	 
	
// 	var cancelButton = document.createElement("button");
// 	cancelButton.className = "btn-danger btn btn-sm float-right delete del-btn";
// 	cancelButton.innerHTML = 'Cancel';
// 	cancelButton.setAttribute('class','generated_cancel_btn btn-danger btn btn-sm float-right delete del-btn')
// 	cancelButton.onclick = function(e) {
// 		e.preventDefault();
// 		updateSubject(subjectModelList);
// 	};
	
// 	row.appendChild(nameFieldContainer);
// 	row.appendChild(document.createTextNode(" "));
// 	row.appendChild(urlFieldContainer);
// 	row.appendChild(saveButton);
// 	row.appendChild(cancelButton);

// 	li.appendChild(row);


// }

// // not the most efficient(deleting and creating again and again) but the load is small so who cares 
// eel.expose(updateSubject);
// function updateSubject(subjects) {

// 	subjectModelList = subjects

// 	subjectList.innerHTML = "";

// 	for(s in subjects) {
// 		var li = document.createElement('li');
// 		li.className = "list-group-item";
	
// 		//link
// 		let link = document.createElement('a');
// 		link.setAttribute('href', String(subjects[s]['url']));
// 		link.innerHTML = String(subjects[s]['url']);

// 		//edit button
// 		let editButton = document.createElement("button");
// 		editButton.className = "btn-success btn btn-sm float-right edit edit-btn";
// 		editButton.innerHTML = 'Edit';
// 		editButton.setAttribute('onclick','editSubject(event)')
	
// 		//delete button
// 		let deleteButton = document.createElement("button");
// 		deleteButton.className = "btn-danger btn btn-sm float-right delete del-btn";
// 		deleteButton.innerHTML = 'Delete';
// 		deleteButton.setAttribute('onclick','removeSubject(event)')

// 		li.appendChild(document.createTextNode(subjects[s]['name']));
// 		li.appendChild(link);
// 		li.appendChild(deleteButton);
// 		li.appendChild(editButton);
// 		li.setAttribute('id',s); //using index as id

// 		subjectList.appendChild(li);
// 	}

// 	updateSubjectInTiming();
// }

// function updateSubjectInTiming() {
// 	var subjectSpinner = document.getElementById('subject-drop-down');
// 	subjectSpinner.innerHTML = "";
// 	for(x in subjectModelList) {
// 		var ele = document.createElement('option');
// 		ele.value = subjectModelList[x]['name'];
// 		ele.innerHTML = subjectModelList[x]['name'];
// 		subjectSpinner.appendChild(ele);
// 	}
// }

// eel.expose(updateTiming);
// function addTiming(e) {
// 	e.preventDefault();

// 	var day = 1;
// 	// IDK HOW TO GET DAY... SO DOING IT THE HARD WAY
// 	var timeTable = document.getElementById('days');
// 	for(i = 0; i<timeTable.children.length;i++) {
// 		console.log('x : ' + i);
// 		if(timeTable.children[i].classList.contains("selected")) {
// 			day = i+1;
// 		}
// 	}
// 	var startTime = document.getElementById('start-time').value;
// 	var endTime = document.getElementById('end-time').value;
// 	var spinner = document.getElementById('subject-drop-down');
// 	var subject = spinner.value;

// 	console.log(startTime ,endTime, subject, day);

// 	if(startTime.trim() == "" || startTime.trim()==null || endTime.trim() == "" || endTime.trim()==null) {
		
// 		return;
// 	}

// 	eel.addTiming({
// 		'day':day,
// 		'start_time':startTime,
// 		'end_time':endTime,
// 		'subject':subject
// 	});
// }


// function removeTiming(e) {
// 	e.preventDefault()

// 	var li = e.target.parentNode;
// 	var index = li.id;

// 	eel.deleteTiming(timingModelList[index])
// }

// function editTiming(e) {
// 	e.preventDefault()

// 	var li = e.target.parentNode;
// 	var index = li.id;

// 	li.innerHTML = "";
	
// 	var row = document.createElement('div');
// 	row.className = "row";


// 	var startTimeFieldContainer = document.createElement('div');
// 	startTimeFieldContainer.className = "col-lg-2 col-md-2 col-sm-2";

// 	var startTimeLabel = document.createElement('label');
// 	startTimeLabel.setAttribute('for','start-time-edit');
// 	startTimeLabel.innerHTML = " Start time ";

// 	var startTimeField = document.createElement('input');
// 	startTimeField.setAttribute('id','start-time-edit');
// 	startTimeField.setAttribute('type','time');
// 	startTimeField.setAttribute('class','form-control');
// 	startTimeField.value = timingModelList[index]['start_time'];
	
// 	startTimeFieldContainer.appendChild(startTimeLabel);
// 	startTimeFieldContainer.appendChild(startTimeField);



// 	var endTimeFieldContainer = document.createElement('div');
// 	endTimeFieldContainer.className = "col-lg-2 col-md-2 col-sm-2";

// 	var endTimeLabel = document.createElement('label');
// 	endTimeLabel.setAttribute('for','end-time-edit');
// 	endTimeLabel.innerHTML = " End time ";

// 	var endTimeField = document.createElement('input');
// 	endTimeField.setAttribute('id','end-time-edit');
// 	endTimeField.setAttribute('type','time');
// 	endTimeField.setAttribute('class','form-control');
// 	endTimeField.value = timingModelList[index]['end_time'];
	
// 	endTimeFieldContainer.appendChild(endTimeLabel);
// 	endTimeFieldContainer.appendChild(endTimeField);


// 	//COPY PASTE SPINNER CODE
// 	var spinner = document.getElementById('spinner');
// 	var spinnerCopy = document.createElement('div');
	
// 	spinnerCopy.className = spinner.className;
// 	spinnerCopy.innerHTML = spinner.innerHTML; 
// 		var subjectIndex = -1;
// 		for(x in subjectModelList) {
// 			if(subjectModelList[x]['name']==timingModelList[index]['subject']) {
// 				subjectIndex = x;
// 			}
// 		}
// 		spinnerCopy.children[1].selectedIndex = subjectIndex.toString();


// 	//probably useless
// 	//spinner.firstChild.setAttribute('for', 'subject-drop-down-edit');
// 	//spinner.lastChild.setAttribute('id','subject-drop-down-edit'); 


// 	var saveButton = document.createElement("button");
// 	saveButton.className = "btn-success btn btn-sm float-right edit edit-btn";
// 	saveButton.innerHTML = 'Save';
// 	saveButton.onclick = function(e) {
// 		e.preventDefault();
// 		var day = timingModelList[index]['day'];
// 		var startTime = startTimeField.value;
// 		var endTime = endTimeField.value;
// 		var subject = spinnerCopy.children[1].value;

// 		console.log(startTime ,endTime, subject, day);

// 		if(startTime.trim() == "" || startTime.trim()==null || endTime.trim() == "" || endTime.trim()==null) {
			
// 		}
// 		else {
// 			eel.updateTiming({
// 				'day':day,
// 				'start_time':startTime,
// 				'end_time':endTime,
// 				'subject':subject
// 			}, timingModelList[index]);
// 		}
// 	};

	 
	
// 	var cancelButton = document.createElement("button");
// 	cancelButton.className = "btn-danger btn btn-sm float-right delete del-btn";
// 	cancelButton.innerHTML = 'Cancel';
// 	cancelButton.onclick = function(e) {
// 		e.preventDefault();
// 		updateTiming(timingModelList);
// 	};
	
// 	row.appendChild(startTimeFieldContainer);
// 	row.appendChild(document.createTextNode(" "));
// 	row.appendChild(endTimeFieldContainer);
// 	row.appendChild(spinnerCopy);
// 	row.appendChild(saveButton);
// 	row.appendChild(cancelButton);

// 	li.appendChild(row);

// }

// eel.expose(updateTiming);
// function updateTiming(timings) {
// 	timingModelList = timings;

// 	timingList.innerHTML = "";

// 	for(s in timings) {
// 		var li = document.createElement('li');
// 		li.className = "list-group-item";
		
// 		//ALL 3 TEXT FIELD
		

// 		//edit button
// 		let editButton = document.createElement("button");
// 		editButton.className = "btn-success btn btn-sm float-right edit edit-btn";
// 		editButton.innerHTML = 'Edit';
// 		editButton.setAttribute('onclick','editTiming(event)')
	
// 		//delete button
// 		let deleteButton = document.createElement("button");
// 		deleteButton.className = "btn-danger btn btn-sm float-right delete del-btn";
// 		deleteButton.innerHTML = 'Delete';
// 		deleteButton.setAttribute('onclick','removeTiming(event)')


// 		li.appendChild(document.createTextNode(timings[s]['start_time'] + " " + timings[s]['end_time'] + " " + timings[s]['subject'] ));
// 		li.appendChild(deleteButton);
// 		li.appendChild(editButton);
// 		li.setAttribute('id',s); //using index as id

// 		timingList.appendChild(li);
// 	}

// }

// function eelGetTimings() {
// 	var day = 1;
// 	// IDK HOW TO GET DAY... SO DOING IT THE HARD WAY
// 	var timeTable = document.getElementById('days');
// 	for(i = 0; i<timeTable.children.length;i++) {
// 		console.log('x : ' + i);
// 		if(timeTable.children[i].classList.contains("selected")) {
// 			day = i+1;
// 		}
// 	}
// 	console.log('hello');
// 	eel.getTiming(day);
// }

// function toggleButton(btnID) {
// 	document.getElementById(btnID).disabled = false;
// }
// function signIn(){
// 	eel.login_to_google()
// }
// function sendEmail(){
// 	var UserName = document.getElementById('user_name');
// 	var UserEmail = document.getElementById('user_email');
// 	var UserMessage = document.getElementById('user_message');
// }