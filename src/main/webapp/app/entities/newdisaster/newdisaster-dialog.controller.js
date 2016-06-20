(function() {
    'use strict';

    angular
        .module('edgeServerApp')
        .controller('NewdisasterDialogController', NewdisasterDialogController);

    NewdisasterDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Disaster'];

    function NewdisasterDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Disaster) {
        var vm = this;

        vm.disaster = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.disaster.id !== null) {
                Disaster.update(vm.disaster, onSaveSuccess, onSaveError);
            } else {
               Disaster.save(vm.disaster, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('edgeServerApp:newdisasterUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
