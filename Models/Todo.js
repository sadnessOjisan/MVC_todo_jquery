(function (global) {
    var Todo = function (todos) {
        if (!(this instanceof Todo)) {
            return new Todo();
        }

        this.todos = todos || {}
    }

    // todo一覧を取得
    Todo.prototype.getTodos = function (callback) {
        $.ajax({
                type: "GET",
                url: "https://json-now-ohjoczewvz.now.sh/todos"
            })
            .done((data) => {
                global.todo.model.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo一覧取得に失敗しました')
            })
    }

    // todoを作成
    Todo.prototype.createTodo = function (task, callback) {
        $.ajax({
                type: "POST",
                url: "https://json-now-ohjoczewvz.now.sh/todos",
                data: {
                    'task': task,
                    isDone: false
                }
            })
            .done((data) => {
                global.todo.model.todos = data
                callback(data)
            }).fail((err) => {
                alert('Todo作成に失敗しました')
            })
    }

    Todo.prototype.updateTodo = function (todo) {
        $.ajax({
                type: "PUT",
                url: "https://json-now-ohjoczewvz.now.sh/todos/" + todo.id,
                data: {
                    task: todo.task,
                    isDone: todo.isDone === "false" ? true : false
                }
            })
            .done((data) => {}).fail(function () {
                alert('更新に失敗しました')
            })
    }

    global.todo.model = new Todo()

}(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる