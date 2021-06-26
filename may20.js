// JavaScript source code
//multi update,delete,and association ,and deassociation in web api
//bind in paymentoption

function retriveMultiple() {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons?$filter=new_workingtype eq 2", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var new_salespersonid = results.value[i]["new_salespersonid"];
                    updatemultiple(new_salespersonid);
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}

function bulkupdate(new_salespersonid) {
    var entity = {};
    entity.new_workingtype = 1;

    var req = new XMLHttpRequest();
    req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(" + new_salespersonid+")", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                //Success - No Return Data - Do Something
                alert("successfully updated")
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
}


//============delete
function deleteInWebApi(executionContext) {
var formContext = executionContext.getFormContext();
    var salespersonLookup = formContext.getAttribute("new_salespersonid").getValue()[0].id;
    salesperson = salespersonLookup.substring(1, 37);
var req = new XMLHttpRequest();
    req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(" + salesperson+")", true);
req.setRequestHeader("Accept", "application/json");
req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
req.setRequestHeader("OData-MaxVersion", "4.0");
req.setRequestHeader("OData-Version", "4.0");
req.onreadystatechange = function () {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 204 || this.status === 1223) {
            //Success - No Return Data - Do Something
            alert("record is deleted");
        } else {
            Xrm.Utility.alertDialog(this.statusText);
        }
    }
};
req.send();
}
//===================================associate
function association(new_customersid) {
    var association = {
        "@odata.id": Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_customerses(" + new_customersid+")"//child record id
    };
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(78cd5361-b3b7-eb11-8236-6045bd72aa6a)/new_new_salesperson_new_customers/$ref", true);//parent entity user guid
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
                alert("Association happended");

               
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(association));
}

//check box (two option set)(true or false) ***if optionset values(1,3,4,)
function customerGender() {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_customerses?$select=new_customergender,new_customersid&$filter=new_customergender eq true", true);
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
                    var new_customergender = results.value[i]["new_customergender"];
                    var new_customergender_formatted = results.value[i]["new_customergender@OData.Community.Display.V1.FormattedValue"];
                    var new_customersid = results.value[i]["new_customersid"];
                    association(new_customersid);
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();

   }


function associationExample() {
    var association = {
        "@odata.id": Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_customerses(b3fd2d28-a1aa-eb11-9442-6045bd72b362)"//child record id
    };
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(292bd26c-bab7-eb11-8236-6045bd72aa6a)/new_new_salesperson_new_customers/$ref", true);//parent entity user guid
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(association));
}


function DeAssociateExample() {

    var req = new XMLHttpRequest();
    req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(292bd26c-bab7-eb11-8236-6045bd72aa6a)/new_new_salesperson_new_customers(1bf98eb1-08ab-eb11-8236-0022486ec437)/$ref", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}



function deassociation(new_customersid) {
    var req = new XMLHttpRequest();
    req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_salespersons(292bd26c-bab7-eb11-8236-6045bd72aa6a)/new_new_salesperson_new_customers("+new_customersid+")/$ref", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}
//deassociate form customer customer type option set
function retrivemultipledeDeAssociate() {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_customerses?$select=new_customersid,new_customertype&$filter=new_customertype eq 1", true);
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
                    var new_customersid = results.value[i]["new_customersid"];
                    var new_customertype = results.value[i]["new_customertype"];
                    var new_customertype_formatted = results.value[i]["new_customertype@OData.Community.Display.V1.FormattedValue"];

                    deassociation(new_customersid);
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();


}




function loggedInUserID(executionContext) {
    var formContext = executionContext.getFormContext();
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var userID = userSettings.userId; //logged in User Name  
    alert(userID);
}

function impersonateuser() {
    
    var entity = {};
    entity.new_name = "aasa";

    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_customerses", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("MSCRMCallerID", "E4CBA3E7-4EA0-EB11-B1AC-6045BD72C48E");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                var uri = this.getResponseHeader("OData-EntityId");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(uri);
                var newEntityId = matches[1];
                alert("record created" + newEntityId)
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
    
}




function impersonateuser() {
    var entity = {};
    entity.new_name = "kavya Reddy";

    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/new_loancustomers", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("MSCRMCallerID", "FD8761BE-D9B6-EB11-8236-6045BD72A669");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                var uri = this.getResponseHeader("OData-EntityId");
                var regExp = /\(([^)]+)\)/;
                var matches = regExp.exec(uri);
                var newEntityId = matches[1];
                alert("record is created" + newEntityId);
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));
}