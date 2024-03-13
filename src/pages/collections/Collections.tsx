import { useState } from "react";
import styles from "./Collections.module.css";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NewCollectionForm } from "../../features/collections/NewCollectionForm";
import { Logo } from "../../UI/Logo";
import { AddButton } from "../../UI/AddButton";
import { Search } from "../../UI/Search";
import { useQuery } from "@tanstack/react-query";
import { collectionApi } from "../../api/collection";
import { CollectionControl } from "../../features/collections/ui";
import { useNavigate } from "react-router-dom";
export const Collections = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["collections"],
    queryFn: collectionApi.getAll,
  });

  const searched = data?.filter((item) => item.name.includes(searchValue));

  return (
    <div className={styles.collections}>
      <Flex
        className={styles.searchInput}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Search
          value={searchValue}
          onChangeHandler={(e) => setSearchValue(e.target.value)}
        ></Search>
      </Flex>
      {isPending && (
        <Flex
          className={styles.containerGrid}
          overflow={"auto"}
          overflowX={"hidden"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"80%"}
          minHeight={"7 0%"}
          margin={"auto"}
        >
          <Text>loading...</Text>
        </Flex>
      )}
      {error && (
        <Flex
          className={styles.containerGrid}
          overflow={"auto"}
          overflowX={"hidden"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"80%"}
          minHeight={"70%"}
          margin={"auto"}
        >
          <Text>error</Text>
        </Flex>
      )}
      {searched && searched.length > 0 && !isPending && !error && (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          overflow={"auto"}
          overflowX={"hidden"}
          width={"80%"}
          minHeight={"70%"}
          margin={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0 !important",
            },
            scrollbarWidth: "none",
          }}
        >
          <GridItem
            onClick={() => navigate("/routes")}
            cursor={"pointer"}
            w="100%"
            h="50%"
            color={"#ffff"}
            border={"3px solid #ffff"}
            backgroundColor={"rgba(255, 255, 255, .5)"}
            bgGradient="linear(to-r, #17271f, #374c3c)"
            borderRadius={"5px"}
            _hover={{
              boxShadow: `0 0 10px 5px rgba(8, 29, 20, .9),
      inset 0 0 10px 5px rgba(8, 29, 20, .9)`,
            }}
          >
            <Flex
              position={"relative"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Text
                textAlign={"center"}
                textTransform={"uppercase"}
                fontSize={"3rem"}
              >
                [All routes]
              </Text>
            </Flex>
          </GridItem>
          {searched.map((item) => (
            <CollectionControl
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
            />
          ))}
        </Grid>
      )}{" "}
      {!isPending && !error && searched && searched.length === 0 && (
        <Flex
          flex={"0 0 70%"}
          color={"#ffff"}
          textTransform={"uppercase"}
          fontSize={"50px"}
          className={styles.containerGrid}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>no matches</Text>
        </Flex>
      )}
      <Flex
        className={styles.addButton}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AddButton onClickHandler={onOpen}></AddButton>
      </Flex>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={"rgba(8, 29, 20, 1)"} color={"#ffff"}>
          <DrawerHeader borderBottomWidth="1px">New collection</DrawerHeader>
          <DrawerBody>
            <NewCollectionForm></NewCollectionForm>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Logo str={"Moniken UI"}></Logo>
    </div>
  );
};
