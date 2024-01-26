import { useState } from 'react';
import { CollectionsSlider } from '../features/collections/CollectionsSlider';
import styles from './Collections.module.css';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Collections = () => {
  const [searchValue, setSearchValue] = useState('');

  const mock = [
    { name: 'test1', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test1', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test2', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test3', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test4', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test5', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
    { name: 'test6', description: 'hhgurg gu hurh gu iu jh bu3h9 8hgr' },
  ];

  return (
    <div className={styles.collections}>
      <div>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            color={'#ffff'}
            type="text"
            placeholder="SEARCH"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </InputGroup>
      </div>
      <div></div>
      {/* <CollectionsSlider></CollectionsSlider> */}
      <div></div>
    </div>
  );
};
