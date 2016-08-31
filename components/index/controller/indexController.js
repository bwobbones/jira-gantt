angularModules.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('index', {      
      url: '/',
      views: {
        "searchPanel": {templateUrl: "partials/index/jiraReport", controller: IndexCtrl}
      }      
    });
});

angularModules.constant('CONFIG', {
  startDate: moment([2016, 1, 28])
});

function IndexCtrl($http, $rootScope, $scope, CONFIG, _, TeamService) {   
  
  var numberLoaded = 0;  
  var overallClosedStoryPoints = 0;
  
  $scope.data = [];
  $scope.loadingValue = 0;  
  $scope.overallEndDate = moment().format('DD/MM/YYYY');
  $scope.endDateTeamName = '';
  $scope.overallStoryPoints = 0;
  
  $scope.loadingText = 'Finding Velocity...';
  $http.get('api/totalClosedStoryPoints').then(function(httpResult) {
    
    $scope.loadingValue = 0;  
    $scope.loadingText = 'Loading Components...';
    overallClosedStoryPoints = httpResult.data.closedPoints;
    
    var today = moment();
    var totalDays = today.diff(CONFIG.startDate, 'days');
    $scope.numberOfSprints = _.ceil(totalDays / 14, 1);
    $scope.overallClosedStoryPoints = overallClosedStoryPoints;
    $scope.numberOfStaff = TeamService.getNumberOfStaff();
    
    // number of closed points  / number of sprints / number of people - the -1000 is for the special case below.
    $scope.teamVelocity = _.ceil(($scope.overallClosedStoryPoints-1000) / $scope.numberOfSprints / TeamService.getNumberOfStaff(), 1);
    
  }).then(function() {
    _.each(TeamService.getTeams(), function(team) {
      
      $http.post('api/issuesByComponent', team).then(function(componentData) {
        
        var team = componentData.data.teamData;
        
        $scope.overallStoryPoints += team.totalStoryPoints;
        
        // special case - there is a 1000 point previous work task added to the automation team that needs to be disregarded
        if (team.name === 'Automation') {
          team.totalStoryPoints -= 1000;
          team.closedStoryPoints -= 1000;
        }
        
        var teamSize = team.teamNames.length || 1;
        var remainingSprints = _.ceil((team.totalStoryPoints - team.closedStoryPoints) / _.ceil(($scope.teamVelocity * teamSize), 1));   
        var endDate = moment(CONFIG.startDate).add((($scope.numberOfSprints + remainingSprints)*14), 'days');
        
        $scope.data.push({
          name: team.name + ' (' + _.join(team.teamNames, ',') + ')',
          tasks: [
            {
              name: _.join(team.components, ', ') + ' Total SP: ' + team.totalStoryPoints,            
              from: CONFIG.startDate,
              to: endDate,
              progress: (team.closedStoryPoints / team.totalStoryPoints) * 100            
            }
          ]
        });           
        
        $scope.data = _.sortBy($scope.data, 'name');
        
        numberLoaded = numberLoaded + 1;
        $scope.loadingValue = (numberLoaded / TeamService.getNumberOfTeams()) * 100;         
        
        $scope.percentageComplete = _.ceil((($scope.overallClosedStoryPoints/$scope.overallStoryPoints) * 100), 1);                
        
        if (endDate.isAfter(moment($scope.overallEndDate, 'DD/MM/YYYY'))) {
          $scope.overallEndDate = endDate.format('DD/MM/YYYY');
          $scope.endDateTeamName = team.name;
        }
        
      });
      
    });
    
  });

}