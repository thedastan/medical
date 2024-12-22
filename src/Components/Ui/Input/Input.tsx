// External dependencies
import { Input } from "@chakra-ui/react";

type InputTypeColor = "secondaryLittleGray" | "colorForActiveInput" | "black";

type InputTypeTextTransform = "uppercase" | "lowercase" | "capitalize";

type InputTypeTextAlign = "start" | "center" | "end";

interface IInputProps {
  color?: string;
  display?: string;
  defaultValue?: string | undefined;
  disabled?: boolean;
  rounded?: string;
  onChange: (value?: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  weight?: string;
  height?: string;
  fontFamily?: string;
  placeholder?: string;
  name?: string;
  marginBottom?: string;
  type?: string;
}

interface CustomInputProps extends IInputProps {
  typeColor?: InputTypeColor;
  textTransform?: InputTypeTextTransform;
  textAlign?: InputTypeTextAlign;
}

export default function MyInput(props: CustomInputProps) {
  const {
    color,
    display,
    defaultValue,
    disabled,
    fontFamily,
    height,
    onChange,
    placeholder,
    rounded,
    textTransform,
    value,
    typeColor,
    weight,
    width,
    name,
    marginBottom,
    type,
    textAlign,
  } = props;

  return (
    <Input
      type={type}
      maxW={width ? width : "100%"}
      h={height ? height : "19px"}
      px="0px"
      textTransform={textTransform}
      defaultValue={defaultValue}
      value={value}
      bg={typeColor}
      fontWeight={weight}
      fontSize="14px"
      rounded={rounded}
      onChange={(e) => onChange(e)}
      textColor={color ? color : "white"}
      display={display}
      fontFamily={fontFamily}
      placeholder={placeholder}
      name={name}
      mb={marginBottom}
      borderColor="transparent"
      focusBorderColor="black"
      disabled={disabled}
      textAlign="start"
    />
  );
}
