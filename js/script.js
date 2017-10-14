var fn = {
	deviceready:function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init:function(){
		$("#btnRegistrar").click(fn.registrarUsuario);
	},
	registrarUsuario:function(){
		var nombre=$("#registro .nombre").val();

		var email=$("#registro .email").val();
		var password=$("#registro .password").val();
		//console.log(nombre);
		//console.log(email);
		//console.log(password);

		try{
				if(email==""){
					throw new Error("El email está vacio");
				}

				if(nombre==""){
					throw new Error("El nombre está vacio");
				}

				if(password==""){
					throw new Error("El password está vacio");
				}

				fn.nuevoUsuario(nombre,email,password);


		}
		catch(error){
			alert(error);
		}
	},
	nuevoUsuario:function(nombre,email,password){
		var usuario={};
		usuario.nombre=nombre;
		usuario.email=email;
		usuario.password=password;
		var usuariocadena=JSON.stringify(usuario);
		//console.log(usuariocadena);
		//GUARDAR EN LOCALSTORAGE
		window.localStorage.setItem("usuario",usuariocadena);
		var obtenerusuario= window.localStorage.getItem("usuario");
		var objusuario = JSON.parse(obtenerusuario);
		console.log(objusuario.nombre);

		alert("Usuario: "+objusuario.nombre+" guardado");
		$("#registro .nombre").val("");
		$("#registro .email").val("");
		$("#registro .password").val("");



	}

};


//para compilar
fn.deviceready();

//para pruebas en navegador
//fn.init();