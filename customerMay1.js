// JavaScript source code
function tabsandSectionsHide(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var formType = formContext.ui.getFormType();
        if (formType == 1) {
            formContext.ui.tabs.get(CustomerLoginCredentials).setVisible(false);
        }
        else if (formType == 2) {
            formContext.ui.tabs.get(CustomerLoginCredentials).setVisible(true);
            formContext.ui.tabs.get(CustomerLoginCredentials).sections.get(tab_2_section_1).setVisible(false);

        }

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
/*function phonenumber(inputtext) {
    var phoneno = /^\d{10}$/;
    if ((inputtext.value.match(phoneno))
        {
        return true;
    }
    else {
        alert("message");
        return false;
    }
}*/
//Onchange event
function GetDateFieldValue(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Getvalue of the field here, Give field logical name here
        var dateOfBirth = formContext.getAttribute("new_customerdob").getValue();
        Xrm.Utility.alertDialog(dateOfBirth);

        Xrm.Utility.alertDialog("YEAR:" + dateOfBirth.getFullYear());
        //Get Month
        Xrm.Utility.alertDialog("Month:" + dateOfBirth.getMonth());
        //Get Date(Day)
        Xrm.Utility.alertDialog("Date:" + dateOfBirth.getDate());
        var dateOfBirth = formContext.getAttribute("new_customerdob").setValue(dateOfBirth);
        formContext.getAttribute("new_customergender").setValue(123456);

    }

    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}


    //setdefault today date   
    function setDefaultDate(executionContext) {
        var formContext = executionContext.getFormContext();
        var todayDate = new Date();
        formContext.getAttribute("new_todaydate").setValue(todayDate);
        //formContext.getAttribute("new_todaydate").setValue(new Date());
        Xrm.Utility.alertDialog("YEAR:" + todayDate.getFullYear());
        //Get Month
        Xrm.Utility.alertDialog("Month:" + todayDate.getMonth());
        //Get Date(Day)
        Xrm.Utility.alertDialog("Date:" + todayDate.getDate());
  

}
function setVisibleORsetDisabled(executionContext) {
    try{
        var formContext = executionContext.getFormContext();
        var formtype = formContext.ui.getFormType();
        if (formtype == 1) {
            formContext.getControl("new_moblieno").setVisible(false);
            formContext.getControl("new_password").setDisabled(false);
            //RequriredLevel
            formContext.getAttribute("new_customerdob").setRequiredLevel("required");
        }
        else if (formtype == 2) {
            formContext.getControl("new_moblieno").setVisible(true);
            formContext.getControl("new_password").setDisabled(true);
     

        }
    }catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}


//Navigations
function ShowHideNavigationItems(executionContext) {
    try {
        //Get the form context
        var formContext = executionContext.getFormContext();
        //Show Organizations
        formContext.ui.navigation.items.get("organizations").setVisible(true);
        //Hide Organizations
        formContext.ui.navigation.items.get("organizations").setVisible(false);
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}