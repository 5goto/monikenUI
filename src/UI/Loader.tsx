import { chakra, shouldForwardProp, Container } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Loader = () => {
  return (
    <Container
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={"100vw"}
      flex={"1 1 100%"}
    >
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],

          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bg={"#ffff"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="150px"
        height="150px"
      >
        Moniken UI
      </ChakraBox>
    </Container>
  );
};
