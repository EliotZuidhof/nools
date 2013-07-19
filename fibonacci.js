var nools = require('nools');

var Fibonacci = function (sequence, value) {
    this.sequence = sequence;
    this.value = value || -1;
};

var Result = function (result) {
    this.result = result || -1;
};


var flow = nools.flow('Fibonacci Flow', function (flow) {

    flow.rule('Recurse', [
        ['not', Fibonacci, 'f', 'f.sequence == 1'],
        [Fibonacci, 'f1', 'f1.sequence != 1']
    ], function (facts) {
        var f2 = new Fibonacci(facts.f1.sequence - 1);
        this.assert(f2);
    });

    flow.rule('Bootstrap', [
          Fibonacci, 'f', 'f.value == -1 && (f.sequence == 1 || f.sequence == 2)'
    ], function (facts) {
        var f = facts.f;
        f.value = 1;
        this.modify(f);
    });

    flow.rule('Calculate', [
        [Fibonacci, 'f1', 'f1.value != -1', {sequence:'s1'}],
        [Fibonacci, 'f2', 'f2.value != -1 && f2.sequence == s1 + 1', {sequence:'s2'}],
        [Fibonacci, 'f3', 'f3.value == -1 && f3.sequence == s2 + 1'],
        [Result, 'r']
    ], function (facts) {
        var f3 = facts.f3, f1 = facts.f1, f2 = facts.f2;
        var v = f3.value = f1.value + facts.f2.value;
        facts.r.result = v;
        this.modify(f3);
        this.retract(f1);
    });
});


function getResult(number, callback){
    var r = new Result(),
        session = flow.getSession(new Fibonacci(number), r),
        s = new Date;
    session.match().then(function(){
        callback(r.result);   
    });
}

exports.getResult = getResult;