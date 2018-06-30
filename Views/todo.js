(function (global) {
    var TodoView = function () {
        if (!(this instanceof TodoView)) {
            return new TodoView();
        }
    }

    TodoView.prototype.appendTodo = function (todo) {
        $('#todos-area').append('<p class="unchecked"><input type="checkbox" class="todo-check" id=' + todo.id + ' /><span>' + todo.task + '</span></p>')
        $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
        // memo: - 新しく追加されたtodoに対するイベントを宣言
        $('.todo-check').on('click', function (e) {
            var isChecked = $(this).is(':checked')
            var clickedId = $(this).attr('id')
            $('#remain').text($('#todos-area input:checkbox').length - $('#todos-area input:checkbox:checked').length)
            var todoDom = $("#" + clickedId).parent()
            if (isChecked) {
                todoDom.removeClass("unchecked")
                todoDom.addClass("checked")
            } else {
                todoDom.removeClass("checked")
                todoDom.addClass("unchecked")
            }
            // memo: - taskの達成をチェックしたら、その結果をサーバーに送る更新機能
            $.ajax({
                type: "POST",
                url: "https://json-now-ohjoczewvz.now.sh/todos/" + clickedId,
                data: {
                    task: data.task,
                    isDone: isChecked
                }
            })
        })
    }

    global.todo.view = new TodoView()

    function _extractData(data) {
        global.todo.model.todos = data
    }

}(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる