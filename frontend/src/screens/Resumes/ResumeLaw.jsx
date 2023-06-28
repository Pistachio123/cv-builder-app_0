/** @format */

import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import "../../CSS/ResumeLaw.css";
import {
  HiOfficeBuilding,
  HiOutlineMail,
  HiPhone,
} from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { saveAs } from "file-saver";

import { useSelector } from "react-redux";

function ResumeLaw() {
  const profile = useSelector((state) => state.profile);
  const name = profile.name.split(" ");
  const file = useSelector((state) => state.file);
  const about = useSelector((state) => state.about);
  const experienceList = useSelector((state) => state.experienceList);
  const educationList = useSelector((state) => state.educationList);
  const skills = useSelector((state) => state.skills);

  const createAndDownloadPdf = () => {
    const data = {
      profile: profile,
      name: name,
      file: file,
      about: about,
      experienceList: experienceList,
      educationList: educationList,
      skills: skills,
    };
    axios
      .post("http://localhost:5000/create-pdf", data)
      .then(() =>
        axios.get("http://localhost:5000/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={30} />;
      case "HiPhone":
        return <HiPhone size={30} />;
      case "BsLinkedin":
        return <BsLinkedin size={30} />;
      case "BsGithub":
        return <BsGithub size={30} />;
      case "BsGlobe":
        return <BsGlobe size={30} />;
      default:
        return "●";
    }
  };
  const GetLinks = () => {
    const list = [];
    if (profile.email) {
      list.push({
        icon: "HiOutlineMail",
        link: profile.email,
      });
    }
    if (profile.contact) {
      list.push({
        icon: "HiPhone",
        link: profile.contact,
      });
    }
    if (profile.linkedin) {
      list.push({
        icon: "BsLinkedin",
        link: profile.linkedin,
      });
    }
    if (profile.github) {
      list.push({
        icon: "BsGithub",
        link: profile.github,
      });
    }
    if (profile.website) {
      list.push({
        icon: "BsGlobe",
        link: profile.website,
      });
    }

    return list.map((item, id) => {
      return (
        <div className='d-flex p-3' key={id}>
          <p className='m-0'>
            <GetIcon icon={item.icon} />
          </p>
          <span className='mx-2'></span>
          <p className='m-0'>{item.link}</p>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div>
        <div className='d-grid col-2 mx-auto mt-4'>
          <button
            className='nav-link align-middle bg-dark text-white p-2 rounded'
            onClick={printDocument}>
            Download
          </button>
        </div>
        <div id='divToPrint' className='grid-container'>
          <div className='zone-1'>
            <div className='toCenter'>
              <div className=''>
                <img
                  style={{
                    height: "160px",
                    width: "160px",
                    borderRadius: "9999px",
                  }}
                  src={file}
                />
              </div>
            </div>
            <div className='contact-box'>
              <div className='title'>
                <h2>Contact</h2>
              </div>
              <div className='call'>
                <i className='fas fa-phone-alt'></i>
                <div className='text'>{profile.tagline}</div>
              </div>
              <div className='home'>
                <i className='fas fa-home'></i>
                <div className='text'>{profile.location}</div>
              </div>
              <div className='website'>
                <i style={{}} className='fas fa-globe'></i>
                <div>
                  <GetLinks />
                </div>
              </div>
              <div className='email'>
                <i className='fas fa-envelope'></i>
                <div className='text'>info@gmail.com</div>
              </div>
            </div>

            <div className='hobbies-box'>
              <div className='title'>
                <h2>Skills</h2>
              </div>
              <div>
                {skills.map((items, id) => {
                  return (
                    <p className='technology rounded' key={id}>
                      {items}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='zone-2'>
            <div className='headTitle'>
              <h1>
                {profile.name}
                <br />
              </h1>
            </div>
            <div className='subTitle'>
              <h1 style={{ color: "white" }}>{profile.position}</h1>
            </div>
            <div className='group-1'>
              <div className='title'>
                <div className='box'>
                  <h2>About Me</h2>
                </div>
              </div>
              <div className='desc' style={{ color: "white" }}>
                {about}
              </div>
            </div>
            <div className='group-2'>
              <div className='title'>
                <div className='box'>
                  <h2>Education</h2>
                </div>
              </div>
              <div className='desc'>
                {educationList.map((item, id) => {
                  return (
                    <div className='d-flex justify-content-start py-1' key={id}>
                      <GiGraduateCap style={{ color: "white" }} size={40} />
                      <div className='px-3'>
                        <h4 style={{ color: "white" }}>{item.institute}</h4>
                        <p className='m-0' style={{ color: "white" }}>
                          {item.degree} • {item.fieldOfStudy}
                        </p>
                        <p style={{ color: "lime" }}>
                          {item.startYear} - {item.endYear} • Grade:{" "}
                          {item.grade}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='group-3'>
              <div className='title'>
                <div className='box'>
                  <h2>Experience</h2>
                </div>
              </div>
              <div>
                {experienceList.map((item, id) => {
                  return (
                    <div className='d-flex justify-content-start py-1' key={id}>
                      <HiOfficeBuilding style={{ color: "white" }} size={30} />
                      <div className='px-3'>
                        <h4 style={{ color: "white" }}>{item.title}</h4>
                        <p className='m-0' style={{ color: "lime" }}>
                          {item.company} • {item.startMonth} {item.startYear}{" "}
                          {`${
                            item.isWorking
                              ? " - Present"
                              : " - " + item.endMonth + " " + item.endYear
                          }`}
                        </p>
                        <p style={{ color: "white" }} className='m-0'>
                          {item.location}
                        </p>
                        <p style={{ color: "lime" }}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ResumeLaw;
