function time_ago(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

function randomColorizer() {
  var colors = [
    ["#191919", "#7B8077", "#FFF056", "#FFFFFF"],
    ["#C63D0F", "#3B3738", "#FDF3E7", "#7E8F7C"],
    /**/
    ["#005A31", "#A8CD1B", "#CBE32D", "#F3FAD6"],
    ["#558C89", "#74AFAD", "#D9853B", "#333333"],
    /**/
    ["#7D1935", "#4A96AD", "#F5F3EE", "#FFFFFF"],
    ["#E44424", "#67BCDB", "#A2AB58", "#000000"],
    ["#404040", "#6D8DD6", "#B71427", "#FFE698"],
    ["#585858", "#118C4E", "#C1E1A6", "#FF9009"],
    ["#2B2B2B", "#DE1B1B", "#F6F6F6", "#E9E581"],
    /**/
    ["#c0dfd9", "#e9ece5", "#b3c2bf", "#3b3a36"],
    /**/
    ["#edd9c0", "#c9d8c5", "#a8b6bf", "#7d4627"],
    //["#c9c9c9","#e3e3e3","#9ad3de","#49bdd3"],
    ["#6ed3cf", "#9068be", "#e1e8f0", "#111111"],
    ["#dddfd4", "#fae596", "#3fb0ac", "#173e43"],
    ["#e8edf3", "#e6cf8b", "#b56969", "#22264b"],
    ["#1d2120", "#5a5c51", "#ba9077", "#bcd5d1"],
    /**/
    ["#dbc3d0", "#5e0231", "#c7a693", "#967157"],
    /**/
    ["#e6af4b", "#e05038", "#f2cbbc", "#334431"],
    /**/
    ["#300032", "#06000a", "#c43235", "#e6e6e8"],
    ["#252839", "#677077", "#b5b5b7", "#f2b632"]
  ];
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

$(document).ready(function() {

  $.getJSON("http://www.freecodecamp.com/news/hot", function(json) {
    var html = '';
    //html+=JSON.stringify(json);
    json.forEach(function(val) {
      var palette = randomColorizer();
      html += "<a href='" + val.link + "'>"
      html += "<div class='story' style='background-color:" + palette[1] + ";color:" + palette[3] + "'>";
      html += "<h1 class='headline' style='background-color:" + palette[0] + "; color:" + palette[3] + "'>" + val.headline.slice(0, 45);
      if (val.headline.length >= 45) html += "...</h1>";
      else html += "</h1>";
      html += "<div class='data'>";
      html += "<div class='right'><img src='" + val.author.picture + "'></div>";
      html += "<div class='left'>";
      if (val.metaDescription != "undefined") {
        html += "<p class='description'>" + val.metaDescription.slice(0, 100);
        if (val.metaDescription.length > 100) html += "...</p>";
        else html += "</p>";
      }
      if (val.description != "undefined") {
        html += "<p class='description'>" + val.description + "</p>";
      }
      var timeString=time_ago(val.timePosted);
      html+="<p class='time'>Posted: "+timeString+"</p>";
      html+="<p class='points'>Points: "+val.rank+"</p>";
      html += "</div>";
      html += "</div>";
      html += "<p class='contributor' style='background-color:" + palette[0] + ";color:"+palette[3]+"'>By: @" + val.author.username + "</p>";
      html += "</div></a>";
    });
    $(".master").html('' + html);
  });
})