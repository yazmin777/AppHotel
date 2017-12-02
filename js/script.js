var fn={
	init:function(){
		$("#btnRegistrar").tap(fn.registrarUsuario);
		$("#btnIniciaSesion").tap(fn.iniciaSesion);
		$("#btnIngresar").tap(fn.ingresar);
		$("#formulario1 a").tap(fn.reserva1);
		$("#btnSiguiente").tap(fn.siguienteReserva1);
		$("#btnReservar").tap(fn.hacerReserva);
		$("#btnHistorial").tap(fn.historial);
		$("#btnGaleria").click(fn.galeria);
		$("#btnUbicacion").tap(fn.ubicacion);
		$("#btnSalir").tap(fn.salir);

		//$("#btnUbicacion").tap(fn.ubicacion);
		//$("#ubicacion").on('pageshow',function(){
		//	fn.ubicacion();
		//});

		//para celular se usa tap
	},

	deviceready:function(){
		document.addEventListener("deviceready",fn.init,false);
	},

	salir:function(){
		firebase.auth().signOut().then(function() {
			window.location.href="#registro";
		}).catch(function(error) {
			alert("No se pudo cerrar sesion");
		});
	},
	ubicacion:function(){
		geo.obtenerPosicion();
		$('#ubicacion').trigger("create");
		window.location.href = "#ubicacion";
	},
	cargarMapa:function(){   //ya no se ocupa
		var ubicacion ={lat:19.057,lng:-98.226};

		var mapa=new google.maps.Map(document.getElementById("mapa"),{
			zoom:15,
			center: ubicacion
		});


		var marcador=new google.maps.Marker({
			position:ubicacion,
			map:mapa
		});

		
		//$('#ubicacion').trigger("create");
		//window.location.href = "#ubicacion";

	},
	galeria:function(){
		var arregloFotos= ["1","2","3","4","5","6","7","8"];
		var tabla="";
		var cajasFotos="";
		var bandera=1;

		arregloFotos.forEach(function(nombreFoto){
			if (bandera){
				tabla+="<div class='ui-block-a'><a href='#"+nombreFoto+"' data-rel='popup' data-position-to='window' data-transition='fade'><img class='foto-galeria' src='img/galeria/"+ nombreFoto +".jpg'></a></div>";
				bandera=0;
			}
			else{
				tabla+="<div class='ui-block-b'><a href='#"+nombreFoto+"' data-rel='popup' data-position-to='window' data-transition='fade'><img class='foto-galeria' src='img/galeria/"+ nombreFoto +".jpg'></a></div>";
				bandera=1;
			}


			cajasFotos+="<div id='"+nombreFoto+"' data-role='popup' data-overlay-theme='b' data-theme='b' > <a href='#'' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a><img src='img/galeria/"+ nombreFoto +".jpg'></a></div>";

			
		});

		tabla+=cajasFotos;
		$("#cajagaleria").html(tabla);
		$('#galeria').trigger("create"); //reenderiza la pagina 
		window.location.href = "#galeria";
	},

	historial: function(){
		
		/* con localstorage
		var arregloReservaciones = window.localStorage.getItem("reservaciones");
		var arregloObjetos       = JSON.parse(arregloReservaciones);		
		var lista                = "";

		arregloObjetos.forEach(function(reservacion){
			lista += '<li>Reservacion: '+reservacion.tipoHabitacion +' - '+reservacion.fecha+'</li>';
		});
		*/
		

		//con firebase
		
		var userId = firebase.auth().currentUser.uid;
		//alert(userId)
		var lista= "";
		var cajasHistorial="";
		var reg ="";
		var nreg=0;
		$("#historial ul").html("");
		var ruta_res=firebase.database().ref('Reservaciones/'+ userId);
		//ruta_res.once('value').then(function(data){  // como objeto es dificil leer la informacionm
		ruta_res.on('child_added',function(reservacion){    //como lista es mas facil
			//console.log(reservacion.val());
			//$("#historial ul").append('<li>Reservacion:'+reservacion.val().tipoHabitacion+' - '+reservacion.val().fecha+'</li>');
		    reg="<li><a href='#RH"+nreg+"' data-rel='popup' data-position-to='window' data-transition='fade'>Reservacion:"+reservacion.val().tipoHabitacion+' - '+reservacion.val().fecha+"</a></li>";
		    //console.log(reg);
		    cajasHistorial+="<div id='RH"+nreg+"' data-role='popup' data-overlay-theme='b' data-theme='b' > <a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a><br/><h3>Reservacion</h3><span>Tipo de Habitación:"+ reservacion.val().tipoHabitacion+"</span><span>Numero de Habitaciones:"+ reservacion.val().numeroHabitaciones +"</span><span>Numero de Dias:"+ reservacion.val().numeroDias +"</span><span>Numero de Personas:"+ reservacion.val().numeroPersonas +"</span></div>";
			//console.log(cajasHistorial);
			reg+=cajasHistorial;
			$("#historial ul").append(reg);
			cajasHistorial="";
 			nreg+=1;
 			$('#historial').trigger("create");
		  //lista+='<li>Reservacion:'+reservacion.val().tipoHabitacion+' - '+reservacion.val().fecha+'</li>';

		});	
  		//console.log(lista);
		
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
		 reservacion.fecha              = new Date();
		 reservacion.fecha 				= reservacion.fecha.getDate()+"/"+(parseInt(reservacion.fecha.getMonth())+1)+"/"+reservacion.fecha.getFullYear();
		
		 //var database = firebase.database();
		  /*var reservacion=null;
		 reservacion=database().ref('Reservaciones/')
		 reservacion.push({
		 	tipoHabitacion: reservacion.tipoHabitacion,
    		numeroPersonas: reservacion.numeroPersonas,
    		numeroDias : reservacion.numeroDias
    	});
		*/
		var userId = firebase.auth().currentUser.uid;
		firebase.database().ref().child('Reservaciones/'+userId).push(reservacion);
		

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

			
		}
		catch(error){
			alert(error);
		}

	},
	nuevoUsuario: function(nombre, email, password){
		//CODIGO PARA GUARDAR EN LOCAL STORAGE
		/*var usuario      = {};
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
		*/
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
			$("#registro .nombre").val("");
			$("#registro .email").val("");
			$("#registro .password").val("");

			window.location.href = "#inicio";
		})
		.catch(function(error) {
        console.log(error)
        alert(error);
        var errorCode = error.code;
        var errorMessage = error.message;
  
});

	},
	iniciaSesion:function(){

		window.location.href = "#iniciaSesion";
	},
	ingresar:function(){
		var email   = $("#iniciaSesion .email").val();
		var password    = $("#iniciaSesion .password").val();

	//try{

		firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
  		window.location.href = "#inicio";

  		}).catch(function(error){
			console.log(error);
			alert("Email o contraseña incorrecta");
			var errorCode = error.code;
  			var errorMessage = error.message;
  		});
	//}


		/*
		try{
			if(email == ""){
				throw new Error("El email esta vacio");
			}
			if(password == ""){
				throw new Error("La contraseña esta vacia");
			}
			
			//checar si existe en local storage
			var obtenerDatos = window.localStorage.getItem("usuario");
		    var Datos  = JSON.parse(obtenerDatos);
		    var emailLS =Datos.email;
		    var passwordLS=Datos.password;

		    if(email == emailLS){
		    	if (password == passwordLS) {
                    //alert("datos correctos");
		    	}
		    	else
		    		throw new Error ("El password es incorrecto");
		    }
		    else
		    {
		    	throw new Error("El email es incorrecto");
		    }

		    //fn.nuevoUsuario(nombre, email, password);
			
			$("#iniciaSesion .email").val("");
			$("#iniciaSesion .password").val("");

			window.location.href = "#inicio";
		}
		catch(error){
			alert(error);
		}
		*/
		
	}
};

//COMPILAR PARA CELULAR
//fn.deviceready();

//PRUEBAS EN NAVEGADOR
fn.init();
