$(document).ready(function(){
    var specialElementHandler = {
        "#row":function(element, renderer){
            return true;
        }
    };

    $("#cmd").click(function(){
        var doc = new jsPDF();

        doc.fromHTML($('#row').html(), 25, 25, {
            "width":700,
            "elementHandlers":specialElementHandler
        });
        doc.save("test.pdf")
    })


})