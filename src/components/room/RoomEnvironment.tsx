"use client";

// Room shell: a ~5x5m bedroom/studio, 2.4m ceiling. Back wall at z=-2,
// side wall at x=-3, floor at y=0 — sized to actually contain the desk
// setup (desk sits at z=-1.5, ~1m deep) rather than an arbitrary huge box.
const ROOM_WIDTH = 5;
const ROOM_DEPTH = 5;
const CEILING = 2.4;
const BACK_WALL_Z = -2;
const SIDE_WALL_X = -3;

/**
 * Static room shell: floor, back wall, side wall, and ambient/key lighting.
 * Kept minimal — the room is a dark studio, most of the visual interest
 * comes from the LED accent lighting and the glowing interactive objects.
 */
export default function RoomEnvironment({ accent }: { accent: string }) {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color="#0d0c14" roughness={0.85} />
      </mesh>

      {/* back wall */}
      <mesh position={[0, CEILING / 2, BACK_WALL_Z]} receiveShadow>
        <planeGeometry args={[ROOM_WIDTH, CEILING]} />
        <meshStandardMaterial color="#16141f" roughness={0.9} />
      </mesh>

      {/* side wall */}
      <mesh position={[SIDE_WALL_X, CEILING / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_DEPTH, CEILING]} />
        <meshStandardMaterial color="#120f1a" roughness={0.9} />
      </mesh>

      {/* LED accent strip along the back-wall / floor seam */}
      <mesh position={[0, 0.02, BACK_WALL_Z + 0.02]}>
        <boxGeometry args={[ROOM_WIDTH - 0.4, 0.03, 0.03]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.5} toneMapped={false} />
      </mesh>

      {/* matching strip along the side-wall / floor seam */}
      <mesh position={[SIDE_WALL_X + 0.02, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.03, ROOM_DEPTH - 0.4]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.5} toneMapped={false} />
      </mesh>

      {/* lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, -0.5]} intensity={1.1} color={accent} distance={7} decay={2} />
      <pointLight position={[-1.5, 1.5, -1]} intensity={0.7} color="#f472b6" distance={6} decay={2} />
      <directionalLight position={[1, 3, 2]} intensity={0.6} color="#ffffff" />
    </group>
  );
}
