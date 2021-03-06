import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBlogPost } from "../actions";

class NewBlogPost extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="text" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }

    onSubmit(values) {
        this.props.createBlogPost(values, () => {
          this.props.history.push("/");
        });
      }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Blog Post Title"
                    name="title"
                    component={this.renderField}
                />

                <Field
                    label="Categories of Blog Post"
                    name="categories"
                    component={this.renderField}
                />

                <Field
                    label="Blog Post Content"
                    name="content"
                    component={this.renderField}
                />

                <button type="submit" className="btn btn-primary">Add</button>

                <Link to="/" className="btn btn-danger" style={{margin:"10px"}}>Cancel</Link>
            </form>
        );
    }
}


function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}


export default reduxForm({
    validate,
    form: 'BlogPostNewForm'
})(connect(null, { createBlogPost })(NewBlogPost));