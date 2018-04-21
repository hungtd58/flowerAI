var fs = require('fs');

request = require('request');
var download = function(uri, filename, callback){
    try{
      request.head(uri, function(err, res, body){
        try{
          console.log('content-type:', res.headers['content-type']);
          console.log('content-length:', res.headers['content-length']);

          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        } catch(e){
          console.log(e);
        }
      });
    } catch(e){
      console.log(e);
    }
};

fs.readFile('flowers.json', 'utf8', function (err, data) {
  if (err) throw err;
  var flowers = JSON.parse(data);

  for(var i = 0; i < flowers.length; i++){
    console.log(flowers[i].name);
    // (function(i){
      if(i >= flowers.length){
          return;
      }
      setTimeout(clone(flowers, i), (i-0) * 15000);

    // }(i));
  }
});

function clone(flowers, i){
  return function(){
    var folder = flowers[i].name.split(' ').join('_');
    var dir = './data/' + flowers[i].name;
    if (!fs.existsSync(dir)){
      fs.mkdir(dir, err => console.error(err));
    }

    console.log("Flower: " + flowers[i].name);
    for(var j = 0; j < flowers[i].images.length; j++){
      var img = flowers[i].images[j];
      var fileName = dir + "/img_" + j + ".jpg";
      download(img.thumbnail + "&w=224&h=224", fileName, function(){
        console.log("Downloaded");
      })
    }
  }
}