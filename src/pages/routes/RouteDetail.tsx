import { Flex, Heading } from '@chakra-ui/react';

export const RouteDetail = () => {
  return (
    <Flex
      background={`radial-gradient(circle,
      rgba(38, 47, 40, 1) 13%,
      rgba(14, 34, 25, 1) 100%,
      rgba(20, 56, 43, 1) 100%
    )`}
      flexDirection={'column'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
      margin={'auto'}>
      <Flex
        color={'#ffff'}
        width={'50%'}
        mx={'auto'}
        minH={'100vh'}
        h={'100%'}
        pt={'15px'}
        bg="#0a1410"
        flexDirection={'column'}
        alignItems={'center'}>
        <Heading fontFamily={'inherit'} fontSize={'50px'} color={'#ffff'}>
          Route Detail
        </Heading>
        <form></form>
      </Flex>
    </Flex>
  );
};
