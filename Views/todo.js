(function (global) {
    var TodoView = function () {
        if (!(this instanceof TodoView)) {
            return new TodoView();
        }
    }

    TodoView.prototype.renderTodos = function (todos) {
        $('#todos-area').empty();
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i]
            var isDone = todo.isDone === "false" ? false : true
            if (isDone) {
                $('#todos-area').append('<p class="checked"><input checked type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
            } else {
                $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
            }
            $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
            $('.todo-check').on('click', function (e) {
                var clickedPointId = e.target.id
                var clickedTodo = global.todo.model.todos.find(function(element) {
                    return element.id == clickedPointId;
                  })
                global.todo.controller.updateTodo(e, clickedTodo)
            })
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
        global.todo.view.toggleFilter()
    })


    // todoのupdate処理
    TodoView.prototype.updateTodo = function (id, isChecked) {
        var todoDom = $("#" + id).parent()
        if (isChecked) {
            todoDom.addClass("checked")
            todoDom.removeClass("unchecked")
        } else {
            todoDom.addClass("unchecked")
            todoDom.removeClass("checked")
        }
    }

    // fiterのtoggle処理
    TodoView.prototype.toggleFilter = function () {
        var filterState = $('#filter-state').text()
        if (filterState === 'off') {
            $('#filter-state').text('on')
            $('#todos-area input:checkbox:checked').parent().addClass('hide')
        } else {
            // on -> off もしくは, init時はこっちの分岐に入る. 
            $('#filter-state').text('off')
            $('#todos-area input:checkbox:checked').parent().removeClass('hide')
        }
    }

    global.todo.view = new TodoView()

}(window || global));