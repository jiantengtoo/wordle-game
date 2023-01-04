import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Square,
  Text,
} from "@chakra-ui/react";
import { getStats } from "../store/Stats";
import { useAppContext } from "../store/useAppContext";

const StatBox = ({
  topText,
  btmText,
}: {
  topText: string;
  btmText: string;
}) => {
  return (
    <Square padding={2} display={"block"} maxW={"74px"} minHeight={"78px"}>
      <Center>
        <Text as={"b"} fontSize={"xl"}>
          {topText}
        </Text>
      </Center>
      <Text fontSize={"2xs"} textAlign={"center"}>
        {btmText}
      </Text>
    </Square>
  );
};

export const StatsModal = (): JSX.Element => {
  const { disclosure } = useAppContext();

  if (!disclosure) return <></>;

  const { isOpen, onClose } = disclosure;

  const stats = getStats();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <StatBox
                topText={stats.gamePlayed.toString()}
                btmText={"Played"}
              />
              <StatBox
                topText={((stats.wins / (stats.wins + stats.loses)) * 100)
                  .toFixed()
                  .toString()}
                btmText={"Win %"}
              />
              <StatBox
                topText={stats.currentStreak.toString()}
                btmText={"Current Streak"}
              />
              <StatBox
                topText={stats.maxStreak.toString()}
                btmText={"Current Streak"}
              />
            </Center>
            <Center>
              <Text>Guess Distribution</Text>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
