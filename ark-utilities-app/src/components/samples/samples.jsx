
class ProductCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      category: props.product.category,
      name: props.product.name,
      imageURL: 'http://via.placeholder.com/200x200',
      checkURL: props.product.imageURL,
      price: props.product.price,
    }
    this.checkImage.bind(this);
    this.checkImage();
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.product.category != this.state.category){
      this.setState({category: nextProps.product.category});
    }
    if(nextProps.product.name != this.state.name){
      this.setState({name: nextProps.product.name});
    }
    if(nextProps.product.price != this.state.price){
      this.setState({price: nextProps.product.price});
    }
    if(nextProps.product.imageURL != this.state.imageURL){
      this.setState({checkURL: nextProps.product.imageURL}, () => this.checkImage());
    }
  }

  checkImage(){
    let image = new Image();
    image.onerror = () =>{
      this.setState({imageURL: 'http://via.placeholder.com/200x200'});
    }
    image.onload = () =>{
      this.setState({imageURL: this.state.checkURL});
    }
    image.src = this.state.checkURL;
  }
  
  render(){
    return(
      <div className = 'ProductCard'>
        <p className='category'>Products &#187; {this.state.category}</p>
        <p className='name'>{this.state.name}</p>
        <img src={this.state.imageURL}></img>
        <p className='price'>from <span>${this.state.price}</span></p>
      </div>
    );
  }
} 


class NewItemTab extends React.Component {
  constructor() {
    super();
    this.state = {
      formErrors: {
        category: false,
        name: false,
        price: false,
        imageURL: false
      }
    }
  }
  
  checkForm(){
    let category = document.getElementById('newItemForm-category').value;
    let name = document.getElementById('newItemForm-name').value;
    let price = document.getElementById('newItemForm-price').value;
    let imageURL = document.getElementById('newItemForm-imageURL').value;
    let product = {category: category, name: name, price: price, imageURL: imageURL};
    let errors = this.state.formErrors;
    category.length == 0 ? errors.category = true : errors.category = false;
    name.length == 0 ? errors.name = true : errors.name = false;
    price.length == 0 ? errors.price = true : errors.price = false;
    
    let image = new Image();
    image.onerror = () =>{
      this.finalizeForm(false, product);
    }
    image.onload = () =>{
      this.finalizeForm(true, product);
    }
    this.setState({formErrors: errors});
    image.src = imageURL;
  }
  
  finalizeForm(isImageURLValid, product){
    
    if(isImageURLValid == false){
      let errors = this.state.formErrors;
      errors.imageURL = true;
      this.setState({formErrors: errors});
    } else {
      this.props.addNewProduct(product);
    }
  }
  
  renderCategorySelections(inventory){
    const categoryKeys = Object.keys(inventory.categories);
    const CKLength = categoryKeys.length;
    let options = [];
    
    const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    for(let i = 0; i<CKLength; i++){
      options.push(<option>{capitalize(categoryKeys[i])}</option>);
    }
    return options;
  }
  
  updateForm(){
    let category = document.getElementById('newItemForm-category').value;
    let name = document.getElementById('newItemForm-name').value;
    let price = document.getElementById('newItemForm-price').value;
    let imageURL = document.getElementById('newItemForm-imageURL').value;
    let errors = this.state.formErrors;
    if(this.props.formData.category != category){
      errors.category = false;
    }
    if(this.props.formData.name != name){
      errors.name = false;
    }
    if(this.props.formData.price != price){
      errors.price = false;
    }
    if(this.props.formData.imageURL != imageURL){
      errors.imageURL= false;
    }
    this.setState({formErrors: errors});
    
    this.props.changeForm({category: category, name: name, price: price, imageURL: imageURL});
  }
  
  render(){
    return(
      <div className='NewItemTab'>
        <div className='newItem-input'>
          <h1>Add A New Item</h1>
          <p>
            <label>Category</label>
            <select className={this.state.formErrors.category == true ? 'formCheck-err' : ''} id='newItemForm-category' value={this.props.formData.category} onChange={() => this.updateForm()}>
              <option></option>{this.renderCategorySelections(this.props.inventory)}
            </select>
          </p>
          <p>
            <label>Product Name</label>
            <input className={this.state.formErrors.name == true ? 'formCheck-err' : ''} type='text' required id='newItemForm-name' value={this.props.formData.name} onChange={() => this.updateForm()}></input>
          </p>
          <p>
            <label>Price per Unit</label>
            <input className={this.state.formErrors.price == true ? 'formCheck-err' : ''} type='number' required id='newItemForm-price' value={this.props.formData.price} onChange={() => this.updateForm()}></input>
          </p>
          <p>
            <label>Image URL</label>
            <input className={this.state.formErrors.imageURL == true ? 'formCheck-err' : ''} type='text' required id='newItemForm-imageURL' value={this.props.formData.imageURL} onChange={() => this.updateForm()} placeholder='Paste link here'></input>
          </p>
          <button onClick={() => this.checkForm()}>Add Product</button>
        </div>
        <div className='newItem-preview'>
          <h1>Preview</h1>
          <ProductCard product={this.props.formData} />
          
        </div>
        
      </div>
    );
  }
}


const ProductTableRow = (props) => {
  console.log()
  return (
    <tr>
      <td>{props.product.name}</td>
      <td>${props.product.price}</td>
      <td>{props.product.category}</td>
      <td><a target="_blank" href={props.product.imageURL}>View</a></td>
      <td className='editButton'>edit</td>
    </tr>
  );
}

class ProductsTab extends React.Component {
  
  renderTableRows(inventory){
    const categoryKeys = Object.keys(inventory.categories);
    const CKLength = categoryKeys.length;
    let listOfProducts = [];
    
    for(let i = 0; i<CKLength; i++){
      let category = categoryKeys[i];
      listOfProducts = listOfProducts.concat(inventory.categories[category]);
    }
    
    let LOPlength = listOfProducts.length;
    if( LOPlength == 0){
      return <div><p>There are currently no items in the inventory</p></div>
    } else {
      let rows = [
       <tr>
        <th>Product Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Image</th>
      </tr>
      ];
      
      for(let i = 0; i<LOPlength; i++){
        rows.push(<ProductTableRow product={listOfProducts[i]}/>);
      }
      
      return rows;
    }
  }
  
  render(){
    return(
      <div className='ProductsTab'>
        <h1>Available Products List</h1>
        <p>Showing all available products:</p>
        <table className='productTable'>
          {this.renderTableRows(this.props.inventory)}
        </table>
      </div>
    );
  }
  
}


class MyRouter extends React.Component {
  
  route(active){
    switch(active){
      case 0:
        return <NewItemTab 
                 inventory={this.props.inventory}
                 formData={this.props.newItemFormData}
                 changeForm={this.props.changeNewItemForm}
                 addNewProduct={this.props.addNewProduct}
                 />
        break;
      case 1:
        return <ProductsTab inventory={this.props.inventory}/>;
        break;
    }
  }
  
  render(){
    return(
      <div className='MyRouter'>
        {this.route(this.props.activeTab)}
      </div>
    );
  }
}

const Sidebar = (props) => {
  return(
    <div className='Sidebar'>
      <ul>
        <li className='add-new-item' onClick={() => props.changeTab(0)}><span>Add New Item</span></li>
        <li className={props.activeTab == 1 ? 'active':''} onClick={() => props.changeTab(1)}>Products</li>
        <li className={props.activeTab == 2 ? 'active':''} onClick={() => props.changeTab(2)}>Categories</li>
        <li className={props.activeTab == 3 ? 'active':''} onClick={() => props.changeTab(3)}>Item Archive</li>
      </ul>
    </div>
  );
}

const Footer = () => {
  return(
    <div className='Footer'>
      <p>Current work-in-progress for an e-commerce dashboard.</p>
    </div>
  );
}


class InventoryManagementApp extends React.Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1,
      inventory: {
        categories:{
          dresses:[],
          shirts:[
{category: "shirts", name: "Blue T-Shirt", price: "16.99", imageURL: "https://cdn.shopify.com/s/files/1/0797/0169/products/mockup-c6d64730_1024x1024.jpg"}],
          pants:[],
          accessories:[]
        }
      },
      newItemForm: {
        category: '',
        name: '',
        price: '',
        imageURL: ''
      }
    };
  }
  
  changeActiveTab(index){
    this.setState({activeTab: index});
  }
  
  changeNewItemForm(formData){
    this.setState({newItemForm: formData});
  }
  
  addNewProduct(product){
    
    this.setState({newItemForm: {category: '',name: '',price: '',imageURL: ''}});
    
    const decapitalize = (string) => {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }
    
    product.category = decapitalize(product.category);
    let inventory = this.state.inventory;
    inventory.categories[product.category].push(product);
    
    this.setState({inventory:inventory});
  }
  
  render(){
    return(
      <div className='InventoryManagementApp'>
        <h2 className='header'><i className="icon-th-list"></i> Inventory Management Application Demo</h2>
        <h1 className='title' onClick={() => this.changeActiveTab(1)}>Inventory</h1>
        <div className='app-body'>
          <Sidebar activeTab={this.state.activeTab} changeTab={this.changeActiveTab.bind(this)}/>
          <MyRouter 
            activeTab={this.state.activeTab} 
            inventory={this.state.inventory}
            newItemFormData={this.state.newItemForm}
            changeNewItemForm={this.changeNewItemForm.bind(this)}
            addNewProduct={this.addNewProduct.bind(this)}
            />
        </div>
        <Footer/>
      </div>
    );
  }
}


ReactDOM.render(
  <InventoryManagementApp/>,
  document.getElementById('app')
);