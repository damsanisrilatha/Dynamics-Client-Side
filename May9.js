// JavaScript source code

//attribute methods
function numbers(executionContext) {
    var formContext = executionContext.getFormContext();
    var phonenumber = formContext.data.entity.attribute.getByName("new_mobileno");
    if (phonenumber == null) {
        alert("enter phonenumber");
        formContext.getControls("new_mobileno").setFocus();
        executionContext.getEventArgs().preventDefault();
    }
}



function Example1(executionContext) {
    var formContext = executionContext.getFormContext();
    var cityname = formContext.getAttribute("new_city").getvalue();
    var gender = formContext.getAttribute("new_studentgender").getvalue();
    if (cityname != null && cityname == 'Hyd') {
        else if (gender == 'Male') {
            formContext.getAttribute("new_email").setRequriedLevel("requried");
        }
        else if (gender == 'Female') {
            formContext.getAttribute("new_email").setRequriedLevel("recommended");

        }
    }
}