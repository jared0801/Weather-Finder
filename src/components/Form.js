import React from 'react';
import './Form.css';

const Form = (props) => (
    <div className="mt-5">
        <form className="form-inline" onSubmit={props.onGetWeather}>
            <div className="container">
                <div className="form-row justify-content-center">
                    <div className="col-6 col-lg-12">
                        <input className="form-control form-control-lg text-dark" type="text" name="city" placeholder="City..." />
                    </div>
                    <div className="col-6 col-lg-12 mt-lg-3">
                        <input className="form-control form-control-lg text-dark" type="text" name="country" placeholder="Country..." />
                    </div>
                </div>
                <div className="form-row pt-5">
                    <div className="col">
                        <button className="btn btn-primary">Get Weather</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
)

export default Form;