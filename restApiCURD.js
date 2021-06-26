// JavaScript source code
function updatecompanyRecordformEmploye(executionContext) {
    var formContext = executionContext.getFormContext();
    //employe in 
    var companylookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;
    var employename = formContext.getAttribute("new_name").getValue();

    var Company = {};
    Company.new_name = employename;//am passing employename
    Company.new_departmentsincompany = { Value: 1 };
    XrmServiceToolkit.Rest.Update(companylookupId, Company, "new_companiesSet", function () {
        //Success - No Return Data - Do Something
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, true);
}





function updateOptionsetType(executionContext) {
    var formContext = executionContext.getFormContext();
    
    var companylookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;
    var employename = formContext.getAttribute("new_name").getValue();
    var empdept = formContext.getAttribute("new_employe_dept").getValue();//company dept

    var Company = {};
    Company.new_name = employename;//am passing employename
    Company.new_departmentsincompany = { Value: empdept };//passing empdept
    XrmServiceToolkit.Rest.Update(companylookupId, Company, "new_companiesSet", function () {
        //Success - No Return Data - Do Something
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, true);
}


//retrive 
function RetrieveDatafromRelatedentity(executionContext) {//emp qualification onchange
    var formContext = executionContext.getFormContext();
    var loanOfficerLookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;
    

    XrmServiceToolkit.Rest.Retrieve(loanOfficerLookupId, "new_companiesSet", "new_departmentsincompany,new_name", null, function (result) {
        var new_departmentsincompany = result.new_departmentsincompany;
        var new_name = result.new_name;
        alert(new_name);
        alert(new_departmentsincompany.Value);
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, true);

}


//sir code
function RetrieveDatafromRelatedentity(executionContext) {
    var formContext = executionContext.getFormContext();
    var loanOfficerLookupId = formContext.getAttribute("new_loanofficerid").getValue()[0].id;

    XrmServiceToolkit.Rest.Retrieve(loanOfficerLookupId, "new_loanofficerSet", "new_DepartmentType,new_name", null, function (result) {
     var   new_DepartmentType = result.new_DepartmentType;
        var new_name = result.new_name;
        alert(new_name);
        alert(new_DepartmentType.Value);
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, true);
    
   
}

function deleteEmloye()
{
    var formContext = executionContext.getFormContext();
    var loanOfficerLookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;

    XrmServiceToolkit.Rest.Delete(loanOfficerLookupId, "new_companiesSet", function () {
        //Success - No Return Data - Do Something
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, true);

}

function retriveMultipleDemo() {//workimg type
    XrmServiceToolkit.Rest.RetrieveMultiple("new_employeesSet", "?$select=new_name&$filter=new_Emp_LoanType/Value eq 5", function (results) {
        for (var i = 0; i < results.length; i++) {
            var new_name = results[i].new_name;
            alert(new_name);
        }
    }, function (error) {
        Xrm.Utility.alertDialog(error.message);
    }, function () {
        //On Complete - Do Something
    }, true);
}

function RetrieveMultipleInWebApi() {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons?$select=new_name,_new_productnameid_value&$filter=new_workingtype eq 2", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var new_name = results.value[i]["new_name"];
                    var _new_productnameid_value = results.value[i]["_new_productnameid_value"];
                    var _new_productnameid_value_formatted = results.value[i]["_new_productnameid_value@OData.Community.Display.V1.FormattedValue"];
                    var _new_productnameid_value_lookuplogicalname = results.value[i]["_new_productnameid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    alert(new_name);
                    alert(_new_productnameid_value);
                    alert(_new_productnameid_value_formatted);
                    alert(_new_productnameid_value_lookuplogicalname);
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}