window.onload = function () {
    const myForm = document.getElementById("myForm");
    const textBox = document.getElementById("textBox");

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // generate allPermutations
        var myString = textBox.value;
        var myStringArray = myString.split(""); // array of chars
        var combinations = generateCombinations(myStringArray); // array of arrays of chars

        var allPermutations = [];
        for (var i = 0; i < combinations.length; i++) {
            var thisCombinationsPermutations = generatePermutations(combinations[i]);
            allPermutations.push(thisCombinationsPermutations);
        }
        for (var i = 0; i < allPermutations.length; i++) {
            for (var j = 0; j < allPermutations[i].length; j++) {
                console.log(allPermutations[i][j].join(""));
            }
        }

        // add allPermutations in an unordered list format to web page
        // (for now, just adds elements in link form)
        var strs = allPermutations;
        var list = document.createElement("ul");
        for (var i in strs) {
            for (var j in strs[i]) {
            var anchor = document.createElement("a");
            anchor.href = "#";
            anchor.innerText = strs[i][j].join("");

            var elem = document.createElement("li");
            elem.appendChild(anchor);
            list.appendChild(elem);
            }
        }
        // append to div
        var listDiv = document.getElementById("listDiv");
        listDiv.appendChild(list);

        console.log("button pressed!");
    });
}


/*
generateCombinations function
params:
    elements - an array of characters
return:
    an array of combinations (arrays of characters)
*/
function generateCombinations(elements) {
    if (elements.length === 0) {
        return [[]];
    }
    const firstElement = elements[0];
    const rest = elements.slice(1);

    const combsWithoutFirst = generateCombinations(rest);

    const combsWithFirst = [];
    combsWithoutFirst.forEach(comb => {
        const combWithFirst = [...comb, firstElement];
        combsWithFirst.push(combWithFirst);
    });

    return [...combsWithoutFirst, ...combsWithFirst];
}

/*
generatePermutations function
params:
    array of characters
return:
    array of permutations (arrays of characters)
*/
function generatePermutations(elements) {
    return generatePermutationsHelper(elements, [], 0);
}

function generatePermutationsHelper(elements, permutations, start) {
    if (elements.length == 0) {
        return [];
    }
    if (start == elements.length) {
        // let string = elements.join("");
        // permutations.push(string);
        permutations.push(elements)
        return;
    }
    for (var i = start; i < elements.length; i++) {
        var permutation = elements.slice(0);
        permutation[start] = permutation[i];
        permutation[i] = elements[start];
        generatePermutationsHelper(permutation, permutations, start + 1);
        // var newStringArray = elements.slice();
        // newStringArray[start] = newStringArray[i];
        // newStringArray[i] = elements[start];
        // generatePermutationsHelper(newStringArray, permutations, start + 1);
    }
    return permutations;
}
