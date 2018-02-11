var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
// Insert here a list of Ids of the fics you want to include in your proyect
var ids = ['13521117', '855031', '455066', '562493', '726803', '12976434'];
// This will be the output
var arr = [];

const getData = ids => {
  for (let i = 0; i < ids.length; i++) {
    let url = 'http://archiveofourown.org/works/' + ids[i] + '?view_adult=true';
    request(url, function(error, response, body) {
      if (error) {
        console.log('Error: ' + error);
      }
      var $ = cheerio.load(body);
      // You can add other properties according of what data you want to retrieve
      var obj = {
        id: ids[i],
        title: '',
        link: url,
        rating: '',
        authors: [],
        authorsLinks: [],
        summary: '',
        language: '',
      };
      $('#workskin').filter(function(index){
        obj.title = $('h2').text().trim();
        let authors = $('a[rel="author"]');
        for (let n = 0; n < authors.length; n++) {
          let currentAuthor = $(authors).eq(n).text();
          obj.authors.push(currentAuthor);
        }
        obj.summary = $('.userstuff').eq(0).text().trim();
        for (let n = 0; n < authors.length; n++) {
          let currentLink = 'http://archiveofourown.org' + $(authors).eq(n).attr('href');
          obj.authorsLinks.push(currentLink);
        }
      });
      $('#main').filter(function(index) {
        obj.rating = $('a.tag').eq(0).text();
        obj.language = $('.language').eq(1).text().trim();
        obj.words = $('.words').eq(1).text();
      });
      arr.push(obj);
    });
  }
};

// Call the function
getData(ids);

// I included this in a timeout function so the program has time to load all the data
setTimeout(function() {
  console.log(arr);
  // Change the data.json string if you want to change the name of your file
  fs.writeFileSync(`data.json`, JSON.stringify(arr, null, 2));
}, 10000);