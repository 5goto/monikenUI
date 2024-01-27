import styles from './Main.module.css';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../UI/Logo';

export const Main = () => {
  const navigate = useNavigate();
  const onClickHandler = () => navigate('collections');

  return (
    <div className={styles.main}>
      <Flex
        onClick={onClickHandler}
        _hover={{
          background: 'rgba(8, 29, 20, 0.85)',
          maxWidth: '100%',
          transition: 'max-width 0.6s ease-in-out',
        }}
        cursor="pointer"
        justifyContent="center"
        width="100%"
        minWidth={'300px'}
        maxWidth={'400px'}
        height="15%"
        backgroundColor={'#222222'}
        alignItems="center"
        background="rgba(8,29,20, .15)"
        border="2px solid #081d14"
        borderRadius="5px"
        position="relative"
        transition="max-width 0.3s ease-in-out">
        <h1>Collections</h1>
      </Flex>
      <Logo str={'Moniken UI'}></Logo>
    </div>
  );
};
