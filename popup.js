var articleApp = angular.module('articleApp', []);

articleApp.controller('ReadingListCtrl', function ($scope) {
  $scope.articles = [
    {'title': 'Google',
     'link': 'http://google.com'},
    {'title': 'Apple',
     'link': 'http://apple.com'},
    {'title': 'Facebook',
     'link': 'http://facebook.com'}
  ];
});