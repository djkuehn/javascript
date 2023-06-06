let numTCs = 6;
let tcNum = 0;
let numPassed = 0;
const tcStatuses = [];

/**************************************************
 * Function name: checkCashRegister
 * input(s): price - cost of item to be purchased
 *           cash - amt received from customer
 *           cid - array of arrays listing the amts
 *                 of each bill & coin in the drawer
 * output(s): message - preformatted message with the
 *                      format: 'status': str, 'change': []
 *                      with 'status' set based on
 *                      whether the cash in the drawer
 *                      (cid) was sufficient to make the
 *                      necessary change and 'change' set
 *                      based on the status message, change
 *                      needed, and cash in drawer,
 **************************************************/
function checkCashRegister(price, cash, cid) {

  //define map of money values (words => numerals)
  const moneyMap = {"ONE HUNDRED": 100, 
                    "TWENTY": 20, "TEN": 10,
                    "FIVE": 5, "ONE": 1,
                    "QUARTER": 0.25, "DIME": 0.1,
                    "NICKEL": 0.05, "PENNY": 0.01};

  //define status messages
  const insufFunds = {status: "INSUFFICIENT_FUNDS", 
                      change: []};
  const outOfCash = {status: "CLOSED", change: []};
  const sufFunds = {status: "OPEN", change: []};

  //calculate the total amt of money in the drawer
  let amtInDrawer = 0;
  for (let entity in cid) {
    amtInDrawer += cid[entity][1];
  }
  amtInDrawer = parseFloat(amtInDrawer).toFixed(2);

  //calculate the change due
  let change = cash - price;

  //determine return status based on whether
  //amtInDrawer is >, <, or = to change due
  if (amtInDrawer == change) {
    //send "CLOSED" status with change = cid
    //if amtInDrawer = change due
    let returnMsg = {...outOfCash};
    returnMsg.change = cid;
    return returnMsg;
  } else if (amtInDrawer < change) {
    //send "INSUFFICIENT FUNDS" status with 
    //change = [] if amtInDrawer < change due
    return insufFunds;
  } else {
    //attempt to make change if 
    //amtInDrawer > change due
    let rtrnMsg = {...sufFunds};
    rtrnMsg.change = giveChange(moneyMap, 
                                  cid, change);  

    //send "INSUFFICIENT FUNDS" status with 
    //change = [] if cash in drawer doesn't 
    //contain enough of the necessary bills 
    //or coins to cover the change due
    if (rtrnMsg.change.length == 0) {
      return insufFunds;
    }
    //otherwise, send "OPEN" status with change
    //= an array of the specific change given
    return rtrnMsg;
  }
}

/**************************************************
 * Function name: giveChange
 * input(s): moneyMap - Object mapping money words
 *                      their respective values
 *           cid - array of arrays listing the amts
 *                 of each bill & coin in the drawer
 *           change - amt of change due
 * output(s): changeArr - array listing the amts of 
 *                        each bill & coin used to
 *                        make change. Returns [] if
 *                        it can't be done w/ the
 *                        current cash in drawer.
 **************************************************/
function giveChange(moneyMap, cid, change) {

  //first loop through the money map to find the
  //largest applicable bill or coin available to
  //make change with
  const changeArr = [];
  let remainder = change;
  for (let i in moneyMap) {
    //also loop through cid to find the 
    //corresponding bill or coin to the one
    //currently selected from the money map
    for (let j = 0; j < cid.length; j++) {
      let word = cid[j][0];
      let amt = cid[j][1];
      //once found, continue making change from it
      //until no more are left or no more are needed
      if (word == i) {
        let denomCount = 0;
        while (moneyMap[i] <= 
                parseFloat(remainder).toFixed(2) 
                && amt >= moneyMap[i]) {
          //decrement remainder and amt available
          //in the drawer for each grab -AND-
          //increment the amount collected from the
          //selected bill or coin
          remainder -= moneyMap[i];
          amt -= moneyMap[i];
          denomCount += moneyMap[i];
        } 
        //once the selected bill or coin is tapped,
        //add an array containing the bill/coin
        //name & amt collected from it (if > 0) to the
        //overall collection array for the change due
        if (denomCount > 0) {
          changeArr.push([word, denomCount]);
        } 
      } 
    }
  }

  //return an empty array if full change due 
  //was NOT able to be made
  if (remainder > 0) {
    return [];
  }

  //otherwise, send the overall collection array
  //for the change that was made
  return changeArr;
}
/**************************************************
 * Function name: formatTestCase
 * input(s): func - function to run for test 
 *                  case. includes parameters
 *           expected - expected output from func
 * output(s): result - outputs result of calling
 *                   passed function
 **************************************************/
function formatTestCase(func, expected) {
  tcNum++;
  let actual = func;
  let passFail = true;

  //verify actual status is as expected
  if (actual.status != expected.status) {
    passFail = false;
  }

  //ensure the lengths of both actual & expected
  //change arrays are equal 
  if (actual.change.length != 
                      expected.change.length) {
    passFail = false;
  } else {
    //loop through the change arrays to verify 
    //the sub-arrays
    for (let i = 0; i < expected.change.length; 
                  i++) {
      //ensure the lengths of both the actual & 
      //expected sub-arrays are equal 
      if (expected.change[i].length != 
                    actual.change[i].length) {
        passFail = false;
      } else {
        //loop through the change sub-arrays to 
        //verify each specific value
        for(let j = 0; 
              j < expected.change[i].length; j++) {
          if (actual.change[i][j] != 
                        expected.change[i][j]) {
            passFail = false;
          }
        }
      }
    }
  }

  //updated count of passing TCs if applicable
  if (passFail) {
    numPassed++;
  }

  //add TC & passFail status to overall status array
  tcStatuses.push([tcNum, passFail]);

  //print data for this TC to console
  console.log("TC:", tcNum, 
              "\t   Passed:", passFail);
  console.log("\t\t\tOutput:", actual, 
              "\texpected:", expected, "\n");
}



/******************************************
 *              TEST CASES
 ******************************************/
//input params: (cost (integer), cash (integer), cid (list of lists), expected output (map with 'status' (string) and 'change' (list of list(s) or empty list))
//i.e. (int, int, [['str', int], ['str', int]...], {"status": str, "change": [['str', int], ['str', int]...]}

formatTestCase(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]), {status: "OPEN", change: [["QUARTER", 0.5]]});

formatTestCase(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]), {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]});

formatTestCase(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), {status: "INSUFFICIENT_FUNDS", change: []});

formatTestCase(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), {status: "INSUFFICIENT_FUNDS", change: []});

formatTestCase(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]});

/****************************/
formatTestCase(checkCashRegister(3.26, 100, [["PENNY", 0.04], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]), {status: "INSUFFICIENT_FUNDS", change: []});


console.log("\n\t\t*** num passed:", numPassed, "/", numTCs, "***");

console.log(tcStatuses);
