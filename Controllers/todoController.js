(function(global) {
    var TodoController = function() {
        if(!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    TodoController.prototype.init = function() {
        global.todo.model.getTodos(_addDataToView)
    }

    global.todo.controller = new TodoController()

    function _addDataToView(data){
        global.todo.model.todos = data
        for(var i=0; i<data.length; i++){
            var todo = data[i]
            global.todo.view.appendTodo(todo)
        }
    }

  }(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる