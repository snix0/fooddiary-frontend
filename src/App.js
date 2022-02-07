import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import React, { useState, useEffect } from 'react'
//import services from './services'

function App() {
  const [values, setValues] = useState({ entity: '', data: [], newEntityTitle: '', newEntityDesc: '' })
  const [isCreateModalVisible, setCreateModalVisible] = useState( false )
  const [isLoading, setLoading] = useState( false )
  const [isSaving, setSaving] = useState( false )
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [selectedFile, setSelectedFile] = useState();

  const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://fdproxy:8080/api')
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.log('error'))
    }, [])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = [];
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
        setImageURLs(newImageURLs);
    }, [images])

  function handleInputChange( e ) {
    let {name, value} = e.target
    if( e.target.type === 'checkbox' ) {
      value = e.target.checked
    }
    
    setValues({...values, [name]: value})
  }

    function onImageChange(e) {
        setSelectedFile(e.target.files[0])
        setImages([...e.target.files])
    }

  async function handleSubmit( e ) {
    e.preventDefault()

    if( !values.entity ) {
      alert( 'Please enter an Entity name' )
      return 
    }

    setLoading(true)
    //const entities = await services.getEntryById( values.entity )

    // Check if input is not a number. If so, return
      
    if (isNaN(+values.entity)) {
        console.warn("Input is not a number");
        return
    }

    // TODO clean up
    fetch('http://fdproxy:8080/api/entries/' + values.entity)
        .then((res) => res.json())
        .then((res) => setData([res]))
        .catch((err) => console.log('error'))
    setLoading(false)
  } 

  function handleCreateNewClick() {
    setCreateModalVisible( true )
  }

  async function handleCreateNewSaveClick() {
    console.log(values.newEntityTitle + " | " + values.newEntityDesc);
    if( !values.newEntityTitle || !values.newEntityDesc) {
      alert( 'Title and description must not be blank!' )
      return 
    }

    if (!values.selectedFile) {
        console.warn("Image not selected")
    }

    setSaving(true)
//    await services.createEntity( values.entity, JSON.parse( values.newEntity ) )
    setSaving(false)

    setLoading(true)

    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('title', values.newEntityTitle)
    formData.append('description', values.newEntityDesc)

    const requestOptions = {
        method: 'POST',
        body: formData
    };
    fetch('http://fdproxy:8080/api/submit', requestOptions)
      .then(response => response.json());
    //const entities = await services.getAllEntries()
    setLoading(false)
  }

  function handleCreateNewCancelClick() {
    setCreateModalVisible( false )
  }
  
  return (
    <div className="App">
      <div className="container">
        <h2>Food Diary</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Filter by ID:</label>
            <input type="textbox" className="form-control" onChange={ handleInputChange } value={ values.entity } name="entity"/>
          </div>
          <button type="submit" onClick={ e => handleSubmit(e) } className="btn btn-primary">Submit</button>
          <span style={{ "display": "inline-block", "marginLeft": "5px", "marginRight": "5px"}}></span>
          <button type="button" onClick={ handleCreateNewClick } className="btn btn-secondary">Create New Record</button>
        </form>

        { isCreateModalVisible
          ? (
            <div style={{marginTop: "25px"}} className="alert alert-success" role="alert">
              <h4 className="alert-heading">Create New Record</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Title:</label>
                  <textarea className="form-control" rows="1" onChange={ handleInputChange } value={ values.newEntityTitle } name="newEntityTitle"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea2">Description:</label>
                  <textarea className="form-control" rows="7" onChange={ handleInputChange } value={ values.newEntityDesc } name="newEntityDesc"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea3">Image:</label><br/>
                  <input type="file" accept="image/*" onChange={ onImageChange } /><br/>
                  { imageURLs.map( imageSrc => <img width="200" alt="previewimg" src={imageSrc} /> ) }
                </div>
                <div style={{width: "100%", "paddingBottom": "40px"}}>
                  <div className="float-left">
                    { isSaving ? <span>Saving...</span> : ''}
                  </div>
                  <div className="float-right">
                    <button type="button" onClick={ handleCreateNewSaveClick } className="btn btn-primary">Save</button>
                    <span style={{ "display": "inline-block", "marginLeft": "5px", "marginRight": "5px"}}></span>
                    <button type="button" onClick={ handleCreateNewCancelClick } className="btn btn-secondary">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ''
          )
        }

        <div style={{marginTop: "75px"}}>
          <div>
      {data ? (
          <table className="table table-striped">
            <thead>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
            </thead>
            <tbody>
          {data.map((element, index) => (
              <tr>
                  <td>{element.title}</td>
                  <td>{element.description}</td>
                  <td><img alt="imagethumb" src={`/${element.image}`}></img></td>

              </tr>
          ))}
            </tbody>
          </table> )
      : (
          isLoading ? <span>Loading...</span> : <span>No results</span>
        )
      }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
