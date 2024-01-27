import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

export interface AddButtonProps {
  onClickHandler: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClickHandler }) => {
  return (
    <Flex
      _hover={{ backgroundColor: '#081D14', color: '#ffff' }}
      onClick={onClickHandler}
      cursor={'pointer'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'#ffff'}
      borderRadius={'50px'}
      height={'50px'}
      width={'50px'}>
      <AddIcon></AddIcon>
    </Flex>
  );
};
