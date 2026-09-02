"use client";

import RoomEnvironment from "./RoomEnvironment";
import Monitor from "./Monitor";
import PCTower from "./PCTower";
import Door from "./Door";
import Phone from "./Phone";
import Poster from "./Poster";
import PropModel from "./PropModel";
import CameraRig from "./CameraRig";

// Real-world-meter layout. Desk top sits at DESK_TOP (its own bounding box
// is ~0.79m tall at scale 1, so DESK_TOP = desk Y position + 0.79 * scale).
const DESK_SCALE = 1;
const DESK_Y = 0;
const DESK_TOP = DESK_Y + 0.79 * DESK_SCALE;

export default function Room({
  accent,
  active,
  onSelect,
}: {
  accent: string;
  active: string;
  onSelect: (target: string) => void;
}) {
  return (
    <group>
      <CameraRig target={active} />
      <RoomEnvironment accent={accent} />

      {/* desk against the back wall, ~1m deep from the wall at z=-2 */}
      <PropModel name="metal_office_desk" position={[0, DESK_Y, -1.5]} rotation={[0, 0, 0]} scale={DESK_SCALE} />

      {/* chair, facing the desk */}
      <PropModel name="modern_arm_chair_01" position={[0, 0, -0.2]} rotation={[0, Math.PI, 0]} scale={1} />

      {/* desk lamp, back-left corner of the desk */}
      <PropModel name="desk_lamp_arm_01" position={[-0.75, DESK_TOP, -1.7]} scale={0.85} />

      {/* gamepad, resting on the desk in front of the chair */}
      <PropModel name="gamepad" position={[0.1, DESK_TOP + 0.01, -1.15]} rotation={[0, 0.3, 0]} scale={0.6} />

      {/* monitor: STREAMS — position is the desk surface it stands on */}
      <Monitor position={[0, DESK_TOP, -1.75]} accent={accent} onSelect={() => onSelect("monitor")} />

      {/* PC tower: VIDEOS — on the floor to the right of the desk, clear of
          its footprint (desk spans x: -1 to 1) so it's never occluded by
          the desk drawers. position = floor contact point. */}
      <PCTower position={[1.35, 0, -1.4]} accent={accent} onSelect={() => onSelect("pc")} />

      {/* phone: SOCIALS — on the desk, front-right */}
      <Phone position={[0.5, DESK_TOP + 0.01, -1.15]} accent={accent} onSelect={() => onSelect("phone")} />

      {/* poster: ABOUT — on the back wall, to the left of the desk */}
      <Poster position={[-1.6, 1.7, -1.97]} onSelect={() => onSelect("poster")} />

      {/* door: DISCORD — flush against the side wall (x = -3) */}
      <Door position={[-2.97, 1.05, 0.5]} accent={accent} onSelect={() => onSelect("door")} />
    </group>
  );
}
