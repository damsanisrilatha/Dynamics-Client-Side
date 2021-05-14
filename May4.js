
function specialCharInCityField(executionContext) {
    var formContext = executionContext.getFormContext()
    if (formContext.getAttribute("new_city") != null) {
        var cityname = formContext.getAttribute("new_city").getValue();
        findspecialCharInCityField(cityname, "new_city", formContext, executionContext);
    }
}
function findspecialCharInCityField(str, logicalname, formContext, executionContext) {
    // let str = "hy@d";
    let fieldLength = str.length;//4
    var specialChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    for (let k = 0; k < fieldLength; k++) {
        k = 0;0<4//1,1<4//2,2<4
        if (specialChars.indexOf(str.charAt(k)) >= 0) //h//y{
            Xrm.Utility.alertDialog("Special characters  are not allowed in this field");
            formContext.getAttribute(logicalname).setValue(null); //clear data
            formContext.getControl(logicalname).setFocus();
            executionContext.getEventArgs().preventDefault();//validation is fail the  record not been saved
        }
    }
}



//============'new_address','new_city'**student
//-----------------'stdproject','new_developedarea','new_name'
function GenericspecialField(executionContext, logicalname1, logicalname2) {
    var formContext = executionContext.getFormContext()
    if (formContext.getAttribute(logicalname1) != null) {
        var data1 = formContext.getAttribute(logicalname1).getValue();
        GenericspecialCharFun(data1, logicalname1, formContext, executionContext);
    }
    if (formContext.getAttribute(logicalname2) != null) {
        var data2 = formContext.getAttribute(logicalname2).getValue();
        GenericspecialCharFun(data2, logicalname2, formContext, executionContext);
    }
}
function GenericspecialCharFun(str, logicalname, formContext, executionContext) {
    // let str = "hy@d";
    let fieldLength = str.length;//4
    var specialChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    for (let i = 0; i < fieldLength; i++) {
        if (specialChars.indexOf(str.charAt(i)) >= 0) {
            Xrm.Utility.alertDialog("Special characters  are not allowed in this field");
            formContext.getAttribute(logicalname).setValue(null); //clear data
            formContext.getControl(logicalname).setFocus();
            executionContext.getEventArgs().preventDefault();//validation is fail the  record not been saved
        }
    }

}


//two option set fields

function SetTheFieldRequirementLevelByGender(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var genderType = formContext.getAttribute("new_studentgender").getText();

        if (genderType == "Female") {


            formContext.getAttribute("new_passportnumber").setRequiredLevel("required");
            formContext.getAttribute("new_stdmarks").setRequiredLevel("none");
            formContext.getControl("new_studentcourse").setDisabled(true);
            formContext.getControl("new_email").setDisabled(true);

        }

        if (genderType == "Male") {

            formContext.getAttribute("new_stdmarks").setRequiredLevel("required");//mandatory
            formContext.getAttribute("new_passportnumber").setRequiredLevel("none"); // optional

            formContext.getControl("new_studentcourse").setDisabled(false);
            formContext.getControl("new_testsubmit").setVisible(true);
        }


    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}

function triggerOnGoToSave() {
    alert("Onsave function binded");

}





function GetFormDirtyFields(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var attributes = formContext.data.entity.attributes.get();
        for (var i in attributes) {
            var attribute = attributes[i];
            if (attribute.getIsDirty()) {
                Xrm.Utility.alertDialog("Attribute dirty: " + attribute.getName());
                triggerOnGoToSave();
            }
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}






function practiceBygetisdirty(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        var attributes = formContext.data.entity.attributes.get();
        for (var i in attributes) {
            var attribute = attributes[i];
            if (attribute.getIsDirty() == true) {
                Xrm.Utility.alertDialog("Attribute dirty: " + attribute.getName() + "Attribute key: " + attribute.getKey() + "userPrivilege: " + attribute.getuserPrivilege() +
                    "Attribute Format: " + attribute.getFormat());

                triggerOnGoToSave();
            }
            /*  else if (attribute.getIsDirty() == false) {
  
                  Xrm.Utility.alertDialog("Attribute is Not dirty: " + attribute.getName());
                  Xrm.Utility.alertDialog("Attribute Controls: " + attribute.getControls());
                  Xrm.Utility.alertDialog("Attribute type: " + attribute.getAttributeType());
  
              }*/
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
