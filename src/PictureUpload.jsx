import React, { Component } from "react";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/imageActions';

import defaultImage from "assets/img/default-avatar.png";

class PictureUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        imageUrl: defaultImage,
        id: '',
      }
    }
  }

  handleImageChange = async (event) => {
    const { imageUpload } = this.props;
    const [file] = event.target.files;
    const formData = new FormData();
    formData.append('image', file);
    const response = await imageUpload(formData);
    this.setState({
      ...this.state,
      image: {
        ...this.state.image,
        id: response.payload[0].id,
        imageUrl: response.payload[0].uri,
      }
    });
  }
  render() {

    const { loading } = this.props;

    const { image: { imageUrl } } = this.state;

    return (
      <div className="picture-container">
        <div className="picture">
          <img src={imageUrl} className="picture-src" alt="..." />
          <input type="file" id="image" onChange={this.handleImageChange} />
        </div>
        <h6 className="description">
          {
            loading ? 'Please wait...' : `Choose Picture`
          }
        </h6>
      </div>
    );
  }
}

PictureUpload.propTypes = {
  imageUpload: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  image: state.image,
  loading: state.image.loading,
});

const mapDispatchToProps = (dispatch) => ({
  imageUpload: (img) => dispatch(uploadImage(img)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureUpload);
