/*
 *  Copyright (C) DumbPosters - All Rights Reserved
 *  Unauthorized copying, distribution, sharing and editing/modifying of this file and other files in the folder of "SERVERFOLDER", 
 *  via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Adak Celina <celinaadak@gmail.com>, January 17th, 2021
 */



// declaring the main variables we will need in the app
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
const DBURI = "mongodb+srv://bosdos12:112211@postdata.oqmy2.mongodb.net/DumbPostersDB?retryWrites=true&w=majority"
// importing the schemas
const User = require("./Schemas/User");
const Post = require("./Schemas/Post");
const { db, collection } = require("./Schemas/User");
let usersCol = db.collection("users");
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// importing and using helmet for security
const helmet = require("helmet");
app.use(helmet())



// connecting to the database and if succesfull starting the host
mongoose.connect(DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(ConnectedToServerRES => {
    app.listen(PORT, "192.168.42.232", () => {
        console.log(`[THE SERVER HAS STARTED RUNNING ON PORT: [${PORT}]]`);
    })
}).catch(err => {
    console.log(err);
})

// setting my view engine
app.set("view engine", "ejs");
app.set("views", "views");

// setting the homescreen of the server url (only page of the site btw)
app.get("/", (req, res) => {
    res.render("index")
})


// ======================================================
//   Users Related Stuff
/**
 *  Getting The Whole Users
 */
app.get("/users", (req, res) => {
    User.find()
    .then(UserFoundRes => {
        res.send(UserFoundRes);
    }).catch(err => {
        console.log(err);
    })
})




/**
 *  Getting Single Users by username!
 */
app.get("/singleuser/:username", (req, res) => {
    User.find({username: req.params.username})
    .then(SingleUserFoundRes => {
        // checking if the user exists
        if (SingleUserFoundRes.length > 0) { 
            res.json(SingleUserFoundRes)
        } else {
            res.status(404).json({"err": `user with the username of [${req.params.username}] not found`})
        }
    }).catch(err => {
        console.log(err)
    })
})


// getting single users by email
// for checking if the email is already in use
app.get("/singleusersBYEMAIL/:email", (req, res) => {
    User.find({email: req.params.email})
    .then(EmailFoundSingleUser => {
        // checking if the users exists
        if (EmailFoundSingleUser.length > 0) {
            // the user exists so returning 1 as true status with json
            res.json({"jsonstatus": 1})
        } else {
            // the user doesnt exists so returning 0 as false status with json
            res.json({"jsonstatus": 0})
        }
    })
})





// ======================================================
// ======================================================
//   Posts Related Stuff
/**
 *  Getting The Whole Posts
 */
app.get("/posts", (req, res) => {
    Post.find()
    .then(PostFoundRes => {
        res.send(PostFoundRes);
    }).catch(err => {
        console.log(err)
    })
})


/**
 *  GETTING SINGLE POSTS    
 */
app.get("/singlepost/:title", (req, res) => {
    Post.find({title: req.params.title})
    .then(SinglePostFoundRes => {
        // checking if the user exists
        if (SinglePostFoundRes.length > 0) { 
            res.json(SinglePostFoundRes)
        } else {
            res.status(404).json({"err": `post with the title of [${req.params.title}] not found`})
        }
    }).catch(err => {
        console.log(err)
    })
})







/**
 *    =========================
 *    ----- POST REQUESTS -----
 *    =========================
 */

/**
 *  CREATING ACCOUNTS
 */

app.post("/users", jsonParser, (req, res) => {
    // getting the current date
    let curTime = new Date;

    // creating the new user
    let NewUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        createdOnTime: curTime
    })
    NewUser.save()
    res.json({"ACSTATS": "perfect"})
    console.log("Account Created Succesfully")
})


/**
 *  - CREATING POSTS - 
 */
app.post("/posts", jsonParser, (req, res) => {
    // getting the current date
    let curTime = new Date;

    // creating the post
    let NewPost = new Post({
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        PostedOnTime: curTime
    })
    NewPost.save();
    res.json({"PostStatus": "Completed"})
    console.log(`Post Created Succesfully\n ${req.body.author}\n ${req.body.title}\n ${req.body.body}\n-------------------------------------------`)
})




/**
 *  THE PUT REQUEST FOR EDITING THE BIO
 */
app.put("/users", jsonParser, async (req, res) => {
    // updating the user by the gotten data
    // storing the data in variables
    let userID = req.body.userID;
    let userUSERNAME = req.body.username;
    let userBIO = req.body.newBio;
    let userEMAIL = req.body.email;
    let userPASSWORD = req.body.password;
    let COT = req.body.sentCot;

    // creating the new user schema and updating it
    await User.findByIdAndUpdate(userID, {
        _id: userID,
        username: userUSERNAME,
        bio: userBIO,
        email: userEMAIL,
        password: userPASSWORD,
        createdOnTime: COT
    },
    {new: true}
    );
    
    // now sending the user info that the data has been updated
    res.json({serverInfo: "updateSuccesfull"});

    
    /**
     * ps: im still in shock that this really worked... 
     * yesterday i couldnt make the update work for fucking 3hrs
     * and now, i just got on visual code after 2hrs of *doing my homwork - lol*,
     * added an async function instead of a normal one thx to [https://www.stackoverflow.com]
     * AND OMG I JUST COMPLETED MY FIRST EVER FULLSTACK `REACT NATIVE + NODEJS + EXPRESS + MONGODB + MONGOOSE` application, THIS IS HISTORIC FOR ME LOL!!!!!
     * 
     * for celebrating, im gonna put some sexcy ascii art below
     */
    //     . ... .,-“:::::::/:::::|:::::|:::::::|:|::::::::::::::::::\\:::::::::::::|:|:::::\:::\::\
    // ... ... /::::::::::|::::::|:::::|\::::::\:\::::::::::::::::::||::::::::::::|:/::::::|:::|::\
    // ... .../::::::::::::\:::::::\::::'\”-,::::\:\,:::::::::::::::|:|::::::::::,//::::::/::|:'|
    // ... ../::::::::::::::'\::::::\,:::”,”,::\,”,,:::::::::/: |::::::,“//::::::/:::::/::,,-'
    // ... ./:::::::::::::::::”,,,::\|”~,,\,:”~-\”: :”,::::/: :/:::,“: :/::,“/:::,“:::/
    // ... /::::::::::::::::::/,__”,\: : ,,-~”,”',,: : :\:/: :/:,“,-~,”,”:/:,,“:,//'
    // ... |:::::::::::::::::/:o:::o: :,,“/. ,“:\.|: : : : “: '”:/./,,”\.'|”/::::::|“
    // ...|::::::/:::::::::/::/|:::|.\: : \.|'|¯;|..|.|: : : : : : : :|.||;;;|././:|:::|:::|
    // ...|::|:::|::::::::/::'-':::'-,': : '\'\'~'_/,/: : : : : : ,: :'-'-¯-'~': |:::|:::|
    // ...|::|:::|::::::::/::::|:::::'|: : : “' ¯: : : : : : : : : :\: : : : : : /::::'\::|
    // ...|::|:::|:::::::/:::::|:::::'\: : : : : : : : : : : : : : :': : : : : :/::::::|::|
    // ... \:|:::|::::::|::::::|::::::|,: : : : : : : : : :__,: : : : : : :,-“:::::::|::|
    // ... .'\|::|::::::|::::::||::::::\'~,: : : : : : : :'--~': : : : ,,~”\:::::::::|:/
    // ... ...'\:|:::::|::::::/.|::::::|: : “~,: : : : : : : : ,,-~,”::::::'\:::::::|:/
    // ... ... .\\:::::|”~,/,|:::::::|: : : : ¯”~,,,,~”:::,,'\::::::::\-,,_::|/
    // ... ... ..',\,::|~--'-~\:::::::|: : : : : : |::|,,-~”¯..__\::::::::\... .'|
    // ... ..,~”': : \|: : : : : \::::::|: : : : : : |¯”'~~”~,”,: : \:::::::|... /
    // ..,“: : : : : :|: : : : : :\::::::|: : : : : : \: : : : : : “~',:\::::::|\,
    // ... ..,~”': : \|: : : : : \::::::|: : : : : : |¯”'~~”~,”,: : \:::::::|... /
    // ..,“: : : : : :|: : : : : :\::::::|: : : : : : \: : : : : : “~',:\::::::|\,
    // ..|: : : : : : : |: : : : : : |::::|,\,: : : : : : : : : : : : : :”,\::::|: \
    // ..| : : : : : : : : : : : : : |::::|:'-,\: : : : : : : : : : : : : : :”-'\,|: :|
    // ...\ : : : : : : : : : :'\: : :\:::|: : '\'\: : : : :~,,: : : : : : : : : “~-',_
    // ... \: : : : : : : : : : :\: /:|:/: : : :',',: : : : : “,: : : : : : : : : : :,/”',
    // ... .\: : : : : : : : : : :\|: |/: : : ,“....”,: : : : : '\: : : : : : : : : ,/.....”-,
    // ... ...\: : : : : : : : : : \: |: : ...........\: : : : : |: : : : : : : ,-“.........'\
    // ... ... .\ : : : : : : : : : '\': : /..............\: : : : |: : : : : :,-“.............|
    // ... ... ...\ : : : : : : : : : '\:/.................\: : :,/: : : : : /.............../
    // ... ... .....\ : : : : : : : : : \........................\:,-“: : : : :,/........ ./
    // ... ... ... ...\ : : : : : : : : : \,..............,”======',_..........,-“ : : : \
    // ... ... ... ... \,: : : : : : : : : \: ¯”'~---~”¯: : : : : : : : : :¯”~~,' : : : | :\
    // ... ... ... ... ..'\,: : : : : : : : : \: : : : : : : : : : : : : : : : : : : :':: : \
    // ... ... ... ... ... .\, : : : : : : : : '\: : : : : : : : : : : : : : : : : /::|:  :' \
    // ... ... ... ... ... ...\,: : : : : : : : : : : : : : : : : : : : : : : : : |: : : : : :|
    // ... ... ... ... ... ... ..\ : : : : : : : : \: : : : : : : : : : : : : : : ::|: : : : |:
    // ... ... ... ... ... ... ...\\,: : : : : : : , : : : : : : : : : : : : : : :/: : : :: :  |
    // ... ... ... ... ... ... ... .\\ : : : : : : : :'\ : : : : : : : : : : : : : :|: : : : : |
    // ... ... ... ... ... ... ... ./:\: : : : : : : : :'\, : : : : : : : : : : : : |: : : : : :|
    // ... ... ... ... ... ... ... /: : \: : : : : : : : : '\,: : : : : : : : : : : |: : : : : :|
    // ... ... ... ... ... ... .../: : : '\: : : : : : : : : :'\,: : : : : : : : : :|: : : : : :|
    // ... ... ... ... ... ... .../: : : '\: : : : : : : : : :'\,: : : : : : : : : :|: : : : : :|
    // ... ... ... ... ... ... ../: : : : :\: : : : : : : : : : , : : : : : : : : |: : : : : : :|
    // ... ... ... ... ... ... ,/: : : : : : :\: : : : : : : : : : '\,: : : : : : : |: : : : : :|
    // ... ... ... ... ... ..,“: : : : : : : :“,: : : : : : : : : : \: : : : : : :| : : : : : : |
    // ... ... ... ... ... ,/ : : : : : : : : : :”-, : : : : : : : : : :\: : : : : /: : : : : :/
    // ... ... ... ... ..,/ : : : : : : : : : : : : :”-, : : : : : : : : :'\: : : :| : : : :  ,/
    // ... ... ... ... ,/ : : : : : : : : : : : : : : : “-,: : : : : : : : :'\: : |: : : :  : /
    // ... ... ... .../: : : : : : : : : : : : : : : : : : “-,: : : : : : : : '\: |: : : :  /
    // ... ... ... ../: : : : : : : : : : : : : : : : : : : : :“-,: : : : : : : \,|: : : : /
    // ... ... ... ,/: : : : : : : : : : : : : : : : : : : : : : :“-,: : : : : : :\: : :  /
    // ... ... .../,,”,,,~,,_: : : : : : : : : : : : : : : : : “-,: : : : : :'\: : :'|: |
    // ... ... ...|',/,/:||:\,\: : : “'~,,~~---,,,_: : : : : : : : : :'\: : : : : ,: :|:||
    // ... ... ..|: :”: ||: :”: : : : : : :”-,........ ¯¯”''~~~-----~|\: : : : : : \:|: |'\
    // ... ... ..|: : : ||: : : : : : : : : : :”-,.......................|: : : : : : : \|: |,”
    // ... ... ..| : : : : : : : : : : : : : : : :”-,.....................\: : : : : : : ,|.|
    // ... ... ..| : : : : : : : : : : : : : : : :”,\....................,“\: : : : : : : : '\”
    // ... ... ..| : : : : : : : : : : : : : : : : : :”-\...............,/: : :\: : : : : : : : ,
    // ... ... ..| : : : : : : : : : : : : : : : : : : : \,.........,/: : : : '\: : : : : : : : : |
    // ... ... ..| : : : : : : : : : : : : : : : : : : : : \.......,/: : : : ,-~/: : ,: : |: :/: :|
    // ... ... ..'|: : : : : : : : : : : : : : : : : : : : : \~”¯: : : : : |: :|: : /: :/: ,/: |
    // ... ... ...|: : : : : : : : : : : : : : : : : : : : : |: : : : : : : :”-,,/,/-~”:|”¯
    // ... ... ...|: : : : : : : : : : : : : : : : : : : : : |: : : : : : : :
        
    // credits for the ascii art = [https://steamcommunity.com/profiles/76561198104063701]
    // email me at popsiclelicker123@gmail.com for removal if you dont want it to be here.
})