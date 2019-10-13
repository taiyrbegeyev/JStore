import React, { Component } from 'react'

class UploadImage extends Component {
  state = {
    file: null,
    error_img: false,
    error_msg: '',
    loading: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error_img !== prevState.error_img) {
      return ({
        error_img: nextProps.error_img,
        error_msg: 'No file was selected'
      })
    }
  }

	onDrop = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    console.log(e.target.files)
    const file = e.target.files[0];
    console.log(file.size)
    const admittedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    // file size is measured in bytes
    if (file.size > 2000000) {
      this.setState({
        error_img: true,
        error_msg: 'File is too huge (Size limit is 2MB)'
      }, () => {
        this.props.parentCallBack (this.props.data_name, null)
      })
    } else if (admittedTypes.indexOf(file.type) !== -1) {
      reader.onloadend = () => {
        /** correct format and loaded -> reset errors and set file */
        this.setState({
          file,
          error_img: false,
        }, () => {
          this.props.parentCallBack (this.props.data_name, this.state.file)
          window.localStorage.setItem("uploaded_picture", file.name)
        })
      }
      reader.readAsDataURL(file);
    } else {
      this.setState({
        error_img: true,
        error_msg: 'Invalid image type. Supported types are .png, .jpg and .jpeg'
      })
    }
	}

  render() {
    const { error_img, error_msg } = this.state
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
          error_img && <p>{error_msg}</p>
        }
        {
          !error && window.localStorage.getItem("uploaded_picture") && <p>{window.localStorage.getItem("uploaded_picture")} was uploaded</p>
        }
      </React.Fragment>
    )
  }
}

export default UploadImage