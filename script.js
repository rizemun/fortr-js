/**
 * Created by rizemun on 11.02.2017.
 */
var canvas = document.getElementById("canvas");//холст
var ctx = canvas.getContext("2d");//рабочее пространство
var table = document.getElementById("table");//служебные слова
var table1 = document.getElementById("table1");//идентификаторы
var table2 = document.getElementById("table2");//оперции
var table3 = document.getElementById("table3");//разделители
var table4 = document.getElementById("table4");//константы
var arr_operations = [['+', 'o1'], ['-', 'o2'], ['*', 'o3'], ['/', 'o4'], ['**', 'o5'], ['.GT.', 'o6'], ['.LT.', 'o7'], ['.GE.', 'o8'], ['.LE.', 'o9'], ['.NE.', 'o10'], ['.EQ.', 'o11'], ['=', 'o12']];
var arr_separators = [[' ', 'r1'], [',', 'r2'], ['::', 'r3'], ['(', 'r4'], [')', 'r5'], ['', 'r6'], ['', 'r7'], ['', 'r8'], ['', 'r9'], ['', 'r10'], ['', 'r11'], ['', 'r12']];
var arr_functionWords = [['program', 'w1'], ['function', 'w2'], ['subroutine', 'w3'], ['return', 'w4'], ['end', 'w5'], ["integer", 'w6'], ["real", 'w7'], ["character", 'w8'], ["dimension", 'w9'], ["parameter", 'w10'], ["go to", 'w11'], ["if", 'w12']];
var arr_identifers = [];
var arr_constants = [];
var arr_all = [arr_functionWords, arr_operations, arr_separators, arr_identifers, arr_constants];//массив для отображения с помощью цикла
var widthArr_NeA=40, heightArr_NeA=10;//ширина и высота массива функции переходов
var arr_NeA=[];//функция перехода и ее создание
for (var i=0;i<heightArr_NeA;i++){
    arr_NeA[i]=[];
    for (var j=0;j<widthArr_NeA;j++){
        arr_NeA[i][j]=0;
    }
}

function createTable() {//создание функции переходов
    /*var textfield=document.getElementById("fromField").innerHTML;
    var string="";
    var i=0;
    switch(textfiel[i]){
        case '':
            [break]
        default:
            [break]
    }
    while(textfield[i]!=' ');
    alert(string);*/
    function arrCopyElems(number,from,howMuch){//размножение известного результата на соседние элементы
        for(var i=from+1;i<from+howMuch;i++){
            arr_NeA[number][i]=arr_NeA[number][from];
        }
    }

    var alph='abcdefghijklmnopqrstuvwxyz0123456789.';//алфавит
    for(var i=0;i<alph.length;i++){

        arr_NeA[0][i]=alph[i];
    }
    arr_NeA[1][0]=1;//начальное состояние
    arrCopyElems(1,0,26);
    arr_NeA[1][26]=3;
    arrCopyElems(1,26,10);
    arr_NeA[1][36]=5;//первый символ точка
    arr_NeA[2][0]=1;//первое состояние
    arrCopyElems(2,0,26);
    arr_NeA[2][26]=2;
    arrCopyElems(2,26,10);
    arr_NeA[3][0]=2;//второе состояние
    arrCopyElems(3,0,36);
    arr_NeA[4][26]=3;//третье состояние
    arrCopyElems(4,26,10);
    arr_NeA[4][36]=4;
    arr_NeA[5][26]=4;//четвертое состояние
    arrCopyElems(5,26,10);



    //отображение в текстовом блоке
    // document.getElementById('table5').innerHTML=""
    // for(var i=0;i<10;i++){
    //     if(i==0){document.getElementById('table5').innerHTML+="&nbsp :"}else
    //     if(i==1){document.getElementById('table5').innerHTML+="S:"}else
    //     {document.getElementById('table5').innerHTML+=i-1+':'};
    //     document.getElementById('table5').innerHTML+=arr_NeA[i]+"<br>";
    // }











    draw();
}
/*отображение/обновление табличек лексем*/
function showTables() {

    table2.innerHTML = "опер<br>"//операции
    for (var i = 0; i < arr_operations.length; i++) {
        table2.innerHTML += arr_operations[i] + "<br>";
    }

    table3.innerHTML = "разд<br>"//разделители
    for (var i = 0; i < arr_separators.length; i++) {
        table3.innerHTML += arr_separators[i] + "<br>";
    }

    table.innerHTML = "функ.сл<br>"//разделители
    for (var i = 0; i < arr_functionWords.length; i++) {
        table.innerHTML += arr_functionWords[i] + "<br>";
    }

    table1.innerHTML = "";
    table4.innerHTML = "";
}
/*все отрисовки на холсте*/
function draw() {
    ctx.fillStyle = "#ddf";//заливка
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = "1";
    ctx.strokeStyle = "#000";
    for (var i = 1; i < heightArr_NeA+1; i++) {
        ctx.moveTo(20 + 0.5-18, 20+ i * 18 + 0.5);
        ctx.lineTo(20 + widthArr_NeA*18 + 0.5, 20 + i * 18 + 0.5);
    }
    for (var i = 0; i < widthArr_NeA+1; i++) {
        ctx.moveTo(20 + i * 18 + 0.5, 20 + 0.5);
        ctx.lineTo(20 + i * 18 + 0.5, 20 + heightArr_NeA*18 + 0.5);
    }
    ctx.font = "italic bold 12px Arial";
    ctx.textBaseline = "Top";
    ctx.fillStyle = "blue";
    for (var i = 0; i < heightArr_NeA; i++) {
        if(i==0){ctx.fillText('S',4,40+12);}else
        if(i<heightArr_NeA-1){ctx.fillText(i,4,40+12+18*i);}
        for (var j = 0; j < widthArr_NeA; j++) {

            if(arr_NeA[i][j]){ctx.fillText(arr_NeA[i][j], 20 + j*18+ 2, 20 + i * 18 + 14);}
        }
    }




    function arrDraw(pos_X, pos_Y, arr, arrFirst, arrWidth) {
        ctx.lineWidth = "1";
        ctx.strokeStyle = "#000";
        for (var i = 0; i < arr.length + 1; i++) {
            ctx.moveTo(pos_X + 0.5, pos_Y + i * 18 + 0.5);
            ctx.lineTo(pos_X + arrWidth + 0.5, pos_Y + i * 18 + 0.5);
        }
        ctx.moveTo(pos_X + 0.5, pos_Y + 0.5);
        ctx.lineTo(pos_X + 0.5, pos_Y + arr.length * 18 + 0.5);
        ctx.moveTo(pos_X + arrFirst + 0.5, pos_Y + 0.5);
        ctx.lineTo(pos_X + arrFirst + 0.5, pos_Y + arr.length * 18 + 0.5);
        ctx.moveTo(pos_X + arrWidth + 0.5, pos_Y + 0.5);
        ctx.lineTo(pos_X + arrWidth + 0.5, pos_Y + arr.length * 18 + 0.5);
        ctx.stroke();

        ctx.font = "italic bold 12px Arial";
        ctx.textBaseline = "Top";
        ctx.fillStyle = "blue";
        for (i = 0; i < arr.length; i++) {
            ctx.fillText(arr[i][0], pos_X + 2, pos_Y + i * 18 + 14);
            ctx.fillText(arr[i][1], pos_X + 2 + arrFirst, pos_Y + i * 18 + 14);
        }
    }
    var leftV = 20, topV = 260;
    for (var i = 0; i < 5; i++) {
        arrDraw(leftV + i * 100, topV, arr_all[i], 70, 95);
    }
}
/*при добавлении файла его текст помещается в текстбокс.*/
var control = document.getElementById("myfile");
control.addEventListener("change", function (event) {
    var selectedFile = control.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("fromField").innerHTML = e.target.result;
    }
    reader.readAsText(selectedFile);
}, false);
