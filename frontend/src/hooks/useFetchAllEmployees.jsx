import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees, setLoading, setError } from "../redux/employeeSlice";
import axios from "axios";

const useFetchEmployees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("http://localhost:5000/employee/get", {
          withCredentials: true,
        });
        dispatch(setEmployees(res.data.employees));
      } catch (err) {
        console.log(err)
      }
    };

    fetchEmployees();
  }, [dispatch]);
};

export default useFetchEmployees;
