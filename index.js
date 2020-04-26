'use strict';
const
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  express = require('express'),
  requestify = require('requestify'),
  body_parser = require('body-parser'),
  request = require('request'),
  ejs = require("ejs"),
  fs = require('fs'),
  har = require('har-validator'),
  promise = require('promise'),
  win = require('window'),
  sendmessageurl='https://graph.facebook.com/v6.0/me/messages?access_token='+PAGE_ACCESS_TOKEN,
  pagelevelurl = 'https://graph.facebook.com/v6.0/me/messenger_profile?access_token='+PAGE_ACCESS_TOKEN,
  //userlevelurl = 'https://graph.facebook.com/v6.0/me/custom_user_settings?psid='+senderID+'&access_token='+PAGE_ACCESS_TOKEN,
  app = express().use(body_parser.json()); // creates express http server

app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/', (req, res)=>{
  res.send("Hello Oppa!");
})

// app.get('/register_books', (req, res) => {
// //  res.sendFile(`${__dirname}/public/registerbooks.html`);
// res.sendFile(`${__dirname}/public/testing.ejs`);
// })


app.set('view engine', 'ejs');
app.set('views', __dirname+'/public');

app.get('/register_books/:sender_id',function(req,res){
  const sender_id = req.params.sender_id;
    res.render('testing.ejs',{ title:"Hi!! from WebView", sender_id:sender_id});
});


app.post('/register_books', (req,res)=> {
  let email = req.body.email;
  let phno = req.body.phno;
   let sender = req.body.sender; 
 // let sender = req.senderID;

///
  // requestify

  // res.render('success.ejs', {}); TODO: show success page
  console.log("email",email);
  console.log("phno",phno);


   db.collection('Book').add({
            email:email,
            phno:phno
          }).then(success => {             
             textMessage(sender,"Register Successful");  
             res.status(200).send("Registration Successful and Please go back to your messages and please check your book detail");
            // window.location.assign('https://www.messenger.com/closeWindow/?image_url=https://secure.i.telegraph.co.uk/multimedia/archive/03058/thankyou-interest_3058089c.jpg&display_text=Thanks');
          }).catch(error => {
            console.log(error);
      }); 
  //console.log("Sender",sender);
 // textMessage(sender,"Register successful!");
  //  res.status(200).send('Message Success');
})


/*
app.post('/book_list/:sender_id',(req,res)=>

{ 
   var elements = []
    let senderID = req.params.sender_id;
    console.log("book list senderID",senderID)
   db.collection('Book').get().then( booklist => {
  if(booklist.empty){

  }
    else{
elements = []
      booklist.forEach( doc => {
     
        let data = {
            "title":doc.data.email,
            "subtitle":doc.data.phno,
              "buttons":[
              {
                "type":"postback",
                "title":"Complete",
                "payload":`Workcomplete`
              }

             ]}
             console.log(data)
             elements.push(data)
             console.log(elements)
      
})
requestify.post(sendmessageurl,
  {
    "recipient":{
    "id":senderID
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":elements
    }
  }
}
  })}
})
})
*/

 // -- variables firebase
  var admin = require("firebase-admin");
  var serviceAccount = {
    "type": "service_account",
    "project_id": "book-c045a",
    "private_key_id": "7d738d2479291f050228e9c4f955d7e2f5a2c4ca",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCi++yzQ1Ciq4dR\nb1oQHRJFwTBC/VESzgthfheRm9H+XlOoaY6mo2gWJePNElHUkWK7J+ft9tqFmX3J\nF/7f0EzxF//R/wF3WMIrTBEPIfPxPN5/3NTzNbCHXed3Ez+CqxIVlnClnt2BjkuG\nWVRdtYUoXQSjaH+H97E5kIPC6mg4eGftMk7n2NEEuWc3A1s9lBUxKjbkFFBquX43\nG4EcHi16rcGXUmPz33DLEE4dbGBtywIDeVmoWNV+i8yxI7eXn4TOh3bYh1K/Q/mw\nPwg5N7nYeeHpyAUC/GCalCPVjAf45RA5dOKFamUczZ9e+PBfr/JPe2SpaO82nGec\nT2MbTf3VAgMBAAECggEAAIBIyoZO9akUWe4/NyR3vWoqJVKVELs8crjKBsMVYrRU\nioSEkUOYWtUT/bnsMXye8pddUbB8HIQLzHX77SE9U1JxEWq4zO6jbjGmLcc7ckbv\nIjKCHxtPpyLlRsry24p+HD3hq8iwwqi217tnlIAt4CFlFcGI/tiGnXgxx4Qj/OR0\nnj+yqc/Abktg8SCNgv0sN1S4JY1iARI3tGl8Gc8w9hFRDrkJbF+RU/nb8pGfY1qf\nmiQEUlGMbU/+ZflkJU/jyC58b2nIgjGhyUZpMKX7cGQLa0KXqAYho/RxgbgTVFp5\ncU8nbxsUgXJCiQRAhia3eaenMYl85LTzyU6oeflwIwKBgQDhQsXqo2bCc87AgRtG\n74LU5xBc5YsSURES2kCe1HhI6/jrwPri0igUFgDmm490uXb4lmYw545mmyHk6bzL\ntNBqq5114gQ8aQRpi6cGfXBEhZUVYzCXJThJkuHHO6X9rq+3dIW64XrNtaOWTevT\nBoWo9GZlWKeuLTCo1KP7iAlHywKBgQC5OZXLKd+lDu9uzWrC8Ra1Kw5yGxWO1Wfo\n+YR5ukEujRU7bMXZiy1Cm2m0dlbw0OYyYX1KoTGqJE71KNxJpILBHNs+tXDDyQwi\nXYO5PcieI+g3flGoy50huC+NTtYY/ZgRQzkrHydZwGUiwo1hcP+QqlLOy8Kc5gsy\nssb+l9Lc3wKBgChnXK6Qbn8UXJJE1gqsLTBY3aN7/KzlY4WZJhwXChgyUyyeKaID\nhfLMW48BegK6vW8rMts0vWMEEllH33g+T1/CtnSNfKsFPyhbRzMvzrJLr4jtiKqj\nn2v674pX1Zch/RyPxujVRrydBuGPymvIcLL0W2V0OGdSbbbqpRsZtGhvAoGAC5LU\nkEhCiC7BuTuuoxWrZJCXK3wTwcQF5SHKLEz+C6mXHQpz5l7y6gmJ9lO6pPt4lsdO\nq94cm1P/dwQhl5xm6yghbu6paCJk1rTfKTD6Gx+FQAptkc1/OP8oQX0elZsq6FE5\n/j7JF6uU5jIf4WnNHj32RKOoumMJahaPppLYAyMCgYBbL33rUpMUWoVLJ9ItjiQf\n4sVzoR/l+1YRj9Jg7L7XFz5GPKTFbyfUA0p2qMJmUMRVz6tQh4m/CRP/ex/dsZft\nuRKGAvwPwaTa9PxTpX8ZhlKwIQlMBrqNqqUxr9PF81Oov7Ce9DbaNMWCUFKMSgR3\nQ2+DNOhC56g8csSEoifAUg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-f39cg@book-c045a.iam.gserviceaccount.com",
    "client_id": "115739872973351504459",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f39cg%40book-c045a.iam.gserviceaccount.com"
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://book-c045a.firebaseio.com"
  });


  const   db = admin.firestore();

   
  // GetStart and Greeting message (page level)
  requestify.post(pagelevelurl,
    {"get_started":{"payload":"Start"},  
  "greeting": [
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}! \nWe provide service!!" 
    }
  ]

  }).then(function(success) {
  console.log('Getstarted.success');
  // body...
  })
  const port = process.env.PORT || 1337;
   // webhook()
  app.listen(port, () => console.log(`webhook is listening >> ${port}`));

   // Accepts GET requests at the /webhook endpoint
  app.get('/webhook', (req, res) => {

     // req.status(200).send('Request received');

    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = process.env.VERIFICATION_TOKEN;
    

    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {

      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        // Respond with 200 OK and challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);

      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  });




  app.post('/webhook', (req, res) => {  
 
      let body = req.body;

      // Checks this is an event from a page subscription
      if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) 
        {

          // Gets the message. entry.messaging is an array, but 
          // will only ever contain one message, so we get index 0
          let webhook_event = entry.messaging[0];
          console.log("webhook_event",webhook_event);
          var senderID=webhook_event.sender.id;
          console.log('senderID',senderID);
          if(webhook_event.postback)
             {
            var userInput=webhook_event.postback.payload; 
             }
          if (webhook_event.message) 
             {
                if (webhook_event.message.text) 
                {
                      var userInput=webhook_event.message.text;
                      
                      
                }

                if (webhook_event.message.attachments)
                    {
                    var userMedia=webhook_event.message.attachments.payload;

                    }
             }
               
           db.collection('admin').where('adminid','==',`${senderID}`).get().then(adminList => {
               if(adminList.empty)
                {
                      db.collection('BookAdvisor').where('id','==',`${senderID}`).get().then(advisorList => {
                          if(advisorList.empty)
                           {
                              db.collection('user').where('id','==',`${senderID}`).get().then(userList => {
                                        if(userList.empty)
                                    {
                                 
                                       requestify.post('https://bookherokuwp.herokuapp.com/RegisterQuickReply', {
                                        userInput: userInput || null,
                                        senderID: senderID,
                                        image: userMedia
                                               })
                                    }
                                        else
                                    {
                                        requestify.post('https://bookherokuwp.herokuapp.com/user', {
                                        userInput: userInput|| null,
                                        senderID: senderID
                                                })
                                    }
                               })
                        
                            }
                        else
                            {
                                requestify.post('https://bookherokuwp.herokuapp.com/advisor', {
                                  userInput: userInput|| null,
                                  senderID: senderID,
                                  
                                  video: userMedia
                                        })
                            }
                          })
                }
              else
                {
                            
                         requestify.post('https://bookherokuwp.herokuapp.com/admin', {
                         userInput: userInput || null,
                         senderID: senderID,
                         
                         })

                    console.log({ userInput, senderID });

                    if(userInput == 'Hi') 
                    {
                      RegisterBook(senderID,'Welcome Admin');
                    }
                    else if (userInput == 'Start')
                    {
                      greeting(senderID,'Please Type "Hi" to Start Admin Process! ');

                      textMessage(senderID,'Welcome Admin');
                    }
                    else if (userInput == 'booklist')
                    {
                      Get_BookList(senderID);
                    }
                
                 }
           })
       
        
      });

       // Returns a '200 OK' response to all requests
       res.status(200).send('EVENT_RECEIVED');
      } else {
       // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }

  });


  // function sendToAdmin(req) {
  //     var userInput = req.userInput
  //     var senderID = req.senderID
  
  //     if(userInput == 'Hi'){
  //       // textMessage(senderID,'Welcome Admin')
  //       RegisterBook(senderID,'Welcome Admin');
  //     }   

  //     return null;   
  // }

  // app.post 
  // app.post('/admin', (req, res) => {
  // var userInput = req.body.userInput
  // var senderID = req.body.senderID
  
  //     if(userInput == 'Hi'){
  //      // textMessage(senderID,'Welcome Admin')
  //      RegisterBook(senderID,'Welcome Admin');
  //     }
  //     else if (userInput == 'Start')
  //     {
  //       textMessage(senderID,'Welcome Admin');
  //     }
  // })

  app.post('/advisor', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
      if(userInput){
        textMessage(senderID,'Welcome Advisor')
      }
  })

  app.post('/user', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
    if(userInput){
      textMessage(senderID,'Welcome User')
    }
  })

  app.post('/RegisterQuickReply', (req, res) => {
  var userInput = req.body.userInput
  var senderID = req.body.senderID
    if(userInput == 'Hi'){
     QuickReply(senderID,'Welcome New User');
      }
  })

  app.get('/login', (req, res) => {
    // ejs lote tl

    // res.send( <payload> );
  })

  // functions

  function textMessage(senderID,text){
      requestify.post('https://graph.facebook.com/v2.6/me/messages?access_token='+PAGE_ACCESS_TOKEN, {
        "recipient":{
        "id":senderID},
        "message":{
          "text":text
        }
      })
  }


  function greeting(senderID,text)
  {
    requestify.post('https://graph.facebook.com/v2.6/me/messages?access_token='+PAGE_ACCESS_TOKEN, {
        "recipient":{
        "id":senderID},
        "message":{
          "text":text
        }
      })
  }


  function Get_BookList(senderID)
  {
      
        db.collection('Book').get()
        .then((booklist) => {

          let elementItems = [];
          booklist.forEach((doc) => {
          

             var obj = {};
         //obj._id  = doc.id ;        
           obj.email = doc.data().email;             
           obj.phno = doc.data().phno;
           elementItems.push(obj.email);

           console.log("Email",obj.email);
           console.log("Phno",obj.phno);
          })



        requestify.post('https://graph.facebook.com/v2.6/me/messages?access_token='+PAGE_ACCESS_TOKEN,
  {
    "recipient":{
    "id":senderID
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":elementItems
    }
  }
}
  }).catch((err) => {
    console.log('Error getting documents', err);
  });
        })

   


      }
  

 function RegisterBook(senderID,text){
 requestify.post('https://graph.facebook.com/v2.6/me/messages?access_token='+PAGE_ACCESS_TOKEN,
  {
    "recipient":{
      "id":senderID
    },
  "message":{
   "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title":text,
              "subtitle":"Please Register Book",
                "buttons":[
                  // {
                  //    "type": "postback",
                  //   "title": "Register",
                  //   "payload" : "Fake"
                  // "url":"https://bophyo.herokuapp.com/bookregister/",
                  // "webview_height_ratio": "full",
                  // "messenger_extensions": true, 
                  // }
                  {
                    "type":"web_url",
                    "url":"https://bookherokuwp.herokuapp.com/register_books/"+senderID,
                    "title":"Register Books",
                    "webview_height_ratio": "full"
                  },
                  {
                    "type":"postback",
                   // "url":"https://bookherokuwp.herokuapp.com/book_list/",
                    "title":"Books List",
                    "payload" : "booklist"
                  },
                  {
                    "type":"web_url",
                    "url":"https://bookherokuwp.herokuapp.com/testing",
                    "title":"Edit Books",
                    "webview_height_ratio": "full"
                  }
               ]}

        ]
      }
    }
  }
  })
 
  console.log('button_sender',sender_psid);



}

  function  QuickReply(senderID,text)
  {
          requestify.post(sendmessageurl,
                             {  
                                "recipient":{
                                  "id":senderID
                            },
                            
                            "message":{
                              "text": text,
                              "quick_replies":[
                                {
                                  "content_type":"text",
                                  "title":"Admin",
                                  "payload":"register_admin",
                                },
                                {
                                  "content_type":"text",
                                  "title":"User",
                                  "payload":"register_user",
                                }
                              ]
                            }
                            }).then(result=>{ console.log(" quick reply ok")
                                }).catch(err=>{console.log("err",err)})
                        


  }

