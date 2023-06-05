function rot13(str) {

  const alphaArr = 'abcdefghijklmnopqrstuvwxyz'
                     .toUpperCase().split('');
  const shiftVal = 13;
  let cipherStr = [];

  //loop through the given string
  for (let i = 0; i < str.length; i++) {
    //set char = current character
    let char = str[i];
    //if current character is a letter, perform
    //the shift; Otherwise, add it to the output
    //string as-is
    if (isLetter(str[i])) {
      let newIndex = alphaArr.indexOf(str[i]) 
                        + shiftVal;
      //circle back through index 0 if necessary to
      //keep index w/i the 26 chars of the alphabet
      //ex: newIndex = 30 (n/a) => newIndex = 4 (e)
      if (newIndex >= 26) {
        newIndex -= 26;
      }
      //set char = shifted character
      char = alphaArr[newIndex];
    }
    //whether shifted or not, add character to 
    //cipher string array
    cipherStr.push(char);
  }
  
  //return the cipher string as a string
  return cipherStr.join('');
}

/**************************************************
 * Function name: isLetter
 * input(s): char - character to test if is a letter
 * output(s): T|F - boolean for char is letter or not
 **************************************************/

function isLetter(char) {
  return char.toUpperCase() != char.toLowerCase();
}

/******************************************
 *              TEST CASES
 ******************************************/

console.log(rot13("SERR PBQR PNZC"));

console.log(rot13("SERR CVMMN!"));

console.log(rot13("SERR YBIR?"));

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
