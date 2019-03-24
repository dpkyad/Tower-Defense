# **Castle Defense: Game Demonstration Guide**

### _<span style="text-decoration:underline;">Special Demo Instruction</span>_

For the purposes of this assignment and grading, ''Force Win'' and "Force Lose" text links have been added to each level at the bottom left corner of the screen of each level. This will allow the grader to skip through the levels without having to play through.

__***IMPORTANT NOTE*__**: Changing tabs away from the game while it is running causes significant slowdown which can drastically affect tower attack rates, enemy movement speed and enemy wave spacing.  For the best experience we recommend that you do not ever change focus from the tab the game is running in until completion.  If you need to change tabs (for example to read these instructions), we recommend pausing the game using the button at the top, and waiting 5-10 seconds after coming back to the tab before resuming.

The game is played in a Google Chrome browser and uses basic mouse controls--mainly left click--to take any action.

![image](https://drive.google.com/a/oregonstate.edu/uc?export=view&id=19hoSlQeJD0HtDc93d9dR3jx1q3Q2Wc3l)

## _<span style="text-decoration:underline;">Starting the game</span>_


1. Open the link: [https://capstone-td.herokuapp.com/](https://capstone-td.herokuapp.com/) in a chrome browser to be taken to the game page.
2. Press F11 to full screen your browser as the game is best played at full size
    - It is not necessary to play at full screen
3. You will be presented with a loading screen and then the main menu (as seen in the above image)
    - Click the button "NEW GAME" to begin
4. An introduction to the story will be presented
    - Click the flashing "Start ->" button to continue
5. You will then see the game map

## _<span style="text-decoration:underline;">Game Map</span>_

Below is an example of a game map. Each marked point serves a purpose in the gameplay

![image](https://drive.google.com/a/oregonstate.edu/uc?export=view&id=1iv2ymySNAB6m5FY8vbIh4ocurS1H_9iI)


1. The Health and Gold information is found here
    - Every time an enemy reaches the end of the map, the health points decrease depending on the enemy type
    - Every time a tower destroys an enemy, the player earns gold. The amount depends on the type of enemy destroyed.
2. The current wave is displayed here
    - This shows the wave number and the number enemies of a specific type that will appear now.
3. The pause and volume buttons are found here
    - The first button plays or pauses the game
    - The second button toggles the sound on or off
4. The next wave is displayed here
    - This shows the next set of enemies that will appear once the current wave ends.
5. Enemy entrance indicator
    - The arrow's position indicates the point the enemies will be coming from
    - The number and location of the entrance can vary depending on the level
6. When clicking along the path, an indicator will appear that lets the player know where the tower will be placed.
7. The countdown timer shows the time left before the wave begins.
    - The "skip wait?" text can be clicked to skip the countdown and have the wave start now.
8. When clicking along the path, as stated in bullet point 6, the tower menu will open allowing the player to manipulate the towers. 
    - Clicking the "x" button closes the tower menu

## _<span style="text-decoration:underline;">Playing the game</span>_

1. Clicking anywhere along the edge path will open the tower menu
    - Note: Not all locations along the path are available for tower placement
2. Click the "Place Tower" Button
3. Another button will appear called "Peasant | 8g"
    - Note the "8g" is the cost of the tower.
    - You must have enough gold to buy the tower
    - Higher tiers of towers cost more gold
4. Hovering over the button will display the stats tooltip and the range radius
    - The stats tooltip will show all pertinent information about the tower
    - The range radius shows how far the tower can attack

![image](https://drive.google.com/a/oregonstate.edu/uc?export=view&id=1Epm9YUoJzFC4vmvp3mQG2CDPc5QOcIWg)

5. Clicking the "Peasant | 8g" button will place the tower on the map where the player first clicked.
6. Once the wave of enemies begin to appear, the tower will automatically begin to attack them
7. During the game the player can continuously add towers as they see fit
8. Clicking on the tower that is already placed will present the player with options to upgrade or sell the tower
    - Clicking upgrade
      - A set of potential upgrades will be presented, that if hovered over show:
        - The stats of the upgraded tower
        - A new range radius showing the difference between the current tower and the new towers' ranges
      - Depending on the tower type and amount of gold, the player can click on the name of the new tower to upgrade to it.
    - Clicking sell
      - The tower will be sold and the player will earn back 75% of the towers original cost, including all upgraded towers.
9. If you win the game by surviving all 10 waves, a victory image will appear
    - Click continue to proceed with the next chapter of the story and the next level
10. If you lose the game by letting too many enemies through and losing all your health, a Game Over scene will play allowing you to either retry the level or to return to the main menu
11. This process continues for each of the three levels.
    - The last level will show the conclusion of the story and allow you to return to the main menu

## _<span style="text-decoration:underline;">Player controls</span>_

*   Left mouse click on a location and click to open the tower menu.
*   Left mouse click to place a tower, or upgrade an existing one.
*   Left mouse click the Sell button to remove a tower.
*   On the HUD, clicking the play button will pause and resume the game.
*   On the HUD, clicking the volume button will toggle the sounds on or off.

## _<span style="text-decoration:underline;">Strategy</span>_

Below you'll find some useful information about how towers and enemies work. It may help with your strategy as you play the game.

### _<span style="text-decoration:underline;">Towers</span>_

![image](https://drive.google.com/a/oregonstate.edu/uc?export=view&id=1Gof0Ss7Lvp4Ua1qGIcucJw1PlAmSw59T)

There are 23 towers that can be upgraded based on the above hierarchy. The rows are the tiers of the towers, and each tier costs 8, 15, 25 and 35 gold respectively.  Towers inside of a square in the diagram deal physical damage, while towers inside a diamond deal magical damage.  For more information on how each damage type affects gameplay, see the 'Enemies' section below.   As stated above, towers have different attack ranges, damage, and projectile speed depending on what type of tower it is and the towers used to upgrade to it. Towers in the 4th row of the diagram all have special abilities, and a chart listing them can be found below.

<table>
  <tr>
   <td>Tower Name
   </td>
   <td>Special Ability
   </td>
  </tr>
  <tr>
   <td>Commander
   </td>
   <td>25% chance to stun target for 1.5s
   </td>
  </tr>
  <tr>
   <td>Berserker
   </td>
   <td>Longer range and can attack air despite being a Soldier tower
   </td>
  </tr>
  <tr>
   <td>Swordmaster
   </td>
   <td>Attacks ignore physical armor
   </td>
  </tr>
  <tr>
   <td>Cutpurse
   </td>
   <td>Has a 10% to generate 1 gold when attacking
   </td>
  </tr>
  <tr>
   <td>Cannoneer
   </td>
   <td>Attacks deal damage in a large area of effect around the projectile
   </td>
  </tr>
  <tr>
   <td>Sharpshooter
   </td>
   <td>Has a very large range
   </td>
  </tr>
  <tr>
   <td>Beastmaster
   </td>
   <td>Deals double damage every 5 attacks
   </td>
  </tr>
  <tr>
   <td>Headhunter
   </td>
   <td>Has a 5% chance to deal 2.5x damage
   </td>
  </tr>
  <tr>
   <td>Fire Mage
   </td>
   <td>Burns enemies dealing damage over time, attacks have small aoe
   </td>
  </tr>
  <tr>
   <td>Ice Mage
   </td>
   <td>Slows enemies down by 40%, attacks have small aoe
   </td>
  </tr>
  <tr>
   <td>Lightning Mage
   </td>
   <td>Stuns target for .3 seconds on each attack
   </td>
  </tr>
  <tr>
   <td>Warlock
   </td>
   <td>Reduces target's armor (both types) by 25%
   </td>
  </tr>
  <tr>
   <td>Priestess
   </td>
   <td>Increases damage of towers in her range (including self) by 20%
   </td>
  </tr>
</table>

### _<span style="text-decoration:underline;">Enemies</span>_

Enemies were created with different speeds, health, armor (both magic and physical) to create different challenges for the player. By having magic and physical armor, it allowed different towers to be more useful on certain waves. For example, if a tower dealt magic damage it would be reduced against magic armor, but would not be affected by physical armor. In total, 18 enemies were created with 3 of them being minibosses and 2 being end-game bosses. These bosses have enhanced stats compared to other enemies to be more difficult to kill. Enemies also had specific damage they dealt to the player, as well as gold reward depending on how difficult the enemy was. Each stage had 6 different kinds of enemies which were introduced in the first few waves before being mixed together in later waves.
