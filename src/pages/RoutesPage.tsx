import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Search } from '../UI/Search';
import styles from './RoutePage.module.css';
import { AddButton } from '../UI/AddButton';

export const RoutesPage = () => {
  const [searchValue, setSearchValue] = useState('');

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
            <div key={item.id}>
              {item.id} | {item.name} | {item.endpoint}
            </div>
          ))}
        </Grid>
      ) : (
        <Flex
          className={styles.containerGrid}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text>no matches</Text>
        </Flex>
      )}

      <Flex
        className={styles.addButton}
        justifyContent={'center'}
        alignItems={'center'}>
        <AddButton onClickHandler={() => {}}></AddButton>
      </Flex>
    </div>
  );
};
