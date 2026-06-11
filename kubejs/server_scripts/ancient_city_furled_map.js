const ancientCityFurledMap = `irons_spellbooks:furled_map[irons_spellbooks:furled_map_data={destination:"minecraft:ancient_city",dimension:"minecraft:overworld"},minecraft:custom_name='{"text":"Ancient City Furled Map","italic":false}']`

ServerEvents.recipes(event => {
  event.shaped(
    ancientCityFurledMap,
    [
      'PAP',
      'ACA',
      'PAP'
    ],
    {
      P: 'minecraft:paper',
      A: 'irons_spellbooks:arcane_essence',
      C: 'minecraft:sculk_catalyst'
    }
  ).id('kubejs:ancient_city_furled_map')
})

RecipeViewerEvents.registerSubtypes('item', event => {
  event.useComponents('irons_spellbooks:furled_map', ['irons_spellbooks:furled_map_data'])
})

RecipeViewerEvents.addEntries('item', event => {
  event.add(ancientCityFurledMap)
})
