console.log('API Route Connected');


// Link in Friends Data
var friendsData = require('../data/friends.js');
var path = require('path');

// Includes Two Routes
function apiRoutes(app) {

  app.get('/api/friends', function (req, res) {
    res.json(friendsData);
  });

  app.post('/api/friends', function (req, res) {

    // Parse new friend 
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;


    // Cross check the new friend entry with the existing ones
    var scoreComparisionArray = [];
    for(var i=0; i < friendsData.length; i++){
      var currentComparison = 0;
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
      }

      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the friendsData array
    var bestMatchPosition = 0;
    for(var i=1; i < scoreComparisionArray.length; i++){
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    var bestFriendMatch = friendsData[bestMatchPosition];

    res.json(bestFriendMatch);

    friendsData.push(newFriend);

  });

}

module.exports = apiRoutes;