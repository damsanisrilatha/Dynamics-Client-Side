// JavaScript source code
// JavaScript source code
function OnLoadStudentForm() {
	alert("form is loading");
}
function OnSaveStudentExaple() {
	alert("form is saving");

}
function OnChangeForm() {
	alert("filed is changed");

}
function AlertMethodDisplay() {
	alert("Hello this is tabstatechange event");
}

//onsave event using readfield values using getvalue()
function ReadValue(executionContext) {
	try {
		var formContext = executionContext.getFormContext();
		var name = formContext.getAttribute("new_name").getValue();
		var city = formContext.getAttribute("new_city").getValue();
		Xrm.Utility.alertDialog("Loan Customer name is :" + name);
		alert("Loan Customer city name is :" + city);
		var gender = formContext.getAttribute("new_coustomergender").getValue();
		alert("gender:" + gender);

		var email = formContext.getAttribute("new_emailid").getValue();
		alert("customer emailid:" + email);
	}
	catch (e) {
		Xrm.Utility.alertDialog(e.message);
	}

}
//using onchange event apply to name field whenever enter data into name field automatically set value to email mail field
function nameConverToEmailid(executionContext) {
	try {
		var formContext = executionContext.getFormContext();
		var name = formContext.getAttribute("new_name").getValue();
		formContext.getAttribute("new_emailid").setValue(name + "@gmail.com");
	}
	catch (e) {
		Xrm.Utility.alertDialog(e.message);
	}
}

//whenver we delete the field avoid exeption using null condition(onsave event )
function fieldRemove(executionContext) {
	var address1 = null;
	try {
		var formContext = executionContext.getFormContext();

		// var address=formContext.getAttribute("new_address").getValue();
		// Xrm.Utility.alertDialog("customer address"+address);
		if (formContext.getAttribute("new_address") != null) {
			if (formContext.getAttribute("new_address").getValue() != null) {
				address = formContext.getAttribute("new_address").getValue();
				Xrm.Utility.alertDialog("customer address: " + address1);
			}

		}
	}
	catch (e) {
		Xrm.Utility.alertDialog(e.message);
	}
	Xrm.Utility.alertDialog("customer address: " + address1);
}
function gettingRecordGuid(executionContext) {

	var formContext = executionContext.getFormContext();

	var recordGuid = formContext.data.entity.getId();//record ID

	Xrm.Utility.alertDialog("Record ID is : " + recordGuid);
}
//set default value using onload event
function setvalue(executionConext) {
	var formContext = executionConext.getFormContext();
	formContext.getAttribute("new_city").setValue("Hyderabad");

	
}

//how to get form type using ui.getfomType()
function findFormType(executionConext) {
	var formContext = executionConext.getFormContext();
	var formType = formContext.ui.getFormType();
	if (formType == 1) {
		formContext.getAttribute("new_city").setValue("Hyderabad");

    }
	Xrm.utility.alertDialog("loan customer formtype" + formType);
}