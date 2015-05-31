myApp.controller("PageController", function($scope){
  console.log(localStorage);
  chrome.tabs.query({'active': true},
  function(tabs){
    if (tabs.length > 0){
      $scope.title = tabs[0].title;
      $scope.url = tabs[0].url;

      d = new Date();
      var yyyy = d.getFullYear().toString();
      var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = d.getDate().toString();
      $scope.dateAdded = yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);


      alert($scope.dateAdded);

      $scope.savedLinks = allStorage();

      $scope.saveLink = function(){
        localStorage[$scope.title] = $scope.url;
        allStorage();
        $scope.savedLinks = allStorage();
      };

      $scope.removeLink = function(linkTitle){
        localStorage.removeItem(linkTitle);
        $scope.savedLinks = allStorage();
      };

      chrome.tabs.sendMessage(tabs[0].id, {'action': 'PageInfo'}, function(response){
        $scope.pageInfos = response;
        $scope.$apply();
      });
    }
  });

  function allStorage(){

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0;

    for (; i < keys.length; i++) {
        archive.push({title: keys[i], url: localStorage.getItem(keys[i]) });
    }
    console.log(archive);
    return archive;
}
});
