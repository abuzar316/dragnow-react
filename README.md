# Dragnow-react

  [![npm downloads](https://img.shields.io/badge/Download-Dragnow%20React-blue)](https://www.npmjs.com/package/dragnow-react)

### Features

- Draggable Components:
  - Easily make React components draggable by wrapping them in the Draggable component, enabling intuitive drag-and-drop interactions.
- Customization
  - Customize the drag-and-drop behavior with options like initial position, drag handles, and drop targets, allowing fine-grained control over the user experience.
- Event Handling
  - Respond to drag-related events such as drag start, drag move, and drag end by attaching event handlers to the Draggable component, enabling dynamic interactions and feedback.
- Interaction with Other Components
  - Define drop targets to create interactive experiences where draggable components can interact with and be dropped onto specific targets within your application.
- Accessibility
  - Ensure accessibility compliance by providing built-in support for keyboard navigation and screen readers, making your drag-and-drop interfaces usable by a wide range of users.


### Install

    npm install dragnow-react

### Quickstart

```jsx
import DragNow from "dragnow-react";

function App() {
  return (
    <div className=`app`>
        <DragNow>
          <h1>Drag Now</h1>
        </DragNow>
    </div>
  );
}
```

## `<DragNow>`

```jsx
import DragNow from "dragnow-react";

function App() {

  const handleGetPosition = (x, y, index) => {
    console.log(x, y, index);
  };

  return (
    <div className=`app`>
        <DragNow
          defaultPosition={{ x: 100, y: 100 }}
          getPosition={handleGetPosition}
          index={11}
        >
          <h1>Drag Now</h1>
        </DragNow>
    </div>
  );
}
```
