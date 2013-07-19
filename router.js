function route(handle,pathname,query,res){
    console.log('routing request for '+pathname);
    
    if(typeof handle[pathname] === 'function'){
        handle[pathname](query,res);
    }else{
        console.log('No request handler for '+pathname);
        res.writeHead(200,{'Content-Type':'application/json'});
        var obj = {
        		message:'No request handler',
        		pathname:pathname,
        		query:query
        };
        res.write(JSON.stringify(obj));
        res.end();
    }
    
}

exports.route = route;
