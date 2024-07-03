import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading.js";

function StudentEdit() {
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudents] = useState({});

  useEffect(() => {
    axios
      .get(`/api/student/${id}`)
      .then((res) => {
        console.log(res);
        setStudents(res.data);
        setLoading(false);
      })

      .catch(function (error) {
        if (error.response) {
          if (error.response) {
            if (error.response.satus === 404) {
              alert(error.response.data.message);
              setLoading(false);
            }
            if (error.response.satus === 500) {
              alert(error.response.data);
              setLoading(false);
            }
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudents({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
    };

    axios
      .patch(`/api/student/${id}`, data)
      .then((res) => {
        alert("Success");

        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.message);
            setLoading(false);
          }

          if (error.response) {
            if (error.response.status === 404) {
              alert(error.response.data.message);
              setLoading(false);
            }
            if (error.response.status === 500) {
              alert(error.response.data);
              setLoading(false);
            }
          }
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(student).length === 0) {
    return (
      <div className="container">
        <h4>No such Student Id Found</h4>
      </div>
    );
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit Students
                  <Link to="/students" className="btn btn-danger float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateStudent}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={student.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.name}</span>
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={student.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.email}</span>
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={student.phone}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.phone}</span>
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentEdit;
