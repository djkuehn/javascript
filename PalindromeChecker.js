function palindrome(str) {

  //create a new str trimmed down from the given str
  let newStr = str.replace(/[\W_]/g, '').trim();

  //parse new str in halves
  let firstHalf = newStr.substr(0, Math.floor(
          newStr.length/2)).toLowerCase();
    let secondHalf = newStr.substr(Math.round(
          newStr.length/2)).toLowerCase();

    //reverse second half in prep for comparison
    let reversed = secondHalf.split('')
                      .reverse().join('');

    //return true if first 1/2 & reversed are equal
    if (firstHalf == reversed) {
      return true;
    }
  
  //otherwise, return false
  return false;
}

/**************************************************
 * Function name: formatTestCase
 * input(s): tcNum - test case number
 *           func - function to run for test 
 *                  case. includes parameters
 * output(s): result - outputs result of calling
 *                   passed function
 **************************************************/
function formatTestCase(tcNum, func) {
  let result = func;
  console.log("Test Case:", tcNum, "\tOutput:", result);
}

/******************************************
 *              TEST CASES
 ******************************************/

formatTestCase(1, palindrome("eye"));

formatTestCase(2, palindrome("_eye"));

formatTestCase(3, palindrome("race car"));

formatTestCase(4, palindrome("not a palindrome"));

formatTestCase(5, palindrome("A man, a plan, a canal. Panama"));

formatTestCase(6, palindrome("never odd or even"));

formatTestCase(7, palindrome("nope"));

formatTestCase(8, palindrome("almostomla"));

formatTestCase(9, palindrome("My age is 0, 0 si ega ym."));

formatTestCase(10, palindrome("1 eye for of 1 eye."));

formatTestCase(11, palindrome("0_0 (: /-\ :) 0-0"));

formatTestCase(12, palindrome("five|\_/|four"));
