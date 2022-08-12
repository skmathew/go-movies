import React, { Component, Fragment } from 'react';
import './EditMovie.css';
import Input from './form-components/Input';
import TextArea from './form-components/TextArea';
import Select from './form-components/Select';
import Alert from './ui-components/Alert';
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: ""
            },
            mpaaOptions: [
                {id: "G", value:"G"},
                {id: "PG", value:"PG"},
                {id: "PG-13", value:"PG-13"},
                {id: "R", value:"R"},
                {id: "NC-17", value:"NC-17"},
            ],
            ratingOptions: [
                //{id: "1", value:'&#11088;'},
                {id: "1", value:'1'},
                {id: "2", value:'2'},
                {id: "3", value:'3'},
                {id: "4", value:'4'},
                {id: "5", value:'5'},
            ],

            isLoaded: false,
            error: null,
            errors: [],
            alert: {
                type: "d-none",
                message: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleSubmit = (evnt) => {
        evnt.preventDefault();

        //client side validation
        let errors = [];
        if (this.state.movie.title === "") {
            errors.push("title");
        }

        this.setState({errors: errors});

        if (errors.length > 0) {
            return false;
        }


        const data = new FormData(evnt.target);
        const payload = Object.fromEntries(data.entries());
        console.log(payload);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/v1/admin/editmovie`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                this.setState({ 
                    alert: {type: "alert-danger", message: data.error.message},
                });

            } else {

                this.setState({ 
                    alert: {type: "alert-success", message: "Changes Saved"},
                });

            }
        })

      };
    
      handleChange = (evnt) => {
        let value = evnt.target.value;
        let name = evnt.target.name;
        this.setState((prevState) => ({
          movie: {
            ...prevState.movie,
            [name]: value,
          }
        }))
      }

      hasError(key) {
          return this.state.errors.indexOf(key) !== -1;
      }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            console.log(process.env.REACT_APP_SERVER_URL);
            fetch(`${process.env.REACT_APP_SERVER_URL}/v1/movie/` + id)
            .then((response) => {
                if (response.status !== "200") {
                    let err = Error;
                    err.Message = "Invalid respose code: " + response.status;
                    this.setState({error: err});
                }
                return response.json();
            })
            .then((json) => {
                const releaseDate = new Date(json.movie.release_date);
                console.log(json.movie);

                this.setState(
                    {
                        movie: {
                            id: id,
                            title: json.movie.title,
                            release_date: releaseDate.toISOString().split("T")[0],
                            runtime: json.movie.runtime,
                            mpaa_rating: json.movie.mpaa_rating,
                            rating: json.movie.rating,
                            description: json.movie.description,
                        },
                        isLoaded: true,
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error,
                        })
                    }
                )
            })
        } else {
            this.setState({
                isLoaded: true
            });
        }

    }

    confirmDelete = (e) => {
        console.log("would delete movie id", this.state.movie.id);

        confirmAlert({
            title: 'Delete Movie?',
            message: 'Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => alert('Click Yes')
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]});


    }

    render() {
        let {movie, isLoaded, error} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return <p>Loading....</p>
        } else {

        return(
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <Alert 
                alertType={this.state.alert.type}
                alertMessage={this.state.alert.message}
                />




                <hr />
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='hidden'
                    name='id'
                    id='id'
                    value={movie.id}
                    onChange={this.handleChange}
                    />


                    <Input 
                    title={'Title'}
                    className={this.hasError("title") ? "is-invalid": ""}
                    type='text'
                    name={'title'}
                    value={movie.title}
                    handleChange={this.handleChange}
                    errorDiv={this.hasError("title") ? "text-danger": "d-none"}
                    errorMsg={"Please enter a title"}
                    />

                    <Input 
                    title={'ReleaseDate'}
                    type='date'
                    name={'release_date'}
                    value={movie.release_date}
                    handleChange={this.handleChange}
                    />

                    <div className='mb-3'>
                        <label htmlFor='runtime' name='runtime' className='form-label'>
                            Run Time - Minutes
                        </label>
                        <input  type="number" 
                        min="20" 
                        max="600"  
                        className='form-control' 
                        id='runtime' 
                        name='runtime' 
                        value={movie.runtime}
                        onChange={this.handleChange}/>
                    </div>

                    <Select 
                    title={'MPAA Rating'}
                    name={'mpaa_rating'}
                    option={this.state.mpaaOptions}
                    value={movie.mpaa_rating}
                    handleChange={this.handleChange}
                    placeholder={'Choose...'}
                    />


                    <Select 
                    title={'Rating'}
                    name={'rating'}
                    option={this.state.ratingOptions}
                    value={movie.rating}
                    handleChange={this.handleChange}
                    placeholder={'Choose...'}
                    />


                    <TextArea 
                    title={'Description'}
                    type='date'
                    name={'description'}
                    value={movie.description}
                    handleChange={this.handleChange}
                    rows='3'
                    />

                    <hr />

                    <button className='btn btn-primary'>Save</button>
                    <Link to="/admin" className="btn btn-warning ms-1">
                      Cancel  
                    </Link>

                    {movie.id > 0 && (
                        <a href="#!" onClick={() => this.confirmDelete()}
                        className="btn btn-danger ms-1">
                            Delete
                        </a>
                    )}

                </form>

            </Fragment>
        )
        }
        
    }
}