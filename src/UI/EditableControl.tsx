import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { ButtonGroup, Flex, IconButton, useEditableControls } from '@chakra-ui/react'


export default function EditableControl() {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton icon={<CheckIcon />}  aria-label='submit' {...getSubmitButtonProps()}/>
          <IconButton icon={<CloseIcon />} aria-label='cancel' {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='center'>
          <IconButton size='sm' icon={<EditIcon />} aria-label='edit' {...getEditButtonProps()} />
        </Flex>
      )
}
