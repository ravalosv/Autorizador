var respuesta3="";
var req3;

//******** envío de datos *********

function senddata3(valor) {
  req3=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done3);
};

function done3() {
  if (req3.readyState !=4) {return;}
  
  if(req3.status == 200) { //success
    respuesta3= req3.responseText;
    
    //alert ("respuesta3=" + respuesta3);

    if (respuesta3=="1") {
      ChangeForm(frmAutoriza);
    } else {
      if (respuesta3=="0") {
        ChangeForm(frmSuscribe);
      }
    }
  } else { //failure
    msg = "Error: Status = "  +  req3.status;
    if(TypeName(req3.statusText)=="string" ) { msg = msg  +  " "  +  req3.statusText; }
    if(TypeName(req3.err)=="string" ) { msg = msg  +  " "  +  req3.error; }
    respuesta=msg;
    Label2.value = msg;
  }
}

btnContinuar.onclick=function(){
  window.plugins.imei.get(
      async function(imei) {
        imei0=imei;
        senddata3("?servicio=e&imei=" + imei0);
      },
      async function() {
        NSB.MsgBox("error leyendo imei",0,"NCautorizador");
      }
    ); 
}


btnBaja.onclick=function(){
  window.plugins.imei.get(
      async function(imei) {
        imei0=imei;
        senddata3a("?servicio=e&imei=" + imei0);
      },
      async function() {
        NSB.MsgBox("error leyendo imei",0,"NCautorizador");
      }
    ); 
}

function senddata3a(valor) {
  req3a=Ajax("http://novacaja.com/autorizador/auto4.php" + valor, done3a);
};

function done3a() {
  if (req3a.readyState !=4) {return;}
  
  if(req3a.status == 200) { //success
    respuesta3a= req3a.responseText;
    
    //alert ("respuesta3=" + respuesta3);

    if (respuesta3a=="1") {
      ChangeForm(frmBaja);
    } else {
      NSB.MsgBox ("No hay temas para este teléfono",0,"NCautorizador");
    }
  } else { //failure
    msg = "Error: Status = "  +  req3a.status;
    if(TypeName(req3a.statusText)=="string" ) { msg = msg  +  " "  +  req3a.statusText; }
    if(TypeName(req3a.err)=="string" ) { msg = msg  +  " "  +  req3a.error; }
    respuesta=msg;
    Label2.value = msg;
  }
}

btnSuscribe1.onclick=function(){
  window.plugins.imei.get(
      async function(imei) {
        imei0=imei;
        ChangeForm(frmSuscribe);
      },
      async function() {
        NSB.MsgBox("error leyendo imei",0,"NCautorizador");
      }
    );   
}



