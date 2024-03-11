import { Button, Editable, EditableInput, EditablePreview, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import EditableControl from '../../UI/EditableControl';
import { useQuery } from '@tanstack/react-query';
import { routesApi } from '../../api/routes';
import { useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { Route } from '../../entities/routes/model/routes';

export const RouteDetail = () => {

  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['collections'],
    queryFn: () => routesApi.getById(id || ''),
  });

  const { register, control, handleSubmit, reset } = useForm<Route>();
  const {
    fields: bodyFields,
    append: appendBody,
    remove: removeBody,
  } = useFieldArray({
    control,
    name: 'body',
  });

  // const {
  //   fields: headerFields,
  //   append: appendHeader,
  //   remove: removeHeader,
  // } = useFieldArray({
  //   control,
  //   name: 'headers',
  // });
  

  return (
    <Flex
      background={`radial-gradient(circle,
      rgba(38, 47, 40, 1) 13%,
      rgba(14, 34, 25, 1) 100%,
      rgba(20, 56, 43, 1) 100%
    )`}
      flexDirection={'column'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
      margin={'auto'}>
      <Flex
        color={'#ffff'}
        width={'50%'}
        mx={'auto'}
        minH={'100vh'}
        h={'100%'}
        pt={'15px'}
        bg="#0a1410"
        flexDirection={'column'}
        alignItems={'center'}>
        <Heading fontFamily={'inherit'} fontSize={'50px'} color={'#ffff'}>
          Route Detail
        </Heading>

        {isPending && <Text>Loading...</Text>}

        {error && <Text>Fetch error</Text>}
        { data &&
        <Flex direction={'column'} maxW={'80%'} w={'100%'}>
          <div>
            <Editable
              width={'100%'}
              justifyContent={'space-between'}
              display={'flex'}
              alignItems={'center'}
                textAlign='center'
                defaultValue={data.name}
                fontSize='2xl'
                isPreviewFocusable={false}
              >
                <Text mr={'10px'}>Name: </Text>
                <EditablePreview mr={'10px'}/>
                <Input as={EditableInput} />
                <EditableControl />
            </Editable>
          </div>

          <div>
            <Editable
              width={'100%'}
              justifyContent={'space-between'}
              display={'flex'}
              alignItems={'center'}
                textAlign='center'
                defaultValue={data.endpoint}
                fontSize='2xl'
                isPreviewFocusable={false}
              >
                <Text mr={'10px'}>Endpoint: </Text>
                <EditablePreview mr={'10px'}/>
                <Input as={EditableInput} />
                <EditableControl />
            </Editable>
          </div>

          <div>
            <Editable
              width={'100%'}
              justifyContent={'space-between'}
              display={'flex'}
              alignItems={'center'}
                textAlign='center'
                defaultValue={data.status}
                fontSize='2xl'
                isPreviewFocusable={false}
              >
                <Text mr={'10px'}>Status: </Text>
                <EditablePreview mr={'10px'}/>
                <Input as={EditableInput} />
                <EditableControl />
            </Editable>
          </div>

          <div>
            <Editable
              width={'100%'}
              justifyContent={'space-between'}
              display={'flex'}
              alignItems={'center'}
                textAlign='center'
                defaultValue={data.timeout as unknown as string || '0'}
                fontSize='2xl'
                isPreviewFocusable={false}
              >
                <Text mr={'10px'}>Timeout: </Text>
                <EditablePreview mr={'10px'}/>
                <Input as={EditableInput} />
                <EditableControl />
            </Editable>
          </div>

          <div>
            <Editable
              width={'100%'}
              justifyContent={'space-between'}
              display={'flex'}
              alignItems={'center'}
                textAlign='center'
                defaultValue={data.description}
                fontSize='2xl'
                isPreviewFocusable={false}
              >
                <Text mr={'10px'}>Description: </Text>
                <EditablePreview mr={'10px'}/>
                <Input as={EditableInput} />
                <EditableControl />
            </Editable>
          </div>
          <Stack flex={'0 0 48%'} spacing={3}>
            {bodyFields.map((field, index) => (
              <Flex
                flexDirection={'row-reverse'}
                key={field.id}
                justifyContent={'space-between'}>
                <Input
                  {...register(`body.${index}.key`)}
                  defaultValue={field.key}
                  placeholder="Key"
                  flex={'0 0 40%'}
                  pr={'5px'}
                />
                <Input
                  {...register(`body.${index}.value`)}
                  defaultValue={field.value}
                  placeholder="Value"
                  flex={'0 0 40%'}
                />
                <Button
                  flex={'0 0 10%'}
                  type="button"
                  onClick={() => removeBody(index)}>
                  X
                </Button>
              </Flex>
            ))}
            <Button
              type="button"
              onClick={() => appendBody({ key: '', value: '' })}>
              Add body param
            </Button>
          </Stack>
        </Flex>

        }
      </Flex>
    </Flex>
  );
};
