import { Flex, IconButton, Text, Tooltip, useToast } from "@chakra-ui/react";
import { ArrowRightIcon, InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import { useAppContext } from "../store/useAppContext";

export const NavBar = (): JSX.Element => {
  const { state, dispatch, disclosure } = useAppContext();

  const toast = useToast();

  return (
    <Flex
      flexDirection={"row"}
      alignItems={"center"}
      borderBottom={"1px solid #d3d6da"}
      height={"60px"}
      justifyContent={"space-between"}
      padding={10}
    >
      <Text
        fontSize={"lg"}
        as={"b"}
        onDoubleClick={() => {
          toast({ title: state.answer, isClosable: true });
        }}
      >
        Wordle
      </Text>
      <Flex gap={1}>
        <Tooltip label="Reset">
          <IconButton
            aria-label="reset game"
            icon={<RepeatIcon />}
            onClick={() => dispatch({ type: "RESET" })}
          />
        </Tooltip>
        <Tooltip label="Next">
          <IconButton
            aria-label="next game"
            icon={<ArrowRightIcon />}
            onClick={() => {
              dispatch({ type: "NEXT_GAME" });
              toast({
                title: "New Word generated",
                isClosable: true,
                position: "top",
              });
            }}
          />
        </Tooltip>
        <Tooltip label="Stats">
          <IconButton
            aria-label="reset game"
            icon={<InfoIcon />}
            onClick={() => disclosure?.onOpen()}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
