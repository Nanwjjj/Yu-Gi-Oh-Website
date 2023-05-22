import React from "react";
import { Image, Text, Heading, Box, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Cards = ({ card }) => {
  console.log(card);
  return (
    <SimpleGrid display={"flex"} justifyContent={"center"} style={{ flexWrap: "wrap" }}>
      {card.map((kartu, index) => (
        <Link key={index} to={`/card/${kartu.id}`}>
          <Box className="yugioh-card">
            {kartu.card_images.map((item, index) => (
              <Image m={2} key={index} w={"350px"} src={item.image_url} alt="" />
            ))}
            <Box>
              <Heading w={"350px"} as="h2" fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
                {kartu.name}
              </Heading>
              <Box padding={2} bg="gray.200" borderRadius={10} mx={2}>
                <Text fontWeight={"medium"}>{`${kartu.type} / ${kartu.race}`}</Text>
                <Text fontWeight={"medium"}>{`ATK: ${kartu.atk} DEF: ${kartu.def}`}</Text>
                <Text fontWeight={"medium"}>{`Level: ${kartu.level}`}</Text>
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default Cards;
