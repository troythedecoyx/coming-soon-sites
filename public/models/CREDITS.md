# 3D Model Credits

All models below are from [Poly Haven](https://polyhaven.com), licensed
[CC0](https://creativecommons.org/publicdomain/zero/1.0/) (public domain —
attribution not required, but linked here for reference).

| Model | Poly Haven page |
|---|---|
| `metal_office_desk` | https://polyhaven.com/a/metal_office_desk |
| `modern_arm_chair_01` | https://polyhaven.com/a/modern_arm_chair_01 |
| `desk_lamp_arm_01` | https://polyhaven.com/a/desk_lamp_arm_01 |
| `hanging_picture_frame_01` | https://polyhaven.com/a/hanging_picture_frame_01 |
| `gamepad` | https://polyhaven.com/a/gamepad |

Downloaded at 1k texture resolution via Poly Haven's public API
(`api.polyhaven.com`).

## Known issue: `hanging_picture_frame_01`'s glass material

This model's "glass" material has `alphaMode: BLEND` driven by a JPEG
`baseColorTexture` — JPEGs carry no alpha channel, so the intended
transparent glass pane instead renders as a large, effectively opaque
occluder that hides the frame/artwork meshes behind it. Rather than fix the
source texture, `src/components/room/PosterFrameModel.tsx` hides the mesh
using that material at runtime (by name: `hanging_picture_frame_01_glass`)
and keeps only the frame + artwork meshes.

Monitor, PC tower, door, and phone are hand-built procedural geometry (not
downloaded models) — see `src/components/room/`.
