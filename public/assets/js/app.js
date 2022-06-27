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
    var test = snapshot.val()
    var testObj = Object.keys(test)
    console.log(testObj)
})


var checkboxes = $("input[type=checkbox]");
var dropdowns = $("select[class=form-select]");
var d = [];
var r = [];

checkboxes.on("change",function(e){ 
    if(!e.target.id){
        return;  
    } 
    if(e.target.checked){
        r.push(e.target.id);
        $("#d"+e.target.id).css("display", "block")
    }
    else{
        var index = r.indexOf(e.target.id)
        if(~index){
            r.splice(index, 1);
            $("#d"+e.target.id).css("display", "none")
        }               
    }
});

dropdowns.on("change", function(e){
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


function submitform2(){
    var idarray = $.map($('input[name="branch_check"]:checked'), function(c){return c.id; })
    var idarrayLength = idarray.length;
    for(let i = 0; i <idarrayLength; i++){
        var checkValue = $('#' + idarray[i]).val()
        var dropdownValue = $('#d' + idarray[i]).val()
        if(dropdownValue == 'Not Working') {
            var daysData = $('#days_d' + idarray[i]).val()
            var reasonData = $('#reason_d' + idarray[i]).val()
            console.log(checkValue + ': ' + dropdownValue + ', No. of Days: ' + daysData + ', Reason: ' + reasonData)
        } else {
            console.log(checkValue + ': ' + dropdownValue)
        }
    }
}

function submitform(){
    var idarray = $.map($('input[name="atm_check"]:checked'), function(c){return c.id; })
    var idarrayLength = idarray.length;
    for(let i = 0; i <idarrayLength; i++){
        var checkValue = $('#' + idarray[i]).val()
        var dropdownValue = $('#d' + idarray[i]).val()
        if(dropdownValue == 'Not Working') {
            var daysData = $('#days_d' + idarray[i]).val()
            var reasonData = $('#reason_d' + idarray[i]).val()
            console.log(checkValue + ': ' + dropdownValue + ', No. of Days: ' + daysData + ', Reason: ' + reasonData)
        } else {
            console.log(checkValue + ': ' + dropdownValue)
        }
    }
}

function reset(){
    location.reload()
}
