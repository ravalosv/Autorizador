frmBaja.onshow=function(){
  Checkbox1.clear();
  //lee tipo g
  parametros="?servicio=g&imei=" + imei0;
  senddata4(parametros);
}

function senddata4(valor) {
  req4=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done4);
};

function done4() {
  if (req4.readyState !=4) {return;}
  
  if(req4.status == 200) { //success
    respuesta4= req4.responseText;

    if (respuesta4 == "") {
      NSB.MsgBox ("No hay temas para este teléfono",0,"NCautorizador");
      ChangeForm(Form3);
    } 

    res4 = stringDelimiter(respuesta4, ",");

    i=0;
    while (i <= res4.length-1 ) {
      Checkbox1.addItem (res4[i]);
      i=i+1;
    }
  }
}


function done4a() {
  if (req4a.readyState !=4) {return;}
  
  if(req4a.status == 200) { //success
    respuesta4= req4a.responseText;

    if (respuesta4 != "1") {
      NSB.MsgBox ("No pudo eliminar el tema " + res4[i],0,"NCautorizador");
      huboerror="S";
    }
  }
  
  if (huboerror="N") {
    NSB.MsgBox("Fueron eliminados los temas seleccionados",0,"NCautorizador");
  } else {
    NSB.MsgBox("Hubo error al eliminar algún tema",0,"NCautorizador");
  }
  ChangeForm(Form3);
}

btnRegresar.onclick=function(){
  ChangeForm(Form3);
}

btnContinuarBaja.onclick=function(){
  huboerror="N";

  i=0;
  while (i<=res4.length-1) {
    if (Checkbox1.getValue(i)) {
      parametros = "?servicio=h&imei=" + imei0 + "&tema=" + limpia(res4[i],'"');
      req4a=Ajax("http://novacaja.com/autorizador/auto4.php" + parametros,done4a);
    }
    i=i+1;
  }
}
