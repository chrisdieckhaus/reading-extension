myApp.controller("PageController", function($scope){
  $scope.message = "Hello";

  chrome.tabs.query({'active': true},
  function(tabs){
    if (tabs.length > 0){
      $scope.title = tabs[0].title;
      $scope.url = tabs[0].url;
      $scope.savedLinks = [];

      $scope.saveLink = function(){
        if ($scope.savedLinks.indexOf($scope.url) !== -1){
          alert("Already in list");
        }else{
          $scope.savedLinks.push({title: $scope.title, url: $scope.url});
        }
      };

      $scope.removeLink = function(index){
        $scope.savedLinks.splice(index, 1);
      };

      chrome.tabs.sendMessage(tabs[0].id, {'action': 'PageInfo'}, function(response){
        $scope.pageInfos = response;
        $scope.$apply();
      });
    }
  });
});
