Users = new Mongo.Collection('users');
Messages = new Mongo.Collection('messages');

Router.route('/', function () {
  var loginError = '';

  this.render('home');

  Template.home.events({
    'submit .login-form': function (event) {
      var username = $(event.target).find("#username")[0].value;
      var password = $(event.target).find("#password")[0].value;

      var user = Users.findOne({
        username: username
      });

      if (user.password === password) {
        Router.go('messages');
      } else {
        error = 'wrong password';
      }

      console.log(user);
      return false;
    }
  })
});

Router.route('/messages', function () {
  this.render('messages', {
    data: function () {
      return Messages.find({});
    }
  });
})

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
