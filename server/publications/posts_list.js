// Publish a list of posts

Meteor.publish('postsList', function(terms) {
  if(canViewById(this.userId)){
    var parameters = getPostsParameters(terms);
    if (this.userId) {
      var user = Meteor.users.findOne({_id: this.userId})
      if (user.showUnwatched &&  user.watched) {
        parameters.find._id = { $nin: user.watched }
      }
    }
    var posts = Posts.find(parameters.find, parameters.options);

    // var parameters = getPostsParameters(terms), user = this.user();
    // if (user) parameters.find._id = { $nin: user.watched };
    // var posts = Posts.find(parameters.find, parameters.options);

    // console.log('//-------- Subscription Parameters:');
    // console.log(parameters.find);
    // console.log(parameters.options);
    // console.log('Found '+posts.fetch().length+ ' posts:');
    // posts.rewind();
    // console.log(_.pluck(posts.fetch(), 'title'));
    return posts;
  }
  return [];
});

// Publish all the users that have posted the currently displayed list of posts

Meteor.publish('postsListUsers', function(terms) {
  if(canViewById(this.userId)){
    var parameters = getPostsParameters(terms),
        posts = Posts.find(parameters.find, parameters.options),
        userIds = _.pluck(posts.fetch(), 'userId');
    return Meteor.users.find({_id: {$in: userIds}}, {fields: privacyOptions, multi: true});
  }
  return [];
});
