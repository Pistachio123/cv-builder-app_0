/** @format */

import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import "../../CSS/ResumeSport.css";
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

function ResumeArt() {
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

        <div>
          <div id='divToPrint' className=''>
            <div className='rela-block top-bar'>
              <div className='caps name'>
                <div className='abs-center'>{profile.name}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className='side-bar'>
                <div className='mugshot'>
                  <div className=''>
                    <img
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "9999px",
                      }}
                      src={file}
                      alt=''
                    />
                  </div>
                </div>
                <p style={{ textAlign: "center" }}>{profile.location}</p>

                <GetLinks />
                <br />

                <p className='rela-block caps side-header'>Skill</p>
                <div className='d-flex flex-wrap'>
                  {skills.map((items, id) => {
                    return (
                      <p className='technology rounded' key={id}>
                        {items}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className='rela-block content-container'>
                <h2 className='rela-block caps title'>{profile.position}</h2>
                <div className='rela-block separator'></div>
                <div className='rela-block caps greyed'>Profile</div>
                <p className='long-margin'>{about}</p>
                <div className='rela-block caps greyed'>Experience</div>

                <div className='title'>
                  {experienceList.map((item, id) => {
                    return (
                      <div
                        className='d-flex justify-content-start py-1'
                        key={id}>
                        <HiOfficeBuilding size={30} />
                        <div className='px-3'>
                          <h4>{item.title}</h4>
                          <p className='m-0'>
                            {item.company} • {item.startMonth} {item.startYear}{" "}
                            {`${
                              item.isWorking
                                ? " - Present"
                                : " - " + item.endMonth + " " + item.endYear
                            }`}
                          </p>
                          <p className='m-0'>{item.location}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ResumeArt;
