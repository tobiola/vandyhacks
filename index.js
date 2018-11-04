exports.handler = async (event) => {
    let intent = event.request.intent.name;
    let output = '';
    let end = false;
    
    
    if (intent.localeCompare("startIntent") == 0) {
        let slots = event.request.intent.slots;
        let item = '';
        for (var slot in slots) {
            if (slots[slot].source) {
                item = slots[slot].value;
                break;
            }
        }
        let list = {
            "milk": {
                "name": "1 Milk Dean Milk 1% Gal",
                "upc": 41900025182,
                "price": 0.01,
                "pwc": 0
            },
            "chips": {
                "name": "Utz Potato Chips",
                "upc": 41780020871,
                "price": 1.35,
                "pwc": 0
            },
            "bread": {
                "name": "Thin Sliced Bread",
                "upc": 50400207202,
                "price":1.8,
                "pwc": 0
            },
            "cereal": {
                "name": "Crispy Apple",
                "upc": 39021017049,
                "price" :1.12,
                "pwc": 0
            },
            "soda": {
                "name": "Diet Dr Pepper",
                "upc": 78000083408,
                "price":1.71,
                "pwc": 0
            },
            "oil": {
                "name": "Olive Oil",
                "upc": 48001353855,
                "price":3.6,
                "pwc": 0
            },
            "cat food": {
                "name": "Cat Food",
                "upc": 11110735515,
                "price":1.8,
                "pwc": 0
            }
        };
        
        let tag = "";
        let cost = -1;
        let coupon = -1;
        for (var type in list) {
            if (type.localeCompare(item) == 0) {
                tag = list[type].name;
                cost = list[type].price;
                coupon = cost;
                break;
            }
        }
        
        output = "The price of " + tag + " is " + cost + " dollars. If you buy this today you will save " + coupon + " dollars worth in coupons. Would you like to add this to your shopping cart?";
        
        // var AWS = require('aws-sdk')
        // AWS.config.update({region: 'us-east-1'});
        
        // // Create the DynamoDB service object
        // let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
        
        // var params = {
        //   TableName: 'Cart',
        //   Item: {
        //     'name' : {N: '001'},
        //     'price' : {S: 'Richard Roe'},
        //   }
        // };
        
        // // Call DynamoDB to add the item to the table
        // ddb.putItem(params, function(err, data) {
        //   if (err) {
        //     console.log("Error", err);
        //   } else {
        //     console.log("Success", data);
        //   }
        // });
    } else if (intent.localeCompare("AMAZON.YesIntent") == 0) {
        output = "Item had been added.";
        end = true;
    } else if (intent.localeCompare("AMAZON.NoIntent") == 0) {
        output = "Item has not been added.";
        end = true;
    } else {
        output = "Come again?";
        end = false;
    }

    let result = {
        version: "string",
        sessionAttributes: {
            key: "bob"//body.attributes.key
        },
        response: {
            outputSpeech: {
                type: "PlainText",
                text: output,
                ssml: "<speak>SSML text string to speak</speak>",
                playBehavior: "REPLACE_ENQUEUED"      
            },
            shouldEndSession: end
        }
    };
    return result;
};
