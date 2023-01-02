import React, { Component, useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_GANTT_DATA } from "../GraphQL/Queries";
import {
  ADD_GANTT,
  UPDATE_GANTT,
  DELETE_GANTT,
} from "../../Middleware/GraphQL/mutations";

export default function TestQuery() {
  const { error, loading, data } = useQuery(GET_GANTT_DATA);
  const [ganttdata, setGantt] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("Data Ready");
      setGantt(data.gantt.data);
      console.log(data.gantt.data);
    } else {
      console.log("No data");
    }
    console.log("USE EFFECT");
  }, [data]);
  return <div>{ganttdata}</div>;
}
