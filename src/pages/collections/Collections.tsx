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
import { CollectionItem } from '../../features/collections/CollectionItem';
import { NewCollectionForm } from '../../features/collections/NewCollectionForm';
import { Logo } from '../../UI/Logo';
import { AddButton } from '../../UI/AddButton';
import { Search } from '../../UI/Search';
export const Collections = () => {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mock = [
    {
      id: '1',
      name: 'test1',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '2',
      name: 'test2',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '3',
      name: 'test3',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '4',
      name: 'test4',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '5',
      name: 'test5',
      description:
        'hhgurg gu hurh gu iu jh bu3h9 8hgr hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '6',
      name: 'test6',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '7',
      name: 'test7',
      description:
        'hhgurg gu hurh gu iu jh bu3h9 8hgr hhgurg gu hurh gu iu jh bu3h9 8hgr hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
    {
      id: '8',
      name: 'test8',
      description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr',
    },
  ];

  const searched = mock.filter((item) => item.name.includes(searchValue));

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
            <CollectionItem
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
