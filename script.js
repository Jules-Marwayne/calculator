// clear button
document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("log").textContent = "";
});

// delete button
document.getElementById("delete").addEventListener("click", function() {
    let log = document.getElementById("log").textContent;
    document.getElementById("log").textContent = log.slice(0, -1);
});

// number buttons
let numbers = document.querySelectorAll("[id^='num']");
for (let number of numbers) {
    number.addEventListener("click", function() {
        let value = number.getAttribute("id").substring(3);
        document.getElementById("log").textContent += value;
    })
}

// dot button
document.getElementById("dot").addEventListener("click", function() {
    let log = document.getElementById("log").textContent;
    let lastItem = log.split(/[\+\-\*\/]/).slice(-1);
    if (log == "" || isNaN(lastItem) || lastItem.toString().includes(".") || lastItem.toString() == ".") {
        return;
    }
    document.getElementById("log").textContent += ".";
})

// operation buttons
let operations = document.querySelectorAll("[id^='op-']")
for (let operation of operations) {
    operation.addEventListener("click", function() {
        let log = document.getElementById("log").textContent;
        if (log.slice(-1).match(/[\+\-\*\/]/) || log == "") {
            return;
        }
        let id = operation.getAttribute("id").substring(3);
        switch (id) {
            case "add":
                document.getElementById("log").textContent += "+";
                break;
            case "subtract":
                document.getElementById("log").textContent += "-";
                break;
            case "multiply":
                document.getElementById("log").textContent += "*";
                break;
            case "divide":
                document.getElementById("log").textContent += "/";
                break;
        }
    });
}

// equals button
document.querySelector("#operate").addEventListener("click", function() {
    let log = document.getElementById("log").textContent;
    document.getElementById("solution").textContent = operate(log).toString();
});

function operate(str) {
    let nums = str.split(/[\+\-\*\/]/);
    let num1 = parseFloat(nums[0]);
    let num2 = (nums[1] != ".") ? parseFloat(nums[1]) : parseFloat(0);
    let operations = str.split("").filter(char => char.match(/[\+\-\*\/]/));
    if (operations.length === 0) {
        return num1;
    }
    let firstValue = computePair(num1, num2, operations[0]);
    let nextValue;

    for (let i = 1; i < operations.length; i++) {
        nextValue = parseFloat(nums[i + 1]);
        if (isNaN(nextValue)) {
            nextValue = parseFloat(0);
        }
        firstValue = computePair(firstValue, nextValue, operations[i]);
    }
    return (Number.isInteger(firstValue)) ? firstValue : firstValue.toFixed(6);
}

function computePair(firstVal, secondVal, sign) {
    const compute = {
        "+": function(x, y) { return x + y},
        "-": function(x, y) { return x - y},
        "*": function(x, y) { return x * y},
        "/": function(x, y) { return x / y}
    }
    return compute[sign](firstVal, secondVal);
}