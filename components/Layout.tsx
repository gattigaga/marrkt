import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import Footer from "./Footer";
import Menu, { Exposed as MenuExposed } from "./Menu";

export type Exposed = {
  runCartItemCountAnimation: MenuExposed["runTotalItemsAnimation"];
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.ForwardRefRenderFunction<Exposed, Props> = (
  { children },
  ref
) => {
  const refMenu = useRef<MenuExposed>(null);

  const runCartItemCountAnimation = (
    onAnimationRun: () => void,
    isReverse = false
  ) => {
    refMenu.current?.runTotalItemsAnimation(onAnimationRun, isReverse);
  };

  useImperativeHandle(ref, () => ({
    runCartItemCountAnimation,
  }));

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const luxy = require("luxy.js");

      luxy.init();
    }
  }, []);

  return (
    <div>
      <Menu ref={refMenu} />
      <div id="luxy">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default forwardRef(Layout);
