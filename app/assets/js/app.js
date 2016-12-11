// P2Pools
(function () {
  /* eslint-disable no-unused-vars */
  var app = angular.module('tumblethough', ['tumblethough-filters',
    'tumblethough-frontpage', 'tumblethough-about',
    'tumblethough-contact', 'tumblethough-images',
    'ngRoute', 'angularGrid']) // eslint-disable no-unused-vars

    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider
                .when('/about', {
                  templateUrl: 'templates/about.html',
                  controller: 'AboutController'
                })
                .when('/contact', {
                  templateUrl: 'templates/contact.html',
                  controller: 'ContactController'
                })
                .when('/test', {
                  templateUrl: 'templates/images.html',
                  controller: 'ImageController'
                })
                .otherwise({
                  templateUrl: 'templates/images.html',
                  controller: 'ImageController'
                })
      }])

    .controller('NavController', ['$scope', '$location',
      function ($scope, $location) {
        $scope.$location = $location
      }])
})();

// Frontpage
(function () {
  var app = angular.module('tumblethough-frontpage', [])

    .controller('FrontPageController', [ '$http', '$scope',
      function ($http, $scope) {
        var frontpage = this
        frontpage.scope = $scope

        frontpage.peers = {}

        function updatePeers (frontpage) {
          // $http.get('./common/fetch.php').then(function(r){
          //    frontpage.peers = r.data;
          // })
        };

        setInterval(function (scope) {
          updatePeers(frontpage)
        }, 120000)

        updatePeers(frontpage)
      }])
})();

// Images
(function () {
  var app = angular.module('tumblethough-images', [])

    .controller('ImageController', ['$http', '$scope',
      function ($http, $scope) {
        var imagePage = this
        imagePage.scope = $scope

        var offset = 0
        imagePage.posts = []

        function updateImages (offsetNum) {
          $http.get('./auth/test?offset=' + offsetNum).then(function (r) {
            if (offset !== 0) {
              imagePage.posts = imagePage.posts.concat(r.data)
            } else {
              imagePage.posts = r.data
            }

            offset = offset + 20
          })
        }

        // method to load next data
        imagePage.loadMore = function () {
          updateImages(offset)
        }

        imagePage.reblogQ = function (id, reblogKey) {
          $http.get('./auth/reblog?id=' + id + '&reblog_key=' + reblogKey)
            .then(function (r) {
              console.log(r)
            })
        }

        imagePage.loadMore()
      }])
})();

// Blocksplorer Filters
(function () {
  var app = angular.module('tumblethough-filters', [])

    .filter('image_url', function () {
      return function (post) {
        if (!post.photos) {
          console.log('No photos for post: ' + post.post_url)
        }
        if (post.photos[0].alt_sizes[2].url) {
          return post.photos[0].alt_sizes[2].url
        } else if (post.photos[0].alt_sizes[1].url) {
          console.log('1')
          return post.photos[0].alt_sizes[1].url
        } else if (post.photos[0].alt_sizes[0].url) {
          console.log('0')
          return post.photos[0].alt_sizes[0].url
        } else if (post.photos[0].original_size) {
          console.log('Original')
          return post.photos[0].original_size.url
        } else {
          console.dir(post)
          return post
        }
      }
    })
})();

// About Page
(function () {
  var app = angular.module('tumblethough-about', [])

    .controller('AboutController', [ '$http', '$scope',
      function ($http, $scope) {
      }])
})();

// Contact Page
(function () {
  var app = angular.module('tumblethough-contact', [])

    .controller('ContactController', [ '$http', '$scope',
      function ($http, $scope) {
      }])
})()
