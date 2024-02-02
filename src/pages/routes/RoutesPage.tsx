import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Search } from '../../UI/Search';
import styles from './RoutePage.module.css';
import { AddButton } from '../../UI/AddButton';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteItem } from '../../features/routes/RouteItem';
import { Logo } from '../../UI/Logo';

export const RoutesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { collectionName } = useParams();

  const onClickAddButtonHandler = () => {
    navigate(`/collections/${collectionName}/routes/new`);
  };

  const mock = [
    {
      id: '1',
      name: 'RouteName1',
      endpoint: '/home',
    },
    {
      id: '2',
      name: 'RouteName2',
      endpoint: '/books',
    },
    {
      id: '3',
      name: 'RouteName3',
      endpoint: '/cars/4',
    },
    {
      id: '4',
      name: 'RouteName1',
      endpoint: '/home',
    },
    {
      id: '5',
      name: 'RouteName2',
      endpoint: '/books',
    },
    {
      id: '6',
      name: 'RouteName3',
      endpoint: '/cars/4',
    },
    {
      id: '7',
      name: 'RouteName1',
      endpoint: '/home',
    },
    {
      id: '8',
      name: 'RouteName2',
      endpoint: '/books',
    },
    {
      id: '9',
      name: 'RouteName3',
      endpoint: '/cars/4',
    },
  ];

  const searched = mock.filter((item) => item.name.includes(searchValue));

  return (
    <div className={styles.routes}>
      <Flex
        className={styles.searchInput}
        justifyContent={'center'}
        alignItems={'center'}>
        <Search
          value={searchValue}
          onChangeHandler={(e) => setSearchValue(e.target.value)}></Search>
      </Flex>

      {searched.length > 0 ? (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
          overflow={'auto'}
          overflowX={'hidden'}
          width={'80%'}
          minHeight={'80%'}
          margin={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              width: '0 !important',
            },
            scrollbarWidth: 'none',
          }}>
          {searched.map((item) => (
            <RouteItem
              key={item.id}
              name={item.name}
              endpoint={item.endpoint}></RouteItem>
          ))}
        </Grid>
      ) : (
        <Flex
          flex={'0 0 80%'}
          color={'#ffff'}
          textTransform={'uppercase'}
          fontSize={'50px'}
          className={styles.containerGrid}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}>
          <Text>no matches</Text>
        </Flex>
      )}

      <Flex
        className={styles.addButton}
        justifyContent={'center'}
        alignItems={'center'}>
        <AddButton onClickHandler={onClickAddButtonHandler}></AddButton>
      </Flex>
      <Logo str={'Moniken UI'}></Logo>
    </div>
  );
};