import { IProps } from "./Types";

export default function SvgRedBasket({ heigth, width }: IProps) {
  return (
    <svg
      width={width ? width : "13"}
      height={heigth ? heigth : "19"}
      viewBox="0 0 13 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.37459 1.38581L9.52392 1.55556H9.75H12.5V2.66667H0.5V1.55556H3.25H3.47608L3.62541 1.38581L4.40466 0.5H8.59534L9.37459 1.38581ZM2.78571 18.5C2.09872 18.5 1.42857 17.836 1.42857 16.8889V4.72222H11.5714V16.8889C11.5714 17.836 10.9013 18.5 10.2143 18.5H2.78571Z"
        stroke="#FF0303"
      />
    </svg>
  );
}
