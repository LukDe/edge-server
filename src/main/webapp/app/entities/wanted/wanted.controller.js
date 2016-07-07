(function() {
  'use strict';

  angular
  .module('edgeServerApp')
  .controller('WantedController', WantedController);

  WantedController.$inject = ['$scope', '$state', '$timeout', '$q', '$log','Data' ,'Offers'];

  function WantedController ( $scope, $state, $timeout, $q, $log, Data , Offers) {

    $scope.filters = { };

    $scope.offers = []

    $scope.selectedItem;
    $scope.selected = true;

    loadAll();


    /*-----------------------------------Load Data------------------------------------------------------------------*/


    function loadAll() {
      Data.action.query(function(result) {
        result.forEach(function (item){
          if(item.actionType=='SEEK'){
            console.log(item)
            $scope.offers.push(item);
          }
        })
      });
    }

    /*---------------------------------------------Modify items in the system-------------------------------------------*/



    $scope.pushToArray = function (item){  
      $scope.selectedItem = item;
        $scope.selected = false;
      Offers.setAction(item);
    };


    $scope.delFromArray = function (item){ 
    console.log(item.id) 
      Data.action.delete({id :item.id});
    };

    $scope.delFromObjects = function (item){  
      $scope.selectedItem.actionObjects.forEach( function(entry) {
        if (item===entry) {
          $scope.selectedItem.actionObjects.splice( $scope.selectedItem.actionObjects.indexOf(item), 1);
        }})
    };    


    $scope.writeDB = function (){
      Data.action.update($scope.selectedItem);
    }


    /*-----------------------------------------------Sorting---------------------------------------------------*/

    $scope.propertyName = 'age';
    $scope.reverse = true;

    $scope.sortBy = function(propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };





    /*-----------------------------------------------------MAP-----------------------------------------------*/




    var heatmap;

    var map;

    navigator.geolocation.getCurrentPosition(function(position){ 
      initialize(position.coords);
    }, function(){
      var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
      initialize(sanFrancisco) ;
    });

    function initialize(coords) {
     var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
     var myOptions = {
      zoom: 8,
      center: latlng,
      layerId: '06673056454046135537-08896501997766553811',
      disableDefaultUI : false
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(document.getElementById('controllerMaps'));

           //create the heatmap
           heatmap = new google.maps.visualization.HeatmapLayer({
            data: getHeatMapPoints(),
            map: map,
            radius: 60
          });

//mouselistener for click event
map.addListener('click', function(event) {    
  addMarker(event.latLng);    
});       




//sets the point of the user
var marker = new google.maps.Marker({
  position: latlng, 
  map: map, 
}); 
};


function addMarker(location) {  
  var marker = new google.maps.Marker({  
    position: location,  
    map: map  
  });  
} 

//sets the points
$scope.allHeatMapData = function(){
  heatmap.setData(getHeatMapPoints());
}

$scope.disasterHeatMapData = function(){
  heatmap.setData(heatMapDisasterData);
}

$scope.offerHeatMapData = function(){
  heatmap.setData(heatMapOfferData);
}

function getHeatMapPoints() {
  var points = heatMapOfferData.concat(heatMapDisasterData);
  return points;

}

// set of data for heatmap
var heatMapDisasterData = [
{location: new google.maps.LatLng(52.520645, 13.409779), weight: 0.2}
];

var heatMapOfferData = [
{location: new google.maps.LatLng(52.520645, 13.409779), weight: 0.2}
];

}
})();
