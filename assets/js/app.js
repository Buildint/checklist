var checkboxes = $("input[type=checkbox]");
var r = [];

checkboxes.on("change",function(e){ 
    if(!e.target.id){
        return;  
    } 
    if(e.target.checked){
        r.push(e.target.id);
        var dropIDname = 'd' + e.target.id;
        $("#"+dropIDname).css("display", "block")

    }
    else{
        var index = r.indexOf(e.target.id)
        if(~index){
            r.splice(index, 1);
            var dropIDname = 'd' + e.target.id;
            $("#"+dropIDname).css("display", "none")
        }               
    }
});

function check(){
    var idarray = $.map($('input[name="branch_check"]:checked'), function(c){return c.id; })
    var idarrayLength = idarray.length;
    for(let i = 0; i <idarrayLength; i++){
        var checkedID = idarray[i]
        var dropdownID = 'd' + checkedID
        var checkValue = $('#' + checkedID).val()
        var dropdownValue = $('#' + dropdownID).val()
        console.log(checkValue + ': ' + dropdownValue)
    }
}
