import https from 'https';
import { response } from 'express';
var request = require('request');
var options = {
    'method': 'GET',
    //'url': 'https://api.twitter.com/1.1/search/tweets.json?lang=el&include_entities=true&q= (from:EMY_HNMS )&result_type=recent&count=100',
    'url': 'https://api.twitter.com/1.1/search/tweets.json?lang=el&include_entities=true&q= (from:GSCP_GR OR from:perattikis  OR  from:EMY_HNMS OR  from:eody_gr OR from:YpYgGR)&result_type=recent&count=100',
    'headers': {
        'content-type': 'application/json',
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAL7ztwAAAAAA5doByr8%2Fy1bJ5PAMRJFk5ssjNwk%3DdT8e6LH99fLYZoXBuiuL1o1DbnbKpfGNoxAYlNUtEcmWVHouc7',
        'Cookie': 'personalization_id="v1_i4c3lN5Lcj5TeQUdkweyug=="; guest_id=v1%3A158693322791797260; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCHUFVYFxAToMY3NyZl9p%250AZCIlYTcyMTEwMzJlMWJjODYwMTg0N2ZmMjQ2NjJjY2E2NzM6B2lkIiVhNDE0%250ANGNlM2M5ODliOGYwYjI2ZDZkZjhiMTE4ZTQyZA%253D%253D--de9ca3864d8f95b2edffcd6b53922b29f3ee0416; ct0=666433f5de9220f562f709ec33e2aa2a'
    }
};
function parseResponse(tweets) {
    var response = [];

    console.log(tweets);

    tweets.forEach(f=>{
        var extended = f.urls && f.urls.unwound;
        // var extendedText = extended && f.urls[0].unwound 
        //                             && extended 
        //                             && f.urls[0].unwound.description
        //                     ?f.urls[0].unwound.description:f.text
        var tweet= {
            author : f.user.name,
            profileUrl : f.user.profile_background_image_url_https,
            userName: f.user.screen_name,
            title: f.user.screen_name,
            description:f.text,
            urlToImage : f.entities.urls.length>0?f.entities.urls[0].url:'',
            originalMessage: f.text,
            displayImage: f.entities.urls.length>0,
            publishedAt: f.created_at,
           // ext : extended?f.entities.urls[0].unwound:f.entities.urls,
            //asis: f
        };
        response.push(tweet);
    });
    return response;
}

class TweetsController {
    
    getHealthRelatedTweets(req, res) {
        request(options, function (error, response) {
            if (error) {
                return res.status(400).send({
                    success: 'false',
                    message: 'tweets retrieved failed ' + error.message,
                  });
            };
            //console.log(JSON.parse(response.body));
            var data = JSON.parse(response.body).statuses;
            return res.status(200).send({
                success: 'true',
                message: 'tweets retrieved successfully',
                tweets: parseResponse(data),
                //tweets: data
            });

        });
    }
}
const tweetsController = new TweetsController();
export default tweetsController;
