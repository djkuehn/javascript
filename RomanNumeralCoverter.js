function convertToRoman(num) {
  console.log(num);
  const romanNums = {'M': 1000, 'CM': 900, 'D': 500,
                     'CD': 400, 'C': 100, 'XC': 90,
                     'L': 50, 'XL': 40, 'X': 10,
                     'IX': 9, 'V': 5, 'IV': 4, 
                     'I': 1};

  //loop through the Roman Numeral Object for the
  //closest (but lower) value to num, loop through
  //that value adding the corresponding Roman Numeral
  //to the string until the remaining value is lower
  //than that numeral's value, then continue looping
  //through the object until the remaining value = 0
  let romanStr = '';
  let remainder = num;
  for (let i in romanNums) {
    while (romanNums[i] <= remainder) {
      romanStr += i;
      remainder -= romanNums[i];
    }
  }

  //return the string of Roman Numerals for the
  //given num
  return romanStr;
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

formatTestCase(0, convertToRoman(36));

formatTestCase(	1	,	convertToRoman(2)	);
formatTestCase(	2	,	convertToRoman(3)	);
formatTestCase(	3	,	convertToRoman(4)	);
formatTestCase(	4	,	convertToRoman(5)	);
formatTestCase(	5	,	convertToRoman(9)	);
formatTestCase(	6	,	convertToRoman(12)	);
formatTestCase(	7	,	convertToRoman(16)	);
formatTestCase(	8	,	convertToRoman(29)	);
formatTestCase(	9	,	convertToRoman(44)	);
formatTestCase(	10	,	convertToRoman(45)	);
formatTestCase(	11	,	convertToRoman(68)	);
formatTestCase(	12	,	convertToRoman(83)	);
formatTestCase(	13	,	convertToRoman(97)	);
formatTestCase(	14	,	convertToRoman(99)	);
formatTestCase(	15	,	convertToRoman(400)	);
formatTestCase(	16	,	convertToRoman(500)	);
formatTestCase(	17	,	convertToRoman(501)	);
formatTestCase(	18	,	convertToRoman(649)	);
formatTestCase(	19	,	convertToRoman(798)	);
formatTestCase(	20	,	convertToRoman(891)	);
formatTestCase(	21	,	convertToRoman(1000)	);
formatTestCase(	22	,	convertToRoman(1004)	);
formatTestCase(	23	,	convertToRoman(1006)	);
formatTestCase(	24	,	convertToRoman(1023)	);
formatTestCase(	25	,	convertToRoman(2014)	);
formatTestCase(	26	,	convertToRoman(3999)	);
