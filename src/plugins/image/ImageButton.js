/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import Modal from "react-modal";

import icons from "../../icons";
// import insertDataBlock from "../../insertDataBlock";
import ImageUploadPreview from "./ImageUploadPreview";

Modal.setAppElement("#modal-element");

export default class BlockButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = ::this.onClick;
    this._closeModal = ::this._closeModal;

    this.state = {
      modalOpen: false
    };
  }

  _closeModal() {
    this.setState({ modalOpen: false });
  }

  onClick(e) {
    e.preventDefault();
    // const src = window.prompt("Enter a URL");
    // if (!src) {
    //   return;
    // }
    //
    // const data = { src: src, type: "image", display: "medium" };
    //
    // this.props.onChange(insertDataBlock(this.props.editorState, data));
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <button
        className={this.props.className}
        type="button"
        onClick={this.onClick}
        title={this.props.title}
      >
        <icons.ImageIcon className="sidemenu__button__icon" />
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          className={{
            base: "image-modal upload",
            afterOpen: "after-open",
            beforeClose: "before-close"
          }}
          closeTimeoutMS={250}
          rejectClassName="reject"
          acceptClassName="accept"
          overlayClassName={{
            base: "image-modal overlay",
            afterOpen: "after-open",
            beforeClose: "before-close"
          }}
        >
          <ImageUploadPreview {...this.props} />
        </Modal>
      </button>
    );
  }
}
