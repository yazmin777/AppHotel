var fn={
	init:function(){
		$("#btnRegistrar").click(fn.registrarUsuario);
		$("#formulario1 a").click(fn.reserva1);
		$("#btnSiguiente").click(fn.siguienteReserva1);
		$("#btnReservar").click(fn.hacerReserva);
		$("#btnHistorial").click(fn.historial);
	},

	deviceready:function(){
		document.addEventListener("deviceready",fn.init,false);
	},

	historial: function(){
		var arregloReservaciones = window.localStorage.getItem("reservaciones");
		var arregloObjetos       = JSON.parse(arregloReservaciones);		
		var lista                = "";

		arregloObjetos.forEach(function(reservacion){
			lista += '<li>'+reservacion.tipoHabitacion+'</li>';
		});

		$("#historial ul").html(lista);

		window.location.href = "#historial";
	},

	hacerReserva: function(){		
		/*
		 * Obtener todos los datos en variables
		 */
		 var reservacion                = {};
		 reservacion.tipoHabitacion     = $("#reserva1").attr("tipo-habitacion");
		 reservacion.numeroPersonas     = $("#reservaNumPersonas").val();
		 reservacion.numeroDias         = $("#reservaNumDias").val();
		 reservacion.numeroHabitaciones = $("#reservaNumHabitaciones").val();
		
		/*
		 * OBTENER DATOS DE LOCALSTORAGE
		 */
		 var reservacionesLocal =  window.localStorage.getItem("reservaciones");
		console.log(reservacionesLocal);

		if(reservacionesLocal == null){
			var arregloReservaciones = [];	
			arregloReservaciones.push(reservacion);

			var arregloCadena = JSON.stringify(arregloReservaciones);
			window.localStorage.setItem("reservaciones", arregloCadena);
		}else{
			/*
			 * Ya hay reservaciones en el almacenamiento
			 * Por tanto debemos de agregar y no sobreescribir
			 */
			var arregloObjetos = JSON.parse(reservacionesLocal);
			console.log(arregloObjetos);

			arregloObjetos.push(reservacion);
			var arregloCadena = JSON.stringify(arregloObjetos);
			window.localStorage.setItem("reservaciones", arregloCadena);
		}


		/*
		 * Resetear datos del formulario
		 * de reservaciones
		 */
		$("#formulario1 a").css("background-color", "");
		$("#reserva1").attr("tipo-habitacion", "");
		$("#reserva2 select").prop("selectedIndex", 0).selectmenu("refresh", true);

		alert("Ha quedado hecha tu reservación.");
		window.location.href = "#inicio";
	},

	siguienteReserva1: function(){
		var tipohab = $("#reserva1").attr("tipo-habitacion");
		
		try{
			if(tipohab == ""){
				throw new Error("selecciona una opción");
			}

			window.location.href = "#reserva2";
		
		}catch(error){
			alert(error);
		}
	},

	reserva1:function(){
		$("#formulario1 a").css("background-color","");
		$(this).css("background-color","#38C");
		var tipo=($(this).prop("id"));
		$("#reserva1").attr("tipo-habitacion",tipo);   
	},

	nuevaReservacion:function(){
		//alert("hola");
		var tipoh=($("#reserva1").attr("tipo-habitacion"));
		//console.log(tipoh);
		try{
			if (tipoh==""){
				throw new Error("Debe seleccionar una opción");
		    }
		    
		    window.location.href="#reserva2"
		}
		catch(error){
			alert(error);
		}
		
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
//fn.deviceready();

//PRUEBAS EN NAVEGADOR
fn.init();
