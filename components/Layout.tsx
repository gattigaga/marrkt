import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useRouter } from "next/router";

import Footer from "./Footer";
import Menu, { Exposed as MenuExposed } from "./Menu";

export type Exposed = {
  runCartItemCountAnimation: MenuExposed["runCartItemCountAnimation"];
};

type Props = {
  children: JSX.Element | JSX.Element[];
  onEventTriggered?: (eventName: string) => void;
};

const Layout: React.ForwardRefRenderFunction<Exposed, Props> = (
  { children, onEventTriggered },
  ref
) => {
  const router = useRouter();
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
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        });

        scroll.on("scroll", (args: any) => {
          const isScrollAtTheTop = args.scroll.y <= 64;

          refMenu.current?.runMenuContainerAnimation(isScrollAtTheTop);
        });

        scroll.on("call", (eventName: string) => {
          onEventTriggered && onEventTriggered(eventName);
        });
      })();
    }

    return () => scroll?.destroy();
  }, [router.query]);

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
