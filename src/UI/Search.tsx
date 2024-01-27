import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

interface SearchProps {
  value: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ value, onChangeHandler }) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        color={'#ffff'}
        type="text"
        placeholder="SEARCH"
        value={value}
        onChange={onChangeHandler}
      />
    </InputGroup>
  );
};
