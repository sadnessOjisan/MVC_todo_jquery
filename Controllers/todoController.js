(function (global) {
    var TodoController = function () {
        if (!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    // アプリ起動時のinit処理. todoを取得し、フィルター処理を初期化する処理
    TodoController.prototype.init = function () {
        global.todo.model.getTodos(_renderTodos)
        global.todo.view.toggleFilter()
    }

    

    // todoを作成する処理. サーバーにtodoを送る
    TodoController.prototype.createTodo = function (todo) {
        global.todo.model.createTodo(todo, _renderTodos)
    }

    // todoの進捗を更新する処理
    TodoController.prototype.updateTodo = function (e, shouldUpdateTodo) {
        var id = e.target.id
        var isChecked = $(e.target).is(':checked')
        var task = shouldUpdateTodo.task
        global.todo.view.updateTodo()
        global.todo.view.filterTodo(id, isChecked)
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

    function _renderTodos(){
        var todos = global.todo.model.todos
        global.todo.view.renderTodos(todos)
    }

}(window || global));