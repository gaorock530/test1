module.exports = (items, details) => {
    let row = 0;
    var out = '<table border="0" class="list-table"><tr>'+
                    '<th class="list rowt">项目</th>'+
                    '<th class="list rowt">信息('+ details +')</th>'+
                '</tr>';

    for(var i in items) {
        let style="";
        if (row%2===0) style = "row1"; else style = "row2"; 
        out = out + '<tr>' + 
                '<td class="list '+style+'">'+ (row+1) +':'+i +'</td>'+
                '<td class="list '+style+'">'+ items[i] +'</td>'+
                "</tr>";

        row++;
    }

    return out + '</table>';
}