// TODO: answer here
import { Image, Button, Text, Heading, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const [dataCard, setDataCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
      const responseJson = await response.json();
      setDataCard(responseJson.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Link to="/">
        <Button m={2} bg="blackAlpha.400">
          Back
        </Button>
      </Link>
      {isLoading ? (
        <Heading as="h1">Loading...</Heading>
      ) : (
        dataCard.map((card, index) => (
          <Box key={index} mt={5} overflowX={{ xl: "auto", sm: "hidden" }}>
            <Box w={"100%"} display={{ sm: "block", xl: "flex" }} justifyContent="center">
              <Box w={{ sm: "full", xl: "1000px" }} display={{ sm: "block", xl: "flex" }} justifyContent="center">
                <Box display={"flex"} justifyContent={{ sm: "center", xl: "start" }} mr={{ sm: "none", xl: "20px" }}>
                  {card.card_images.map((item, index) => (
                    <Image key={index} maxW="sm" src={item.image_url} alt="" />
                  ))}
                </Box>
                <Box mt={{ sm: 3, xl: 0 }} padding={{ sm: 2, xl: 5 }} boxShadow="xl" bg={"blackAlpha.400"} borderRadius={20}>
                  <Heading textAlign={{ sm: "center", xl: "left" }} as="h2">
                    {card.name}
                  </Heading>
                  <Text>{`Level: ${card.level}`}</Text>
                  <Box display={"flex"}>
                    <Text fontWeight={"bold"} mr={2}>
                      Attribute:
                    </Text>
                    <Text>{card.attribute}</Text>
                  </Box>
                  <Box display={"flex"}>
                    <Text fontWeight={"bold"} mr={2}>
                      Power:
                    </Text>
                    <Text>
                      ATK/{card.atk} DEF/{card.def}
                    </Text>
                  </Box>
                  <Box display={"flex"}>
                    <Text fontWeight={"bold"} mr={2}>
                      Type:
                    </Text>
                    <Text>{`[ ${card.type} / ${card.race} ]`}</Text>
                  </Box>
                  <Text textAlign="justify">
                    <span style={{ fontWeight: "bold" }}>Description:</span> {card.desc}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Heading my={5} textAlign={"center"} fontStyle="bold">
              Card Set
            </Heading>
            <Box display={"flex"} flexWrap="wrap" justifyContent={"center"} mb={10}>
              {/* // nama,pack,code,rarity,price */}
              {card.card_sets.map((cardSet) => (
                <Box w={"400px"} padding={2} mb={5} mr={3} boxShadow="xl" borderRadius={10}>
                  <Text>{`Name: ${cardSet.set_name}`}</Text>
                  <Text>{`Code: ${cardSet.set_code}`}</Text>
                  <Text>{`Rarity: ${cardSet.set_rarity}`}</Text>
                  <Text>{`Price: ${cardSet.set_price}`}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      )}
    </>
  );
}

export default Detail;
