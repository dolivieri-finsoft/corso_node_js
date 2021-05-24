const https = require('https');

https.request({
        // opzioni
        host: 'www.random.org',
        method: 'GET',
        path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'

    }, function(response){

        if(response.statusCode !== 200){
            console.log('HTTP Response NOT OK(200)');
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            process.exit();
        }

        let str_response = '';

        response.on('data', function(chunk){
            str_response += chunk;
        });

        response.on('end', function(){
            console.log("il numero casuale generato da random.org è: ", str_response);
        });
    }
).end();