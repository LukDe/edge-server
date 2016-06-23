(function() {
    'use strict';
    angular
        .module('edgeServerApp')
        .factory('Message', Message);

    Message.$inject = ['$resource'];

    function Message ($resource) {
<<<<<<< HEAD
        var resourceUrl =  'api/messages/:id';
=======
        var resourceUrl =  'messageservice/api/messages/:id';
>>>>>>> origin/Linus-Edge

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
<<<<<<< HEAD
            'update': { method:'PUT' }
=======
            'update': { method:'PUT' },
            'save': { method:'POST' },
            'delete':{ method:'DELETE'}
>>>>>>> origin/Linus-Edge
        });
    }
})();
