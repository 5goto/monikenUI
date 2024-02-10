import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Search } from '../../UI/Search';
import styles from './RoutePage.module.css';
import { AddButton } from '../../UI/AddButton';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../../UI/Logo';
import { useQuery } from '@tanstack/react-query';
import { routesApi } from '../../api/routes';
import { RouteControl } from '../../features/routes/ui';

export const RoutesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { collectionName } = useParams();

  const onClickAddButtonHandler = () => {
    navigate(`/collections/${collectionName}/routes/new`);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['routes'],
    queryFn: routesApi.getAll,
  });

  const searched = data?.filter((item) => item.name.includes(searchValue));

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

      {isPending && (
        <Flex
          className={styles.containerGrid}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text>loading...</Text>
        </Flex>
      )}
      {error && (
        <Flex
          className={styles.containerGrid}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text>error</Text>
        </Flex>
      )}
      {searched && searched.length > 0 ? (
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
            <RouteControl
              key={item.id}
              id={item.id}
              name={item.name}
              endpoint={item.endpoint}></RouteControl>
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

export default RoutesPage as React.FC;
