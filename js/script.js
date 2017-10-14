var fn={
	init:function(){
		$("#btnRegistrar").click(fn.registrarUsuario);
		
	},

	deviceready:function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	registrarUsuario:function(){
		//selecciona un elemento de la pantalla de registro
		var nombre   = $("#registro .nombre").val();
		var email    = $("#registro .email").val();
		var password = $("#registro .password").val();
		/*console.log(nombre);
		console.log(email);
		console.log(password);*/
		try{
			if(nombre == ""){
				throw new Error("El nombre esta vacio");
			}
			if(email == ""){
				throw new Error("El email esta vacio");
			}
			if(password == ""){
				throw new Error("La contraseña esta vacia");
			}
			fn.nuevoUsuario(nombre, email, password);

			$("#registro .nombre").val("");
			$("#registro .email").val("");
			$("#registro .password").val("");

			window.location.href = "#inicio";
		}
		catch(error){
			alert(error);
		}

	},
	nuevoUsuario: function(nombre, email, password){
		var usuario      = {};
		usuario.nombre   = nombre;
		usuario.email    = email;
		usuario.password = password;

		var usuarioCadena = JSON.stringify(usuario);
		//console.log(usuarioCadena);

		//GURDAR EN LOCALSTORAGE
		window.localStorage.setItem("usuario", usuarioCadena);

		alert("Usuario:" +usuario.nombre+" guardado");

		
		var obtenerNombre = window.localStorage.getItem("usuario");
		var NombreR  = JSON.parse(obtenerNombre);
		console.log(NombreR.nombre);
		$("#msj").html ("Bienvenido " + nombre);


	}
};

//COMPILAR PARA CELULAR
fn.deviceready();

//PRUEBAS EN NAVEGADOR
//fn.init();
