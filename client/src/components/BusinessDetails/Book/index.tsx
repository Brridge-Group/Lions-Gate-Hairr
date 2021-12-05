import { useState } from "react";

import { PhoneContainer, Button } from "./BookElements";
import calendarIcon from "../../../assets/calendar-icon.png";

interface Props {
  phone: string
}

const Book = (props: Props) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const phoneNumberButtonClickHandler = (): void => {
    setShowPhoneNumber(true);
  };

  const BookButton: JSX.Element = (
    <Button onClick={phoneNumberButtonClickHandler}>
      <img src={calendarIcon} alt="Calendar icon." />
      <p>Book Now</p>
    </Button>
  );

  return <PhoneContainer>
    {showPhoneNumber ? <p>{props.phone}</p> : BookButton}
  </PhoneContainer>;
};

export default Book;
