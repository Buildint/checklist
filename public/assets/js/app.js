var firebaseConfig = {
    apiKey: "AIzaSyCtFlIgLHOvliDQpsVW0YnZJZ7xVANICpk",
    authDomain: "checklist-379ea.firebaseapp.com",
    databaseURL: "https://checklist-379ea-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "checklist-379ea",
    storageBucket: "checklist-379ea.appspot.com",
    messagingSenderId: "248915298508",
    appId: "1:248915298508:web:4424f89a61e04ba9e75a69",
    measurementId: "G-YR85WETH2H"
  };
  
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
ref = database.ref("ATMID")
ref2 = database.ref("ATM")

ref.on('value', function (snapshot){
    var did = snapshot.val()
    var didObj = Object.keys(did)
    var didObjValue = Object.values(did)
    var didObjLength = didObj.length
    var didObjValueLength = didObjValue.length
    var html = '<div class=\"atm_id_dropdown\">'
    html+='<select style=\"width:100%;\" id=\"code\" class=\"form-select2\">'
    for(let i=0; i<didObjLength; i++){
        html+= '<option>'+didObj[i]+'</option>'
    }
    html+='</select>'
    html+='</div>'
    document.getElementById('atm_id_dropdown').innerHTML = html

    // dropdown2

    var html2 = '<div class=\"atm_name_dropdown\">'
    html2+='<select style=\"width:100%;\" id=\"code_name\" class=\"form-select2\">'
    for(let i=0; i<didObjValueLength; i++){
        html2+= '<option>'+didObjValue[i]+'</option>'
    }
    html2+='</select>'
    html2+='</div>'
    document.getElementById('atm_name_dropdown').innerHTML = html2
})



var checkboxes = $("input[type=checkbox]");
var statusDropdowns = $("select[class=form-select]");
var idDropdown = $(".atm_id_dropdown");
var nameDropdown = $('.atm_name_dropdown')

var d = [];
var r = [];


var idarrayb = $.map($('input[name="branch_check"]:checked'), function(c){return c.id; })
var idarraybLength = idarrayb.length;
for(let i = 0; i <idarraybLength; i++){
    $('#d' + idarrayb[i]).css('display', 'block')
}

var idarray = $.map($('input[name="atm_check"]:checked'), function(c){return c.id; })
var idarrayLength = idarray.length;
for(let i = 0; i <idarrayLength; i++){
    $('#d' + idarray[i]).css('display', 'block')
}

checkboxes.on("change",function(e){ 
    if(!e.target.id){
        return;  
    } 
    if(e.target.checked){
        $("#d"+e.target.id).css("display", "block")
    }
    else{
        $("#d"+e.target.id).css("display", "none")
    }
});

statusDropdowns.on("change", function(e){
    if(!e.target.id){
        return;  
    } 
    if(e.target.value == 'Not Working'){
        d.push(e.target.id);
        $("#days_"+e.target.id).css("display", "block")
        $("#reason_"+e.target.id).css("display", "block")

    }
    else{
        var index = d.indexOf(e.target.id)
        if(~index){
            d.splice(index, 1);
            $("#days_"+e.target.id).css("display", "none")
            $("#reason_"+e.target.id).css("display", "none")
        }               
    }
})



idDropdown.on("change", function(e){
    var value = $("#code").val()
    ref.on("value", function (snapshot){
        var did = snapshot.child(value).val()
        document.getElementById('code_name').value = did
    })

    ref2.on('value', function (snapshot){
        var atmname = $("#code_name").val()
        var mangerName = snapshot.child(value).child(atmname).child("Manager Name").val()
        var mangerContact = snapshot.child(value).child(atmname).child("Manager Contact").val()
        var mangerEmail = snapshot.child(value).child(atmname).child("Manager Email").val()

        document.getElementById('manager_name').value = mangerName
        document.getElementById('contact').value = mangerContact
        document.getElementById('email').value = mangerEmail
        
    })
})

nameDropdown.on("change", function(e){
    var atmname = $("#code_name").val()
    ref.on("value", function (snapshot){
        var did = snapshot.val()
        var didObj = Object.keys(did).find(key => did[key] ===atmname)
        document.getElementById('code').value = didObj
    })

    ref2.on('value', function (snapshot){
        var value = $("#code").val()
        var mangerName = snapshot.child(value).child(atmname).child("Manager Name").val()
        var mangerContact = snapshot.child(value).child(atmname).child("Manager Contact").val()
        var mangerEmail = snapshot.child(value).child(atmname).child("Manager Email").val()
        document.getElementById('manager_name').value = mangerName
        document.getElementById('contact').value = mangerContact
        document.getElementById('email').value = mangerEmail
        
    })
})


function submitform2(){
    var idarray = $.map($('input[name="branch_check"]:checked'), function(c){return c.id; })
    var idarrayLength = idarray.length;
    for(let i = 0; i <idarrayLength; i++){
        var checkValue = $('#' + idarray[i]).val()
        var statusDropdownValue = $('#d' + idarray[i]).val()
        if(statusDropdownValue == 'Not Working') {
            var daysData = $('#days_d' + idarray[i]).val()
            var reasonData = $('#reason_d' + idarray[i]).val()
            console.log(checkValue + ': ' + statusDropdownValue + ', No. of Days: ' + daysData + ', Reason: ' + reasonData)
        } else {
            console.log(checkValue + ': ' + statusDropdownValue)
        }
    }
}

function submitform(){
    $(".branch-form").css('display', 'none')
    var element = document.getElementById("header");
    element.classList.remove("d-flex");
    var element = document.getElementById("back-to-top");
    element.classList.remove("d-flex");
    $(".img-logo-snip").css('display', 'block')
    $(".button").css('display', 'none')
    $('.section').css('padding', 0)
    $('.checklist-box').css('max-width', '70%')
    $(".back-to-top").css('display', 'none') 
    $("#header").css('display', 'none')

    var idarray = $.map($('input[name="atm_check"]:checked'), function(c){return c.id; })
    var idarrayLength = idarray.length;

    var atmCode = $('#code').val()
    var atmName = $('#code_name').val()
    var subDateTime = $("#datetime").val()
    var managerName = $("#manager_name").val()
    var managerEmail = $("#email").val()
    var managerContact = $("#contact").val()
    var personName = $("#person_name").val()
    var personContact = $("#person_contact").val()

    if(managerName !== "") {
        database.ref("ATM/").child(atmCode).child(atmName).child("Manager Name").set(managerName)
    }

    if(managerEmail !== "") {
        database.ref("ATM/").child(atmCode).child(atmName).child("Manager Email").set(managerEmail)
    }

    if(managerContact !== "") {
        database.ref("ATM/").child(atmCode).child(atmName).child("Manager Contact").set(managerContact)
    }


    for(let i = 0; i <idarrayLength; i++){
        var checkValue = $('#' + idarray[i]).val()
        var statusDropdownValue = $('#d' + idarray[i]).val()
        if(statusDropdownValue == 'Not Working') {
            var daysData = $('#days_d' + idarray[i]).val()
            var reasonData = $('#reason_d' + idarray[i]).val()
            if(daysData === "" && reasonData === ""){
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).set(statusDropdownValue)
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Person Name").child(personName).set(personContact)
            }
            else if(daysData === "" && reasonData !== "") {
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Person Name").child(personName).set(personContact)
            }
            else if(daysData !== "" && reasonData === ""){
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Person Name").child(personName).set(personContact)
            }
            else if(daysData !== "" && reasonData !== ""){
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
                database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Person Name").child(personName).set(personContact)
            }
        } else {
            database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).set(statusDropdownValue)
            database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Person Name").child(personName).set(personContact)
        }
    }


    var element = document.body;
    var opt = {
        margin:       1,
        filename:     $('#code').val() + " " + $('#code_name').val() + " " + $("#datetime").val(),
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a3', orientation: 'portrait' }
      };

    html2pdf(element, opt)
    setTimeout(() => {
        location.reload()
    }, 3000);
}

function reset(){
    location.reload()
}
