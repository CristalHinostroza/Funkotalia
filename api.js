
function iniciarMap(){
   var corde = {lat:-41.47014544817426 ,lng:-72.92584372010874};
   var map= new google.maps.Map(document.getElementById('mapa'),{
      zoom:10,
      center: corde,
   });
   var marker = new google.maps.Marker({
      position: corde,
      map: map
    });

 }
