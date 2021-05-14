//how to get (formname and id and entityname)
//onLoad Event
function findFormNameAndEntityNameandId(executionContext) {
    var formContext = executionContext.getFormContext();
    var formItem = formContext.ui.formSelector.getCurrentItem();
    var formid = formItem.getId();
    var formlablename = formItem.getLable();//lable name means form name
    var entityname = formContext.data.entity.getEntityName();
    Xrm.Utility.alertDialog("you selected form id:" + formid);
    Xrm.Utility.alertDialog("you selected form lablename:" + formlablename);
    Xrm.Utility.alertDialog("you selected form id:" + entityname);


}

//OPTION SET read values for label &text and value
//just bind this fun to the OnChange
function readOptionSetValueandLabel(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        //this field data type is optionset
        //get value return option set value
        var value = formContext.getAttribute("new_studentqualification").getValue();
        Xrm.Utility.alertDialog("you selected form value:" + value);
        //getText return labelname
        var label = formContext.getAttribute("new_studentqualification").getText();
        Xrm.Utility.alertDialog("you selected form label:" + label);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }

}

//OnChange Event on studentqualification
function howDoSetLabelBasedUponCondition(executionContext) {
    try {
        var formContext = executionContext.getFormContext();

        var label = formContext.getAttribute("new_studentqualification").getText();
        if (label == "MCA") {
            var course = formContext.getAttribute("new_studentcourse").setValue(1)
        }
        if (label == "Btech") {
            var course = formContext.getAttribute("new_studentcourse").setValue(2)

        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//get lookup field values
function getLookupNameandIdandEntityName(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var lookupResultArray = formContext.getAttribute("new_stdprojectid").getValue();
        var lookupid = lookupResultArray[0].id;
        var lookupName = lookupResultArray[0].name;
        var lookupEntityname = lookupResultArray[0].entityType;

    Xrm.Utility.alertDialog(lookupid);
    Xrm.Utility.alertDialog(lookupName);
    Xrm.Utility.alertDialog(lookupEntityname);
}catch (e) {
    Xrm.Utility.alertDialog(e.message);
}
}
//set default values to lookup field
function setLookUpFieldValue(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var projectlookup = new Array();
        projectlookup[0] = new Object();
        projectlookup[0].id = "DFB37863-95A5-EB11-9442-6045BD72B362";
        projectlookup[0].name = "Moblie Development";
        projectlookup[0].entityType = "new_stdproject";
        formContext.getAttribute("new_stdprojectid").setValue(projectlookup);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
