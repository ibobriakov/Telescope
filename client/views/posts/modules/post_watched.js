Template.postWatched.helpers({
	watched: function() {
		var user = Meteor.user();
		if (user.watched && ~user.watched.indexOf(this._id)) {return 'checked'}
		else {return ''}
		return '';
	},
	user: function () {
		return Meteor.userId;
	}
});
Template.postWatched.events({
	'change input': function(e,t){
		var user = Meteor.user();
		if (user) {
			var watched = user.watched;
			if (!watched) {
				watched = [];
			}
			var position = watched.indexOf(this._id);
			if ( ~position ) watched.splice(position, 1);
			if (t.find('input').checked) {
				watched.push(this._id)
			}
			Meteor.users.update({_id: user._id}, {$set:{"watched": watched}})
		}
	}
});