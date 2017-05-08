function LoadCSS(url){
  var head     = document.getElementsByTagName("head")[0];
  var cssFile  = document.createElement("link");
  cssFile.type = "text/css";
  cssFile.rel  = "stylesheet";
  cssFile.href = encodeURI(url);
  head.appendChild(cssFile);
}

LoadCSS("http://localhost/style.css");

$("body").html("");

var html = `
<div id="fek-example">
  Hello world
</div>
<div id="fek-btn-1" class="fek-btn">One</div>
<div id="fek-btn-2" class="fek-btn">Two</div>`;
$("body").append(html);

var Get    = chrome.storage.local.get;    // Alias for getting data
var Set    = chrome.storage.local.get;    // Alias for setting data
var Remove = chrome.storage.local.remove; // Alias for removing data
var Clear  = chrome.storage.local.clear;  // Alias for clearing data

$("#fek-btn-1").click(function(){
  Get(null, function(data){
    console.log(data);
    $("#fek-example").text(data["key1"]);
    console.log("===============================");
    console.log("Removing key2");
    Remove("key2", function(){
      console.log("key2 has been removed");
      Get(null, function(data){
        console.log(data);
        console.log("===============================");
        console.log("Clearing data");
        Clear(function(){
          Get(null, function(data){
            console.log(data);
          });
        });
      });
    });
  });
});

// $("#fek-btn-2").click(function(){
//   // $("#fek-example").text();
// });

Set({ "key1": "This is a string" }, function(){ /* after */ });
Set({ "key2": 123                }, function(){ /* after */ });
Set({ "key3": null               }, function(){ /* after */ });
Set({ "key4": ""                 }, function(){ /* after */ });
Set({ "key5": true               }, function(){ /* after */ });
Set({ "key6": false              }, function(){ /* after */ });
