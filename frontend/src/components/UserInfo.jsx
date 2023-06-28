/** @format */

import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Profile from "./Profile";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import { NavLink } from "react-router-dom";

function UserInfo() {
  const [cv, setcv] = useState(0);
  const handleOptionChange = (event) => {
    setcv(event.target.value);
  };
  return (
    <Fragment>
      <Container fluid className='p-0 top-image'></Container>
      <Container>
        <Profile></Profile>

        <About></About>

        <Experience></Experience>

        <Education></Education>

        <Skills></Skills>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <select value={cv} onChange={handleOptionChange}>
            <option value=''>Select CV to Choose from</option>
            <option value='1'>Art</option>
            <option value='2'>Computer Science</option>
            <option value='3'>Law</option>
            <option value='4'>Sports</option>
          </select>
        </div>

        <div className='d-grid col-2 mx-auto my-4 text-center'>
          {cv === "1" && (
            <NavLink
              className='nav-link align-middle bg-dark text-white p-2 rounded'
              to='/create-art-resume'>
              Preview1
            </NavLink>
          )}
          {cv === "2" && (
            <NavLink
              className='nav-link align-middle bg-dark text-white p-2 rounded'
              to='/create-cs-resume'>
              Preview2
            </NavLink>
          )}
          {cv === "3" && (
            <NavLink
              className='nav-link align-middle bg-dark text-white p-2 rounded'
              to='/create-law-resume'>
              Preview3
            </NavLink>
          )}
          {cv === "4" && (
            <NavLink
              className='nav-link align-middle bg-dark text-white p-2 rounded'
              to='/create-sport-resume'>
              Preview4
            </NavLink>
          )}
        </div>
      </Container>
    </Fragment>
  );
}

export default UserInfo;
