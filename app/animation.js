import { config, useSpring } from "@react-spring/web";

const fadeIn = useSpring({
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
  config: config.gentle,
});

const slideIn = useSpring({
  from: { opacity: 0, x: 50 },
  to: { opacity: 1, x: 0 },
  delay: 300,
  config: config.gentle,
});

const buttonSpring = useSpring({
  from: { scale: 1 },
  to: { scale: 1.05 },
  config: config.wobbly,
});
