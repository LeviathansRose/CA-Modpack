const CATACLYSM_DIMENSION_EYE_LOOT = [
  'cataclysm:abyss_eye',
  'cataclysm:mech_eye',
  'cataclysm:flame_eye',
  'cataclysm:void_eye',
  'cataclysm:monstrous_eye',
  'cataclysm:desert_eye',
  'cataclysm:cursed_eye',
  'cataclysm:storm_eye'
]

const OMINOUS_VAULT_REWARD_TABLE = 'minecraft:chests/trial_chambers/reward_ominous'
const OMINOUS_VAULT_EYE_CHANCE = 1

LootJS.modifiers(event => {
  event.addTableModifier(OMINOUS_VAULT_REWARD_TABLE)
    .pool(pool => {
      pool.rolls(1)
      pool.when(conditions => {
        conditions.randomChance(OMINOUS_VAULT_EYE_CHANCE)
      })

      for (const eye of CATACLYSM_DIMENSION_EYE_LOOT) {
        pool.addEntry(LootEntry.of(eye))
      }
    })
})
