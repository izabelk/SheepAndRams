var numberGenerator = (function () {

    function generateRandomFourDigitNumber() {

        var digits = [];

        while (digits.length < 4) {

            var currentRandomDigit = generateRandomDigit();

            if (digits.length === 0) {
                while(currentRandomDigit === 0){
                    currentRandomDigit = generateRandomDigit();
                }
            }

            var found = false;

            for (var j = 0; j < digits.length; j++) {
                if (digits[j] === currentRandomDigit) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                digits.push(currentRandomDigit);
            }
        }

        //var number = digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];
        //return number;

        return digits;
    }

    function generateRandomDigit() {
        return Math.floor(Math.random() * 10);
    }

    return {
        generateRandomFourDigitNumber: generateRandomFourDigitNumber
    };

})();