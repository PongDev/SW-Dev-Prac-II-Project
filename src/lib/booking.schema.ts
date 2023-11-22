export type Booking = {
  bookingDate: string;
  user: string;
  dentist: string;
  createdAt: string;
  _id: string;
};

export type CreateBookingRequest = Pick<Booking, "bookingDate" | "createdAt">;

export type CreateBookingResponse = {
  success: boolean;
  data: Booking;
};

type GetBookingData = {
  _id: string;
  bookingDate: string;
  user: {
    _id: string;
    name: string;
    email: string;
    tel: string;
  };
  dentist: {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
  };
  createdAt: string;
};

export type GetBookingResponse = {
  success: boolean;
  data: GetBookingData;
};

export type GetBookingsResponse = {
  success: boolean;
  count: number;
  data: GetBookingData[];
};

export type UpdateBookingRequest = CreateBookingRequest;

export type UpdateBookingResponse = CreateBookingResponse;

export type DeleteBookingResponse = {
  success: boolean;
};
