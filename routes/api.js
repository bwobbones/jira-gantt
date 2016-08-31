var _ = require('lodash');
var async = require('async');
var path = require('path');
var fs = require('fs');
var Client = require('node-rest-client').Client;
var moment = require('moment');

var options_auth = { user: 'lucasg', password: '!nirvmar2'};
var restClient = new Client(options_auth);

var startDate = moment([2016, 1, 28]);

// number of sprints is not accurate to the day
// Fix labels - looks weird on small lines
// Automation now contains the 1000 point task....
// number unestimated items metric
// Team velocity - show calculation
// highlight look out for closed components (all tasks done)
// highlight not done tasks
// highlight no one allocated
// Don't show brackets when there is no one working
// colour for past R1
// the progress bar means nothing
// find other dependencies
// components vs teams
// cross out issues (for what if) - maybe requirements
// current vs initial

exports.issuesByComponent = function(req, res) {
  
  var today = moment();
  var totalDays = today.diff(startDate, 'days');
  var numberOfSprints = _.ceil(totalDays / 14);
  
  var team = req.body;

  var query = 'project = "DBB" AND (resolution is EMPTY OR resolution != Cancelled) ' +
    'AND issuetype in ("TM Task", Story) and fixversion = "2.1R1" ' +
    'and component in (\'' + _.join(team.components, '\',\'') + '\') ' +
    'ORDER BY component, key';
    
  var args = {
          path:{},
          parameters:{},
          headers:{"Content-Type":"application/json"},
          data: { 
      "jql": query,
      "maxResults": 500
      }
  };
  
  restClient.post("http://opsvu-ee-jira01:8080/rest/api/latest/search", args, function(data, response) {
  
    // extract the key, status, resolution and the story points
    _.each(data.issues, function(issue) {        
      team.totalStoryPoints += issue.fields.customfield_10003 || 3;
      if (issue.fields.status.name === 'Closed') {
        team.closedStoryPoints += issue.fields.customfield_10003 || 3;
      }          
    });
    
    res.json({
      teamData: team,
      numberOfSprints: numberOfSprints
    });
    
  });  

}

exports.totalClosedStoryPoints = function(req, res) {
  
  var query = 'project = "DBB" AND status = "Closed" and (resolution is EMPTY OR resolution != Cancelled) ' +
    'AND issuetype in ("TM Task", Story) and fixversion = "2.1R1" ' +
    'ORDER BY component, key';    
    
  var args = {
          path:{},
          parameters:{},
          headers:{"Content-Type":"application/json"},
          data: { 
      "jql": query,
      "maxResults": 1000
      }
  };
  
  var closedStoryPoints = 0;
  
  restClient.post("http://opsvu-ee-jira01:8080/rest/api/latest/search", args, function(data, response) {
  
    closedStoryPoints = _.sum(_.map(data.issues, function(issue) {
      return issue.fields.customfield_10003;
    }));
    
    res.json({
      closedPoints: closedStoryPoints
    });
    
  });
  
}