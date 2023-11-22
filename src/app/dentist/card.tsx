"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  Divider,
  Editable,
  forwardRef,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Link as CLink } from "@chakra-ui/react";
import {
  FaCheck,
  FaCross,
  FaHospital,
  FaImage,
  FaMap,
  FaPhone,
  FaTrash,
  FaUserDoctor,
} from "react-icons/fa6";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useRef, useState } from "react";
import { Dentist } from "@/lib/dentist.schema";

export type DentistCardProps = {
  dentist: Dentist;
  isAdminCtrl?: boolean;
};

const DentistCard = forwardRef<DentistCardProps, "div">((props, ref) => {
  const { dentist, isAdminCtrl, ...rest } = props;
  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <EditDentistCard
      dentist={dentist}
      closeEditMode={() => setEditMode(false)}
      isAdminCtrl={isAdminCtrl}
      {...rest}
    />
  ) : (
    <DisplayDentistCard
      dentist={dentist}
      openEditMode={() => setEditMode(true)}
      isAdminCtrl={isAdminCtrl}
      {...rest}
    />
  );
});

function DisplayBody(props: { dentist: Dentist }) {
  const { name, hospital, expertist, address, tel, picture } = props.dentist;

  return (
    <>
      <h3 className="font-semibold text-xl mb-1">{name}</h3>
      <HStack className="flex justify-between  w-full flex-wrap ">
        <Image
          src={picture}
          alt="Dentist Picture"
          width={128}
          height={128}
          className="rounded-full m-auto"
        />
        <div className="flex flex-col text-md gap-1 text-left m-auto">
          <span>
            <FaHospital className="inline mr-2" size={16} />
            {hospital}
          </span>
          <span>
            <FaUserDoctor className="inline mr-2" size={16} />
            {expertist}
          </span>
          <CLink
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              address,
            )}`}
            target="_blank"
            isExternal
          >
            <FaMap className="inline mr-2" size={16} />
            {address}
            <FaExternalLinkAlt className="ml-1 inline text-gray-600" size={9} />
          </CLink>
          {tel ? (
            <CLink href={`tel:${tel}`} isExternal>
              <FaPhone className="inline mr-2" size={16} />
              {tel}
              <FaExternalLinkAlt
                className="ml-1 inline text-gray-600"
                size={9}
              />
            </CLink>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </HStack>
    </>
  );
}

type DisplayDentistCard = {
  dentist: Dentist;
  isAdminCtrl?: boolean;
  openEditMode: () => void;
};

function DisplayDentistCard(props: DisplayDentistCard) {
  const { dentist, isAdminCtrl, openEditMode, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card variant="outline" rounded={16} {...rest}>
      <CardBody>
        <VStack>
          <DisplayBody dentist={dentist} />
          {isAdminCtrl && (
            <>
              <Divider />

              <div className="w-full mx-16 flex flex-row justify-evenly mt-2">
                <Button
                  className="w-36 border-2 border-black"
                  variant="solid"
                  leftIcon={<FaEdit />}
                  colorScheme="blue"
                  onClick={() => openEditMode()}
                >
                  Edit
                </Button>
                <Button
                  className="w-36 border-2 border-black"
                  variant="solid"
                  leftIcon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => onOpen()}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </VStack>
      </CardBody>

      <DeleteDialog isOpen={isOpen} onClose={onClose} dentist={dentist} />
    </Card>
  );
}

type EditDentistCardProps = {
  dentist: Dentist;
  isAdminCtrl?: boolean;
  closeEditMode: () => void;

  action?: string | ((formData: FormData) => void);
};

export function EditDentistCard(props: EditDentistCardProps) {
  const { dentist, isAdminCtrl, closeEditMode, action, ...rest } = props;

  return (
    <Card variant="outline" rounded={16} {...rest} as="form" action={action}>
      <CardBody>
        <VStack>
          <EditBody dentist={dentist} />

          {isAdminCtrl && (
            <>
              <Divider />

              <div className="w-full mx-16 flex flex-row justify-evenly mt-2">
                <>
                  <Button
                    className="w-36 border-2 border-black"
                    variant="solid"
                    leftIcon={<AiOutlineClose />}
                    colorScheme="red"
                    onClick={() => closeEditMode()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-36 border-2 border-black"
                    variant="solid"
                    leftIcon={<AiOutlineCheck />}
                    colorScheme="green"
                    type="submit"
                  >
                    Save
                  </Button>
                </>
              </div>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}

export const EditBody = forwardRef<{ dentist?: Partial<Dentist> }, "form">(
  (props) => {
    const { name, hospital, expertist, address, tel, picture } =
      props.dentist ?? {};

    return (
      <>
        <Input
          className="font-semibold text-xl mb-1"
          defaultValue={name}
          name="name"
        />
        <HStack className="flex justify-between  w-full flex-wrap ">
          {/* <Image
            src={picture}
            alt="Dentist Picture"
            width={128}
            height={128}
            className="rounded-full m-auto"
          /> */}

          <div className="flex flex-col text-md gap-1 text-left m-auto">
            <InputGroup>
              <InputLeftElement>
                <Tooltip label="Picture Url">
                  <FaImage className="inline mr-2" size={16} />
                </Tooltip>
              </InputLeftElement>
              <Input
                variant="flushed"
                defaultValue={picture}
                className="inline"
                name="picture"
                type="url"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Tooltip label="Hospital">
                  <FaHospital className="inline mr-2" size={16} />
                </Tooltip>
              </InputLeftElement>
              <Input
                defaultValue={hospital}
                className="inline"
                name="hospital"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Tooltip label="Expertise">
                  <FaUserDoctor className="inline mr-2" size={16} />
                </Tooltip>
              </InputLeftElement>
              <Input
                defaultValue={expertist}
                className="inline"
                name="expertist"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <Tooltip label="Address">
                  <FaMap className="inline mr-2" size={16} />
                </Tooltip>
              </InputLeftElement>
              <Input
                defaultValue={address}
                className="inline"
                name="address"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <FaPhone className="inline mr-2" size={16} />
              </InputLeftElement>
              <Input
                defaultValue={tel}
                className="inline"
                name="tel"
                type="tel"
              />
            </InputGroup>
          </div>
        </HStack>
      </>
    );
  },
);

type DeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;

  dentist: Dentist;
};

function DeleteDialog(props: DeleteDialogProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete <u>{props.dentist.name}</u>?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => void props.onClose()}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              // TODO: Delete dentist
              onClick={() => void props.onClose()}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DentistCard;
