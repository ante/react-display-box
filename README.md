# react-display-box
A simple, customizable 3D React component

![cover](https://user-images.githubusercontent.com/17600214/228597171-5adf8609-ecd0-4a0c-b7ae-eded903fd5eb.gif)

`react-display-box` is a simple 3D component that can be easily dropped into your React project. In its simplest form, just wrap it around a div to create a box with the child element on the back of the box:

```TSX
<DisplayBox
  height="300px"
  width="300px"
  depth="100px"
>
  <div>React Display Box</div>
</DisplayBox>
```
## `<DisplayBox>`

A `DisplayBox` component wraps an existing div and puts it on the back of a customizable 3D box. Initially, this was created to visualize a game library (as seen above), but there's nothing to stop you from using it for whatever you want. 

### Usage

Let's put an image on the front of the box, a comment on the back of the box, make the sides of the box white, and spin the box when a user scrolls their mouse wheel:

```TSX
import React, { useState } from "react";
import { DisplayBox } from "react-display-box";
import image from "./assets/img/image.png";

function App() {
  const [rotation, setRotation] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    let rotate = 0;
    if (e.deltaY < 0) rotate -= 10;
    else if (e.deltaY > 0) rotate += 10;
    setRotation((prev) => prev + rotate);
  };

  return (
    <div onWheel={handleWheel}>
      <DisplayBox
        height="500px"
        width="300px"
        depth="100px"
        rotationY={rotation}
        coverImg={image}
        back='white'
        right='white'
        left='white'
        top='white'
        bottom='white'
        glare
        shadow
      >
        <div>Look at that image!</div>
      </DisplayBox>
    </div>
  );
}

export default App;
```

### `<DisplayBox>` Props

There are a number of props which allow you to customize (or not!) both appearance and behavior of your box:

- `height` - any CSS unit of measurement (don't use percentages unless you want ...unexpected behavior)
- `width` - any CSS unit of measurement (don't use percentages unless you want ...unexpected behavior)
- `depth` - any CSS unit of measurement (don't use percentages unless you want ...unexpected behavior)
- `rotationX` - a number; will be converted to degrees for the x-axis rotation of the box
- `rotationY` - a number; will be converted to degrees for the y-axis rotation of the box
- `flipOnClick` - a boolean; include this prop if you want the box to rotate 180 degees on its y-axis when clicking 
- `flipDirection` - `'left'` or `'right'`; include if you have already included `flipOnClick` and want the flip to rotate a certain way
- `zoomOnHover` - a boolean; include this if you want the box to initially be slightly scaled down and scale to the full dimensions on hover
- `coverImg` - an imported image to include on the cover (front) of the box
- `glare` - a boolean; include if you want to display a slight glare effect on the cover when mousing over
- `shadow` - a boolean; include if you want the bottom of the box to have a slight shadow
- `front` - any CSS color
- `back` - any CSS color
- `top` - any CSS color
- `bottom` - any CSS color
- `left` - any CSS color
- `right` - any CSS color
- `onClick` - a callback to be called upon clicking the box

----

### Todo

- Add tests
- Add examples
