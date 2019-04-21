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
            var newItem, id;

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
                data.allNotes['all'].push(newItem);
            }
            console.log(data.allNotes);

            return newItem;
        },

        deleteItem: function(typ, id){
            var ids, index;

            ids = data.allNotes[typ].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allNotes[typ].splice(index, 1);
            }
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
        addListItem: function(obj, typ){
            var html, newHtml;

            html = '<div class="item clearfix" id="%type%-%id%"><div class="item__title">%title%</div><div class="right clearfix"><div class="item__description">%description%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'   
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%type%', typ);
            newHtml = newHtml.replace('%title%', obj.title);
            newHtml = newHtml.replace('%description%', obj.description);

            document.querySelector(domString.noteList).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorId){
            console.log(selectorId);
            document.getElementById(selectorId).parentNode.removeChild(document.getElementById(selectorId));
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

        document.querySelector(domString.noteList).addEventListener('click', ctrlDeleteItem);
    }
    

    var ctrlAddItem = function() {
        var input, newItem;
        if(uiCtrl.getInput().title !== '' && uiCtrl.getInput().description !== ''){
            input = uiCtrl.getInput();

            newItem = itemController.addItem(input.type, input.title, input.description);

            uiCtrl.addListItem(newItem, input.type);

            uiCtrl.clearFields();
        }
    }

    var ctrlDeleteItem = function(event){
        var itemId, splitId;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){
            splitId = parseInt(itemId.split('-')[1]);
            type = itemId.split('-')[0];

            itemCtrl.deleteItem(type, splitId);
        }

        uiCtrl.deleteListItem(itemId);
    }

    return {
        init: function(){
            setupEventListeners();
        }
    };

})(itemController, uiController);

mainController.init();