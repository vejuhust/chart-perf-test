$(document).ready(function() {
    var _defaultColumn = 5;
    var _defaultRow = 10;
    var _defaultMax = 5;

    console.log("script ready to run!");

    var refreshButton = $("#refreshButton");
    refreshButton.on("click", function() {
        main();
    });
    refreshButton.button();

    createSpinner("numberColumn", _defaultColumn, 6);
    createSpinner("numberRow", _defaultRow, 100);

    main();


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

    function main() {
        console.log("run main!");

        column = getValueOrDefault("numberColumn", _defaultColumn)
        row = getValueOrDefault("numberRow", _defaultRow)

        var main = $("#main");
        main.text("area for charts");
        main.append("<div>wtf " + column + ", " + row + "</div>");

        drawCharts();
    };

});
