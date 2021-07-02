import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {check} from 'meteor/check'
import  Twitter from 'twitter'
import { ServiceConfiguration } from 'meteor/service-configuration'

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})


function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.methods({
  postTweet: ({twitData}) => {

  // Build twit URL
  // get buildHonaLing ({twitData.commitmentId)
  // Build
  if (twitData.type === 'TXT') {
      check(twitData.type, String);
      console.log("I've just made a progress update on @honahq. View or join my commitment here: [url] #HonaYourWord");
  } else {
       throw new Meteor.Error("twit processing error", "Not a valid data type");
     }
  }

});

Meteor.startup(() => {

  Accounts.onLogin((user) => {
    if(user.methodName == "createUser") {

      console.log("This user logged in by signing up");


    }else if(user.type == "password") {

      console.log("This user logged in by using his/her password");


    }else if(user.type == "resume") {

      console.log("This user logged in using a localStorage token");
    }

    console.log(user.user?.services?.twitter);


  });
  console.log("service configurations remove weibo");
  // first, remove configuration entry in case service is already configured
  ServiceConfiguration.configurations.remove({
    service: "twitter"
  });
  ServiceConfiguration.configurations.insert({
    service: "twitter",
    consumerKey: "",
    loginStyle: "popup",
    secret: ""
  });


  console.log("Twitter service configuration");



  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});
