import React, { useCallback } from 'react';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useTouchHandler } from '@shopify/react-native-skia/src/gesture/TouchHandler';

const CanvasDraw = ({ onDrawingComplete }) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const path = Skia.Path.Make();
      path.moveTo(x, y);
      setCurrentPath(path);
    },
    onActive: ({ x, y }) => {
      currentPath?.lineTo(x, y);
    },
    onEnd: () => {
      if (currentPath) {
        setPaths([...paths, currentPath]);
        setCurrentPath(null);
      }
    },
  });

  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      {paths.map((path, index) => (
        <Path key={index} path={path} strokeWidth={5} style="stroke" />
      ))}
      {currentPath && <Path path={currentPath} strokeWidth={5} style="stroke" />}
    </Canvas>
  );
};

export default CanvasDraw;