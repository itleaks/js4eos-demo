var options = {
    keyProvider:[
        // no need private key when read table
        // '5JnzYUtJMGhnC4kzU5RTQza8EbaX1LHm4CGXoM3ppm1RBunKUvN',
    ]
}

Js4eos = require("js4eos")(options)

describe("eos table test", function() {
    //Must set a large timeout
    this.timeout(10000);
    var system;
    before(async function(){
        system = await Js4eos.Contract("eosio") //use contract account to import contract
    });

    it('Test producers table in system contract', async function(){
        // table(tablename, scope, lower, upper, limit_count, key_type, index_position)
        // index <= upper and index >= lower limit limit_count
        // primary index is 1
        let data = await system.table("producers", "eosio", "aiguoniceman", "atticlabckbp", 5, "name", 1)
        console.log("between", data.rows.length, data)
        data = await system.table("producers", "eosio", "aiguoniceman", "", 5, "name", 1)
        console.log("large than", data.rows.length, data)
        data = await system.table("producers", "eosio", "", "atticlabckbp", 5, "name", 1)
        console.log("less than", data.rows.length, data)
    });
});