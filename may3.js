// JavaScript source code
function formControlsOnFormDisabled(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var controlsForm = formContext.ui.controls.get();//this syntax will read all the controls in the form
        for (var i in controlsForm) {
            var control = controlsForm[i];
            if (!control.getDisabled()) {
                control.setDisabled(false);//unlock
            }
        }
        

      
    
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}


function formControlsOnFormsetVisibleFalse(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var controlsForm = formContext.ui.controls.get();//this syntax will read all the controls in the form
        var formname = formContext.ui.formSelector.getCurrentItem();
        var formLabel = formname.getLabel();
        if (formLabel == "Student Personal Info") {


            for (var i in controlsForm) {
                var control = controlsForm[i];
                if (!control.setVisible()) {
                    control.setVisible(false);//lock
                }
            }
        }



    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}


function aa(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var formType = formContext.ui.getFormType();
        
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}


function formlevelAccessToParticularUserUsingControls(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var formControl = formContext.ui.controls.get();
        var formType = formContext.ui.getFormType();
        var recordguid = formContext.data.entity.getId();
        var formItems = formContext.ui.formSelector.getCurrentItem();
        var formguid = formItems.getId();
        var formname = formItems.getLabel();
        var xrmUserSettings = Xrm.Utility.getGlobalContext().userSettings;
        var username = xrmUserSettings.userName;
        var userid = xrmUserSettings.userId;

        if (username == "Srini karra" && formname == "Information") {
            alert("formname::" + formname);
            for (var i in formControl) {
                var control = formControl[i];
                if (!control.getDisabled()) {
                    control.setDisabled(true);//unlock
                }
            }
        }
            if (username == "Srini karra" && formname == "Student Personal Info") {
                alert("username::" + username);
                alert("userid::" + userid);
                for (var i in formControl) {
                    var control = formControl[i];
                    if (control.setVisible()) {
                        control.setVisible(false);//hide
                    }
                }

            }

        }
       catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}




function makeformreadonlybaseduponLoggedinuserselectedform(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var controlsForm = formContext.ui.controls.get();
        var formType = formContext.ui.getFormType();
        var recordguid = formContext.data.entity.getId();
        var formItems = formContext.ui.formSelector.getCurrentItem();
        var formguid = formItems.getId();
        var Selectedform = formItems.getLabel();
        var xrmUserSettings = Xrm.Utility.getGlobalContext().userSettings;
        var username = xrmUserSettings.userName;
        var userid = xrmUserSettings.userId;
        if ((username == "Srini karra" && Selectedform == "Information") || (username == "Mimmy Sree" && Selectedform == "Information")) {
            alert("hi");
            var controlsForm = formContext.ui.controls.get();//this syntax will read all the controls in the form
            for (var i in controlsForm) {
                var control = controlsForm[i];
                if (!control.getDisabled()) {
                    control.setDisabled(false);//

                }
            }
        }
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}





function getcurrentUserNameAndIdAndSecurityRole(executionContext) {
    var formContext = executionContext.getFormContext();
    var xrmUserSettings = Xrm.Utility.getGlobalContext().userSettings;
    var userId = xrmUserSettings.userId;
    var userName = xrmUserSettings.userName;
    var usersecurityrolename = xrmUserSettings.securityRoles;
    alert("usersecurityrolename:" + usersecurityrolename);
    var xrmUserSettingsrole = Xrm.Utility.getGlobalContext().getUserRoles();
    alert("xrmUserSettingsrole:" + xrmUserSettingsrole);
    Xrm.Utility.alertDialog("userId::" + userId);
    //Xrm.Utility.alertDialog("userrole::" + userrole);
    Xrm.Utility.alertDialog("userName::" + userName);
    var formType = formContext.ui.getFormType();
   /* if (formType == 2)
    {
        formContext.ui.close();
    }*/
}
function force(executionContext) {//force save data
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("new_stdage").setSubmitMode("always");//
    //Save forcefully 
    formContext.getAttribute("new_pancardno").setSubmitMode("never");//if we enter the data save record after it will remove data automaticaly
    //Save forcefully
    formContext.getAttribute("new_address").setSubmitMode("dirty");//women@s
}

function getCurrentLoggedinUserSecurityRole() {
    var XrmuserSettings = Xrm.Utility.getGlobalContext().userSettings;
    //var roles = userSettings.security
    var usersecurityrolename = XrmuserSettings.securityRole;
    for (var i in usersecurityrolename) {
        var rolename = usersecurityrolename[i].name;
        //var roleID = roles[i].id;
        Xrm.Utility.alertDialog(rolename);

    }

}



function GetServerUrl() {
    var globalContext = Xrm.Utility.getGlobalContext();
    var serverUrl = globalContext.getClientUrl();
    Xrm.Utility.alertDialog(serverUrl); // server URL
   
} 



function ConfirmBox(executionContext) {
    var formContext = executionContext.getFormContext();
    var confirmationText;
    if (formContext.getAttribute("new_testsubmit").getValue != null || formContext.getAttribute("new_testsubmit").getValue == null);
    {
        if (confirm("Would you like to proceed The test?")) {

            confirmationText = "yes your Test is submited !";
            formContext.getAttribute("new_testsubmit").setValue(true);

        } else { // if you click on the cancel ur code will come in to Else
            confirmationText = "Not submited !";
            formContext.getAttribute("new_testsubmit").setValue(false);
        }
        //Using the alert notification to show the option selected
        alert(confirmationText);
    }

    //Alternatively way of writing an Confirm Box with the Window prefix:    
    //window.confirm("Press a button: 'OK' or 'Cancel'");   
}
function checkSpecialCharName(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_address") != null) {
        var entercityname = formContext.getAttribute("new_address").getValue();
        checkSpecialCharacters(entercityname, "new_address", formContext);
    }
    if (formContext.getAttribute("new_city") != null) {
        var entercityname = formContext.getAttribute("new_city").getValue();
        checkSpecialCharacters(entercityname, "new_city", formContext);
    }
}
function checkSpecialCharacters(fieldsdata, fieldLogicalName, formContext) {
    if (fieldsdata != null) {
        var specialChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
        var fieldLength = fieldsdata.length;
        for (i = 0; i < fieldLength; i++) {//indexOf() it returns the positions....if the item is not found it returns -1;
            //array.indexOf(item,start)
            if (specialChars.indexOf(fieldsdata.charAt(i)) != -1) {//this conditios satisfy the condition for only specialchars (charAt(i)==-1 this alphabets
                Xrm.Utility.alertDialog("Special characters  are not allowed in this field");
                formContext.getAttribute(fieldLogicalName).setValue(null); //clear data
                formContext.getControl(fieldLogicalName).setFocus();
            }
        }
    }
}


//string is characterarray
function specialCharInCityField(executionContext) {
    var formContext = executionContext.getFormContext()
    if (formContext.getAttribute("new_city") != null) {
        var cityname = formContext.getAttribute("new_city").getValue();
        findspecialCharInCityField(cityname, "new_city", formContext);
    }
}

function findspecialCharInCityField(str, logicalname, formContext, executionContext) {
   // let str = "hy@d";
    let fieldLength = str.length;//4
    var specialChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    for (let i = 0; i < fieldLength; i++) {
        if (specialChars.indexOf(str.charAt(i)) >= 0)
            {
            Xrm.Utility.alertDialog("Special characters  are not allowed in this field");
            formContext.getAttribute(logicalname).setValue(null); //clear data
            formContext.getControl(logicalname).setFocus();
            executionContext.getEventArgs().preventDefault();
        }
    }

}