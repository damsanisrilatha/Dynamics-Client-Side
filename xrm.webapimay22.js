 // JavaScript source code

function createEmployeRecord(executionContext) {

    var formContext = executionContext.getFormContext();
    if (formContext.getAttribute("new_create").getValue() != null) {
        var entity = {};
        entity.new_name = "mallika";

        Xrm.WebApi.online.createRecord("new_employees", entity).then(
            function success(result) {
                var newEntityId = result.id;
                alert("record is created in employe entity" + newEntityId);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}





function createRecordWithCompanyName(executionContext) {

    var formContext = executionContext.getFormContext();
    var companyName = formContext.getAttribute("new_name").getValue();

    if (formContext.getAttribute("new_create").getValue() != null) {
        var entity = {};
        entity.new_name = companyName;

        Xrm.WebApi.online.createRecord("new_employees", entity).then(
            function success(result) {
                var newEntityId = result.id;
                alert("record is created in employe entity" + newEntityId);
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}


function updateRecords() {

    var entity = {};
    entity.new_departmentsincompany = 3;

    Xrm.WebApi.online.updateRecord("new_companies", "f06d1c0e-e9b0-eb11-8236-6045bd727de9", entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            console.log("record is updated::" + updatedEntityId);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}

//here i am updating company from employe
//i am paasing department type from employe entity
//here u bind this function on change o

function updatedeptformemployetocompany(executionContext) {
    var formContext = executionContext.getFormContext();
    var companyLookup = formContext.getAttribute("new_companynameid").getValue()[0].id;
  
    var empdept = formContext.getAttribute("new_employe_dept").getValue();

    var entity = {};
    entity.new_departmentsincompany = empdept;

    Xrm.WebApi.online.updateRecord("new_companies", companyLookup, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            alert("record is updated" + updatedEntityId);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}



function deleteCompanyRecord()
{
    Xrm.WebApi.online.deleteRecord("new_companies", "1abb52e9-6bbb-eb11-bacc-6045bd72bbd7").then(
    function success(result) {
        //Success - No Return Data - Do Something
            alert("record deleted");
    },
    function (error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
}



function updatexxx(executionContext) {
    var formContext = executionContext.getFormContext();
    var companyLookup = formContext.getAttribute("new_companynameid").getValue()[0].id;
    var empname = formContext.getAttribute("new_name").getValue();
    var entity = {};
    entity.new_name = empname;

    Xrm.WebApi.online.updateRecord("new_companies", companyLookup, entity).then(
        function success(result) {
            var updatedEntityId = result.id;
            alert(updatedEntityId);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}





function retriveSingle(executionContext) {

    var formContext = executionContext.getFormContext();
    var companyLookup = formContext.getAttribute("new_companynameid").getValue()[0].id;

    Xrm.WebApi.online.retrieveRecord("new_companies", companyLookup, "?$select=new_companiesid,new_departmentsincompany").then(
        function success(result) {
            var new_companiesid = result["new_companiesid"];
            var new_departmentsincompany = result["new_departmentsincompany"];
            var new_departmentsincompany_formatted = result["new_departmentsincompany@OData.Community.Display.V1.FormattedValue"];
            alert(new_companiesid);
            alert(new_departmentsincompany);
            alert(new_departmentsincompany_formatted);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}


function retriveMultiple() {
    Xrm.WebApi.online.retrieveMultipleRecords("new_employees", "?$select=new_name&$filter=new_jobtitle eq 'Manager'&$orderby=new_name asc").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var new_name = results.entities[i]["new_name"];
                alert(new_name);
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}


function retriveMultiplewith2conditions(executionContext) {
    var formContext = executionContext.getFormContext();
    var recordGuid = formContext.data.entity.getId();

    Xrm.WebApi.online.retrieveMultipleRecords("new_employees", "?$select=new_jobtitle,new_name&$filter=new_jobtitle eq 'developer%20role' and  _new_companynameid_value eq "+recordGuid+"").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                var new_jobtitle = results.entities[i]["new_jobtitle"];
                var new_name = results.entities[i]["new_name"];
                alert(new_jobtitle);
                alert(new_name);
            }
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );

}

total = new_quantity * new_prdoductprice + new_deliverycharge - new_discount