const DEATH_DURABILITY_PENALTY = 0.2
const deathDurabilityPenaltyQueue = {}

function getDeathDurabilityPenaltyKey(player) {
  return String(player.uuid || player.username)
}

function damageItemByPercent(stack, percent) {
  if (!stack || stack.isEmpty() || !stack.isDamageableItem()) {
    return false
  }

  const maxDamage = stack.getMaxDamage()
  const damageToAdd = Math.ceil(maxDamage * percent)
  const newDamage = Math.min(stack.getDamageValue() + damageToAdd, maxDamage - 1)

  stack.setDamageValue(newDamage)

  return true
}

function applyDeathDurabilityPenalty(player) {
  const inventory = player.getInventory()
  let damagedItems = 0

  for (let slot = 0; slot < 9; slot++) {
    if (damageItemByPercent(inventory.getItem(slot), DEATH_DURABILITY_PENALTY)) {
      damagedItems++
    }
  }

  for (let slot = 0; slot < inventory.armor.size(); slot++) {
    if (damageItemByPercent(inventory.armor.get(slot), DEATH_DURABILITY_PENALTY)) {
      damagedItems++
    }
  }

  inventory.setChanged()
  console.info(`[Death Durability Penalty] Damaged ${damagedItems} equipped armor/hotbar item(s) for ${player.username}`)
}

EntityEvents.death('minecraft:player', event => {
  const player = event.entity
  deathDurabilityPenaltyQueue[getDeathDurabilityPenaltyKey(player)] = true
})

PlayerEvents.respawned(event => {
  const player = event.entity
  const key = getDeathDurabilityPenaltyKey(player)

  if (!deathDurabilityPenaltyQueue[key]) {
    return
  }

  delete deathDurabilityPenaltyQueue[key]

  event.server.scheduleInTicks(1, () => {
    applyDeathDurabilityPenalty(player)
  })
})
