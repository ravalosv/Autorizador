var id;
var req1;
var respuesta1;
var res1;

frmAutoriza.onshow=function(){
  LblFecha.textContent = FormatDateTime(Date(),"DD/MM/YYYY") + "-" + FormatDateTime(Date(),3);
  
  parametros="?servicio=2&imei=" + imei0;
  senddata1(parametros);
}

function senddata1(valor) {
  req1=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done1);
};

function done1() {
  if (req1.readyState !=4) {return;}
  
  if(req1.status == 200) { //success
    respuesta1= req1.responseText;
    //alert ("respuesta1=" + respuesta1);

    if (respuesta1 == "0") {
      NSB.MsgBox ("No hay nada por autorizar",0,"NCautorizador");
      ChangeForm(Form3);
    } 

    


    // JSON.parse
    //myJson =JSON && JSON.parse(respuesta1, reviver) || $.parseJSON(respuesta1, reviver);
    
    respuesta1=limpia(respuesta1,'"');
    respuesta1=limpia(respuesta1,"[");
    respuesta1=limpia(respuesta1,"]");
    res1=stringDelimiter(respuesta1,",");
    
    LblTienda.text = res1[1];
    LblCaja.text =  res1[2];
    LblCajero.text =  res1[3];
    LblSolicita.text = res1[4];
    id = res1[0];
  } else { //failure
    msg = "Error: Status = "  +  req1.status;
    if(TypeName(req.statusText)=="string" ) { msg = msg  +  " "  +  req1.statusText; }
    if(TypeName(req.err)=="string" ) { msg = msg  +  " "  +  req1.error; }
    respuesta1=msg;
    Label2.value = msg;
  }
}



reviver = function(key, value) {
  if(key=="a" && TypeName(Value)== "Integer") {
     return value.toString(); //If value is a number, we want to change it to string.
 } else {
     return value;
  }
}
btnAutoriza.onclick=function(){
    parametros="?servicio=2a&id=" + id + "&respuesta=S" + "&user=" + res1[5];
    res1="S";
    respuesta=senddata1a(parametros);
}

btnDeniega.onclick=function(){
    parametros="?servicio=2a&id=" + id + "&respuesta=N" + "&user=" + res1[5];
    res1="N";
    respuesta=senddata1a(parametros);
}

function senddata1a(valor) {
  req1=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done1a);
};

function done1a() {
  if (req1.readyState !=4) {return;}
  
  if(req1.status == 200) { //success
    respuesta1= req1.responseText;
    //alert ("respuesta1=" + respuesta1);

    if (respuesta1 == "0") {
      NSB.MsgBox ("Hubo un error al autorizar",0,"NCautorizador");
      ChangeForm(Form3);
      return;
    } 

    if (res1=="S") {
      NSB.MsgBox("Permiso otorgado",0,"NCautorizador");
    } else {
      NSB.MsgBox("Permiso denegado",0,"NCautorizador");
    }
    ChangeForm(Form3);

  } else { //failure
    msg = "Error: Status = "  +  req.status;
    if(TypeName(req.statusText)=="string" ) { msg = msg  +  " "  +  req.statusText; }
    if(TypeName(req.err)=="string" ) { msg = msg  +  " "  +  req.error; }
    respuesta1=msg;
    Label2.value = msg;
  }
}

 var stringDelimiter = function (sampleInput, delimiter) {
    var stringArray = [''];
    var j = 0;

    for (var i = 0; i < sampleInput.length; i++) {
        if (sampleInput.charAt(i) == delimiter) {
            j++;
            stringArray.push('');
        } else {
            stringArray[j] += sampleInput.charAt(i);
        }
    }
    return stringArray;
}
  
var limpia = function (cadena,delim) {
  var sa ="";
  var j=0;
  
  for (var i=0;i<cadena.length;i++) {
    if (cadena.charAt(i)==delim) {
      j++;
    } else {
      sa += cadena.charAt(i);
    }
  }
  return sa;
}
