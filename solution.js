var fs = require('fs');

var employee_data = [];
test();

function test(){


    fs.readFile('data.csv',(err,data)=>{
        if(err){
            console.log(err);
        }
        data = ""+data;
        data = data.split(/\r?\n/);
        data.forEach((row,index) => {
            if(index != 0){
                row = row.split(',');
                employee_data.push({"Name":row[0],"ID":row[1],"Manager ID":row[2]});
            }
        });
        console.log(employee_data);
        var stucture = {};
        //find ceo
        var ceo ={};
        employee_data.forEach((row,index) => {
            if(row['Manager ID'] === '')
            {
                ceo = row;
            }
        });
        var managers = employee_data.filter(employee => employee['Manager ID'] == ceo['ID']);
        console.log(managers);
        var output = "<html> <style>table,th,td {padding: 10px;border: 1px solid black;border-collapse: collapse;}</style><body><table><tr>";
        output += "<td>"+ceo['Name']+"</td>"+"<td></><td></td></tr>"
        managers.forEach(manager => {
            output+="<tr><td></td><td>"+manager['Name']+"</td><td></td></tr>";
            var employees = employee_data.filter(employee => employee['Manager ID'] == manager['ID']);
            employees.forEach(employee => {
                output+="<tr><td></td><td></td><td>"+employee['Name']+"</td></tr>";                
            });
        });
        output += "</tr></table></body></html>";
        fs.writeFile('output.html',output,function (err) {
            if(err) console.log(err);
            console.log('Saved');
        })
    })
}