const CATACLYSM_SECOND_CHANCE_EYES = {
  'cataclysm_dimension:cataclysm_abyssal_depths': 'cataclysm:abyss_eye',
  'cataclysm_dimension:cataclysm_forge_of_aeons': 'cataclysm:mech_eye',
  'cataclysm_dimension:cataclysm_infernos_maw': 'cataclysm:flame_eye',
  'cataclysm_dimension:cataclysm_bastion_lost': 'cataclysm:void_eye',
  'cataclysm_dimension:cataclysm_souls_anvil': 'cataclysm:monstrous_eye',
  'cataclysm_dimension:cataclysm_pharaohs_bane': 'cataclysm:desert_eye',
  'cataclysm_dimension:cataclysm_eternal_frosthold': 'cataclysm:cursed_eye',
  'cataclysm_dimension:cataclysm_sanctum_fallen': 'cataclysm:storm_eye'
}

const cataclysmSecondChanceDeaths = {}

function getSecondChanceKey(player) {
  return String(player.uuid || player.username)
}

EntityEvents.death('minecraft:player', event => {
  const player = event.entity
  const dimension = String(player.level.dimension)
  const eye = CATACLYSM_SECOND_CHANCE_EYES[dimension]

  if (!eye) {
    return
  }

  cataclysmSecondChanceDeaths[getSecondChanceKey(player)] = eye
  console.info(`[Cataclysm Dimensions] Queued ${eye} as a second chance key for ${player.username}`)
})

PlayerEvents.respawned(event => {
  const player = event.entity
  const key = getSecondChanceKey(player)
  const eye = cataclysmSecondChanceDeaths[key]

  if (!eye) {
    return
  }

  delete cataclysmSecondChanceDeaths[key]

  event.server.scheduleInTicks(1, () => {
    player.give(Item.of(eye))
    player.tell('A second chance key has been returned to you.')
    console.info(`[Cataclysm Dimensions] Gave ${eye} second chance key to ${player.username}`)
  })
})
