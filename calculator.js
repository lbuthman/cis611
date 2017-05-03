$(document).ready(function() {

    const MAX_SIZE = 13;
    const MAX_VALUE = 9999999999999;

    var numInput = "0"; //string 0's signify no user set value
    var numStore = "0";
    var result = "0";
    var hasDecimal = false;
    var operator = "";
    var audio = new Audio("http://www.darklands-sewer-system.eu:81/outlet/AV/MP3S/AHA/CD1/%5b01%5d%20-%20a-ha%20-%20Take%20On%20Me.mp3");
    var audioPlaying = false;

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
                $(this).css({"background-color": "#C0C0C0"});
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

        if (operator === "" && result !== "0") {
            result = "0";
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

        if (operator === "" && result !== "0") {
            result = "0";
        }

        if (!hasDecimal) {
            hasDecimal = true;
            numInput += ".";
            $("#result").text(numInput);
        }
    }

    function handleOperator(op) {

        /*User wants to change their operator for equation*/
        if (numInput === "") {
            operator = op;
            return;
        }

        /*if result has value, store it in numStore*/
        if (result !== "0") {
            operator = op;
            numStore = result;
            result = "0";
        } else if (operator !== "") {
            handleEquals();
            operator = op;
            numStore = result;
            result = "0";
        } else {
            operator = op;
            numStore = numInput;
            numInput = "";
        }

        /*These operations do not require a second number*/
        if (operator === "**" || operator === "Math.sqrt()") {
            handleEquals();
        }

        hasDecimal = false;
        $(".blue").css({"background-color": "#00E6FE"});
    }

    /*Handle clear and discerns type of clear*/
    function handleClear(type) {

        numInput = "0";

        if (type === "AC") {
            numStore = 0;
            result = 0;
        }
        $("#result").text(numInput);

        hasDecimal = false;
        $(".blue").css({"background-color": "#00E6FE"});
    }

    /*Handle returning result from Equals operation*/
    function handleEquals() {

        switch(operator) {
            case ("+"):
                result = parseFloat(numStore) + parseFloat(numInput);
                break;
            case ("-"):
                result = parseFloat(numStore) - parseFloat(numInput);
                break;
            case ("*"):
                result = parseFloat(numStore) * parseFloat(numInput);
                break;
            case ("/"):
                result = parseFloat(numStore) / parseFloat(numInput);
                break;
            case ("**"):
                result = numStore * numStore;
                break;
            case ("Math.sqrt()"):
                result = Math.sqrt(numStore);
                break;
            default:
                result = "ERROR";
        }

        operator = "";
        numInput = "0";
        numStore = "0";

        if (result > MAX_VALUE) {
            result = "OVERFLOW";
        }

        if (result.toString().length > MAX_SIZE) {
            $("#result").text(result.toPrecision(11).replace(/\.?0+$/,""));
        } else {
            $("#result").text(result.toString());
        }

        hasDecimal = false;
        $(".blue").css({"background-color": "#00E6FE"});
    }

    /*Just saying hello in calculator*/
    function handleHi() {

        if (!audioPlaying) {
            $("#calculator").css({"transform": "rotate(180deg)",
                "transition-duration": "5s"});
            $("#result").text("0773H");
            audio.play();
            audioPlaying = true;
        } else {
            $("#result").text("0");
            $("#calculator").css({"transform": "rotate(0deg)",
                "transition-duration": "2s"});
            audio.pause();
            audio.load();
            audioPlaying = false;
        }
    }
});
