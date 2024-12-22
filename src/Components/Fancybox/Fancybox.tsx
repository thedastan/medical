import { Box } from "@chakra-ui/react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { ComponentOptionsType as FancyboxOptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useRef } from "react";

export default function Fancybox(props: {
  children?: React.ReactNode;
  delegate?: string;
  options?: Partial<FancyboxOptionsType>;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <Box ref={containerRef}>{props.children}</Box>;
}
