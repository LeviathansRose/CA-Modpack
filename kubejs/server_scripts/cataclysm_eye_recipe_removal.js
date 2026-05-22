const CATACLYSM_EYE_RECIPE_OUTPUTS = [
  'cataclysm:abyss_eye',
  'cataclysm:mech_eye',
  'cataclysm:flame_eye',
  'cataclysm:void_eye',
  'cataclysm:monstrous_eye',
  'cataclysm:desert_eye',
  'cataclysm:cursed_eye',
  'cataclysm:storm_eye'
]

ServerEvents.recipes(event => {
  for (const eye of CATACLYSM_EYE_RECIPE_OUTPUTS) {
    event.remove({ output: eye })
  }
})
