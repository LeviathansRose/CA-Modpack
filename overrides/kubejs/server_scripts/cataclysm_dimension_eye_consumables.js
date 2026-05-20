const CATACLYSM_DIMENSION_EYES = {
  'cataclysm:abyss_eye': true,
  'cataclysm:mech_eye': true,
  'cataclysm:flame_eye': true,
  'cataclysm:void_eye': true,
  'cataclysm:monstrous_eye': true,
  'cataclysm:desert_eye': true,
  'cataclysm:cursed_eye': true,
  'cataclysm:storm_eye': true
}

ItemEvents.rightClicked(event => {
  const { item, player, server } = event

  if (!CATACLYSM_DIMENSION_EYES[item.id] || !player || !player.isShiftKeyDown()) {
    return
  }

  server.scheduleInTicks(1, () => {
    if (!player || player.isCreative()) {
      return
    }

    console.info(`[Cataclysm Dimensions] Consuming ${item.id} from ${player.username}`)
    item.shrink(1)
    server.runCommandSilent(`execute as ${player.username} run createScroll irons_spellbooks:recall 1`)
  })
})
