import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin, useGSAP);

export { gsap, useGSAP };
