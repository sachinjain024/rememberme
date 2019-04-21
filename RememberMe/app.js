// Model
var itemController = (function(){

    var Note = function(id, title, description){
        this.id = id,
        this.title = title,
        this.description = description
    };  

    var data = {
        allNotes: {
            one: [],
            all: []
        },
        totalNotes: {
            one: 0,
            all: 0
        }
    };

    return {
        addItem: function(typ, tit, des){
            var newItem, id, newItem2, id2;

            if(data.allNotes['one'].length > 0){
                id = data.allNotes['one'][data.allNotes['one'].length - 1].id + 1;
            }else{
                id = 0;
            }

            if(data.allNotes['all'].length > 0){
                id2 = data.allNotes['all'][data.allNotes['all'].length - 1].id + 1;
            }else{
                id2 = 0;
            }

            if(typ === 'one'){
                newItem = new Note(id, tit, des);
                data.allNotes['one'].push(newItem);
            }else if(typ === 'all'){

                newItem = new Note(id, tit, des);
                newItem2 = new Note(id2, tit, des);

                data.allNotes['one'].push(newItem); 
                data.allNotes['all'].push(newItem2);
            }

            return newItem;
        }
    }

})();


// View
var uiController = (function(){
    var domString = {
        inputType: '.add__type',
        inputTitle: '.add__title',
        inputDescription: '.add__description',
        inputButton: '.add__btn',
        noteList: '.note__list'
    }
    
    return {
        getInput: function(){
            return{
                type: document.querySelector(domString.inputType).value,
                title: document.querySelector(domString.inputTitle).value,
                description: document.querySelector(domString.inputDescription).value
            }
        },
        domString : function(){
            return domString;
        },
        addListItem: function(obj){
            var html, newHtml;

            html = '<div class="item clearfix" id="item-%id%"><div class="item__title">%title%</div><div class="right clearfix"><div class="item__description">%description%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'   
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%title%', obj.title);
            newHtml = newHtml.replace('%description%', obj.description);

            document.querySelector(domString.noteList).insertAdjacentHTML('beforeend', newHtml);

        },
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(domString.inputTitle + ', ' + domString.inputDescription);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(element => {
                element.value = "";
            });

            fieldsArr[0].focus();
        }
    }

})();


// Controller
var mainController = (function(itemCtrl, uiCtrl){

    var setupEventListeners = function(){
        var domString = uiCtrl.domString();
        document.querySelector(domString.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(domString.).addEventListener('click', ctrlAddItem);
    }
    

    var ctrlAddItem = function() {
        var input, newItem;

        input = uiCtrl.getInput();

        newItem = itemController.addItem(input.type, input.title, input.description);

        uiCtrl.addListItem(newItem);

        uiCtrl.clearFields();
    }

    return {
        init: function(){
            setupEventListeners();
        }
    };

})(itemController, uiController);

mainController.init();