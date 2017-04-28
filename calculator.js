$(document).ready(function() {
    //current number user is constructing
    var numInput = 0;
    //stored number between operations
    var numStore = null;
    var hasDecimal = false;

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

        if (numInput === 0 && numInput.length === 1) {
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
    function handleOperator(operator) {

    }

    /*Handle clear and discerns type of clear*/
    function handleClear(type) {

    }

    /*Handle returning result from Equals operation*/
    function handleEquals() {

    }

    /*Handles audio and animation from hitting hi button*/
    function handleHi() {

    }

});
