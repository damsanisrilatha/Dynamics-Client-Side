// JavaScript source code

function employeonVacation(executionContext) {
    var formContext = executionContext.getFormContext();
    var companyNameLookupId = formContext.getAttribute("new_companynameid").getValue()[0].id;
   
        var companyDeails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "  <entity name='new_companies'>" +
            "    <attribute name='new_companiesid' />" +
            "    <attribute name='new_name' />" +
            "    <attribute name='createdon' />" +
            "    <attribute name='new_vacation' />" +
            "    <attribute name='new_managerid' />" +
            "    <attribute name='new_departmentsincompany' />" +
            "    <attribute name='new_companymobileno' />" +
            "    <attribute name='new_companyemailid' />" +
            "    <attribute name='new_companycity' />" +
            "    <attribute name='new_companybranheid' />" +
            "    <attribute name='new_companyname' />" +
            "    <attribute name='new_companylocation' />" +
            "    <attribute name='new_companyid' />" +
            "    <order attribute='new_name' descending='false' />" +
            "    <filter type='and'>" +
            "      <condition attribute='new_companiesid' operator='eq'  uitype='new_companies' value='" + companyNameLookupId + "' />" +
            "    </filter>" +
            "  </entity>" +
            "</fetch>"
        var fetchresult = XrmServiceToolkit.Soap.Fetch(companyDeails);
        var fetchresultCount = fetchresult.length;

        if (fetchresultCount > 0) {
            var isinvacation = fetchresult[0].attributes['new_vacation'].value;

            if (isinvacation == true) {
                formContext.getControl("new_jobtitle").setDisabled(true);
                executionContext.getEventArgs().preventDefault();
            }
        }

}




function findBusinessUnit(executionContext) {
    var formContext = executionContext.getFormContext();
    var userLookupId = formContext.getAttribute("new_userid").getValue()[0].id;
    var findUserDetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='systemuser'>" +
        "    <attribute name='fullname' />" +
        "    <attribute name='businessunitid' />" +
        "    <attribute name='title' />" +
        "    <attribute name='address1_telephone1' />" +
        "    <attribute name='positionid' />" +
        "    <attribute name='systemuserid' />" +
        "    <order attribute='fullname' descending='false' />" +
        "    <filter type='and'>" +
        "      <condition attribute='systemuserid' operator="+userLookupId +"/>" +
        "    </filter>" +
        "  </entity>" +
        "</fetch>"
    var result = XrmServiceToolkit.Soap.Fetch(findUserDetails);
    var resultCount = result.length;

    //boolean isUserHasMarutiBU = false;

    for (var i = 0; i < resultCount; i++) {
        var UserBusinessUnit = result[i].attributes['businessunitid'].name;
        if (UserBusinessUnit == "Maruti Showroom") {
            //isUserHasMarutiBU = true;
            var userid = result[i].attributes['systemuserid'].value;
            var userName = result[i].attributes['fullname'].value;
            alert(userid);
            alert(userName);
            formContext.getControl("new_jobtitle").setDisabled(true);
            formContext.getAttribute("new_gender").setValue(null);
        }
        else if (UserBusinessUnit == "MarutiBeng") {
            var id = result[i].attributes['systemuserid'].value;
            var Name = result[i].attributes['fullname'].value;
            alert(id);
            alert(Name);
            formContext.getControl("new_gender").setDisabled(true);
            formContext.getAttribute("new_jobtitle").setValue(null);
        }
    }
  //======================
    function findBusinessUnit(executionContext) {
        var formContext = executionContext.getFormContext();
        var userLookupId = formContext.getAttribute("new_userid").getValue()[0].id;
        var findUserDetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "  <entity name='systemuser'>" +
            "    <attribute name='fullname' />" +
            "    <attribute name='businessunitid' />" +
            "    <attribute name='title' />" +
            "    <attribute name='address1_telephone1' />" +
            "    <attribute name='positionid' />" +
            "    <attribute name='systemuserid' />" +
            "    <order attribute='fullname' descending='false' />" +
            "    <filter type='and'>" +
            "      <condition attribute='systemuserid' operator=" + userLookupId + "/>" +
            "    </filter>" +
            "  </entity>" +
            "</fetch>"
        var result = XrmServiceToolkit.Soap.Fetch(findUserDetails);
        var resultCount = result.length;

        //boolean isUserHasMarutiBU = false;

        for (var i = 0; i < resultCount; i++) {
            var UserBusinessUnit = result[i].attributes['businessunitid'].name;
            if (UserBusinessUnit == "Maruti Showroom") {
                //isUserHasMarutiBU = true;
                var userid = result[i].attributes['systemuserid'].value;
                var userName = result[i].attributes['fullname'].value;
                alert(userid);
                alert(userName);
                formContext.getControl("new_jobtitle").setDisabled(true);

            }
            else if (UserBusinessUnit == "MarutiBeng") {
                formContext.getControl("new_gender").setDisabled(true);

            }
        }

    }   



    function findBusinessUnit(executionContext) {
        formContext.getControl("new_jobtitle").setDisabled(false);
        formContext.getControl("new_gender").setDisabled(false);
        var formContext = executionContext.getFormContext();
        var selectedGuidId = formContext.getAttribute("new_userid").getValue()[0].id;
        var userName = formContext.getAttribute("new_userid").getValue()[0].name;
        var lookupDetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
            "  <entity name='systemuser'>" +
            "    <attribute name='fullname' />" +
            "    <attribute name='businessunitid' />" +
            "    <attribute name='title' />" +
            "    <attribute name='address1_telephone1' />" +
            "    <attribute name='positionid' />" +
            "    <attribute name='systemuserid' />" +
            "    <order attribute='fullname' descending='false' />" +
            "    <filter type='and'>" +
            "      <condition attribute='systemuserid' operator='eq' uiname=" + userName + " uitype='systemuser' value=" + selectedGuidId + " />" +
            "    </filter>" +
            "  </entity>" +
            "</fetch>"
        var result = XrmServiceToolkit.Soap.Fetch(lookupDetails);
        var resultCount = result.length;

        //replcaing braces
        selectedGuidId = selectedGuidId.replace('{', '')
        selectedGuidId = selectedGuidId.replace('}', '')

        for (var i = 0; i < resultCount; i++) {
            var userid = result[i].attributes['systemuserid'].value;
            if (selectedGuidId.toLowerCase() == userid) {
                var UserBusinessUnit = result[i].attributes['businessunitid'].name;
                if (UserBusinessUnit == "Maruti Showroom") {
                    var userid = result[i].attributes['systemuserid'].value;
                    var userName = result[i].attributes['fullname'].value;
                    console.log("Maruti Showroom", userid, userName);
                    formContext.getControl("new_jobtitle").setDisabled(true);
                }
                else if (UserBusinessUnit == "MarutiBeng") {
                    var id = result[i].attributes['systemuserid'].value;
                    var Name = result[i].attributes['fullname'].value;
                    console.log("MarutiBeng user details ", id, Name);

                    formContext.getControl("new_gender").setDisabled(true);
                }
            }
        }

    }      
