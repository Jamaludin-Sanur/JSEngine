#!/usr/bin/env node
const MyQCommand = require("./command/myQCommand/MyQCommand");
const {ListCommand} = require("./command/myQCommand/MyQCommandList");

console.log("\n\n###########################################################");
console.log("   Available Command :");
console.log("       CLEANING_ROBOT ./test1.json output.json ");
console.log("###########################################################");
console.log("\n\n");

var stdin = process.openStdin();
stdin.addListener("data", function(input) {

    // Get input and validate
    input = input.toString().trim().split(" ");
    if(input.length <= 0){
        console.log("Command not found");
    };

    // Split the input, first word is 'cmd', the rest is 'args'
    let cmd = input[0];
    let args = input.slice(1);    

    // Propagate input command
    switch(cmd){
        case ListCommand.CLEANING_ROBOT :
            MyQCommand.execCleaning(...args);
            break;
        default :
            console.log("Command not found");
    }
  });

  



