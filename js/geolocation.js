var geo= {
	exito:function(position){
		//alert("exito");
		var coordenadasHotel={
			lat:19.060354,
			lng: -98.221015
		};
        
        var coordenadasUsuario={
        	lat: position.coords.latitude,
        	lng: position.coords.longitude
        }
		var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 10,
          center: coordenadasUsuario
        });

        var directionsDisplay=new google.maps.DirectionsRenderer({
        	map:map
        });

        var request={
        	destination: coordenadasHotel,
        	origin: coordenadasUsuario,
        	travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsService= new google.maps.DirectionsService();

        directionsService.route(request,function(response,status){
        	if (status==google.maps.DirectionsStatus.OK){
        		directionsDisplay.setDirections(response);
        	}
        });
	},

	error:function(error){
		alert("ERROR:"+error.message);
	},

	obtenerPosicion:function(){
		alert("hola");
       navigator.geolocation.getCurrentPosition(geo.exito,geo.error);
	}
};