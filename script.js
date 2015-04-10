$(document).ready(function() {
    var _defaultColumn = 3;
    var _defaultRow = 10;
    var _defaultMax = 5;

    console.log("script ready to run!");

    createControlPanel();
    main();

    function createControlPanel() {
        createSpinner("numberColumn", _defaultColumn, 6);
        createSpinner("numberRow", _defaultRow, 100);

        $("#chartType").buttonset();

        var refreshButton = $("#refreshButton");
        refreshButton.on("click", function() {
            main();
        });
        refreshButton.button();
    }

    function createSpinner(_id, _default, _max) {
        _id = "#" + _id;
        if (!_max) {
          _max = _defaultMax;
        }

        $(_id).spinner({
          spin: function( event, ui ) {
              if ( ui.value > _max ) {
                $( this ).spinner( "value", _max );
                return false;
              } else if ( ui.value < 1 ) {
                $( this ).spinner( "value", 1 );
                return false;
              }
            }
          }).spinner("value", _default);
    };

    function getValueOrDefault(_id, _default) {
        _id = "#" + _id;
        _val = $(_id).val();
        if (!_val) {
            $(_id).val(_default);
            _val = _default;
        }
        return _val;
    };

    function insertTableForCharts(column, row) {
        var main = $("<div/>", { id: "main" });
        var table = $("<div/>", { class: "div-table" });
        for (var i = 0; i < row; i++) {
            var line = $("<div/>", { class: "div-table-row" });
            for (var j = 0; j < column; j++) {
                var cell = $("<div/>", {
                    class: "div-table-col container",
                    text: "(" + (i + 1) + ", " + (j + 1) + ")" });
                cell.appendTo(line);
            };
            line.appendTo(table);
        };
        table.appendTo(main);
        $("#main").replaceWith(main);
    }

    function main() {
        column = getValueOrDefault("numberColumn", _defaultColumn);
        row = getValueOrDefault("numberRow", _defaultRow);

        insertTableForCharts(column, row);
        drawCharts();
    };

});
