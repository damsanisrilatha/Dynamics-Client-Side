
//only alphabets'new_lastname','new_city'

function AlphabetsValidations(executionContext,logicalname1,logicalname2) {

    var formContext = executionContext.getFormContext();

    if (formContext.getAttribute(logicalname1).getValue() != null) {
        var NameValue = formContext.getAttribute(logicalname1).getValue();
        checkAlphabetsOnlyorNot(executionContext, NameValue, logicalname1, formContext);
    }
    if (formContext.getAttribute(logicalname2).getValue() != null) {
        var cityValue = Xrm.Page.getAttribute(logicalname2).getValue();
        checkAlphabetsOnlyorNot(executionContext, cityValue, logicalname2, formContext);
    }
   


}
function checkAlphabetsOnlyorNot(executionContext, fieldValue, fieldlogicalname, formContext) {

    var regex = /^[a-zA-Z]*$/;
    if (!regex.test(fieldValue)) {
        Xrm.Utility.alertDialog("Please enter only alpha bets");
        formContext.getAttribute(fieldlogicalname).setValue(null);
        formContext.getControl(fieldlogicalname).setFocus();
        executionContext.getEventArgs().preventDefault();

    }
}

//============only capitalletters are allowed
function capitalAlphabetsByName(executionContext) {

    var formContext = executionContext.getFormContext();

    if (formContext.getAttribute("new_name").getValue() != null) {
        var NameValue = formContext.getAttribute("new_name").getValue();
        capitalLetters(executionContext, NameValue, "new_name", formContext);
    }
}
function capitalLetters(executionContext, fieldValue, fieldlogicalname, formContext) {

    var regex = /^[A-Z]*$/;
    if (!regex.test(fieldValue)) {
        Xrm.Utility.alertDialog("Please enter only alpha bets");
        formContext.getAttribute(fieldlogicalname).setValue(null);
        formContext.getControl(fieldlogicalname).setFocus();
        executionContext.getEventArgs().preventDefault();

    }
}
//=========================capitallettersandnumbers1to5
function capitalAlphabetandNumbers(executionContext) {

    var formContext = executionContext.getFormContext();

    if (formContext.getAttribute("new_name").getValue() != null) {
        var NameValue = formContext.getAttribute("new_name").getValue();
        capitalLettersAndNumbers1To5(executionContext, NameValue, "new_name", formContext);
    }
}
function capitalLettersAndNumbers1To5(executionContext, fieldValue, fieldlogicalname, formContext) {

    var regex = /^[A-Z 1-5]*$/;
    if (!regex.test(fieldValue)) {
        Xrm.Utility.alertDialog("Please enter only alpha bets");
        formContext.getAttribute(fieldlogicalname).setValue(null);
        formContext.getControl(fieldlogicalname).setFocus();
        executionContext.getEventArgs().preventDefault();

    }
}


//new_adharcardno
//Restricts user to enter only numbers to the specified field like debitcardnumber , phonenumber , adhar number , pin number.
function AllowOnlyNumberORIntegers(executionContext,logicalname1) {

    var formContext = executionContext.getFormContext();

    var fieldData = formContext.getAttribute(logicalname1).getValue();

    if (fieldData != null) {
       
        AllowOnlyNumberValidation(executionContext, logicalname1, fieldData,Context);
    }

}
//Validation script
function AllowOnlyNumberValidation(executionContext, fieldlogicalname, fieldvalue, formContext) {

    if (fieldvalue != null) {

        var isANumber = isNaN(fieldvalue) === false;

        if (!isANumber) {

            alert('This field must be numeric.');

            formContext.getAttribute(fieldlogicalname).setValue(null);
            formContext.getControl(fieldlogicalname).setFocus();
            eContext.getEventArgs().preventDefault();

        }
    }
}
//new_adharcardno','new_mobileno'
function AllowOnlyNumberORIntegers(executionContext, logicalname1) {

    var formContext = executionContext.getFormContext();

    var fieldvalue = formContext.getAttribute(logicalname1).getValue();

    if (fieldvalue != null) {

        AllowOnlyNumberValidation(executionContext, logicalname1, fieldvalue, formContext);
    }

}
//Validation script
function AllowOnlyNumberValidation(executionContext, fieldname, fieldvalue, formContext) {

    if (fieldvalue != null) {

        var isANumber = isNaN(fieldvalue);
         {
            if (isANumber == true) {


                alert('This field must be numeric.');

                formContext.getAttribute(fieldname).setValue(null);
                formContext.getControl(fieldname).setFocus();
                executionContext.getEventArgs().preventDefault();
            }
        }
    }
}

function preventAutoSave(executionContext) {

    var eventArgs = executionContext.getEventArgs();

    if (eventArgs.getSaveMode() == 70) { // equal to 70  = autosave

        eventArgs.preventDefault(); // disabled the autosaving at form level

    }

}
//=====================length

function lengthValidation(executionContext, logicalname1) {
    var formContext = executionContext.getFormContext();
    var data = formContext.getAttribute(logicalname1).getValue();
    var fieldLength = data.length;
    if (fieldLength != null) {
        checklengthvalidation(fieldLength, logicalname1, executionContext, formContext);
    }
}

function checklengthvalidation(fieldData, logicalname, executionContext, formContext) {
    if (fieldData < 10) {
        alert("yes correct::you can enter the data below 10 digits");
        formContext.getAttribute(logicalname).setValue(null);
        formContext.getControl(logicalname).setFocus();
       
        executionContext.getEventArgs().preventDefault();
    }
    if (fieldData > 10) {
        alert("should not enter more than 10 digits");
        formContext.getAttribute(logicalname).setValue(null);
        formContext.getControl(logicalname).setFocus();
    }
}
//=================characers and numbers allowed to field   new_passport
//Restricts user to enter not only integers but user should have to enter  atleast one alphabets like panumber,passport...create fields with single line of text datatype
function AllowLetterAndNumbers(executionContext,logicalname) {
    var formContext = executionContext.getFormContext();
    var fieldValue = formContext.getAttribute(logicalname).getValue();
    if (fieldValue != null) {
        AllowLetterValidation(fieldValue, executionContext, formContext, logicalname);
    }
}
//^[a-zA-Z0-9]*$
//Validation script
function AllowLetterValidation(valueoFfield, executionContext, formContext, fieldname) {
    var regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(valueoFfield)) {
        formContext.getAttribute(fieldname).setValue(null);
        alert('This field must be characteristics and please enter atleast one alphabets ');
        formContext.getControl(fieldname).setFocus();
        executionContext.getEventArgs().preventDefault();
    }

}
//


//just bind this function onchange vent of DOB
function DOBValidation(executionContext) {

    var formContext = executionContext.getFormContext();

    var customerDOB = formContext.getAttribute("new_customerdob").getValue(); //Xrm.Page.data.entity.attributes.get("new_lcdob").getValue();

    if (customerDOB == null)
        return true;
    //0123456789 10 11+1
    var DOBDate = new Date(customerDOB.getMonth() + "/" + customerDOB.getDate() + "/" + customerDOB.getFullYear());

    //here SystemDate
    var dateTimeNow = new Date();

    var todaysDate = new Date(dateTimeNow.getMonth()  + "/" + dateTimeNow.getDate() + "/" + dateTimeNow.getFullYear());
    //05/05/2021 here date Now = todays date
    if (customerDOB != null && customerDOB >= todaysDate) {
        alert("Please enter valid date of birth it should not be future date");
        formContext.getAttribute("new_customerdob").setValue(null);
        formContext.getControl("new_customerdob").setFocus();
    }
}


