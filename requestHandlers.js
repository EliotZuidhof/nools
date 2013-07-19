var getResult = require('./fibonacci').getResult;

function fibonacci(query,res){
    console.log('Request for fibonacci received');
    
    if(query.num && !isNaN(parseInt(query.num,10))){
        var num = parseInt(query.num,10);
        getResult(num,function(result){
            console.log('Result: '+result);
            var obj = {
            		number:num,
            		result:result
            };
            res.writeHead(200,{'Content-Type':'application/json'});
            res.write(JSON.stringify(obj));
            res.end();
        });
    }else{
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.write('Sorry, there was no num query or it was not a number.');
        res.end();
    }
}

function index(query, res){
	var obj = {
			message:'welcome',
			message2:'drools, nools, rules?'
	};
	res.writeHead(200,{'Content-Type':'application/json'});
	res.write(JSON.stringify(obj));
	res.end();
}


exports.fibonacci = fibonacci;
exports.index = index;
