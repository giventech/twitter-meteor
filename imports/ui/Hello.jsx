import React, { useState } from 'react';
import Twitter from 'twitter';

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);

          Meteor.loginWithTwitter({

          }



      , (error) => {
          if (error) {
              Session.set('errorMessage', error.reason || 'Unknown error');
          }
      });
      var result = Twitter(function(){
          console.log("success");
      });
      console.log("credentials");
      console.log(result);

  };

  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
