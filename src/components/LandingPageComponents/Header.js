/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header id="header">
        <h1 id="logo" className="logo">
          <a onClick={() => navigate("/")}>Landed</a>
        </h1>
        <nav id="nav">
          <ul>
            <li className="opener">
              <a onClick={() => navigate("/detail")}>know more?</a>
            </li>
            <li>
              <a className="button primary" onClick={()=>showModal()}>Login / Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={()=>handleOk()} onCancel={()=>handleCancel()}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Header;
