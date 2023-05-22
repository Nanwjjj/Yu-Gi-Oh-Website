import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import Cards from "./Cards";
function Home() {
  // TODO: answer here
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4");
      const responseJson = await response.json();
      if (sort === false) {
        let coba = responseJson.data.sort((a, b) => a.name.localeCompare(b.name));
        setData(coba);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  function sortData(type) {
    if (type === "Name" || type === "") {
      let coba = data.sort((a, b) => a.name.localeCompare(b.name));
      setData(coba);
      setSort(!sort);
    } else if (type === "Attack") {
      let coba = data.sort((a, b) => a.atk - b.atk);
      setData(coba);
      setSort(!sort);
    } else {
      let coba = data.sort((a, b) => a.def - b.def);
      setData(coba);
      setSort(!sort);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Box my={5} display={"flex"} justifyContent="center">
            <Select
              w={"50%"}
              name="sort"
              placeholder="Select option"
              onChange={(e) => {
                sortData(e.target.value);
              }}
            >
              <option value="Name">Name</option>
              <option value="Attack">Attack</option>
              <option value="Defence">Defence</option>
            </Select>
          </Box>
          <Cards card={data} />
        </>
      )}
    </>
  );
}

export default Home;
