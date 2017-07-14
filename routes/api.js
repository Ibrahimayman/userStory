/**
 * Created by Ibrahim Ayman on 12/07/2017.
 */
var router = require("express").Router(),
    User = require("../app/models/user"),
    config = require("../config"),
    secretKey = config.SecretKey,
    jsonwebtoken = require("jsonwebtoken"),
    bcrypt = require("bcrypt-nodejs"),
    crypto = require("crypto"),
    Story = require("../app/models/story");

/* create new user */
router.post('/signup', (req, res, next) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    user.save((err) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: "user has been created"});
    });
});

/* get all users */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(users);
    });
});

/* function to create Token */
function createToken(user) {
    var token = jsonwebtoken.sign({
            _id: user._id,
            name: user.name,
            username: user.username
        }, secretKey,
        // {expiresIn: 60 * 60}
    );
    return token;
}

/* login */
router.post("/login", (req, res) => {
    User.findOne({username: req.body.username}).select("password").exec((err, user) => {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.send({message: "user dose not exist"});
        }
        else if (user) {
            var validPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!validPassword) res.send("Invalid password");
            else {
                // create token
                var token = createToken(user);
                res.json({
                    success: true,
                    message: "success loin !",
                    token: token
                });
            }
        }
    });
});

/* Middleware  */
router.use((req, res, next) => {
    console.log("some body just came to our app");
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    /* check if token exist */
    if (token) {
        jsonwebtoken.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(403).send({success: false, message: "failed to auth user"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        res.status(403).send({success: false, message: "no token provided"});
    }
});

/* Destination B */
router.route("/")
    .post((req, res) => {
        var story = new Story({
            creator: req.decoded._id,
            content: req.body.content
        });
        story.save((err) => {
            if (err) res.send(err);
            res.json({message: "story created"});
        })

            .get((req, res) => {
                Story.find({creator: req.decoded._id}, (err, stories) => {
                    if (err) res.send(err);
                    res.json(stories);
                });
            })

    });


router.get("/me", (req, res) => {
    res.json(req.decoded);
});

module.exports = router;