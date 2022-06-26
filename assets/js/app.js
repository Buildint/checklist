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


function check(){
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
