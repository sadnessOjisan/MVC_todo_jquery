(function(global) {
    var TodoController = function() {
        if(!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    TodoController.prototype.init = function() {
        global.todo.model.getTodos(_extractData)
        console.log('[TodoController]<init> data: ', global.todo.model.todos)
    }

    global.todo.controller = new TodoController()

    function _extractData(data){
        global.todo.model.todos = data
    }

  }(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる