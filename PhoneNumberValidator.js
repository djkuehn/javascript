let numTCs = 20;
let tcNum = 0;
let numPassed = 0;

function telephoneCheck(str) {
  console.log('Testing:', str);

  //define the regex that will be used to validate nums
  let regexp = /^[1]?[\s]?(\([\0-9]{3}\)|[\0-9]{3})[\s-]?[\0-9]{3}[\s-]?[\s-]?[\d]{4}$/

  //create a flag for match found and set to false for now
  let matchFound = false;
    
  //set flag to true if a match is found
  if (regexp.test(str)) {
    matchFound = true;
  }
  
  //return the found flag (boolean)
  return matchFound;
}

/**************************************************
 * Function name: formatTestCase
 * input(s): tcNum - test case number
 *           func - function to run for test 
 *                  case. includes parameters
 * output(s): result - outputs result of calling
 *                   passed function
 **************************************************/
function formatTestCase(func, expected) {
  tcNum++;
  let result = func;
  let passFail = result == expected;
  if (passFail) {
    numPassed++;
  }
  console.log("TC:", tcNum, '\t   Passed:', passFail);
  console.log("\t\t\tOutput:",     
                result, '\texpected:', expected);
}


/******************************************
 *              TEST CASES
 ******************************************/


formatTestCase(telephoneCheck("555-555-5555"), true);

formatTestCase(telephoneCheck("1 555-555-5555"), true);

formatTestCase(telephoneCheck("1 (555) 555-5555"), true);

formatTestCase(telephoneCheck("5555555555"), true);

formatTestCase(telephoneCheck("(555)555-5555"), true);

formatTestCase(telephoneCheck("555-5555"), false);

formatTestCase(telephoneCheck("5555555"), false);

formatTestCase(telephoneCheck("1 555)555-5555"), false);

formatTestCase(telephoneCheck("1 456 789 4444"), true);

formatTestCase(telephoneCheck("123**&!!asdf#"), false);

formatTestCase(telephoneCheck("11 555-555-5555"), false);

formatTestCase(telephoneCheck("55 55-55-555-5"), false);

formatTestCase(telephoneCheck("2(757)6227382"), false);

formatTestCase(telephoneCheck("(275)76227382"), false);

formatTestCase(telephoneCheck("10 (757) 622-7382"), false);

formatTestCase(telephoneCheck("-1 (757) 622-7382"), false);

formatTestCase(telephoneCheck("0 (757) 622-7382"), false);

formatTestCase(telephoneCheck("1 (555 555-5555"), false);

formatTestCase(telephoneCheck("(6054756961)"), false);

formatTestCase(telephoneCheck("5555-555-555"), false);

console.log("\n\t\t*** num passed:", numPassed, "/", numTCs, "***");
