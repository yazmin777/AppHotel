var camara ={
	exito:function(mediaFiles){
		var ruta;
		ruta=mediaFiles[0].fullPath;
		fn.rutasFotos.push(ruta);
		alert("Foto tomada, ve a galeria");
	},
	error:function(error){
		alert("Ocurrio un error al tomar foto: "+error);
	},
	tomarfoto:function(){
		navigator.device.capture.captureImage(camara.exito,camara.error,{limit:1});
	}

};