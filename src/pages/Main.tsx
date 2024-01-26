import styles from './Main.module.css';
import { Flex, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();
  const onClickHandler = () => navigate('collections');

  return (
    <div className={styles.main}>
      <Flex
        onClick={onClickHandler}
        _hover={{ background: 'rgba(8, 29, 20, 0.85)' }}
        cursor="pointer"
        justifyContent="center"
        width="22%"
        height="15%"
        backgroundColor={'#222222'}
        alignItems="center"
        background="rgba(8,29,20, .15)"
        border="2px solid #081d14"
        borderRadius="5px"
        position="relative">
        <Flex position="absolute" top="5px" left="5px" alignItems="center">
          <Icon
            as={CheckCircleIcon}
            color="green"
            paddingLeft="5px"
            paddingRight="5px"></Icon>
          <p>Online</p>
        </Flex>
        <h1>Collections</h1>
      </Flex>
    </div>
  );
};
