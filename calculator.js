$(document).ready(function() {

    const MAX_SIZE = 13;

    var numInput = "0";
    var numStore = 0;
    var result = 0;
    var hasDecimal = false;
    var operator = "";

    /*Responds to button click*/
    $("button").click(function() {
        //get and separate class strings
        var type = $(this).attr("class");
        type = type.split(" ");
        var value = $(this).val();

        switch (type[0]) {
            case "operand":
                handleOperand(value);
                break;
            case "decimal":
                handleDecimal();
                break;
            case "operator":
                handleOperator(value);
                break;
            case "clear":
                handleClear(value);
                break;
            case "equals":
                handleEquals();
                break;
            case "hi":
                handleHi();
                break;
            default:
                alert("oh boy");
        }
    });

    /*Handles the construction and validation of a number*/
    function handleOperand(operand) {

        if (numInput.length === MAX_SIZE) {
            return;
        }

        if (numInput === "0" && numInput.length === 1) {
            numInput = operand;
        } else {
            numInput += operand;
        }

        $("#result").text(numInput);
    }

    /*Handles adding and validating decimal input*/
    function handleDecimal() {

        if (!hasDecimal) {
            hasDecimal = true;
            numInput += ".";
            $("#result").text(numInput);
        }
    }

    /*Handles operators and may return a result*/
    function handleOperator(op) {

        if (numInput === "") {
            operator = op;
        } else {
            operator = op;
            numStore = parseFloat(numInput);
            numInput = "";
            hasDecimal = false;
            handleEquals();
        }
    }

    /*Handle clear and discerns type of clear*/
    function handleClear(type) {

        numInput = "0";

        if (type === "AC") {
            numStore = 0;
            result = 0;
        }
        $("#result").text(numInput);
    }

    /*Handle returning result from Equals operation*/
    function handleEquals() {

        switch(operator) {
            case ("+"):
                result += numStore;
                if (numInput !== "") {
                    result += parseFloat(numInput);
                }
                break;
            default:

        }

        if (result.toString().length > MAX_SIZE) {
            result = "OVERFLOW";
        }

        $("#result").text(result);
        numStore = 0;
        numInput = "";
    }

    /*Just saying hello in calculator*/
    function handleHi() {
        $("#result").text("07734");
    }
});
