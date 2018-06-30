(function(global) {
    var TodoController = function() {
        if(!(this instanceof TodoController)) {
            return new TodoController();
        }
    }

    $('#submit-form').submit(function (event) {
        event.preventDefault();
        console.log('fire')
        var todo = $('#submit-form [name=todo]').val();
        console.log('<_addDataToView>todo: ', todo)
        global.todo.controller.createTodo(todo)
    });

    TodoController.prototype.init = function() {
        console.log('init')
        global.todo.model.getTodos(_addDataToView)
    }

    TodoController.prototype.createTodo = function(todo) {
        global.todo.model.createTodo(todo, _addDataToView)
    }

    global.todo.controller = new TodoController()

    function _addDataToView(data){
        console.log('<_addDataToView>data: ', data)
        if(data instanceof Array){
            for(var i=0; i<data.length; i++){
                var todo = data[i]
                global.todo.view.appendTodo(todo)
            }
        }else{
            console.log('data: ', data)
            global.todo.view.appendTodo(data)
        }
    }

  }(window || global)); // ここのglobalはthidでもいいかも. windowがないとき(nodejs)でも動かせる