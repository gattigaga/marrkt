import React, { forwardRef, useImperativeHandle, useRef } from "react";

import Footer from "./Footer";
import Menu, { Exposed as MenuExposed } from "./Menu";

export type Exposed = {
  runCartItemCountAnimation: MenuExposed["runTotalItemsAnimation"];
};

type Props = {
  children: JSX.Element;
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

  return (
    <div>
      <Menu ref={refMenu} />
      {children}
      <Footer />
    </div>
  );
};

export default forwardRef(Layout);
