import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import monImg from '../../assets/mon.png';

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

    const routeData = { ...data, body: transformedBody };
    console.log(routeData);
  };

  const cancelButtonOnClockHandler = () => navigate(-1);

  return (
    <Flex
      background={`url(${monImg})`}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
      width={'50%'}
      margin={'auto'}
      minH={'100%'}
      backgroundColor={'#777777'}
      flexDirection={'column'}
      alignItems={'center'}>
      <Text fontSize={'50px'} color={'#ffff'}>
        New route
      </Text>

      <form
        style={{ color: '#ffff', maxWidth: '70%', width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}>
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
                flex={'0 0 48%'}
                {...register('timeout')}
                id="timeout"
                placeholder="0 ms"
              />
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent={'space-between'}>
          <Stack flex={'0 0 48%'} spacing={3}>
            {bodyFields.map((field, index) => (
              <div key={field.id}>
                <Input
                  {...register(`body.${index}.key`)}
                  defaultValue={field.key}
                  placeholder="Key"
                />
                <Input
                  {...register(`body.${index}.value`)}
                  defaultValue={field.value}
                  placeholder="Value"
                />
                <Button type="button" onClick={() => removeBody(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendBody({ key: '', value: '' })}>
              Add body param
            </Button>
          </Stack>

          <Stack flex={'0 0 48%'} spacing={3}>
            {headerFields.map((field, index) => (
              <div key={field.id}>
                <Input
                  {...register(`headers.${index}.key`)}
                  defaultValue={field.key}
                  placeholder="Key"
                />
                <Input
                  {...register(`headers.${index}.value`)}
                  defaultValue={field.value}
                  placeholder="Value"
                />
                <Button type="button" onClick={() => removeHeader(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendHeader({ key: '', value: '' })}>
              Add header
            </Button>
          </Stack>
        </Flex>

        <Textarea {...register('description')} placeholder="Lorem ipsum" />

        <Button type="submit">Create</Button>
        <Button onClick={cancelButtonOnClockHandler}>Cancel</Button>
      </form>
    </Flex>
  );
};
