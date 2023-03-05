import React, { useState, useRef, useEffect } from "react";
import { FC, CSSProperties, MouseEvent } from "react";

interface DefaultPositionType {
  x: number;
  y: number;
}

interface DragNowPropsType {
  children?: JSX.Element;
  defaultPosition?: DefaultPositionType;
  getPosition?: (x: number, y: number, index?: number) => void;
  inParentDrag?: boolean;
  index?: number;
  sx?: CSSProperties;
  style?: CSSProperties;
}

type NumberAndUndefined = any;

type currentElementType = HTMLDivElement | null;

const DragNow: FC<DragNowPropsType> = (props) => {
  const dragDrop = <h1>Drag Now</h1>;
  const {
    children = dragDrop,
    defaultPosition = { x: 0, y: 0 },
    getPosition,
    inParentDrag,
    index,
    sx,
    style,
  } = props;

  const { x, y } = defaultPosition;

  const currentElement = useRef<currentElementType>(null);
  const [position, setPosition] = useState({
    x: x,
    y: y,
    coords: { x: 0, y: 0 },
  });

  const parentElementWidth = useRef<NumberAndUndefined>(null);
  const parentElementHeight = useRef<NumberAndUndefined>(null);
  const elementWidth = useRef<NumberAndUndefined>(null);
  const elementHeight = useRef<NumberAndUndefined>(null);

  const handleMouseMove = useRef<any>((e: MouseEvent) => {
    setPosition((position) => {
      const yDiff = position.coords.y - e.pageY;
      const xDiff = position.coords.x - e.pageX;
      let setX = position.x - xDiff;
      let setY = position.y - yDiff;
      const elementDragRight =
        parentElementWidth.current - elementWidth.current - 1;
      const elementDragBottom =
        parentElementHeight.current - elementHeight.current;

      if (inParentDrag) {
        if (setY <= 0) {
          setY = 0;
          handleMouseUp();
        }
        if (setX <= 0) {
          setX = 0;
          handleMouseUp();
        }
        if (setX >= elementDragRight) {
          setX = elementDragRight;
          handleMouseUp();
        }
        if (setY >= elementDragBottom) {
          setY = elementDragBottom;
          handleMouseUp();
        }
      }

      const data = {
        x: setX,
        y: setY,
        coords: {
          x: e.pageX,
          y: e.pageY,
        },
      };
      return data;
    });
  });

  const handleMouseDown = (e: MouseEvent) => {
    const pageX = e.pageX;
    const pageY = e.pageY;

    position.coords = {
      x: pageX,
      y: pageY,
    };

    setPosition(position);
    document.addEventListener("mousemove", handleMouseMove.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove.current);
    setPosition((position) => position);
  };

  const styleBox: CSSProperties = {
    userSelect: "none",
    transform: `translate(${position?.x}px, ${position?.y}px)`,
    display: "inline-block",
    ...sx,
    ...style,
  };

  const setAllState = () => {
    if (currentElement && currentElement.current) {
      parentElementWidth.current =
        currentElement.current?.parentElement?.offsetWidth;

      parentElementHeight.current =
        currentElement.current?.parentElement?.offsetHeight;

      elementWidth.current = currentElement?.current?.offsetWidth;
      elementHeight.current = currentElement?.current?.offsetHeight;
    }
  };

  useEffect(() => {
    setAllState();
  }, []);

  useEffect(() => {
    getPosition && getPosition(position.x, position.y, index);
    // eslint-disable-next-line
  }, [position]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={currentElement}
      style={styleBox}
    >
      {children}
    </div>
  );
};

export default DragNow;
