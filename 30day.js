

function defaultLocked(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        var formType = formContext.ui.getFormType();
        if (formType == 1) {

            formContext.getControl("new_passportnumber").setDisabled(true);
            formContext.getControl("new_pancardno").setDisabled(true);
        }

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
// JavaScript source code
//if Check box true lock and if false unlock the fields


//if Check box true lock and if false unlock the fields

function twoOptionSetCheckBox(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        //var formType = formContext.ui.getFormType();
        if (formContext.getAttribute("new_studentgender").getValue() == true) {
            formContext.getControl("new_passportnumber").setDisabled(false);
            formContext.getControl("new_pancardno").setDisabled(true);
            formContext.getAttribute("new_pancardno").setValue(null);

        }
        if (formContext.getAttribute("new_studentgender").getValue() == false) {
            formContext.getControl("new_passportnumber").setDisabled(true);
            formContext.getControl("new_pancardno").setDisabled(false);
            formContext.getAttribute("new_passportnumber").setValue(null);

        }

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}

function twoOptionSetRadioButton(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        //var formType = formContext.ui.getFormType();
        if (formContext.getAttribute("new_studentsections").getValue() == true) {
            formContext.getControl("new_stdmarks").setDisabled(true);
            formContext.getControl("new_stdpercentage").setDisabled(false);
            formContext.getAttribute("new_stdmarks").setValue(null);

        }
        if (formContext.getAttribute("new_studentsections").getValue() == false) {
            formContext.getControl("new_stdpercentage").setDisabled(true);
            formContext.getControl("new_stdmarks").setDisabled(false);
        
            formContext.getAttribute("new_stdpercentage").setValue(null);

        }

    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
function enableDisableSectionsByFormTypeOnFormLoadEvent(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        
        var formType = formContext.ui.getFormType();
      
        var tab = formContext.ui.tabs.get("tab_2");
        var section1 = tab.sections.get("QualificationMasterSection");
        var section2 = tab.sections.get("QualificationBtechSection");

        if (formType == 1) {

            section1.setVisible(false);
            section2.setVisible(false);
        }
          else if (formType == 2) {
            section1.setVisible(true);
            section2.setVisible(true);

        }
    } catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}



function enableDisableSectionsByQualificationOnQualificationChangeEvent(executionContext) {
    var formContext = executionContext.getFormContext();
    var qualification = formContext.getAttribute("new_studentqualification").getText();
    var tab = formContext.ui.tabs.get("tab_2");//tab name
    var section1 = tab.sections.get("QualificationMasterSection");//section name
    var section2 = tab.sections.get("QualificationBtechSection");
    try {
        if (qualification == "MCA") {
            section1.setVisible(true);
            section2.setVisible(false);

        }
        else if (qualification == "Btech") {
            section1.setVisible(false);
            section2.setVisible(true);
        }
    }
    catch (e) {
        Xrm.Utility.alertDialog(e.message);
    }
}
function hideTheTabByDefault(executionContext) {
   
        var formContext = executionContext.getFormContext();
        var formType = formContext.ui.getFormType();

       /* if (formType == 1) {
            var tab = formContext.ui.tabs.get("tab_3").setVisible(false);


        }*/
        var stdqualification = formContext.getAttribute("new_studentqualification").getText();
        if (stdqualification == "MCA") {
             formContext.ui.tabs.get("tab_3").setVisible(true);
             formContext.ui.tabs.get("tab_4").setVisible(false);
        }
        else if (stdqualification == "Btech") {
            formContext.ui.tabs.get("tab_3").setVisible(false);
            formContext.ui.tabs.get("tab_4").setVisible(true);

        }

    } 