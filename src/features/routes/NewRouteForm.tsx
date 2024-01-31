import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import monImg from '../../assets/mon.png';
import { useState } from 'react';
import get from '../../assets/optionsRadio/get.png';
import post from '../../assets/optionsRadio/post.png';
import put from '../../assets/optionsRadio/put.png';
import patch from '../../assets/optionsRadio/patch.png';
import deleteImg from '../../assets/optionsRadio/delete.png';
import headImg from '../../assets/optionsRadio/head.png';

interface Route {
  name: string;
  endpoint: string;
  method: string;
  status: string;
  body: { key: string; value: string }[];
  headers: { key: string; value: string }[];
  timeout: number;
  description: string;
}

export const NewRouteForm = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm<Route>();
  const {
    fields: bodyFields,
    append: appendBody,
    remove: removeBody,
  } = useFieldArray({
    control,
    name: 'body',
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({
    control,
    name: 'headers',
  });

  const onSubmit = (data: Route) => {
    const transformedBody = data.body.reduce((acc, currentValue) => {
      acc[currentValue.key] = currentValue.value;
      return acc;
    }, {} as Record<string, string>);

    const routeData = { ...data, body: transformedBody, method: selectedValue };

    console.log(routeData);
  };

  const cancelButtonOnClockHandler = () => navigate(-1);

  const [selectedValue, setSelectedValue] = useState<string>('GET');
  const options = [
    { value: 'GET', label: 'GET', image: get },
    { value: 'POST', label: 'POST', image: post },
    { value: 'PUT', label: 'PUT', image: put },
    { value: 'PATCH', label: 'PATCH', image: patch },
    { value: 'DELETE', label: 'DELETE', image: deleteImg },
    { value: 'HEAD', label: 'HEAD', image: headImg },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Flex
      background={`url(${monImg})`}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      width={'50%'}
      mx={'auto'}
      minH={'100vh'}
      h={'100%'}
      pt={'15px'}
      backgroundColor={'#777777'}
      flexDirection={'column'}
      alignItems={'center'}>
      <Heading fontFamily={'inherit'} fontSize={'50px'} color={'#ffff'}>
        New route
      </Heading>

      <form
        style={{ color: '#ffff', maxWidth: '70%', width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup color={'#ffff'}>
          <HStack spacing="24px">
            {options.map((option) => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginBottom: '10px',
                }}>
                <img
                  src={option.image}
                  alt={option.label}
                  style={{
                    minWidth: '70px',
                    height: '70px',
                    marginRight: '10px',
                  }}
                />
                <Text
                  color={selectedValue === option.label ? '#0aab37' : 'white'}>
                  {option.label}
                </Text>
                <input
                  type="radio"
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleRadioChange(option.value)}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    height: 0,
                    width: 0,
                  }}
                />
              </label>
            ))}
          </HStack>
        </RadioGroup>

        <Flex justifyContent={'space-between'} py={'15px'}>
          <Flex width={'100%'} justifyContent={'space-between'}>
            <FormControl flex="0 0 48%">
              <FormLabel fontSize={'24px'} htmlFor="name">
                Name
              </FormLabel>
              <Input
                flex={'0 0 48%'}
                {...register('name')}
                id="name"
                placeholder="Name"
              />
            </FormControl>

            <FormControl flex="0 0 48%">
              <FormLabel
                textAlign={'right'}
                fontSize={'24px'}
                htmlFor="endpoint">
                Endpoint
              </FormLabel>
              <Input
                flex={'0 0 48%'}
                {...register('endpoint')}
                id="endpoint"
                placeholder="Endpoint"
              />
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent={'space-between'} py={'15px'}>
          <Flex width={'100%'} justifyContent={'space-between'}>
            <FormControl flex="0 0 48%">
              <FormLabel fontSize={'24px'} htmlFor="status">
                Status
              </FormLabel>
              <Input
                flex={'0 0 48%'}
                {...register('status')}
                id="status"
                placeholder="200"
              />
            </FormControl>

            <FormControl flex="0 0 48%">
              <FormLabel
                textAlign={'right'}
                fontSize={'24px'}
                htmlFor="timeout">
                Timeout
              </FormLabel>
              <Input
                type="number"
                flex={'0 0 48%'}
                {...register('timeout')}
                id="timeout"
                placeholder="0 ms"
              />
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent={'space-between'}>
          <Text py={'5px'} fontSize={'24px'}>
            Body
          </Text>
          <Text py={'5px'} fontSize={'24px'}>
            Headers
          </Text>
        </Flex>
        <Flex justifyContent={'space-between'}>
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

          <Stack flex={'0 0 48%'} spacing={3}>
            {headerFields.map((field, index) => (
              <Flex key={field.id} justifyContent={'space-between'}>
                <Input
                  {...register(`headers.${index}.key`)}
                  defaultValue={field.key}
                  placeholder="Key"
                  flex={'0 0 40%'}
                  pr={'5px'}
                />
                <Input
                  {...register(`headers.${index}.value`)}
                  defaultValue={field.value}
                  placeholder="Value"
                  flex={'0 0 40%'}
                />
                <Button
                  flex={'0 0 10%'}
                  type="button"
                  onClick={() => removeHeader(index)}>
                  X
                </Button>
              </Flex>
            ))}
            <Button
              type="button"
              onClick={() => appendHeader({ key: '', value: '' })}>
              Add header
            </Button>
          </Stack>
        </Flex>

        <FormControl py={'15px'}>
          <FormLabel fontSize={'24px'} htmlFor="description">
            Description
          </FormLabel>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Lorem ipsum"
          />
        </FormControl>

        <Flex justifyContent={'space-between'} mt={'25px'} mb={'100px'}>
          <Button bg={'#0aab37'} color={'#ffff'} flex={'0 0 48%'} type="submit">
            Create
          </Button>
          <Button flex={'0 0 48%'} onClick={cancelButtonOnClockHandler}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
