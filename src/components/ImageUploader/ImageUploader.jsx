import React, { Component } from 'react'

class UploadImage extends Component {
  state = {
    file: null,
    error_img: false,
    error_msg: '',
    validImage: false,
    loading: false,
    done: false,
  }

	onDrop = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    console.log(e.target.files)
    const file = e.target.files[0];
    const admittedTypes = ['image/jpg', 'image/jpeg', 'image/png']
    if (admittedTypes.indexOf(file.type) !== -1) {
      reader.onloadend = () => {
        /** correct format and loaded -> reset errors and set file */
        this.setState({
          file,
          error_img: false,
          validImage: true,
        }, () => {
          this.props.parentCallBack (this.props.data_name, this.state.file)
          window.localStorage.setItem("uploaded_picture", file.name)
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        validImage: false,
        error_img: true,
      });
    }
	}

  render() {
    const { error_img } = this.state
    const { error } = this.props
    return (
      <React.Fragment>
        <input
          accept="image/*"
          id="photo"
          type="file"
          onChange={this.onDrop}
        />
        {
          error && <p>No file was selected</p>
        }
        {
          error_img && <p>Invalid image type. Supported types are .png, .jpg and .jpeg</p>
        }
        {
          !error && window.localStorage.getItem("uploaded_picture") && <p>{window.localStorage.getItem("uploaded_picture")} is already uploaded</p>
        }
      </React.Fragment>
    )
  }
}

export default UploadImage