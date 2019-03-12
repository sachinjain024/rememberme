class App extends React.Component{

    render(){
        return(
            <div>
                <Header />
                <Form />
            </div>
        );
    };
}

const Header = () =>{
    return(
        <div class="header">
            <div class="name">
                Remember Me
            </div>
            <div class="div-btn">
                <a href="">
                    <button type="button" class="btn btn-primary"><i class="fas fa-save"></i>Save</button>
                </a>
                <a href="">
                    <button type="button" class="btn btn-danger"><i class="fas fa-times-circle"></i>Cancel</button>
                </a>
            </div>
        </div>
    );
}

const Form = () =>{
    return(
        <form class="text-center border border-light p-5">
            <h5>Create New Note :-</h5>
            <div class="flex flex-column">
                <div class="md-form">
                    <input id="input-char-counter" type="text" length="20" class="form-control" />
                    <label for="input-char-counter">Title</label>
                </div>
                <div class="md-form">
                    <textarea id="textarea-char-counter" class="form-control md-textarea" length="120" rows="3"></textarea>
                    <label for="textarea-char-counter">Description</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="this-website" name="groupOfDefaultRadios" checked />
                    <label class="custom-control-label" for="this-website">This Website Only</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input" id="all-website" name="groupOfDefaultRadios" />
                    <label class="custom-control-label" for="all-website">All Websites</label>
                </div>
            </div>
        </form>
    );  
}

ReactDOM.render(<App />, document.getElementById("root")); 