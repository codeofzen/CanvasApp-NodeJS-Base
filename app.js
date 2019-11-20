var express = require('express');
var morgan = require('morgan');
var sftools = require('./sf-tools');
var app = express();
var PORT = process.env.PORT || 5000;

//SF app secret
var SF_CANVASAPP_CLIENT_SECRET = process.env.SF_CANVASAPP_CLIENT_SECRET;

app.configure(function() {
    app.use('/public',express.static(__dirname + '/public'));
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.cookieParser());

    //session enabled to store token data
    app.use(express.session({
      secret: 'cs secret'
    }));

    app.use(express.bodyParser());
    app.use(express.logger());
    app.use(morgan('combined'));
    
});


/**
 * Index route which will be called after the initial POST is sent
 */
app.get('/',function(req,res){
    //get the canvas details from session (if any)
    var canvasDetails = sftools.getCanvasDetails(req);
    //the page knows if the user is logged into SF
    res.render('index',{canvasDetails : canvasDetails});
});


/**
 * Initial POST that provided the signed request with all information necessary
 * to setup the SDK.
 */
app.post('/canvas/callback', function(req,res){
    console.log(req.body);
    sftools.canvasCallback(req.body, SF_CANVASAPP_CLIENT_SECRET, function(error, canvasRequest){
        if(error){
            res.statusCode = 400;
            return res.render('error',{error: error});
        }
        //saves the token details into session
        sftools.saveCanvasDetailsInSession(req,canvasRequest);
        return res.redirect('/');
    });
});


/**
 * Callback that has to be specified in the OAuth section. But seems not to be 
 * called in out flow. Still, OAuth settings are required to make the Canvas App
 * work.
 */
app.get('/canvas/callback_oauth',function(req,res){
    //get the canvas details from session (if any)
    var canvasDetails = sftools.getCanvasDetails(req);
    //the page knows if the user is logged into SF
    res.render('index',{canvasDetails : canvasDetails});
});

exports.server = app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});