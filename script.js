$(document).ready(function() {
    var _defaultColumn = 5;
    var _defaultRow = 10;

    console.log("script ready to run!");

    var refreshButton = $("#refreshButton");
    refreshButton.on("click", function() {
        main();
    });
    refreshButton.button();

    $("#numberColumn").spinner();
    $("#numberRow").spinner();

    main();



    function getValueOrDefault(_id, _default) {
        _id = "#" + _id;
        _val = $(_id).val();
        if (!_val) {
            $(_id).val(_default);
            _val = _default;
        }
        return _val;
    }

    function main () {
        console.log("run main!");

        column = getValueOrDefault("numberColumn", _defaultColumn)
        row = getValueOrDefault("numberRow", _defaultRow)

        var main = $("#main");
        main.text("area for charts");
        main.append("<div>wtf " + column + ", " + row + "</div>")
    }

});
