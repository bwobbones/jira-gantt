angularModules.factory('Team', function () {
  
  function Team(name, components, teamNames) {    
    this.name = name;
    this.components = components;
    this.teamNames = teamNames;
    this.totalStoryPoints = 0,
    this.closedStoryPoints = 0,
    this.velocity = 0.0,
    this.remainingSprints = 0.0
  }
  
  return {
    
    build: function (data) {
      var team = new Team(
        data.name,
        data.components,
        data.teamNames
      );
      
      return team;
    }
    
  };
  
});