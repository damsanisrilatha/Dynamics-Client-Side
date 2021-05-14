// JavaScript source code
//we have to bid this fun is company entity
//when we select companyname then we will get info of companydetails
//onchange event of companyname
function retriveDataFromAnotherEntity(executionContext) {
    var formContext = executionContext.getFormContext();
    var companyDetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_companies'>" +
        "    <attribute name='new_companiesid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_managerid' />" +
        "    <attribute name='new_companymobileno' />" +
        "    <attribute name='new_companyemailid' />" +
        "    <attribute name='new_companycity' />" +
        "    <attribute name='new_companyname' />" +
        "    <attribute name='new_companyid' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='new_companiesid' operator='eq' uiname='Tcs' uitype='new_companies' value='{700D35A2-E8B0-EB11-8236-6045BD727DE9}' />" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"
    var fetchresult = XrmServiceToolkit.Soap.Fetch(companyDetails);
    var fetchresultCount = fetchresult.length;

    if (fetchresultCount > 0) {
        var companyEmailId = fetchresult[0].attributes['new_companyemailid'].value;
        var companyMobileno = fetchresult[0].attributes['new_companymobileno'].value;
        var companyCity = fetchresult[0].attributes['new_companycity'].value;
        /* var manager = fetchresult[0].attributes['new_managerid'].value;
         alert(companyEmailId);
         alert(companyMobileno);
         alert(companyCity);
         alert(manager);
 */
        formContext.getAttribute("new_empmobileno").setValue(companyMobileno);
        formContext.getAttribute("new_empcompanycity").setValue(companyCity);
        formContext.getAttribute("new_empcompany_emailid").setValue(companyEmailId);

    }
}
//=============================



function howdoyougetLookup(executionContext) {
    var formContext = executionContext.getFormContext();

    var getlookupdata = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_companies'>" +
        "    <attribute name='new_companiesid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_managerid' />" +
        "    <attribute name='new_companymobileno' />" +
        "    <attribute name='new_department' />" +
        "    <attribute name='new_companyemailid' />" +
        "    <attribute name='new_companycity' />" +
        "    <attribute name='new_companyname' />" +
        "    <attribute name='new_companyid' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='new_companiesid' operator='eq' uiname='Tcs' uitype='new_companies' value='{700D35A2-E8B0-EB11-8236-6045BD727DE9}' />" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"
    var fetchLookupResults = XrmServiceToolkit.Soap.Fetch(getlookupdata);
    var findLength = fetchLookupResults.length;
    if (findLength > 0) {
        // manager id
        var ManagerID = fetchLookupResults[0].attributes['new_managerid'].id;
        // Manager Name
        var ManagerName = fetchLookupResults[0].attributes['new_managerid'].name;
        /*alert(ManagerID);
        alert(ManagerName);
        formContext.getAttribute("new_managerid").setValue(ManagerID);
        formContext.getAttribute("new_managerid").setValue(ManagerName);*/
        SetLookUp(ManagerID, ManagerName, formContext)
    }
}
function SetLookUp(ManagerID, ManagerName, formContext) {
    try {


        var object = new Array();
        object[0] = new Object();

        object[0].id = ManagerID;//lookup id or record ID of Loan Officer for Example prasad anki reddy
        object[0].name = ManagerName;// lookupname or recprd name
        object[0].entityType = "new_manager"; //parent entity name

        formContext.getAttribute("new_managerid").setValue(object);

    }
    catch (e) {
        alert("Error in SetLookUp: fieldName = " + fieldName + " fieldType = " + fieldType + " fieldId = " + fieldId + " value = " + value + " error = " + e);
    }
}
//========================
function howdoyougetoptionSet(executionContext) {
    var formContext = executionContext.getFormContext();

    var getOptionSet = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_companies'>" +
        "    <attribute name='new_companiesid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_managerid' />" +
        "    <attribute name='new_companymobileno' />" +

        "    <attribute name='new_companyemailid' />" +
        "    <attribute name='new_departmentsincompany' />" +
        "    <attribute name='new_companycity' />" +
        "    <attribute name='new_companyname' />" +
        "    <attribute name='new_companyid' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='new_companiesid' operator='eq' uiname='Tcs' uitype='new_companies' value='{700D35A2-E8B0-EB11-8236-6045BD727DE9}' />" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"
    var fetchOptionSetResults = XrmServiceToolkit.Soap.Fetch(getOptionSet);
    var optionsetLength = fetchOptionSetResults.length;
    if (optionsetLength > 0) {
        //values like 1,2
        var departmentvalue = fetchOptionSetResults[0].attributes['new_departmentsincompany'].value;
        //text string 0r label
        var departmentTestOrLabel = fetchOptionSetResults[0].attributes['new_departmentsincompany'].formattedValue;

        //alert(departmentvalue);
        //alert(departmentTestOrLabel);
        formContext.getAttribute("new_employe_dept").setValue(departmentvalue);
        //formContext.getAttribute("new_employe_dept").setValue(departmentTestOrLabel);
    }
}
//===========================generic method retrive another entity data
function selectedLookupData(executionContext) {

    var formContext = executionContext.getFormContext();

    var companyLookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;

    var companylookupdetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_companies'>" +
        "    <attribute name='new_companiesid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_managerid' />" +
        "    <attribute name='new_companymobileno' />" +
        "    <attribute name='new_departmentsincompany' />" +
        "    <attribute name='new_companyemailid' />" +
        "    <attribute name='new_companycity' />" +
        "    <attribute name='new_companyname' />" +
        "    <attribute name='new_companyid' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='new_companiesid' operator='eq'  uitype='new_companies' value='" + companyLookupId + "' />" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"


    var Results = XrmServiceToolkit.Soap.Fetch(companylookupdetails); // this function will take care about to fetch

    if (Results.length > 0) {
        var companyEmailId = Results[0].attributes['new_companyemailid'].value;
        var companyMobileno = Results[0].attributes['new_companymobileno'].value;
        var companyCity = Results[0].attributes['new_companycity'].value;
        var departmentvalue = Results[0].attributes['new_departmentsincompany'].value;
        var departmentTestOrLabel = Results[0].attributes['new_departmentsincompany'].formattedValue;
        var ManagerID = Results[0].attributes['new_managerid'].id;
        var ManagerName = Results[0].attributes['new_managerid'].name;

        formContext.getAttribute("new_empmobileno").setValue(companyMobileno);
        formContext.getAttribute("new_empcompanycity").setValue(companyCity);
        formContext.getAttribute("new_empcompany_emailid").setValue(companyEmailId);
        formContext.getAttribute("new_employe_dept").setValue(departmentvalue);

        SetLookUp(ManagerID, ManagerName, formContext);
    }
}

function validatetheageCompanyBranhes(executionContext) {

    var formContext = executionContext.getFormContext();
    var companyBranchLookupId = null;
    var companyYears = null;
    var companyBranch = formContext.getAttribute("new_companybranchesid").getValue();
    //var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue()[0].id;
    if (companyBranch) {
        companyBranchLookupId = companyBranch[0].id;
    }
    var calculateManyYearsbranch = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_companybranches'>" +
        "    <attribute name='new_companybranchesid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_minmumyears' />" +
        "    <attribute name='new_maximumyears' />" +
        "    <attribute name='new_branchlocation' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='new_companybranchesid' operator='eq'  uitype='new_companybranches' value='companyBranchLookupId' />" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"
    var fetch_Results = XrmServiceToolkit.Soap.Fetch(calculateManyYearsbranch);

    if (fetch_Results.length > 0) {

        var branchminimumyears = fetch_Results[0].attributes['new_minmumyears'].value;

        var branchmaximummumyears = fetch_Results[0].attributes['new_maximumyears'].value;
    }

    if (formContext.getAttribute("new_emp_dob").getValue() != null) {

        var comDob = formContext.getAttribute("new_emp_dob").getValue();

        var currentDate = new Date();

        //to getting customer age by using CalculateAge function and passing the Customer DOb and Current Date
        companyYears = CalculateYear(comDob, currentDate);
    }
    if (companyYears < branchminimumyears) {
        alert("branch year should be more  than " + branchminimumyears);
        formContext.getAttribute("new_emp_dob").setValue(null);
        //
    }

    if (companyYears > branchmaximummumyears) {
        alert("branch year should not be more  than " + branchmaximummumyears);
        formContext.getAttribute("new_emp_dob").setValue(null);

    }

}




function CalculateYear(comDob, currentDate) {
    if (currentDate == null) {
        currentDate = new Date();
    }
    if (currentDate < comDob) {
        return 0;
    }
    var age = currentDate.getFullYear() - comDob.getFullYear();
    if (comDob.getMonth() > currentDate.getMonth() || (comDob.getMonth() == currentDate.getMonth() && comDob.getDate() > currentDate.getDate())) {
        age--;
    }
    return age;
}