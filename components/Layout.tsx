import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

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

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    let scroll: any = null;

    if (isBrowser) {
      (async () => {
        // @ts-ignore
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        scroll = new LocomotiveScroll({
          el: refContent.current,
          smooth: true,
          lerp: 0.08,
          reloadOnContextChange: true,
          scrollFromAnywhere: true,
        });

        scroll.on("scroll", (args) => {
          const isScrollAtTheTop = args.scroll.y <= 64;

          refMenu.current?.runMenuContainerAnimation(isScrollAtTheTop);
        });
      })();
    }

    return () => scroll?.destroy();
  }, []);

  return (
    <div>
      <Menu ref={refMenu} />
      <div ref={refContent} data-scroll-container>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default forwardRef(Layout);
