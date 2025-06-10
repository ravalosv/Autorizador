var respuesta2;

btnSuscribir.onclick=function(){

  if (typeof imei0 === 'undefined') {
    NSB.MsgBox ("Oprima el botón MAC antes de suscribir",0,"NCautorizador");
    return;
  }

  if (txtTema.value=="") {
    NSB.MsgBox ("Indique un tema válido",0,"NCautorizador");
    return;
  }
  if (txtUsuario.value=="") {
    NSB.MsgBox ("Indique un usuario válido",0,"NCautorizador");
    return;
  }
  if (txtPassword.value=="") {
    NSB.MsgBox ("Indique una contraseña válida",0,"NCautorizador");
    return;
  }

  //suscribe con auto4.php
  //parametros="?servicio=b&tema=" + txtTema.value + "&usuario=" + txtUsuario.value + "&password=" + sha1(txtPassword.value) +"&imei=" + imei0
  parametros="?servicio=b&tema=" + txtTema.value + "&usuario=" + txtUsuario.value + "&password=" + txtPassword.value +"&imei=" + imei0  ;
  senddata2(parametros);
}

//******** envío de datos *********

function senddata2(valor) {
  req=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done2);
  //return req.responseText;
};

function done2() {
  if (req.readyState !=4) {return;}
  
  if(req.status == 200) { //success
    respuesta2= req.responseText;
    if (respuesta2 == '2') {
      NSB.MsgBox("No existe el tema indicado",0,"NCautorizador");
    } else {
      FCMPlugin.subscribeToTopic(txtTema.value);
      NSB.MsgBox ("Suscripción correcta",0,"NCautorizador");
      ChangeForm(Form3);
    }
  } else { //failure
    msg = "Error: Status = "  +  req.status;
    if(TypeName(req.statusText)=="string" ) { msg = msg  +  " "  +  req.statusText; }
    if(TypeName(req.err)=="string" ) { msg = msg  +  " "  +  req.error; }
    respuesta=msg;
    Label2.value = msg;
  }
}

btnCancelar.onclick=function(){
  ChangeForm(Form3);
}
