// field = {
//     item: false,
//     itemtext: false,
//     Mandate: false,
//     Expdate: false,
//     Expdate: false,
//     Expdate: false,
//     Expdate: false,
//     Expdate: false,
//     Expdate: false,
    
// }

// const donationForm = document.getElementById("donation-form")
// validateFormFields(donationForm)

// function validateFormFields(form){
//     const fields = document.querySelectorAll("[myvalidate]")

//     const checks = {}
//     for(let field of fields){
//         checks[field.name] = false
//     }
// }
$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );