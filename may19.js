// JavaScript source code


function createRecordSalesPerson(executionContext) {
    var formContext = executionContext.getFormContext();
    var customername = formContext.getAttribute("new_name").getValue();
    var optionset = formContext.getAttribute("new_paymentoption").getValue();
    var entity = {};
    entity.new_name = customername;
    entity.new_workingtype = optionset;

    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                var uri = this.getResponseHeader("OData-EntityId");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(uri);
                var newEntityId = matches[1];
                alert("Record Created successfully" + newEntityId);
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
}
function webApiRetriveSingle(executionContext) {
    var formContext = executionContext.getFormContext();
    var salespersonLookup = formContext.getAttribute("new_salespersonid").getValue()[0].id;
    salesperson = salespersonLookup.substring(1, 37);
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(" + salesperson + ")?$select=new_name,_new_productnameid_value,new_workingtype", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var new_name = result["new_name"];
                var _new_productnameid_value = result["_new_productnameid_value"];
                var _new_productnameid_value_formatted = result["_new_productnameid_value@OData.Community.Display.V1.FormattedValue"];
                var _new_productnameid_value_lookuplogicalname = result["_new_productnameid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                var new_workingtype = result["new_workingtype"];
                var new_workingtype_formatted = result["new_workingtype@OData.Community.Display.V1.FormattedValue"];
                alert("name::"+new_name);
                alert("prodctNameLookupd::"+_new_productnameid_value);
                alert("productNameText::"+_new_productnameid_value_formatted);
                alert("productNamelogicalname::"+_new_productnameid_value_lookuplogicalname);
                alert("Working type value::"+new_workingtype);
                alert("Working type label::" + new_workingtype_formatted);

                SetLookUp(_new_productnameid_value, _new_productnameid_value_formatted, _new_productnameid_value_lookuplogicalname, "new_managerlookup", formContext);

            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}

function SetLookUp(guid, lookupname, entityname, fieldSchema, formContext) {
    try {

        var object = new Array();
        object[0] = new Object();
        object[0].id = guid; //lookup id or record ID
        object[0].name = lookupname; // lookupname or recprd name
        object[0].entityType = entityname; //entity name

        formContext.getAttribute(fieldSchema).setValue(object);
    }
    catch (e) {
        //    alert("Error in SetLookUp: fieldName = " + fieldName + " fieldType = " + fieldType + " fieldId = " + fieldId + " value = " + value + " error = " + e);
    }
}



function webapiupdate(executionContext) {
    var formContext = executionContext.getFormContext();
    var salespersonLookup = formContext.getAttribute("new_salespersonid").getValue()[0].id;
    salesperson = salespersonLookup.substring(1, 37);
    var customerTypevalue = formContext.getAttribute("new_salespersonworktype").getValue();
    var customerTypelabel = formContext.getAttribute("new_salespersonworktype").getLabel();

    var entity = {};
    entity.new_workingtype = customerTypevalue;

    var req = new XMLHttpRequest();
    req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons("+salesperson+")", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
    alert("record is updated");

}




function webapiupdate(executionContext) {
    var formContext = executionContext.getFormContext();
    var salespersonLookup = formContext.getAttribute("new_salespersonid").getValue()[0].id;
    
    salesperson = salespersonLookup.substring(1, 37);
    var salespersonworktype = formContext.getAttribute("new_salespersonworktype").getValue();
    // var customerTypelabel = formContext.getAttribute("new_salespersonworktype").getLabel();

    var entity = {};
    entity.new_workingtype = salespersonworktype;

    var req = new XMLHttpRequest();
    req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons("+salesperson+")", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                //Success - No Return Data - Do Something
                alert("record is updated");
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
    
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
//opprotunity lo account entity lo unna primary contact job title vachi opprtunity lo unna primary contact jobtitle lo sit cheyali
//first account entity name select cheskovali
//many to one relationship teskoni job title ni select cheskovali
function getAccountPrimarycontactJobtitle(executionContext) {

    var formContext = executionContext.getFormContext();
    var accountsID = formContext.getAttribute("parentaccountid").getValue()[0].id;
    accountID = accountsID.substring(1, 37);

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts(" + accountID + ")?$select=name&$expand=primarycontactid($select=jobtitle)", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var name = result["name"];
                if (result.hasOwnProperty("primarycontactid")) {
                    var primarycontactid_jobtitle = result["primarycontactid"]["jobtitle"];
                    alert(primarycontactid_jobtitle);
                    formContext.getAttribute("new_primarycontactjobtitle").setValue(primarycontactid_jobtitle);


                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}
function getContactName(executionContext) {

    var formContext = executionContext.getFormContext();
    var accountsID = formContext.getAttribute("parentaccountid").getValue()[0].id;
    accountID = accountsID.substring(1, 37);

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts(" + accountID + ")?$select=_primarycontactid_value&$expand=primarycontactid($select=fullname)", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var contactId= result["_primarycontactid_value"];
                var contactformatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
                var contactlookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                if (result.hasOwnProperty("primarycontactid")) {
                    var fullname = result["primarycontactid"]["fullname"];
                    //formContext.getAttribute("parentcontactid").setValue(fullname);

                    SetLookUp(contactId, contactformatted, contactlookuplogicalname, "parentcontactid", fullname, formContext);
                }

               
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();


}

function SetLookUp(guid, lookupname, entityname, fieldSchema,contactName, formContext) {
    try {

        var object = new Array();
        object[0] = new Object();
        object[0].id = guid; //lookup id or record ID
        object[0].name = lookupname; // lookupname or recprd name
        object[0].entityType = entityname; //entity name
        object[0].contactName = contact;
        formContext.getAttribute("parentcontactid").setValue(object);
        
    }
    catch (e) {
        //    alert("Error in SetLookUp: fieldName = " + fieldName + " fieldType = " + fieldType + " fieldId = " + fieldId + " value = " + value + " error = " + e);
    }
}


//==========================examples retrive in web api===========

function OpprotunitywebApi(executionContext) {
    var formContext = executionContext.getFormContext();
    var accountlookup = formContext.getAttribute("parentaccountid").getValue()[0].id;
    accountGuid = accountlookup.substring(1, 37);
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts(" + accountGuid + ")?$select=name,_primarycontactid_value", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var name = result["name"];
                var _primarycontactid_value = result["_primarycontactid_value"];
                var _primarycontactid_value_formatted = result["_primarycontactid_value@OData.Community.Display.V1.FormattedValue"];
                var _primarycontactid_value_lookuplogicalname = result["_primarycontactid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                alert(name);
                alert(_primarycontactid_value);
                alert(_primarycontactid_value_formatted);
                alert(_primarycontactid_value_lookuplogicalname);
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}

function getAccountPrimarycontactJobtitle(executionContext) {

    var formContext = executionContext.getFormContext();
    var accountsID = formContext.getAttribute("parentaccountid").getValue()[0].id;
    accountID = accountsID.substring(1, 37);

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/accounts(" + accountID + ")?$select=name&$expand=primarycontactid($select=jobtitle)", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var name = result["name"];
                if (result.hasOwnProperty("primarycontactid")) {
                    var primarycontactid_jobtitle = result["primarycontactid"]["jobtitle"];
                    alert(primarycontactid_jobtitle);
                   formContext.getAttribute("new_primarycontactjobtitle").setValue(primarycontactid_jobtitle);
                

                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}