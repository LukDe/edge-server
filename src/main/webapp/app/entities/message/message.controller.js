  (function() {
    'use strict';

    angular
    .module('edgeServerApp')
    .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message','$mdDialog', '$mdMedia',];

    function MessageController ($scope, $state, Message, $mdDialog, $mdMedia) {
      var vm = this;



      loadAll();

      $scope.conversations=[];
      $scope.messages=[];
      $scope.User;
      $scope.numLimit = 10;

      $scope.message={messageText : null};

      function loadAll() {
        Message.conversations.query(function(result) {
          result.forEach(function (argument) {
            $scope.conversations.push(argument);
            console.log(argument)
          })
        });
        Message.user.get(function(result) {
          $scope.User = result;
          console.log(result)
        });
      }

      function loadMessages (argument,index) {
        Message.messages.query({id:argument},function(result) {
          result.forEach(function (argument) {
            $scope['messages'+ index].push(argument);
            console.log(argument)
          })
        });
      }

      $scope.showCon = function (index,id) {
        $scope['selectedItem_'+ index];
        $scope['messages'+ index]=[];
        if($scope['selectedItem_'+ index] == true)
        {
          $scope['messages'+ index]=[];
          $scope['selectedItem_'+ index] = false;
        }else {
          loadMessages(id,index);
          $scope['selectedItem_'+ index] = true;
        }
      }
      $scope.delFromArray = function (argument) {
        showAlert("Sicher das sie das Match löschen wollen?","Auch ihr Match wird gelöscht!")
      }

      $scope.send =  function (argument,index) {
        if ($scope.message.messageText==null) {
          showAlert2("Bitte eine Nachricht eingeben")
        } else {
         $scope['messages'+ index].push({messageText: $scope.message.messageText, messageUser:  $scope.User.login , messageDate: new Date()});
         Message.newmessage.save({conversationId:argument},$scope.message);         
       }

     }

     /*--------------------------------------------------------------STUFF---------------------------------------------------*/

     function showAlert(erste,zweite) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .title(erste)
    .textContent(zweite)
    .targetEvent()
    .ok('Nein')
    .cancel('Ja');
    $mdDialog.show(confirm).then(function() {
      console.log('NEIN')
    }, function() {
     Message.delete.delete({id:argument});
   });
  };

  function showAlert2(text){
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(text)
      .ok('Ok')
      .targetEvent()
      );
  };
  
}
})();
