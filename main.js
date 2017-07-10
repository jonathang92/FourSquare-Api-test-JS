var map;
//Inicia el mapa con la coordenada por defecto de CARACAS
function initMap() {
  // Ubicación por defecto: CARACAS
  var defecto = {
    lat: 10.4937816,
    lng: -66.8782774
  };
  // var defecto = {
  //   lat: 40.7,
  //   lng: -74
  // };
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: defecto.lat, lng: defecto.lng},
    zoom: 14
  });
  obtenerUbicacion(defecto, map);
}


function foursquareAPI(pos, map){
  // alert(pos.lat+" "+pos.lng);
  var fsAPI = "https://api.foursquare.com/v2/venues/search";
    $.getJSON( fsAPI, {
      client_id: "",
      client_secret: "",
      ll: pos.lat+","+pos.lng,
      // ll: "40.7,-74",
      query: "pizza",
      v: "20170602",
      m: "swarm",
      limit: "13",
      radius: "2000",
      locale: "es"
    })
    .done(function( data ) {
      console.log( data );
      $.each( data.response.venues, function( i, venue ) {
        //datos del negocio
        nombre = venue.name;
        //localizacion
        localizacion = venue.location;
          latitud = localizacion.lat;
          longitud = localizacion.lng;
          direccion = localizacion.formattedAddress;
          distancia = localizacion.distance;
          pais = localizacion.country;
        //Categoria
        categoria = venue.categories['0'];
        if (categoria != undefined) {
          catname = categoria.name;
          caticon = categoria.icon.prefix + categoria.icon.suffix;
        } else {
          catname = undefined;
          caticon = undefined;
        }
        //verificacion
        verificado = venue.verified;
        //estatus
        estatus = venue.stats;
          usuarios = estatus.usersCount;
          facturados = estatus.checkinsCount;
        url = venue.url; //???
        //menu
        menu = venue.menu; //??
          if (menu != undefined) {
            tipo = menu.type;
            menuurl = menu.url;
          } else {
            tipo = undefined;
            menuurl = undefined;
          }
        // personas aqui
        aqui = venue.hereNow;
          cantidad = aqui.count;
          resumen = aqui.summary;
        //alcalde
        alcalde = venue.mayor; //??
        if (alcalde != undefined) {
          alnombre = alcalde.user.firstName;
          alapellido = alcalde.user.lastName;
          alfoto = alcalde.user.photo.prefix + alcalde.user.photo.suffix;
          alresumen = alcalde.summary;
        } else {
          alnombre = "No existe";
          alapellido = "";
          alfoto = undefined;
          alresumen = "No existe alcalde todavia";
        }
        locales = [nombre,latitud,longitud,direccion,distancia,pais,catname,caticon,verificado,usuarios,facturados,url,tipo,menuurl,cantidad,resumen,alnombre,alapellido,alfoto,alresumen];
        colocar(locales, map);
      });
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}
// con esta funcion se colocan todos los marcadores obtenidos con la API de FourSquare
function colocar(local, map){
    zelda = "http://maps.google.com/mapfiles/ms/micons/"
    var marker = new google.maps.Marker({
      position: {lat: local[1], lng: local[2]},
      map: map,
      icon: zelda+"green-dot.png",
      title: local[0]
    });
    mensaje(marker,local);
}
function mensaje(marker, datos) {
  //locales = [nombre,latitud,longitud,direccion,distancia,pais,catname,caticon,verificado,usuarios,facturados,url,tipo,menuurl,cantidad,resumen,alnombre,alapellido,alfoto,alresumen];
  datos ='\
    <h4>'+datos[0]+'<h4>\
    <h6><strong>'+datos[3]+'</strong><h6>\
    <h6>Distancia: '+datos[4]+' mts.<h6>\
    <h6>Categoria: '+datos[6]+'. <h6>\
    <h6>'+datos[9]+' Usuarios han visitado este lugar. <h6>\
    <h6>'+datos[10]+' Facturaciones de usuaros. <h6>\
    <h6>Personas aqui: '+datos[15]+'<h6>\
    <h6>Alcalde: '+datos[19]+'.<h6>\
  '
  var infowindow = new google.maps.InfoWindow({
    content: datos
  });

  marker.addListener('click', function() {

    if(infowindow){infowindow.close();}
    infowindow.open(marker.get('map'), marker);
  });
}
function ubicacionUsuario(ubicacion, map){
    zelda = "http://labs.google.com/ridefinder/images/"
    var marker = new google.maps.Marker({
      position: {lat: ubicacion.lat, lng: ubicacion.lng},
      map: map,
      icon: zelda+"mm_20_red.png",
      title: "Ubicación actual"
    });
    var cityCircle = new google.maps.Circle({
      strokeColor: '#8c8a8a',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: '#8c8a8a',
      fillOpacity: 0.25,
      map: map,
      center: {lat: ubicacion.lat, lng: ubicacion.lng},
      radius: 2000
    });
    // cityCircle.setMap(null);
}
function obtenerUbicacion(defecto, map) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      foursquareAPI(pos, map);
      ubicacionUsuario(pos, map);
      map.setCenter(pos);
    }, function() {
      foursquareAPI(defecto, map);
      ubicacionUsuario(defecto, map);
      // No se aceptaron los permisos de geolocalización
      ErrorGeo(true, map.getCenter());
    });
  } else {
    foursquareAPI(defecto, map);
    ubicacionUsuario(defecto, map);
    // Navegador no soporta la geolocalozación
    ErrorGeo(false, map.getCenter());
  }
}

function ErrorGeo(poseegeolocalizacion, pos) {
   alert (poseegeolocalizacion ?
                         'Error: Servicio de Gelolocaización fallido' :
                         'Error: El navegador no soporta geolocalización');
 }

 function borrarMarcadores() {
   clearMarkers();
 }
