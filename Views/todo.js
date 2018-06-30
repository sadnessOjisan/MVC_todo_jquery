(function (global) {
    var TodoView = function () {
        if (!(this instanceof TodoView)) {
            return new TodoView();
        }
    }

    TodoView.prototype.appendTodo = function (todo) {
        if (todo.isDone === "true") {
            $('#todos-area').append('<p class="unchecked"><input checked type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
        } else {
            $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
        }
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
        $('.todo-check').on('click', function (e) {
            var clickedPoint = e.target
            if (clickedPoint.id == todo.id) {
                global.todo.controller.updateTodo(e, todo)
            }
        })
        var todoDom = $("#" + todo.id).parent()
        console.log("todo.isDone", todo.isDone)
        if (todo.isDone === "true") {
            todoDom.removeClass("unchecked")
            todoDom.addClass("checked")
        } else {
            todoDom.removeClass("checked")
            todoDom.addClass("unchecked")
        }
    }

    global.todo.view = new TodoView()

    function _extractData(data) {
        global.todo.model.todos = data
    }

}(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる