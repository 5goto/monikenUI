import { useState } from 'react';
import styles from './Collections.module.css';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { NewCollectionForm } from '../../features/collections/NewCollectionForm';
import { Logo } from '../../UI/Logo';
import { AddButton } from '../../UI/AddButton';
import { Search } from '../../UI/Search';
import { useQuery } from '@tanstack/react-query';
import { collectionApi } from '../../api/collection';
import { CollectionControl } from '../../features/collections/ui';
export const Collections = () => {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isPending, error, data } = useQuery({
    queryKey: ['collections'],
    queryFn: collectionApi.getAll,
  });

  const searched = data?.filter((item) => item.name.includes(searchValue));

  return (
    <div className={styles.collections}>
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
            <CollectionControl
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
            />
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
        <AddButton onClickHandler={onOpen}></AddButton>
      </Flex>

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={'rgba(8, 29, 20, .5)'} color={'#ffff'}>
          <DrawerHeader borderBottomWidth="1px">New collection</DrawerHeader>
          <DrawerBody>
            <NewCollectionForm></NewCollectionForm>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Logo str={'Moniken UI'}></Logo>
    </div>
  );
};
