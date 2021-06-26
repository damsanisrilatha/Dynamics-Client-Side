// JavaScript source code-----------bind onChange
function createRecord(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_create").getValue() == true) {
        var entity = {};
        entity.new_name = "dell";
        entity.new_CompanyCity = "kerala";
        entity.new_departmentsincompany = {
            Value: 3
        };

        XrmServiceToolkit.Rest.Create(entity, "new_companiesSet", function (result) {
            var newEntityId = result.new_companiesId;
        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        }, true);
    }
}

//=========================================================================================

//create record with same details to employe
function CreateCompanyInfo(executionContext) {


    var formContext = executionContext.getFormContext();

    var companyName = formContext.getAttribute("new_name").getValue();
    var companyCity = formContext.getAttribute("new_companycity").getValue();
   // var departmentTypeValue = formContext.getAttribute("new_departmentsincompany").getValue();

    if (formContext.getAttribute("new_create").getValue() == true) {
        var entity = {};
        entity.new_name = companyName;
        entity.new_empCompanyCity = companyCity;
       // entity.new_Emp_Qualification = { Value: departmentTypeValue };

        XrmServiceToolkit.Rest.Create(entity, "new_employeesSet", function (result) {
            var newEntityId = result.new_employeesId;

            alert("employe record created" + newEntityId);
        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        }, true);
    }
}


//=======================================================================tcs record update code
function updateRecord(executionContext) {

    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_update").getValue() == true) {
        var entity = {};
        entity.new_CompanyEmailId = "c@gmail.com";
        entity.new_CompanyCity = "mumbai";

        XrmServiceToolkit.Rest.Update("700d35a2-e8b0-eb11-8236-6045bd727de9", entity, "new_companiesSet", function () {
            //Success - No Return Data - Do Something
            alert("Success record is updated")
        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        }, true);
    }
}
//=================================
function deleteRecord(executionContext) {
    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_delete").getValue() == true) {
        XrmServiceToolkit.Rest.Delete("61adf2c4-6fb6-eb11-8236-6045bd72aa6a", "new_companiesSet", function () {
            //Success - No Return Data - Do Something
        }, function (error) {
            Xrm.Utility.alertDialog(error.message);
        }, true);
    }
}