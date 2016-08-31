appServices.factory("TeamService", function(_, Team) {
  
  var teams = [];
  teams.push(Team.build({
    name: 'Unified Communications',
    components: ['Quality of Service', 'Radio over IP', 'Unified Communications'],
    teamNames: ['Ben N']
  }));
  teams.push(Team.build({
    name: 'SQL',
    components: ['Database', 'Log Management'],
    teamNames: ['Arun']
  }));
  teams.push(Team.build({
    name: 'Software Selection',
    components: ['Privileged Svc Acct Mgt', 'Services Replication Control'],
    teamNames: ['Yaser']
  }));
  teams.push(Team.build({
    name: 'Host Based Security',
    components: ['Host Based Security'],
    teamNames: ['Paul', 'Wally']    
  }));
  teams.push(Team.build({
    name: 'Messaging & Directory Services',
    components: ['Directory Services', 'User Acct Mgt', 'Messaging'],
    teamNames: ['John', 'Ben N']    
  }));
  teams.push(Team.build({
    name: 'Backup & Restore',
    components: ['Backup and Restore','Disaster Recovery'],
    teamNames: ['Ben K']    
  }));
  teams.push(Team.build({
    name: 'Endpoint Monitoring',
    components: ['Endpoint Monitoring'],
    teamNames: ['Shannon']    
  }));
  teams.push(Team.build({
    name: 'Collaboration',
    components: ['Collaboration'],
    teamNames: ['Arun']    
  }));
  teams.push(Team.build({
    name: 'Automation',
    components: ['Server Virtualisation', 'Automation', 'WAN optimisation', 'Amalgamation', 'Load Balancing', 'Admin SOE', 'File Services', 'Power Management', 'Development Env', 'Test Env'],
    teamNames: ['Adam', 'Russell', 'Haydn', 'Quazi', 'Ossie']    
  }));
  teams.push(Team.build({
    name: 'SOE',
    components: ['Client SOE','Server SOE','Wireless - protected','Print Services','Endpoint Management'],
    teamNames: ['Matt', 'Dean']    
  }));
  teams.push(Team.build({
    name: 'Network Based Security',
    components: ['Network Based Security'],
    teamNames: ['Stephen']    
  }));
  teams.push(Team.build({
    name: 'Certificate Services',
    components: ['Certificate Services'],
    teamNames: []    
  }));
  teams.push(Team.build({
    name: 'Environments',
    components: ['Pre-production Env','Production Root','HelpDesk - variant'],
    teamNames: []    
  }));
  teams.push(Team.build({
    name: 'Build Variant',
    components: ['Build Variant'],
    teamNames: ['']    
  }));
  teams.push(Team.build({
    name: 'LO Variant',
    components: ['LO Variant'],
    teamNames: ['James']    
  }));
  
  var teamService = {
    
    getTeams: function() {  
      return teams;
    },
    
    getNumberOfTeams: function() {
      return teams.length;
    },
    
    getNumberOfStaff: function() {
      var teamSize = 0;       
      _.each(teams, function(team) {
        teamSize += team.teamNames.length;
      });
      return teamSize;
    }
    
  };
  return teamService;
});