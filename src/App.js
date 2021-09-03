import React, { useState, useEffect, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@material-ui/core/TextField";
import { CSVLink } from "react-csv";
import { TablePagination } from "react-pagination-table";
import { useTable, usePagination } from "react-table";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

import data from "./playlist";

const myData = data.id;
let obj;
let currentIndex = 0;
var tableHeaders;
var tableValues;
var isSet = false;
//var valueArray;
let count = 1;

const pagination = (activePage, setActivePage, valueArray) => {
  let active = 1;
  const items = [];
  for (let number = 1; number <= valueArray.length / 10; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return items;
};

function App() {
  console.log("app load");

  const [valueArray, setData] = useState([]);
  const [activePage, setActivePage] = useState();

  const [searchFilter, setsearchFilter] = useState("");

  const [newHook, setHook] = useState();

  const getData = () => {
    fetch("playlist.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function(response) {
        console.log("Response=", response);
        return response.json();
      })
      .then(function(myJson) {
        console.log("My Json= ", myJson);
        var valueArrayCopy = new Array();
        tableHeaders = Object.keys(myJson);
        tableValues = Object.values(myJson);
        for (let i = 0; i < 100; i++) {
          valueArrayCopy.push([]);
          for (let j = 0; j < tableValues.length; j++) {
            valueArrayCopy[i][j] = tableValues[j][i];
          }
        }
        setData(valueArrayCopy);
      });
  };

  useEffect(() => {
    getData();
    setActivePage(1);
  }, []);

  //valueArray = data;
  console.log("data ", data);
  console.log("valueArray", valueArray);

  let active = 1;
  let items = [];

  let number = 0;
  return (
    <div className="App">
      <p>
        <TextField
          id="textSong"
          label=""
          style={{ margin: 8 }}
          placeholder="Search Rows"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button
          type="button"
          onClick={() => {
            setsearchFilter(document.getElementById("textSong").value);
          }}
        >
          Get Song
        </button>
      </p>

      <div>
        <br />
      </div>
      <Table id="sortTable">
        <thead>
          <tr>
            <th>Index</th>
            {tableHeaders &&
              tableHeaders.map((header, index) => {
                return (
                  <th>
                    <button
                      type="button"
                      onClick={() => {
                        const newValueArr = valueArray.sort((a, b) => {
                          console.log("TYPE ", typeof a[index]);
                          if (typeof a[index] == "number") {
                            return a[index] - b[index];
                          } else {
                            return (
                              a[index].charCodeAt(0) - b[index].charCodeAt(0)
                            );
                          }
                        });
                        console.log("New ValueArr", newValueArr);
                        setData(newValueArr);
                        count++;
                        setHook(count);

                        console.log(
                          "Value Array after updating New ValueArr",
                          valueArray
                        );
                        //App();
                      }}
                    >
                      {header}
                    </button>
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {valueArray &&
            valueArray
              .slice(10 * (activePage - 1), 10 * (activePage - 1) + 10)
              .filter((row) => {
                if (
                  row &&
                  row[1] &&
                  row[1]
                    .toString()
                    .toLowerCase()
                    .includes(searchFilter)
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((row, idx) => {
                return (
                  <tr>
                    <td>{10 * (activePage - 1) + idx}</td>
                    {row.map((elem) => (
                      <td>{elem}</td>
                    ))}
                  </tr>
                );
              })}
          );
          <CSVLink data={valueArray}>Download me</CSVLink>
        </tbody>
      </Table>
      <Pagination>
        {pagination(activePage, setActivePage, valueArray)}
      </Pagination>
    </div>
  );
}

export default App;
