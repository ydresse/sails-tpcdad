/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');
var kue = require('kue');  

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function (req, res) {
    let count = await Sentences.count();
    console.debug('Got '+count+' sentences in database');
    let s = await Sentences.find().limit(1).
      skip(Math.floor(Math.random() * Math.floor(count)));
    let p = await Picture.find().sort('createdAt DESC').limit(1);
    let sentence = "Random Message";
    if(s.length > 0) {
      sentence = s[0].sentence;
    }
    return res.view('cowsay', { pic: p[0].img, cow: cowsay.say({
      f: process.env.COW || 'stegosaurus',
      text : sentence,
      e : 'oO',
      T : 'U '
    })});
  },

  add: async function (req, res) {
    return res.view('add');
  },

  pic: async function(req, res){
    return res.view('pic');
  },

  create: async function(req, res) {
    await Sentences.create({ sentence: req.param('sentence') });


    // create Kue queue
    // let queue = kue.createQueue();  
    // queue.create('email', {  
    //   title: 'Thanks for you sentence !',
    //   to: req.param('email'),
    //   template: 'sentenceEmail'
    // }).priority('high').attempts(5).save();

    // queue.process('email', function(job, done) {  
    //   console.log(job);
    //   done();
    // });

    // console.log(req.param('email'));
    // sails.hook.email.send("createSentenceEmail", {}, { to: 'dresseyassine@gmail.com', subject: "New sentence"}, function(err) {console.log(err || "It worked!");})
  
    return res.redirect('/say');
  },

  addPicture: async function(req, res) {

    req.file('avatar').upload({
      adapter: require('skipper-better-s3'),
      key: 'AKIAJOCSBD4KTGNIE2YQ',
      secret: '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',
      bucket: 'lp-cdad-2018',
      region: 'eu-west-3',
      s3params: { ACL: 'public-read' },
      onProgress: progress => sails.log.verbose('Upload progress:', progress)
    }, async function (err, filesUploaded) {
      if (err) return res.serverError(err);
      await Picture.create({ img: filesUploaded[0].extra.Location});
      return res.redirect('/say');
    });
  }
};

