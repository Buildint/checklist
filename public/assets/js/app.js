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
ref = database.ref("DID")

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
})

nameDropdown.on("change", function(e){
    var value = $("#code_name").val()
    console.log(value)
    ref.on("value", function (snapshot){
        var did = snapshot.val()
        var didObj = Object.keys(did).find(key => did[key] ===value)
        document.getElementById('code').value = didObj
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
    var idarray = $.map($('input[name="atm_check"]:checked'), function(c){return c.id; })
    console.log(idarray)
    var idarrayLength = idarray.length;
    console.log('Branch Code: ' + $('#code').val())
    console.log('Branch Name: ' + $('#code_name').val())

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

function reset(){
    location.reload()
}
