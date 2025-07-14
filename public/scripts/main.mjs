// SPDX-FileCopyrightText: 2025 Menno van der Graaf <mennovandergraaf@hotmail.com>
// SPDX-License-Identifier: MIT

const CLUSTERS = {
    space: [" "],
    short_vowels: ["a", "e", "i", "o", "u"],
    long_vowels: ["aa", "ee", "oo", "uu"],
    double_vowels: ["ij", "ei", "ou", "au", "ie", "oe", "eu", "ui"],
    fool_vowels: ["aai", "ooi", "oei", "eeuw", "ieuw", "uw"],
    consonant: ["b", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z", "ng", "nk", "ch", "sch", "schr"]
}

// apply the default words value, just to demo the app
applyWords();

document.getElementById("apply-words").onclick = function () {
    applyWords();
}

function applyWords() {
    const example_column = document.getElementById("example-column");
    const exercise_column = document.getElementById("exercise-column");

    example_column.innerHTML = "";
    exercise_column.innerHTML = "";

    const text = document.getElementById("words").value.toLowerCase();
    for (const word of text.split("\n")) {
        const trimmed_word = word.trim()
        const [exampleBuilder, exersice] = createBuilder(trimmed_word);
        example_column.appendChild(exampleBuilder);
        exercise_column.appendChild(exersice);
    }
}

function createBuilder(word) {
    const word_builder_div = document.createElement("div");
    word_builder_div.classList.add("sheet-word-builder");

    const word_div = document.createElement("div");
    word_div.classList.add("sheet-word");
    word_builder_div.appendChild(word_div);

    const choices_div = document.createElement("div")
    choices_div.classList.add("sheet-choices");
    word_builder_div.appendChild(choices_div);

    const remainder_div = document.createElement("div");
    word_builder_div.appendChild(remainder_div);

    const exercise_div = document.createElement("div");
    exercise_div.classList.add("sheet-word");

    const builderDivs = {
        word: word_div, choices: choices_div, remainder: remainder_div, exercise: exercise_div,
    }

    buildChoices(builderDivs, word);

    return [word_builder_div, exercise_div];
}

function buildChoices(builderDivs, wordRemainder) {
    builderDivs.choices.innerHTML = "";

    let matches = [];
    for (const [category_name, category] of Object.entries(CLUSTERS)) {
        for (const cluster of category) {
            if (wordRemainder.startsWith(cluster)) {
                matches.push([category_name, cluster]);
            }
        }
    }

    if (matches.length === 0) {
        return;
    } else if (matches.length === 1) {
        applyChoice(builderDivs, wordRemainder, matches[0][1]);
        return;
    }

    // Display matches
    for (const [category, cluster] of matches) {
        const choice = createClusterDiv(cluster);
        choice.style.backgroundColor = getCategoryColor(category);
        choice.onclick = () => {
            applyChoice(builderDivs, wordRemainder, cluster);
        };
        builderDivs.choices.appendChild(choice);
    }
}

function applyChoice(builderDivs, wordRemainder, choice) {
    // Add the cluster to the word
    builderDivs.word.appendChild(createClusterDiv(choice));

    // Add the corresponding empty cluster to the exercise
    const exercise = createClusterDiv(choice);
    exercise.innerText = "";
    builderDivs.exercise.appendChild(exercise);

    const newRemainder = wordRemainder.slice(choice.length);

    // Display the remaining text
    builderDivs.remainder.innerText = newRemainder;

    // Build remaining choices
    buildChoices(builderDivs, newRemainder);
}

function getCategoryColor(category) {
    switch (category) {
        case "space":
            return "white";
        case "short_vowels":
            return "#94cc6e";
        case "long_vowels":
            return "#fff116";
        case "double_vowels":
            return "#f15e37";
        case "fool_vowels":
            return "white";
        case "consonant":
            return "#40c7f4";

    }
}

function createClusterDiv(cluster) {
    const div = document.createElement("div");
    div.classList.add("sheet-word");
    div.innerText = cluster;
    if (cluster === ' ') {
        div.classList.add("sheet-space");
    } else {
        div.classList.add("sheet-letter");
    }
    return div;
}
