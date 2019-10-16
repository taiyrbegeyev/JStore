import React, { Component } from 'react'
import imageCompression from 'browser-image-compression'

class UploadImage extends Component {
  state = {
    file: null,
    error_img: false,
    error_msg: '',
    loading: false
  }

  options = { 
    // (default: Number.POSITIVE_INFINITY)
    maxSizeMB: 0.5,
    // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
    maxWidthOrHeight: undefined,
    // use multi-thread web worker, fallback to run in main-thread (default: true)
    useWebWorker: true,
    // max number of iteration to compress the image (default: 10)
    maxIteration: 10
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
    this.setState({
      loading: true
    })
    
    e.preventDefault();

    const reader = new FileReader();
    console.log(e.target.files)
    const file = e.target.files[0];
    console.log(file.size / 1000000 + ' mb')

    // compress image
    imageCompression(file, this.options)
      .then((file) => {
        console.log('Compressed: ' + file.size / 1000000 + ' mb')
        // file size is measured in bytes
        if (file.size > 1000000) {
          this.setState({
            error_img: true,
            error_msg: 'File is too huge',
            loading: false
          }, () => {
            this.props.parentCallBack (this.props.data_name, null)
          })
        } else {
          reader.onloadend = () => {
            /** correct format and loaded -> reset errors and set file */
            this.setState({
              file,
              error_img: false,
              loading: false
            }, () => {
              this.props.parentCallBack (this.props.data_name, this.state.file)
              window.localStorage.setItem("uploaded_picture", file.name)
            })
          }
          reader.readAsDataURL(file);
        }
      })
      .catch((err) => {
        console.log(err)
      })
	}

  render() {
    const { error_img, error_msg, loading } = this.state
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
          loading && <p>Loading ...</p>
        }
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