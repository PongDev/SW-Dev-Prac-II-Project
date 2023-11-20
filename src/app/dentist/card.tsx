"use client";

import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  forwardRef,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Link as CLink } from "@chakra-ui/react";
import {
  FaHospital,
  FaMap,
  FaPhone,
  FaTrash,
  FaUserDoctor,
} from "react-icons/fa6";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";

export type DentistCardProps = {
  name: string;
  hospital: string;
  expertise: string;
  address: string;
  phone?: string;
  picture: string;

  isAdminCtrl?: boolean;
};

const DentistCard = forwardRef<DentistCardProps, "div">((props, ref) => {
  const {
    name,
    hospital,
    expertise,
    address,
    phone,
    picture,
    isAdminCtrl,
    ...rest
  } = props;

  return (
    <Card variant="outline" rounded={16} ref={ref} {...rest}>
      <CardBody>
        <VStack>
          <h3 className="font-semibold text-xl mb-1">{name}</h3>
          <HStack className="flex justify-between  w-full flex-wrap ">
            <Image
              src={picture}
              alt="Dentist Picture"
              width={128}
              height={128}
              className="rounded-full m-auto"
            />
            <div className="flex flex-col md:text-base gap-1 text-left m-auto">
              <span>
                <FaHospital className="inline mr-2" size={18} />
                {hospital}
              </span>
              <span>
                <FaUserDoctor className="inline mr-2" size={18} />
                {expertise}
              </span>
              <CLink
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  address,
                )}`}
                target="_blank"
                isExternal
              >
                <FaMap className="inline mr-2" size={18} />
                {address}
                <FaExternalLinkAlt
                  className="ml-1 inline text-gray-600"
                  size={9}
                />
              </CLink>
              {phone ? (
                <CLink href={`tel:${phone}`} isExternal>
                  <FaPhone className="inline mr-2" size={18} />
                  {phone}
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

          {isAdminCtrl && (
            <>
              <Divider />

              <div className="w-full mx-16 flex flex-row justify-evenly mt-2">
                <Button
                  className="w-36 border-2 border-black"
                  variant="solid"
                  leftIcon={<FaEdit />}
                  colorScheme="blue"
                >
                  Edit
                </Button>
                <Button
                  className="w-36 border-2 border-black"
                  variant="solid"
                  leftIcon={<FaTrash />}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
});

export default DentistCard;
