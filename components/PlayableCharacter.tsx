"use client";

export type CharacterDirection = "left" | "right" | "front" | "back";

export function PlayableCharacter({
  moving,
  direction,
  resting,
}: {
  moving: boolean;
  direction: CharacterDirection;
  resting: boolean;
}) {
  return (
    <div className={`human-rig dir-${direction}${moving ? " moving" : ""}${resting ? " resting" : ""}`} aria-label="Personnage jouable">
      <span className="human-shadow" />
      <span className="human-leg leg-left" />
      <span className="human-leg leg-right" />
      <span className="human-torso" />
      <span className="human-cloak" />
      <span className="human-arm arm-left" />
      <span className="human-arm arm-right" />
      <span className="human-neck" />
      <span className="human-head">
        <i className="human-hair" />
        <i className="human-face-glow" />
      </span>
    </div>
  );
}
