/// <reference path="_references.js" />

var engine = (function () {

    var topPlayersBtn = document.getElementById('top-players-btn');
    topPlayersBtn.addEventListener('click', function () {
        if (localStorage.getItem('topPlayers')) {
            var results = document.createElement('ol');
            results.id = 'results';
            var arr = JSON.parse(localStorage.getItem('topPlayers'));
            for (var i = 0; i < arr.length; i++) {
                var resultItem = document.createElement('li');
                resultItem.textContent = 'Name: ' + arr[i].key + '; ' + 'Scores: ' + arr[i].value;
                results.appendChild(resultItem);
            }
            document.body.appendChild(results);
        }
    }, false);

    function startNewGame() {

        var randomNumberDigits = numberGenerator.generateRandomFourDigitNumber();
        //console.log(randomNumberDigits);
        var turnsCount = 0;

        removeDOMElement('label-for-input-digit');
        removeDOMElement('digit-input');
        removeDOMElement('submit-btn');
        removeDOMElement('turns');
        removeDOMElement('guessed-message-text');
        removeDOMElement('username-input-label');
        removeDOMElement('username-input');
        removeDOMElement('save-local-storage-btn');
        removeDOMElement('results');

        var docFrag = document.createDocumentFragment();

        var label = document.createElement('label');
        label.textContent = 'Please enter a number: ';
        label.id = 'label-for-input-digit';
        label.setAttribute('for', 'digit-input');

        var inputForDigit = document.createElement('input');
        inputForDigit.id = 'digit-input';

        var checkBtn = document.createElement('button');
        checkBtn.id = 'submit-btn';
        checkBtn.textContent = 'Check';
        checkBtn.addEventListener('click', function () {
            turnsCount++;
            var sheepAndRams = checkUserInput(randomNumberDigits);
            if (sheepAndRams.ramsCount === 4) {
                removeDOMElement('label-for-input-digit');
                removeDOMElement('digit-input');
                removeDOMElement('submit-btn');
                removeDOMElement('turns');
                var documentFragment = document.createDocumentFragment();

                var text = document.createElement('h2');
                text.id = 'guessed-message-text';
                text.textContent = 'Congratulations! You guessed the number!';
                documentFragment.appendChild(text);

                var labelForUserNameInput = document.createElement('label');
                labelForUserNameInput.setAttribute('for', 'username-input');
                labelForUserNameInput.id = 'username-input-label';
                labelForUserNameInput.textContent = 'Enter your nickname: '
                documentFragment.appendChild(labelForUserNameInput);

                var userNameInput = document.createElement('input');
                userNameInput.id = 'username-input';
                documentFragment.appendChild(userNameInput);

                var saveToLocalStorageBtn = document.createElement('button');
                saveToLocalStorageBtn.textContent = 'Save result';
                saveToLocalStorageBtn.id = 'save-local-storage-btn';
                saveToLocalStorageBtn.addEventListener('click', function () {

                    var key = document.getElementById('username-input').value;
                    var value = (turnsCount).toString();

                    var topPlayers;

                    if (localStorage.getItem('topPlayers')) {
                        topPlayers = JSON.parse(localStorage.getItem('topPlayers'));
                    }
                    else {
                        topPlayers = [];
                    }
                    
                    topPlayers.push({ key: key, value: value });
                    topPlayers.sort(orderBy);
                    topPlayers = topPlayers.slice(0, 5);

                    localStorage.setItem('topPlayers', JSON.stringify(topPlayers));

                }, false);

                documentFragment.appendChild(saveToLocalStorageBtn);
                document.body.appendChild(documentFragment);
            }
            else {
                var liItem = document.createElement('li');
                liItem.textContent = sheepAndRams.number.toString().replace(/,/g, '') + ' has ' +
                                    sheepAndRams.sheepCount + ' sheep ' +
                                    'and ' + sheepAndRams.ramsCount + ' rams.';
                var turns = document.getElementById('turns');
                turns.appendChild(liItem);
            }
        });

        var listOfTurns = document.createElement('ul');
        listOfTurns.id = 'turns';

        docFrag.appendChild(label);
        docFrag.appendChild(inputForDigit);
        docFrag.appendChild(checkBtn);
        docFrag.appendChild(listOfTurns);
        document.body.appendChild(docFrag);
    }

    function checkUserInput(computerNumber) {

        var userInputAsStr = document.getElementById('digit-input').value;
        var userInput = getStringAsArray(userInputAsStr);
        var sheepAndRams = checkSheepAndRams(computerNumber, userInput);

        return sheepAndRams;
    }

    function removeDOMElement(elementId) {
        var elementToBeRemoved = document.getElementById(elementId);
        if (elementToBeRemoved) {
            elementToBeRemoved.parentNode.removeChild(elementToBeRemoved);
        }
    }

    function orderBy(player1, player2) {
        return player1.value - player2.value;
    }

    function checkSheepAndRams(computerNumber, userNumber) {

        var sheepCount = 0;
        var ramsCount = 0;

        for (var i = 0; i < userNumber.length; i++) {

            var digit = userNumber[i];

            for (var j = 0; j < computerNumber.length; j++) {
                if (digit === computerNumber[j]) {
                    if (i === j) {
                        ramsCount++;
                    }
                    else {
                        sheepCount++;
                    }
                }
            }
        }

        return {
            number: userNumber,
            sheepCount: sheepCount,
            ramsCount: ramsCount
        };
    }

    function getStringAsArray(str) {
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr.push(str[i] | 0);
        }
        return arr;
    }

    return {
        startNewGame: startNewGame
    };
})();