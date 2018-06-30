(function (global) {
    var TodoController = function () {
        if (!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    // formが送信されたらそれをtodoに付け加える処理
    $('#submit-form').submit(function (event) {
        event.preventDefault();
        var todo = $('#submit-form [name=todo]').val();
        global.todo.controller.createTodo(todo)
    });

    // todoを表示を切り替えのフィルターのトグル処理
    $('#filter-btn').on('click', function () {
        var filterState = $('#filter-state').text()
        if (filterState === '' || filterState === 'off') {
            $('#filter-state').text('on')
            $('#todos-area input:checkbox:checked').parent().addClass('hide')
        } else {
            $('#filter-state').text('off')
            $('#todos-area input:checkbox:checked').parent().removeClass('hide')
        }
    })

    // アプリ起動時のinit処理. todoを取得し、フィルター処理を初期化する処理
    TodoController.prototype.init = function () {
        global.todo.model.getTodos(_addDataToView)
        $('#filter-state').text('off')
    }

    // todoを作成する処理. サーバーにtodoを送る
    TodoController.prototype.createTodo = function (todo) {
        global.todo.model.createTodo(todo, _addDataToView)
    }

    // todoの進捗を更新する処理
    TodoController.prototype.updateTodo = function (e, shouldUpdateTodo) {
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
        var id = e.target.id
        var isChecked = $(e.target).is(':checked')
        var task = shouldUpdateTodo.task
        var todoDom = $("#" + id).parent()
        if (isChecked) {
            todoDom.addClass("checked")
            todoDom.removeClass("unchecked")
        } else {
            todoDom.addClass("unchecked")
            todoDom.removeClass("checked")
        }
        global.todo.model.updateTodo(id, task, isChecked)
    }

    global.todo.controller = new TodoController()

    // callback
    function _addDataToView(data) {
        if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
                var todo = data[i]
                global.todo.view.appendTodo(todo)
            }
        } else {
            global.todo.view.appendTodo(data)
        }
    }

}(window || global));