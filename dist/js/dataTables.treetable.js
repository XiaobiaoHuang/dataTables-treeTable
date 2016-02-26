$.fn.dataTable.Api.register('rows().treeTable()', function (index, column) {
    var option = {
        id: "id",
        pid: "parentId",
        depth: "grade",
        path: "fullPath",
        iconDefault: "fa fa-caret-down",
        iconToggle: "fa fa-caret-right"
    };
    var _nodes = this.nodes();
    var _data = this.data();
    if (column != undefined) {
        for (var p in column) {
            option[p] = column[p];
        }
    }
    var tmpDepth = 1;
    for (var i = 0; i < _data.length; i++) {
        var $td = $($(_nodes[i]).children("td:eq(" + index + ")"));
        var depth = _data[i][option.depth];
        $td.attr('data-depth', depth);
        if(!$td.children().hasClass("indent")){
            $td.html('<i class="indent fa"></i>' + $td.html());
            if (depth != 1) {
                $td.css('padding-left', ((depth - 1) * 30) + 'px');
            }
            if (depth > tmpDepth) {
                $($(this.nodes()[i - 1]).children('td:eq(' + index + ')')).children('i').addClass(option.iconDefault);
            }
            tmpDepth = depth;
        }
    }

    $(".indent").unbind("click").click(function () {
        var table = $(this).closest("table").DataTable();
        var tableData = table.data();
        var tableTrNodes = table.rows().nodes();

        var $tr = $(this).closest('tr');
        var $this = $(this);
        var trData = table.row($tr).data();
        for (var i = 0; i < tableData.length; i++) {
            var data = tableData[i];
            if (data[option.path].indexOf(trData[option.path]) != -1
                    && data[option.path] != trData[option.path]) {
                if($this.hasClass(option.iconDefault)){
                    $(tableTrNodes[i]).addClass('hidden');
                } else {
                    $(tableTrNodes[i]).removeClass('hidden');
                }
            }
        }
        $this.toggleClass(option.iconToggle).toggleClass(option.iconDefault);
    });
    return this;
});