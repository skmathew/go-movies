import React, { Component, Fragment } from 'react';
import './EditMovie.css';
import Input from './form-components/Input';
import TextArea from './form-components/TextArea';

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mppa_rating: "",
                rating: "",
                description: ""
            },
            isLoaded: false,
            error: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evnt) => {
        console.log("Form was submitted");
        evnt.preventDefault();
      }
    
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

    componentDidMount() {

    }

    render() {
        let {movie} = this.state;

        return(
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='hidden'
                    name='id'
                    id='id'
                    value={movie.id}
                    onChange={this.handleChange}
                    />

                    {/*
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                        Title
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={movie.title}
                        onChange={this.handleChange}
                        />
                    </div>
                    */} 

                    <Input 
                    title={'Title'}
                    type='text'
                    name={'title'}
                    value={movie.title}
                    handleChange={this.handleChange}
                    />

                    <Input 
                    title={'ReleaseDate'}
                    type='date'
                    name={'release_date'}
                    value={movie.release_date}
                    handleChange={this.handleChange}
                    />

                    <div className='mb-3'>
                        <label htmlFor='runtime' name='runtime' required className='form-label'>
                            Run Time - Minutes
                        </label>
                        <input  type="number" 
                        min="20" 
                        max="600" 
                        step="10" 
                        required 
                        className='form-control' 
                        id='runtime' 
                        name='runtime' 
                        value={movie.runtime}
                        onChange={this.handleChange}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='mppa_rating'required className='form-label'>
                            MPAA Rating
                        </label>
                        <select className ='form-select' name='mppa_rating' value={movie.mppa_rating} onChange={this.handleChange}>
                            <option className='form-select' value='G'>G</option>
                            <option className='form-select' value='PG'>PG</option>
                            <option className='form-select' value='PG-13'>PG-13</option>
                            <option className='form-select' value='R'>R</option>
                            <option className='form-select' value='NC-17'>NC-17</option>
                            

                        </select>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='rating' required className='form-label'>
                            Rating
                        </label>
                        <select className ='form-select'  name = 'rating' value={movie.rating} onChange={this.handleChange}>
                            <option className='form-select' value='1'>&#11088;</option>
                            <option className='form-select' value='2'>&#11088;&#11088;</option>
                            <option className='form-select' value='3'>&#11088;&#11088;&#11088;</option>
                            <option className='form-select' value='4'>&#11088;&#11088;&#11088;&#11088;</option>
                            <option className='form-select' value='5'>&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                            
                        </select>
                    </div>


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

                </form>
                <div className='mt-3'>
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>

                </div>
            </Fragment>
        )
        
    }
}