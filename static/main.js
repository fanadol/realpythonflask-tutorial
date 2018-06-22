(function(){
    'use strict';

    angular.module('WordcountApp', [])
    .controller('WordcountController', ['$scope', '$log', '$http', '$timeout',
        function($scope, $log, $http, $timeout){
            $scope.submitButtonText = 'Submit';
            $scope.loading = false;
            $scope.urlerror = false;
            $scope.getResults = function(){

                $log.log("test");

                // get the URL from the input
                var userInput = $scope.url;

                // fire the API request
                $http.post('/start', {"url": userInput}).
                    success(function(results){
                        $log.log(results);
                        getWordCount(results);
                        $scope.wordcounts = null;
                        $scope.loading = true;
                        $scope.submitButtonText = 'Loading...';
                        $scope.urlerror = false;
                    }).
                    error(function(error){
                        $log.log(error);
                    });
            };

            function getWordCount(jobID){
                var timeout = "";

                var poller = function(){
                  // fire another request
                  $http.get('/results/'+jobID).
                    success(function(data, status, headers, config){
                      // when still counting
                      if(status === 202){
                        $log.log(data, status);
                      // when the counting is done
                      } else if(status === 200){
                        $log.log(data);
                        $scope.loading = false;
                        $scope.submitButtonText = "Submit";
                        $scope.wordcounts = data;
                        $timeout.cancel(timeout);
                        return false;
                      }
                      // continue to call the poller() function every 2 seconds
                      // until the timeout is cancelled
                      timeout = $timeout(poller, 2000);
                    }).
                    error(function(error){
                      $log.log(error);
                      $scope.loading = false;
                      $scope.submitButtonText = 'Submit';
                      $scope.urlerror = true;
                    });
                };
                poller();
            }
        }
    ])
    .directive('wordCountChart', ['$parse', function($parse) {
      return {
        // creates a directive that is restricted to an HTML element
        restrict: 'E',
        // simply replace the HTML directive with the HTML in the template
        replace: true,
        template: '<div id="chart"></div>',
        // give access to variables in the scope defined in the controller
        link: function(scope) {
          scope.$watch('wordcounts', function(){
            // when the 'wordcounts class' change, this function is fired.
            d3.select('#chart').selectAll('*').remove();
            var data = scope.wordcounts;
            for(var word in data){
              d3.select('#chart')
                .append('div')
                .selectAll('div')
                .data(word[0])
                .enter()
                .append('div')
                // dynamically create a width based on the numeric value
                // of how often a word shows up on a webpage
                .style('width', function(){
                  return (data[word][1] * 5) + 'px';
                })
                .text(function(d){
                  return data[word][0];
                });
            }
          }, true);
        }
      };
    }]);
}());
