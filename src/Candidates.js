import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Candidates() {

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Applied");

  const [resume, setResume] = useState(null);

  const [candidates, setCandidates] = useState([]);

  // EDIT STATE

  const [editId, setEditId] = useState(null);

  // LOAD CANDIDATES

  useEffect(() => {

    fetchCandidates();

  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await fetch(
        `https://ai-powered-interview-management-system-tf73.onrender.com/api/candidates`,
      
      );

      const data = await response.json();

      setCandidates(data);

    } catch (error) {

      toast.error("Failed to load candidates ❌");

    }

  };

  // ADD CANDIDATE

  const addCandidate = async () => {

    if(
      !name ||
      !email ||
      !phone ||
      !skills ||
      !experience
    ){

      toast.error("Please fill all fields ❌");
      return;

    }

    const newCandidate = {

      name,
      email,
      phone,
      skills,
      experience,
      status,
      resume: resume ? resume.name : ""

    };

    try {

      const response = await fetch(

`https://ai-powered-interview-management-system-tf73.onrender.com/api/candidates/add`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(newCandidate)

        }

      );

      if(response.ok){

        toast.success("Candidate Added ✅");

        fetchCandidates();

        clearForm();

      }

      else{

        toast.error("Backend Error ❌");

      }

    } catch (error) {

      toast.error("Server Error ❌");

    }

  };

  // EDIT CANDIDATE

  const editCandidate = (candidate) => {

    setEditId(candidate.id);

    setName(candidate.name);
    setEmail(candidate.email);
    setPhone(candidate.phone);
    setSkills(candidate.skills);
    setExperience(candidate.experience);
    setStatus(candidate.status);

    toast.success("Edit Mode Enabled ✏️");

  };

  // UPDATE CANDIDATE

  const updateCandidate = async () => {

    const updatedCandidate = {

      id: editId,
      name,
      email,
      phone,
      skills,
      experience,
      status,
      resume: resume ? resume.name : ""

    };

    try {

      const response = await fetch(

        `https://ai-powered-interview-management-system-tf73.onrender.com/api/candidates/update/${editId}`,
        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify(updatedCandidate)

        }

      );

      if(response.ok){

        toast.success("Candidate Updated ✅");

        fetchCandidates();

        clearForm();

        setEditId(null);

      }

    } catch (error) {

      toast.error("Update Failed ❌");

    }

  };

  // DELETE

  const deleteCandidate = async (id) => {

    try {

      const response = await fetch(

        `https://ai-powered-interview-management-system-tf73.onrender.com/api/candidates/delete/${id}`,

        {

          method:"DELETE"

        }

      );

      if(response.ok){

        toast.success("Deleted Successfully 🗑️");

        fetchCandidates();

      };

      if(response.ok){

        toast.success("Deleted Successfully 🗑️");

        fetchCandidates();

      }

    } catch (error) {

      toast.error("Delete Failed ❌");

    }

  };

  // DOWNLOAD RESUME

  const downloadResume = () => {

    if(!resume){

      toast.error("Please choose resume first ❌");
      return;

    }

    const url = URL.createObjectURL(resume);

    const a = document.createElement("a");

    a.href = url;

    a.download = resume.name;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

  };

  // CLEAR FORM

  const clearForm = () => {

    setName("");
    setEmail("");
    setPhone("");
    setSkills("");
    setExperience("");
    setStatus("Applied");
    setResume(null);

  };

  // SEARCH

  const filteredCandidates = candidates.filter((item)=>

    item.name.toLowerCase().includes(search.toLowerCase())

  );

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1e3a8a,#7c3aed)",
        padding: "40px",
        color: "white"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        👨‍💼 Candidate Management
      </h1>

      {/* SEARCH */}

      <div style={{ textAlign:"center", marginTop:"20px" }}>

        <input
          type="text"
          placeholder="Search Candidate..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={{
            width:"400px",
            padding:"12px",
            borderRadius:"10px",
            border:"none"
          }}
        />

      </div>

      {/* FORM */}

      <div
        style={{
          background: "white",
          color: "black",
          padding: "30px",
          borderRadius: "20px",
          width: "450px",
          margin: "40px auto",
          boxShadow:"0 0 20px rgba(0,0,0,0.3)"
        }}
      >

        <h2>Add Candidate</h2>

        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e)=>setExperience(e.target.value)}
          style={inputStyle}
        />

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          style={inputStyle}
        >

          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Interview Scheduled</option>
          <option>Selected</option>
          <option>Rejected</option>

        </select>

        {/* RESUME */}

        <div
          style={{
            display:"flex",
            gap:"10px",
            marginBottom:"20px"
          }}
        >

          <label
            style={{
              background:"#2563eb",
              color:"white",
              padding:"10px 15px",
              borderRadius:"8px",
              cursor:"pointer"
            }}
          >

            Choose Resume

            <input
              type="file"
              hidden
              onChange={(e)=>setResume(e.target.files[0])}
            />

          </label>

          <button

            onClick={downloadResume}

            style={{
              background:"green",
              color:"white",
              border:"none",
              padding:"10px 15px",
              borderRadius:"8px",
              cursor:"pointer"
            }}

          >

            Download Resume

          </button>

        </div>

        {

          resume && (

            <p
              style={{
                color:"green",
                fontWeight:"bold",
                marginBottom:"15px"
              }}
            >

              Selected File: {resume.name}

            </p>

          )

        }

        {/* ADD / UPDATE BUTTON */}

        {

          editId ? (

            <button
              onClick={updateCandidate}
              style={buttonStyle}
            >
              Update Candidate
            </button>

          ) : (

            <button
              onClick={addCandidate}
              style={buttonStyle}
            >
              Add Candidate
            </button>

          )

        }

      </div>

      {/* LIST */}

      <div
        style={{
          background:"white",
          color:"black",
          padding:"20px",
          borderRadius:"20px",
          marginTop:"30px"
        }}
      >

        <h2>Candidate List</h2>

        {

          filteredCandidates.length === 0

          ?

          <p>No Candidates Found</p>

          :

          filteredCandidates.map((item,index)=>(

            <div

              key={index}

              style={{

                border:"1px solid #ccc",
                padding:"15px",
                marginBottom:"15px",
                borderRadius:"10px"

              }}

            >

              <h3>{item.name}</h3>

              <p>📧 {item.email}</p>

              <p>📱 {item.phone}</p>

              <p>💻 Skills: {item.skills}</p>

              <p>⭐ Experience: {item.experience}</p>

              <p>📌 Status: {item.status}</p>

              <p>📄 Resume: {item.resume}</p>

              {/* EDIT BUTTON */}

              <button

                onClick={()=>editCandidate(item)}

                style={{

                  background:"orange",
                  color:"white",
                  border:"none",
                  padding:"10px 15px",
                  borderRadius:"8px",
                  cursor:"pointer",
                  marginRight:"10px"

                }}

              >

                Edit

              </button>

              {/* DELETE BUTTON */}

              <button

                onClick={()=>deleteCandidate(item.id)}

                style={{

                  background:"red",
                  color:"white",
                  border:"none",
                  padding:"10px 15px",
                  borderRadius:"8px",
                  cursor:"pointer"

                }}

              >

                Delete

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );
}

const inputStyle = {

  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"1px solid #ccc",
  fontSize:"15px"

};

const buttonStyle = {

  padding: "12px 25px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  width:"100%",
  fontSize:"18px",
  cursor:"pointer"

};

export default Candidates;