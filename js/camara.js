var camara ={
	exito:function(mediaFiles){
		var ruta;
		ruta=mediaFiles[0].fullPath;
		fn.rutasFotos.push(ruta);
		alert(ruta);
	},
	error:function(error){
		alert("Ocurrio un error al tomar foto: "+error);
	},
	tomarFoto:function(){
		navigator.device.capture.captureImage(camara.exito,camara.error,{limit:1});
	}

};