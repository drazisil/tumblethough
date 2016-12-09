// P2Pools
(function() {
    var app = angular.module('tumblethough', ['tumblethough-filters', 'tumblethough-frontpage', 'tumblethough-about',
        'tumblethough-contact', 'tumblethough-images', 'ngRoute', 'angularGrid'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/about', {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutController'
                }).
                when('/contact', {
                    templateUrl: 'templates/contact.html',
                    controller: 'ContactController'
                }).
                when('/test', {
                    templateUrl: 'templates/images.html',
                    controller: 'ImageController'
                }).
                otherwise({
                    templateUrl: 'templates/index.html',
                    controller: 'FrontPageController'

                });
        }])
        
    .controller('NavController', ['$scope', '$location', function($scope, $location) {
        $scope.$location = $location;
    }])
    
})();

// Frontpage
(function() {
    var app = angular.module('tumblethough-frontpage', [])

    .controller('FrontPageController',  [  '$http', '$scope', function($http, $scope) {
        var frontpage = this;
        frontpage.scope = $scope;
        
        frontpage.peers = {};

        function updatePeers(frontpage) {
            // $http.get('./common/fetch.php').then(function(r){
            //    frontpage.peers = r.data;
            // })
        };
        
        setInterval(function(scope) {
            updatePeers(frontpage);
        }, 120000);
        
        updatePeers(frontpage);
    }]);
    
  
})();

// Images
(function() {
    var app = angular.module('tumblethough-images', [])

    .controller('ImageController',  [  '$http', '$scope', function($http, $scope) {
        var imagePage = this
        imagePage.scope = $scope
        
        var offset = 0
        imagePage.images = []

        function updateImages(offsetNum) {
            $http.get('./auth/test?offset=' + offsetNum).then(function(r){
                console.log(offset)
                if (offset != 0) {
                    imagePage.images = imagePage.images.concat(r.data.liked_posts)
                } else {
                    imagePage.images = r.data.liked_posts
                }
                
                offset = offset + 20
            })
        }
 
        //method to load next data
        imagePage.loadMore = function(){
            updateImages(offset)
        }
        
        imagePage.loadMore()
    }])
    
  
})();

// Blocksplorer Filters
(function() {
    var app = angular.module('tumblethough-filters', [])
})();

// About Page
(function() {
    var app = angular.module('tumblethough-about', [])

    .controller('AboutController',  [  '$http', '$scope', function($http, $scope) {
    }]);
    
  
})();

// Contact Page
(function() {
    var app = angular.module('tumblethough-contact', [])

    .controller('ContactController',  [  '$http', '$scope', function($http, $scope) {
    }]);
    
  
})();
