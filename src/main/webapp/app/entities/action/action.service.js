(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Action', Action);

    Action.$inject = ['$resource'];

    function Action ($resource) {
        var resourceUrl =  'disasterservice/' + 'api/actions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
