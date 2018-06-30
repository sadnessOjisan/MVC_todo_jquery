(function (global) {
    var TodoController = function () {
        if (!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    $('#submit-form').submit(function (event) {
        event.preventDefault();
        var todo = $('#submit-form [name=todo]').val();
        global.todo.controller.createTodo(todo)
    });

    $('#filter-btn').on('click', function () {
        var filterState = $('#filter-state').text()
        if (filterState === '' || filterState === 'on') {
            $('#filter-state').text('off')
            $('#todos-area input:checkbox:checked').parent().addClass('hide')
        } else {
            $('#filter-state').text('on')
            $('#todos-area input:checkbox:checked').parent().removeClass('hide')
        }
    })

    TodoController.prototype.init = function () {
        global.todo.model.getTodos(_addDataToView)
        $('#filter-state').text('off')
    }

    TodoController.prototype.createTodo = function (todo) {
        global.todo.model.createTodo(todo, _addDataToView)
    }

    TodoController.prototype.updateTodo = function (e, shouldUpdateTodo) {
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
        var todoDom = $("#" + shouldUpdateTodo.id).parent()
        console.log('shouldUpdateTodo.isDone', shouldUpdateTodo.isDone)
        if (shouldUpdateTodo.isDone === "true") {
            todoDom.removeClass("checked")
            todoDom.addClass("unchecked")
        } else {
            todoDom.removeClass("unchecked")
            todoDom.addClass("checked")
        }
        global.todo.model.updateTodo(shouldUpdateTodo)
    }

    global.todo.controller = new TodoController()

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

}(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる