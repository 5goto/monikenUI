import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';

interface EditableInputWrapperProps {
  defaultValue: string;
  placeholder: string;
}

export const EditableInputWrapper: React.FC<EditableInputWrapperProps> = ({
  defaultValue,
  placeholder,
}) => {
  return (
    <Editable defaultValue={defaultValue} placeholder={placeholder}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  );
};
