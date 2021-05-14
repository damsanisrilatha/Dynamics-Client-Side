// JavaScript source code
function defaultGenericfun(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var formType = formContext.ui.getFormType();
        if (formType == 1) {
            alert("display form type:" + formType);
            formContext.getControl("new_studentcourse").setVisible(false);
            formContext.getControl("new_stdmarks").setVisible(false);
            formContext.getControl("new_email").setVisible(false);
            formContext.getControl("new_studentqualification").setVisible(false);
        }
        if (formType == 2)
        {
            alert("display form type:" + formType)
            formContext.getControl("new_studentcourse").setVisible(true);
            formContext.getControl("new_stdmarks").setVisible(true);
            formContext.getControl("new_email").setVisible(true);
            formContext.getControl("new_studentqualification").setVisible(true);
        }
        /*if (formType == 3) {
            alert("display form type:" + formType);//we cant do any changes because readonly 

        }*/

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
function disablefieldsExample(executionContext) {
try {
    var formContext = executionContext.getFormContext();
   
    //var recordguid = formContext.data.entity.getId();
    var formType = formContext.ui.getFormType();
    if (formType == 1) {
        alert("display form type:" + formType); 
        formContext.getControl("new_studentcourse").setDisabled(true);
        formContext.getControl("new_studentqualification").setDisabled(true);
        formContext.getControl("new_email").setDisabled(true);
        formContext.getControl("new_stdmarks").setDisabled(true);
        var name = formContext.getAttribute("new_name").getValue();
        alert("name:" + name);
    }
    if (formType == 2) {
        alert("display form type:" + formType);
        formContext.getControl("new_studentcourse").setDisabled(true);
        formContext.getControl("new_studentqualification").setDisabled(false);
        formContext.getControl("new_email").setDisabled(true);
        formContext.getControl("new_stdmarks").setDisabled(true);
        
    }
    
}
catch (e) {
    Xrm.Utility.alertDialog(e.message);
}
}
//OnChange if am select one label text another optionset value it will update optionset text
function updatestdQualificationbycourse(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var qualificationLable = formContext.getAttribute("new_studentqualification").getText()
        if (qualificationLable == "MCA") {
            var coursevalue = formContext.getAttribute("new_studentcourse").setValue(1);
            formContext.getControl("new_email").setDisabled(false);
            formContext.getControl("new_stdmarks").setDisabled(true);
            formContext.getAttribute("new_stdmarks").setValue(null);
        }
        if (qualificationLable == "Btech") {
            var coursevalue = formContext.getAttribute("new_studentcourse").setValue(2);
            formContext.getControl("new_stdmarks").setDisabled(false);
            formContext.getControl("new_email").setDisabled(true);
            formContext.getAttribute("new_email").setValue(null);
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
//bind to the Onload event

function removelabelAddlabelToUsers(executionContext) {
    var formContext = executionContext.getFormContext();
    var XrmuserSettings = Xrm.Utility.getGlobalContext().userSettings;
    var userName = XrmuserSettings.userName;
    var userid = XrmuserSettings.userId;
    var usersecurityrolename = XrmuserSettings.securityRole;
    alert("logged in user id is:" + userid + "logged username:" + userName);
    alert("usersecurityrolename::" + usersecurityrolename);
    if (userName == "Mimmy Sree") {
        formContext.getControl("new_studentqualification").removeOption(1);
    }
    if (userName == "Srini karra") {
        formContext.getControl("new_studentqualification").addOption({ value: 1, text: 'MCA' });

    }

}
bind the function to the onchange event OF STDQUALIFICATION
function addOptionforLabelUsingaddOption(executionContext) {
    var formContext = executionContext.getFormContext();
    var label = formContext.getAttribute("new_studentqualification").getText();
    if (label == "MCA") {
        formContext.getControl("new_studentcourse").addOption({ value: 1, text: 'DYNAMICS' });
    }
}