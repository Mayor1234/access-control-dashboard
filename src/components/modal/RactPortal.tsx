import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const ReactPortal = ({
  children,
  wrapperId,
}: {
  children: React.ReactElement;
  wrapperId: string;
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;
    // If no element found with wrapperId, wrapperId is create and append to body
    if (!element) {
      element = document.createElement('div');
      element.setAttribute('id', wrapperId);
      document.body.appendChild(element);
      created = true;
      //   element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);
    return () => {
      // Delete the programmatically created element
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // WrapperELement state will be null on the very first render
  return wrapperElement ? createPortal(children, wrapperElement) : null;
};

export default ReactPortal;
