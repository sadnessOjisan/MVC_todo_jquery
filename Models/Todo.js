(function(global) {
    var Todo = function(todos) {
        if(!(this instanceof Todo)) {
            return new Todo();
        }

        this.todos = todos || {}
    }
    
    /**
     * todo一覧を取得
     */
    Todo.prototype.getTodos = function(callback) {
        $.ajax({
            type: "GET",
            url: "https://json-now-ohjoczewvz.now.sh/todos"
        })
        .done((data) => {
            callback(data)
            return 1
        }).fail((err) => {
            alert('Todo一覧取得に失敗しました')
            return 0
        });
    }

    Todo.prototype.createTodo = function(task, isDone = false) {

    }

    Todo.prototype.updateTodo = function(id) {
    }

    global.todo.model = new Todo()

  }(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる