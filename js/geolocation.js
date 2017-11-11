var geo= {
	exito:function(position){
		//alert("exito");
		var coordenadas={
			lat:19.060354,
			lng: -98.221015
		};
        
		var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 15,
          center: coordenadas
        });

        var marker = new google.maps.Marker({
          	position: coordenadas,
          	map: map
        });
		
	},

	error:function(error){
		alert("ERROR:"+error.message);
	},

	obtenerPosicion:function(){

       navigator.geolocation.getCurrentPosition(geo.exito,geo.error);
	}
};