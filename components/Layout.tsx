import React, { forwardRef, useImperativeHandle, useRef } from "react";

import Footer from "./Footer";
import Menu, { Exposed as MenuExposed } from "./Menu";

export type Exposed = {
  runCartItemCountAnimation: MenuExposed["runCartItemCountAnimation"];
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.ForwardRefRenderFunction<Exposed, Props> = (
  { children },
  ref
) => {
  const refContent = useRef(null);
  const refMenu = useRef<MenuExposed>(null);

  const runCartItemCountAnimation = (
    onAnimationRun: () => void,
    isReverse = false
  ) => {
    refMenu.current?.runCartItemCountAnimation(onAnimationRun, isReverse);
  };

  useImperativeHandle(ref, () => ({
    runCartItemCountAnimation,
  }));

  return (
    <div>
      <Menu ref={refMenu} />
      <div ref={refContent}>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default forwardRef(Layout);
