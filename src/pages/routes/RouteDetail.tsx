import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Input,
  Portal,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import EditableControl from "../../UI/EditableControl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { routesApi } from "../../api/routes";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { Route, routeMethod } from "../../entities/routes/model/routes";
import { useEffect } from "react";
import {
  MessageAlert,
  MessageAlertStatus,
  useAlert,
} from "../../UI/MessageAlert";

function transformObject(
  obj: Record<string, string>
): { key: string; value: string }[] {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

export const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { showAlert: isSuccAlert, show: showSucc } = useAlert();
  const { showAlert: isErrAlert, show: showErr } = useAlert();

  const { register, control, handleSubmit } = useForm<Route>();
  const {
    fields: bodyFields,
    append: appendBody,
    remove: removeBody,
    replace: replaceBody,
  } = useFieldArray({
    control,
    name: "body",
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
    replace: replaceHeader,
  } = useFieldArray({
    control,
    name: "headers",
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["route"],
    queryFn: () => routesApi.getById(id || ""),
  });

  useEffect(() => {
    if (data !== undefined) {
      const tmp_body = transformObject(
        data.body as unknown as { [key: string]: string }
      );
      const tmp_header = transformObject(
        data.headers as unknown as { [key: string]: string }
      );

      replaceBody(tmp_body);
      replaceHeader(tmp_header);
    }
  }, [replaceBody, data, replaceHeader]);

  const mutation = useMutation({
    mutationFn: routesApi.update,
    onSuccess: () => {
      showSucc();
    },
    onError: () => {
      showErr();
    },
  });

  const cancelButtonOnClockHandler = () => navigate(-1);

  const onSubmit = (data: Route) => {
    const transformedBody = data.body?.reduce((acc, currentValue) => {
      if (currentValue.key !== "" && currentValue.value !== "") {
        acc[currentValue.key] = currentValue.value;
      }
      return acc;
    }, {} as Record<string, string>);

    const transformedHeaders = data.headers?.reduce((acc, currentValue) => {
      if (currentValue.key !== "" && currentValue.value !== "") {
        acc[currentValue.key] = currentValue.value;
      }
      return acc;
    }, {} as Record<string, string>);

    const routeData = {
      ...data,
      body: transformedBody as unknown as Record<string, string>[],
      headers: transformedHeaders as unknown as Record<string, string>[],
      id: id as string,
    };

    mutation.mutate(routeData);
  };

  return (
    <Flex
      background={`radial-gradient(circle,
      rgba(38, 47, 40, 1) 13%,
      rgba(14, 34, 25, 1) 100%,
      rgba(20, 56, 43, 1) 100%
    )`}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100vw"}
      minH={"100vh"}
      margin={"auto"}
    >
      <Flex
        color={"#ffff"}
        width={"50%"}
        mx={"auto"}
        minH={"100vh"}
        h={"100%"}
        pt={"15px"}
        bg="#0a1410"
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Heading
          fontFamily={"inherit"}
          fontSize={"50px"}
          color={"#ffff"}
          mb={"15px"}
        >
          Route Detail
        </Heading>

        {isPending && <Text>Loading...</Text>}

        {error && <Text>Fetch error</Text>}
        {data && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"column"} maxW={"80%"} w={"100%"} m={"auto"}>
              <Select
                color="#212121"
                bg={"white"}
                mb={"10px"}
                padding={"5px"}
                {...register("method")}
              >
                {routeMethod.map((item) =>
                  data.method === item.value ? (
                    <option
                      key={item.value}
                      color="#212121"
                      selected
                      value={item.value}
                    >
                      {item.value}
                    </option>
                  ) : (
                    <option color="#212121" value={item.value}>
                      {item.value}
                    </option>
                  )
                )}
              </Select>

              <Editable
                mb={"10px"}
                padding={"5px"}
                width={"100%"}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                textAlign="center"
                defaultValue={data.name}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <Text mr={"10px"}>Name: </Text>
                <EditablePreview mr={"10px"} />
                <Input as={EditableInput} {...register("name")} />
                <EditableControl />
              </Editable>

              <Editable
                mb={"10px"}
                padding={"5px"}
                width={"100%"}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                textAlign="center"
                defaultValue={data.endpoint}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <Text mr={"10px"}>Endpoint: </Text>
                <EditablePreview mr={"10px"} />
                <Input as={EditableInput} {...register("endpoint")} />
                <EditableControl />
              </Editable>

              <Editable
                mb={"10px"}
                padding={"5px"}
                width={"100%"}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                textAlign="center"
                defaultValue={data.status}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <Text mr={"10px"}>Status: </Text>
                <EditablePreview mr={"10px"} />
                <Input as={EditableInput} {...register("status")} />
                <EditableControl />
              </Editable>

              <Editable
                mb={"10px"}
                padding={"5px"}
                width={"100%"}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                textAlign="center"
                defaultValue={(data.timeout as unknown as string) || "0"}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <Text mr={"10px"}>Timeout: </Text>
                <EditablePreview mr={"10px"} />
                <Input as={EditableInput} {...register("timeout")} />
                <EditableControl />
              </Editable>

              <Editable
                mb={"10px"}
                padding={"5px"}
                width={"100%"}
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                textAlign="center"
                defaultValue={data.description}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <Text mr={"10px"}>Description: </Text>
                <EditablePreview mr={"10px"} />
                <Input as={EditableInput} {...register("description")} />
                <EditableControl />
              </Editable>

              <Flex justifyContent={"space-around"}>
                <Text py={"5px"} fontSize={"24px"}>
                  Body
                </Text>
                <Text py={"5px"} fontSize={"24px"}>
                  Headers
                </Text>
              </Flex>

              <Flex justifyContent={"space-between"}>
                <Stack flex={"0 0 48%"} spacing={3}>
                  {bodyFields.map((field, index) => (
                    <Flex
                      flexDirection={"row"}
                      key={field.id}
                      justifyContent={"space-between"}
                    >
                      <Input
                        {...register(`body.${index}.key`)}
                        defaultValue={field.key}
                        placeholder="Key"
                        flex={"0 0 40%"}
                        pr={"5px"}
                      />
                      <Input
                        {...register(`body.${index}.value`)}
                        defaultValue={field.value}
                        placeholder="Value"
                        flex={"0 0 40%"}
                      />
                      <Button
                        flex={"0 0 10%"}
                        type="button"
                        onClick={() => removeBody(index)}
                      >
                        X
                      </Button>
                    </Flex>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendBody({ key: "", value: "" })}
                  >
                    Add body param
                  </Button>
                </Stack>
                <Stack flex={"0 0 48%"} spacing={3}>
                  {headerFields.map((field, index) => (
                    <Flex
                      flexDirection={"row"}
                      key={field.id}
                      justifyContent={"space-between"}
                    >
                      <Input
                        {...register(`headers.${index}.key`)}
                        defaultValue={field.key}
                        placeholder="Key"
                        flex={"0 0 40%"}
                        pr={"5px"}
                      />
                      <Input
                        {...register(`headers.${index}.value`)}
                        defaultValue={field.value}
                        placeholder="Value"
                        flex={"0 0 40%"}
                      />
                      <Button
                        flex={"0 0 10%"}
                        type="button"
                        onClick={() => removeHeader(index)}
                      >
                        X
                      </Button>
                    </Flex>
                  ))}
                  <Button
                    type="button"
                    onClick={() => appendHeader({ key: "", value: "" })}
                  >
                    Add body param
                  </Button>
                </Stack>
              </Flex>
              <Flex justifyContent={"space-between"} mt={"35px"} mb={"100px"}>
                <Button
                  bg={"#0aab37"}
                  color={"#ffff"}
                  flex={"0 0 48%"}
                  type="submit"
                >
                  Edit
                </Button>
                <Button flex={"0 0 48%"} onClick={cancelButtonOnClockHandler}>
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </form>
        )}
      </Flex>
      {isSuccAlert && (
        <Portal>
          <MessageAlert
            title="Route changed successfully!"
            status={MessageAlertStatus.SUCCESS}
          />
        </Portal>
      )}
      {isErrAlert && (
        <Portal>
          <MessageAlert
            title="Error when changing route"
            status={MessageAlertStatus.ERROR}
          />
        </Portal>
      )}
    </Flex>
  );
};
