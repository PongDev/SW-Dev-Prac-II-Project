"use client";

import {
  Avatar,
  Card,
  CardBody,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Link as CLink } from "@chakra-ui/react";
import { FaHospital, FaMap, FaPhone, FaUserDoctor } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

export type DentistCardProps = {
  name: string;
  hospital: string;
  expertise: string;
  address: string;
  phone?: string;
  picture: string;
};

export default function DentistCard(props: DentistCardProps) {
  return (
    <Card variant="outline" width="33%" rounded={16}>
      <CardBody>
        <VStack>
          <h3 className="font-semibold text-xl mb-1">{props.name}</h3>
          <div className="flex items-center justify-between w-full px-4 flex-wrap">
            <Image
              src={props.picture}
              alt="Dentist Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
            <div className="flex flex-col sm:text-xs md:text-base gap-1 text-left">
              <span>
                <FaHospital className="inline mr-2" size={18} />
                {props.hospital}
              </span>
              <span>
                <FaUserDoctor className="inline mr-2" size={18} />
                {props.expertise}
              </span>
              <CLink
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  props.address,
                )}`}
                target="_blank"
                isExternal
              >
                <FaMap className="inline mr-2" size={18} />
                {props.address}
                <FaExternalLinkAlt
                  className="ml-1 inline text-gray-600"
                  size={9}
                />
              </CLink>
              {props.phone ? (
                <CLink href={`tel:${props.phone}`} isExternal>
                  <FaPhone className="inline mr-2" size={18} />
                  {props.phone}
                  <FaExternalLinkAlt
                    className="ml-1 inline text-gray-600"
                    size={9}
                  />
                </CLink>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>
        </VStack>
      </CardBody>
    </Card>
  );
}
